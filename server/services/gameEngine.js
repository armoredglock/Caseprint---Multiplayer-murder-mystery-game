const roomManager = require('./roomManager');
const caseService = require('./caseService');
const GameSession = require('../models/GameSession');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// We no longer use strict time limits. Time is tracked as elapsed time.

const startGame = async (io, roomCode, caseId) => {
  const room = await roomManager.getRoom(roomCode);
  if (!room) return;

  await roomManager.updateRoom(roomCode, {
    status: 'IN_GAME',
    phase: 'INVESTIGATION', // Start directly in investigation since all docs are provided
    caseId,
    phaseStartedAt: new Date()
  });

  // Broadcast game start
  io.to(roomCode).emit('game:started', { phase: 'INVESTIGATION', duration: 0 });
  
  // Send full case data immediately
  const caseData = await caseService.getCaseDataForWave(caseId, 0);
  io.to(roomCode).emit('game:case-data', caseData);
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

  await roomManager.updateRoom(roomCode, { currentWave: waveNum });
  
  const caseData = await caseService.getCaseDataForWave(room.caseId, waveNum);
  io.to(roomCode).emit('game:clue-wave', { wave: waveNum, caseData });
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

  // If everyone has accused, end phase automatically
  const allAccused = updatedRoom.players.every(p => p.hasAccused);
  if (allAccused) {
    await advancePhase(io, roomCode, 'ACCUSATION');
  }
};

const resolveGame = async (io, roomCode) => {
  const room = await roomManager.getRoom(roomCode);
  const solution = await caseService.getCaseSolution(room.caseId);
  const caseMeta = await caseService.getCaseDataForWave(room.caseId, 0); // for title
  
  if (!room || !solution) return;

  await roomManager.updateRoom(roomCode, { phase: 'VERDICT' });

  // Setup AI evaluator
  let genAI = null;
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  // Score calculations using AI
  const results = await Promise.all(room.players.map(async (player) => {
    let score = 0;
    
    const acc = room.accusations.find(a => a.socketId === player.socketId) || {
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
      correctKiller, correctMotive, correctMethod, speedBonus
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

module.exports = {
  startGame,
  advancePhase,
  submitAccusation
};
