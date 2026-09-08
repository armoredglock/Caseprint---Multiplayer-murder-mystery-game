const roomManager = require('./roomManager');
const caseService = require('./caseService');
const GameSession = require('../models/GameSession');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const Case = require('../models/Case');

// Store active timers to clear them when game ends
const activeTimers = new Map();

const randomizeEvidenceDistribution = (baseCase) => {
  // Deep clone to avoid mutating the base case
  const randomized = JSON.parse(JSON.stringify(baseCase));
  
  // Rule 1 & 4: base suspects, base witnesses, standard digital evidence in Wave 1.
  if (randomized.suspects) {
    randomized.suspects.forEach(s => {
      // 80% chance base suspects are wave 1, else wave 2
      s.wave = Math.random() < 0.8 ? 1 : 2;
    });
  }
  
  if (randomized.witnessStatements) {
    randomized.witnessStatements.forEach(w => w.wave = 1);
  }

  // Rule 2: Forensics - sometimes fast (Wave 1) sometimes late (Wave 2 or 3)
  if (randomized.forensics) {
    const r = Math.random();
    randomized.forensics.wave = r < 0.3 ? 1 : (r < 0.7 ? 2 : 3);
  }

  // Rule 3: Physical Evidence earlier or later
  if (randomized.physicalEvidence) {
    randomized.physicalEvidence.forEach(e => {
      const r = Math.random();
      e.wave = r < 0.4 ? 1 : (r < 0.8 ? 2 : 3);
    });
  }

  if (randomized.digitalEvidence) {
    if (randomized.digitalEvidence.phoneRecords) {
      randomized.digitalEvidence.phoneRecords.forEach(p => p.wave = 1);
    }
    if (randomized.digitalEvidence.emails) {
      randomized.digitalEvidence.emails.forEach(e => e.wave = 1);
    }
    
    // Rule 5: CCTV sometimes distorted (Wave 2, 3, 4)
    if (randomized.digitalEvidence.cctvLogs) {
      randomized.digitalEvidence.cctvLogs.forEach(c => {
        if (c.note.includes("DISTORTED") || c.note.includes("corrupt") || c.flagged) {
          const r = Math.random();
          c.wave = r < 0.33 ? 2 : (r < 0.66 ? 3 : 4);
        } else {
          c.wave = 1;
        }
      });
    }

    // Rule 6: Encoded puzzles in ANY level
    if (randomized.digitalEvidence.puzzles) {
      randomized.digitalEvidence.puzzles.forEach(p => {
        p.wave = Math.floor(Math.random() * 4) + 1; // 1 to 4
      });
    }
  }

  return randomized;
};

const generateNarrativeForWave = (caseObj, waveNum) => {
  const parts = [];
  if (caseObj.forensics && caseObj.forensics.wave === waveNum) {
    parts.push("The lab has finally sent over the forensics report.");
  }
  if (caseObj.digitalEvidence?.cctvLogs?.some(c => c.wave === waveNum && c.flagged)) {
    parts.push("Tech division recovered delayed or distorted CCTV footage.");
  }
  if (caseObj.digitalEvidence?.puzzles?.some(p => p.wave === waveNum)) {
    parts.push("We discovered an encrypted puzzle that needs your immediate attention.");
  }
  if (caseObj.physicalEvidence?.some(e => e.wave === waveNum)) {
    parts.push("Officers found new physical evidence linked to the scene.");
  }
  if (caseObj.suspects?.some(s => s.wave === waveNum)) {
    parts.push("A new person of interest has been identified.");
  }
  
  if (parts.length === 0) return `UPDATE: We have unlocked more background details for Wave ${waveNum}.`;
  
  return `UPDATE: ${parts.join(" ")}`;
};

const scheduleNextWave = async (io, roomCode, nextWaveNum) => {
  const room = await roomManager.getRoom(roomCode);
  if (!room || room.phase !== 'INVESTIGATION' || nextWaveNum > 4) return;

  const minSecs = 60;
  const maxSecs = 120;
  const delay = Math.floor(Math.random() * (maxSecs - minSecs + 1) + minSecs) * 1000;

  const timer = setTimeout(async () => {
    const currentRoom = await roomManager.getRoom(roomCode);
    if (currentRoom.puzzlePending) {
      await roomManager.updateRoom(roomCode, { queuedWave: nextWaveNum });
    } else {
      await triggerClueWave(io, roomCode, nextWaveNum);
    }
  }, delay);

  const timers = activeTimers.get(roomCode) || [];
  timers.push(timer);
  activeTimers.set(roomCode, timers);
};

const startGame = async (io, roomCode, scenarioId) => {
  const room = await roomManager.getRoom(roomCode);
  if (!room) return;

  const variations = await Case.find({ scenarioId });
  let caseId = scenarioId;
  if (variations && variations.length > 0) {
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    caseId = randomVariation.caseId;
  } else {
    const { seedCases } = require('../data/seedCases');
    const memoryVariations = seedCases.filter(c => c.scenarioId === scenarioId);
    if (memoryVariations && memoryVariations.length > 0) {
      const randomVariation = memoryVariations[Math.floor(Math.random() * memoryVariations.length)];
      caseId = randomVariation.caseId;
    }
  }

  const baseCase = await caseService.getFullCase(caseId);
  const customizedCase = baseCase ? randomizeEvidenceDistribution(baseCase) : null;

  await roomManager.updateRoom(roomCode, {
    status: 'IN_GAME',
    phase: 'INVESTIGATION', 
    scenarioId,
    caseId,
    caseDataOverride: customizedCase,
    currentWave: 0,
    solvedPuzzles: [],
    puzzlePending: false,
    queuedWave: null,
    phaseStartedAt: new Date()
  });

  io.to(roomCode).emit('game:started', { phase: 'INVESTIGATION' });
  io.to(roomCode).emit('chat:broadcast', {
    sender: 'SYSTEM',
    message: 'The investigation has begun. Review the initial case file.',
    timestamp: new Date().toISOString()
  });

  activeTimers.set(roomCode, []);

  // Trigger Wave 1 immediately
  await triggerClueWave(io, roomCode, 1);
};

const advancePhase = async (io, roomCode, currentPhase) => {
  const room = await roomManager.getRoom(roomCode);
  if (!room) return;

  let nextPhase;

  switch (currentPhase) {
    case 'INVESTIGATION':
      nextPhase = 'ACCUSATION';
      break;
      
    case 'ACCUSATION':
      nextPhase = 'VERDICT';
      await resolveGame(io, roomCode);
      break;
      
    default:
      return;
  }

  if (nextPhase !== 'VERDICT') {
    await roomManager.updateRoom(roomCode, {
      phase: nextPhase,
      phaseStartedAt: new Date()
    });
    
    io.to(roomCode).emit('game:phase-change', { phase: nextPhase, duration: 0 });
  }
};

const triggerClueWave = async (io, roomCode, waveNum) => {
  const room = await roomManager.getRoom(roomCode);
  if (!room || room.phase !== 'INVESTIGATION') return;

  const caseService = require('./caseService');
  const caseData = await caseService.getCaseDataForWave(roomCode, waveNum);
  const caseObj = room.caseDataOverride || await caseService.getFullCase(room.caseId);
  
  const puzzlesInWave = caseData.digitalEvidence?.puzzles?.filter(p => p.wave === waveNum) || [];
  const unsolvedPuzzles = puzzlesInWave.filter(p => !room.solvedPuzzles?.includes(p.id));
  
  const isPuzzlePending = unsolvedPuzzles.length > 0;

  await roomManager.updateRoom(roomCode, { 
    currentWave: waveNum,
    puzzlePending: isPuzzlePending,
    queuedWave: null 
  });
  
  const message = generateNarrativeForWave(caseObj, waveNum);

  io.to(roomCode).emit('game:clue-wave', { wave: waveNum, caseData, message });

  if (waveNum < 4) {
    scheduleNextWave(io, roomCode, waveNum + 1);
  }
};

const solvePuzzle = async (io, roomCode, socketId, puzzleId, submittedAnswer, playerName) => {
  const room = await roomManager.getRoom(roomCode);
  if (!room || room.phase !== 'INVESTIGATION') return { success: false, error: 'Game not in investigation phase.' };

  const caseService = require('./caseService');
  const caseData = await caseService.getCaseDataForWave(roomCode, room.currentWave);
  
  // Look in all puzzles up to current wave
  let puzzle = null;
  if (caseData.digitalEvidence?.puzzles) {
    puzzle = caseData.digitalEvidence.puzzles.find(p => p.id === puzzleId);
  }
  
  if (!puzzle) return { success: false, error: 'Puzzle not found.' };
  
  if (room.solvedPuzzles?.includes(puzzleId)) {
    return { success: true, alreadySolved: true };
  }

  // Check answer
  const isCorrect = puzzle.answer && submittedAnswer.toLowerCase().trim() === puzzle.answer.toLowerCase().trim();
  
  if (!isCorrect) {
    return { success: false, error: 'Incorrect answer.' };
  }

  const solved = room.solvedPuzzles || [];
  solved.push(puzzleId);
  
  const puzzlesInWave = caseData.digitalEvidence?.puzzles?.filter(p => p.wave === room.currentWave) || [];
  const unsolvedPuzzles = puzzlesInWave.filter(p => !solved.includes(p.id));
  
  const isPuzzlePending = unsolvedPuzzles.length > 0;
  
  const updatedRoom = await roomManager.updateRoom(roomCode, { 
    solvedPuzzles: solved,
    puzzlePending: isPuzzlePending
  });
  
  io.to(roomCode).emit('game:puzzle-solved', { puzzleId, solvedBy: playerName });
  io.to(roomCode).emit('chat:broadcast', {
    sender: 'SYSTEM',
    message: `${playerName} successfully solved the puzzle: ${puzzle.title}!`,
    timestamp: new Date().toISOString(),
    isHost: false
  });
  
  // If no more pending puzzles and we have a queued wave, trigger it
  if (!isPuzzlePending && room.queuedWave) {
    io.to(roomCode).emit('chat:broadcast', {
      sender: 'SYSTEM',
      message: `The firewall has been breached. Re-establishing connection for the next data wave...`,
      timestamp: new Date().toISOString(),
      isHost: false
    });
    
    // Slight delay before triggering the queued wave so they can read the chat
    setTimeout(() => {
      triggerClueWave(io, roomCode, room.queuedWave);
    }, 4000);
  }

  return { success: true, puzzle };
};

const submitAccusation = async (io, roomCode, socketId, accusation) => {
  const room = await roomManager.getRoom(roomCode);
  if (!room || room.phase !== 'ACCUSATION') return;

  const player = room.players.find(p => p.socketId === socketId);
  if (!player || player.hasAccused) return;

  // Save accusation by manually updating and saving
  const newAccusation = {
    playerName: player.name,
    socketId: socketId,
    suspect: accusation.suspect,
    motive: accusation.motive,
    method: accusation.method,
    submittedAt: new Date()
  };

  const roomDoc = await require('../models/Room').findOne({ roomCode });
  if (!roomDoc) return;
  
  roomDoc.accusations.push(newAccusation);
  const playerIndex = roomDoc.players.findIndex(p => p.socketId === socketId);
  if (playerIndex !== -1) {
    roomDoc.players[playerIndex].hasAccused = true;
  }
  
  await roomDoc.save();
  const updatedRoom = roomDoc.toObject();
  require('./roomManager').activeRooms?.set(roomCode, updatedRoom);

  // Acknowledge submission to player
  io.to(socketId).emit('game:accusation-received');
  
  // Notify room that someone submitted
  io.to(roomCode).emit('game:player-accused', { playerName: player.name });
  io.to(roomCode).emit('room:state', updatedRoom);

  // If everyone has accused, end phase automatically
  const allAccused = updatedRoom.players.every(p => p.hasAccused);
  if (allAccused) {
    await advancePhase(io, roomCode, 'ACCUSATION');
  }
};

const resolveGame = async (io, roomCode) => {
  const room = await roomManager.getRoom(roomCode);
  const solution = await caseService.getCaseSolution(room.caseId);
  const caseMeta = await caseService.getCaseDataForWave(roomCode, 0); // Need to pass roomCode, not caseId
  
  if (!room || !solution || !caseMeta) return;

  await roomManager.updateRoom(roomCode, { phase: 'VERDICT' });

  clearTimersForRoom(roomCode);

  // Setup AI evaluator
  let genAI = null;
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  // Score calculations using AI
  const results = await Promise.all(room.players.map(async (player) => {
    let score = 0;
    
    const acc = room.accusations.find(a => a.playerName === player.name) || {
      suspect: 'None',
      motive: 'Did not submit in time.',
      method: 'Did not submit in time.',
      submittedAt: new Date() // No speed bonus
    };

    let correctKiller = false;
    let correctMotive = false;
    let correctMethod = false;
    let killerScore = 0;
    let motiveScore = 0;
    let methodScore = 0;

    if (acc.suspect !== 'None') {
      if (genAI) {
        try {
          const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
          });
          
          const prompt = `
          You are an expert detective evaluator grading a player's final accusation.
          True Solution:
          - Killer: ${solution.killer}
          - Motive: ${solution.motive}
          - Method: ${solution.method}
          
          Player's Accusation:
          - Accused: ${acc.suspect}
          - Motive: ${acc.motive}
          - Method: ${acc.method}
          
          Evaluate the player's accuracy. Be generous but fair. 
          Return exactly this JSON structure:
          {
            "correctKiller": boolean, // true if they got the killer name right
            "correctMotive": boolean, // true if motive is mostly correct
            "correctMethod": boolean, // true if method is mostly correct
            "motiveScore": number, // int out of 25 points based on motive accuracy
            "methodScore": number // int out of 25 points based on method accuracy
          }`;
          
          const response = await model.generateContent(prompt);
          const data = JSON.parse(response.response.text());
          
          correctKiller = data.correctKiller;
          correctMotive = data.correctMotive;
          correctMethod = data.correctMethod;
          killerScore = correctKiller ? 50 : 0;
          motiveScore = data.motiveScore || 0;
          methodScore = data.methodScore || 0;
          
        } catch (err) {
          console.error("[AI] Error evaluating accusation:", err);
        }
      } else {
        // Fallback if no API key
        const accSuspect = acc.suspect.toLowerCase().trim();
        const solKiller = solution.killer.toLowerCase().trim();
        correctKiller = accSuspect === solKiller || solKiller.includes(accSuspect);
        correctMotive = acc.motive.length > 10;
        correctMethod = acc.method.length > 10;
        killerScore = correctKiller ? 50 : 0;
        motiveScore = correctMotive ? 25 : 0;
        methodScore = correctMethod ? 25 : 0;
      }
    }
    
    score += killerScore + motiveScore + methodScore;

    // Speed bonus (max 20 pts) based on submission time relative to phase start
    const submitTime = new Date(acc.submittedAt).getTime();
    const phaseStart = new Date(room.phaseStartedAt).getTime();
    const elapsedSecs = (submitTime - phaseStart) / 1000;
    const speedBonus = correctKiller ? Math.max(0, Math.floor(20 - (elapsedSecs / 10))) : 0;
    
    score += speedBonus;

    return {
      name: player.name,
      socketId: player.socketId,
      accusation: { suspect: acc.suspect, motive: acc.motive, method: acc.method },
      score,
      correctKiller, correctMotive, correctMethod, motiveScore, methodScore, speedBonus
    };
  }));

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  
  // Assign ranks
  results.forEach((r, i) => r.rank = i + 1);

  const winner = results.length > 0 ? { name: results[0].name, score: results[0].score } : null;

  // Save session to history
  const session = new GameSession({
    roomCode,
    caseId: room.caseId,
    caseTitle: caseMeta.title,
    players: results,
    winner,
    playerCount: room.players.length,
    duration: (new Date() - room.createdAt) / 1000
  });
  await session.save();

  // Update room status
  await roomManager.updateRoom(roomCode, { status: 'FINISHED' });

  // Broadcast verdict
  io.to(roomCode).emit('game:verdict', {
    solution,
    results,
    winner
  });
};

const clearTimersForRoom = (roomCode) => {
  if (activeTimers.has(roomCode)) {
    activeTimers.get(roomCode).forEach(timer => clearTimeout(timer));
    activeTimers.delete(roomCode);
  }
};

module.exports = {
  startGame,
  advancePhase,
  submitAccusation,
  clearTimersForRoom,
  solvePuzzle
};
