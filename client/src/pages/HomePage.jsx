import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';
import { useGame } from '../contexts/GameContext';
import DiceRoller3D from '../components/DiceRoller3D';

const DEFAULT_CASES = [
  {
    caseId: 'boardroom-betrayal',
    title: 'The Boardroom Betrayal',
    subtitle: "A CEO's Final Meeting",
    difficulty: 'Medium',
    incidentNumber: 'CASE #NV-2024-08',
    summary: 'CEO Marcus Chen found poisoned in the 42nd-floor boardroom of NovaTech. The door was locked from the inside.',
    themeColor: '#8b2252',
    playerRange: '2-10 Detectives'
  },
  {
    caseId: 'canvas-of-blood',
    title: 'Canvas of Blood',
    subtitle: 'A Masterpiece of Murder',
    difficulty: 'Hard',
    incidentNumber: 'CASE #ART-2024-01',
    summary: 'Gallery owner Julian Sterling bludgeoned to death in the main exhibition hall, and a priceless 17th-century painting sliced from its frame.',
    themeColor: '#5E2129',
    playerRange: '2-8 Detectives'
  },
  {
    caseId: 'crimson-gala',
    title: 'The Crimson Gala',
    subtitle: 'Blood Amongst High Society',
    difficulty: 'Easy',
    incidentNumber: 'CASE #CG-2024-12',
    summary: 'Billionaire philanthropist Arthur Sterling collapses at an elite masquerade gala. Suspects include his socialite daughter and private security chief.',
    themeColor: '#991b1b',
    playerRange: '2-8 Detectives'
  },
  {
    caseId: 'echoes-in-code',
    title: 'Echoes in the Code',
    subtitle: 'A Cybernetic Execution',
    difficulty: 'Medium',
    incidentNumber: 'CASE #CYB-2024-04',
    summary: 'Lead AI researcher Dr. Aris Thorne discovered dead inside a zero-access server vault. Did his prototype break protocol, or was he assassinated?',
    themeColor: '#1e3a8a',
    playerRange: '2-8 Detectives'
  },
  {
    caseId: 'midnight-at-the-manor',
    title: 'Midnight at the Manor',
    subtitle: 'The Poisoned Aristocrat',
    difficulty: 'Hard',
    incidentNumber: 'CASE #MM-2024-07',
    summary: 'Lord Harrington poisoned in his study during a torrential midnight thunderstorm. All relatives and staff were trapped inside the estate.',
    themeColor: '#3730a3',
    playerRange: '2-8 Detectives'
  },
  {
    caseId: 'shadow-of-the-syndicate',
    title: 'Shadow of the Syndicate',
    subtitle: 'The Underworld Cleanse',
    difficulty: 'Expert',
    incidentNumber: 'CASE #SYN-2024-09',
    summary: 'A covert mob accountant found executed in a Chinatown speakeasy. Encrypted ledger files hold keys to a multi-million syndicate embezzlement.',
    themeColor: '#1c1917',
    playerRange: '3-10 Detectives'
  },
  {
    caseId: 'whispers-in-the-alley',
    title: 'Whispers in the Alley',
    subtitle: 'Midnight Gunfire in Chinatown',
    difficulty: 'Easy',
    incidentNumber: 'CASE #WHA-2024-03',
    summary: 'An investigative journalist shot behind an antique tea parlor just hours before publishing a corruption expose.',
    themeColor: '#854d0e',
    playerRange: '2-6 Detectives'
  },
  {
    caseId: 'the-phantom-heist',
    title: 'The Phantom Heist',
    subtitle: 'Vault Break and Bloodshed',
    difficulty: 'Medium',
    incidentNumber: 'CASE #TPH-2024-11',
    summary: 'A subterranean bank vault breached with military precision, leaving a guard mortally wounded with zero traces of forced entry.',
    themeColor: '#0f766e',
    playerRange: '2-8 Detectives'
  }
];

const DETECTIVE_NAMES = [
  "Det. Poirot", "Det. Marple", "Det. Holmes", "Dr. Watson", "Det. Spade", 
  "Det. Marlowe", "Det. Columbo", "Det. Fletcher", "Det. Benson", "Det. Stabler", 
  "Det. Peralta", "Det. Santiago", "Det. Monk", "Det. Vance", "Det. Sterling"
];

const HomePage = () => {
  const navigate = useNavigate();
  const { createRoom, joinRoom } = useSocket();
  const { initSession } = useGame();

  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'join'
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState('boardroom-betrayal');
  const [cases, setCases] = useState(DEFAULT_CASES);
  const [isCaseBrowserOpen, setIsCaseBrowserOpen] = useState(false);
  const [showHandbook, setShowHandbook] = useState(false);
  
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // 3D Dice Roller states
  const [rollingDice, setRollingDice] = useState(false);

  // Fetch dynamic cases from backend if available
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/cases`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Merge with local rich summaries
            const merged = data.map(serverCase => {
              const matched = DEFAULT_CASES.find(c => c.caseId === serverCase.caseId);
              return {
                ...serverCase,
                summary: matched?.summary || serverCase.subtitle || "Classified homicide case dossier.",
                incidentNumber: matched?.incidentNumber || `CASE #${serverCase.caseId.slice(0, 6).toUpperCase()}`,
                playerRange: matched?.playerRange || "2-10 Detectives"
              };
            });
            setCases(merged);
          }
        }
      } catch (err) {
        console.warn("Using default case files, backend fetch failed:", err);
      }
    };
    fetchCases();
  }, []);

  const getRandomName = () => {
    const randomName = DETECTIVE_NAMES[Math.floor(Math.random() * DETECTIVE_NAMES.length)];
    const badgeNum = Math.floor(Math.random() * 89 + 10);
    return `${randomName} #${badgeNum}`;
  };

  const handleRandomizeStart = () => {
    setRollingDice(true);
  };

  const handleRandomizeComplete = () => {
    setPlayerName(getRandomName());
    setRollingDice(false);
  };

  const selectedCase = cases.find(c => c.caseId === selectedCaseId) || cases[0];

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const finalName = playerName.trim() || getRandomName();
    setIsCreating(true);
    setError('');

    try {
      if (!selectedCaseId) throw new Error('Please select an active case file.');
      const res = await createRoom(finalName, selectedCaseId, password);
      const player = res.room.players.find(p => p.name === finalName);
      initSession(res.room, player, res.sessionToken);
      navigate(`/lobby/${res.roomCode}`);
    } catch (err) {
      setError(err.message || 'Failed to open case file');
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const finalName = playerName.trim() || getRandomName();
    if (!roomCode.trim()) return setError('Please enter a 6-letter room code.');

    setIsJoining(true);
    setError('');

    try {
      const cleanCode = roomCode.toUpperCase().trim();
      const res = await joinRoom(cleanCode, finalName, password);
      const player = res.room.players.find(p => p.name === finalName);
      initSession(res.room, player, res.sessionToken);
      navigate(`/lobby/${cleanCode}`);
    } catch (err) {
      setError(err.message || 'Failed to access room');
      setIsJoining(false);
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-900 border-emerald-700';
      case 'hard':
        return 'bg-red-100 text-red-900 border-red-700';
      case 'expert':
        return 'bg-purple-100 text-purple-950 border-purple-800';
      case 'medium':
      default:
        return 'bg-amber-100 text-amber-900 border-amber-800';
    }
  };

  return (
    <div className="home-page min-h-[100dvh] relative overflow-y-auto overflow-x-hidden flex flex-col justify-between selection:bg-amber-900/30 selection:text-amber-100 font-typewriter">
      
      {/* Top Police Tape Barrier */}
      <div className="w-full crime-tape py-1.5 px-4 text-center font-mono font-bold text-xs uppercase tracking-[0.25em] text-black select-none border-b-2 border-black/80 flex items-center justify-around overflow-hidden shadow-lg z-20">
        <span className="hidden sm:inline">⚠️ POLICE CRIME SCENE ⚠️</span>
        <span>DO NOT CROSS // HOMICIDE DIVISION DISPATCH</span>
        <span className="hidden md:inline">CONFIDENTIAL CASE FILES // OFFICIAL USE ONLY</span>
        <span className="hidden sm:inline">⚠️ DO NOT CROSS ⚠️</span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 z-10 max-w-5xl mx-auto w-full">
        
        {/* Precinct Header */}
        <motion.div 
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Precinct Stamp Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-amber-600/40 rounded-full mb-3 backdrop-blur-sm shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300/90 font-bold">
              Metropolitan Homicide Bureau // Sector 14
            </span>
          </div>

          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-paper-cream tracking-tighter uppercase relative select-none"
            style={{ 
              textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 30px rgba(212,168,83,0.2)',
              letterSpacing: '-0.03em'
            }}
          >
            CASEPRINT
          </h1>
          
          <div className="flex items-center justify-center gap-3 mt-1">
            <div className="h-[1px] w-12 bg-amber-600/50 hidden sm:block" />
            <p className="text-sm sm:text-base md:text-lg text-accent uppercase tracking-[0.25em] font-bold">
              Multiplayer Cooperative Murder Mystery
            </p>
            <div className="h-[1px] w-12 bg-amber-600/50 hidden sm:block" />
          </div>
        </motion.div>

        {/* Central Manila Investigation Folder */}
        <motion.div 
          className="w-full max-w-3xl relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Realistic Folder Tabs */}
          <div className="flex items-end pl-4 gap-1 select-none z-20 relative">
            <button
              type="button"
              onClick={() => { setActiveTab('create'); setError(''); }}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wider rounded-t-lg border-2 border-b-0 border-ink-black transition-all flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'bg-[#d8be8a] text-ink-black shadow-[0_-4px_10px_rgba(0,0,0,0.4)] translate-y-[2px] z-30 font-black'
                  : 'bg-[#bba06b] text-ink-black/70 hover:bg-[#c9ad78] hover:text-ink-black z-10'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-700 inline-block shadow-sm" />
              <span>📂 Open New Case File</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('join'); setError(''); }}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wider rounded-t-lg border-2 border-b-0 border-ink-black transition-all flex items-center gap-2 ${
                activeTab === 'join'
                  ? 'bg-[#f7f2e7] text-ink-black shadow-[0_-4px_10px_rgba(0,0,0,0.4)] translate-y-[2px] z-30 font-black'
                  : 'bg-[#bba06b] text-ink-black/70 hover:bg-[#c9ad78] hover:text-ink-black z-10'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-700 inline-block shadow-sm" />
              <span>🚨 Report To Scene (Join)</span>
            </button>
          </div>

          {/* Folder Body */}
          <div className={`w-full rounded-b-xl rounded-tr-xl border-4 border-ink-black shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden transition-colors duration-300 ${
            activeTab === 'create' ? 'bg-[#d8be8a]' : 'aged-paper-bg'
          }`}>
            
            {/* Top Classified Rubber Stamp watermark */}
            <div className="absolute top-4 right-6 pointer-events-none select-none opacity-20 transform rotate-12">
              <span className="stamp-badge text-2xl border-4 border-ink-red text-ink-red font-black">
                {activeTab === 'create' ? 'CONFIDENTIAL DOSSIER' : 'PRIORITY DISPATCH'}
              </span>
            </div>

            {/* Folder Interior Wrapper */}
            <div className="p-6 sm:p-8 md:p-10 relative z-10">

              {/* TAB 1: CREATE ROOM (OPEN NEW INVESTIGATION) */}
              {activeTab === 'create' && (
                <form onSubmit={handleCreateRoom} className="space-y-6">
                  
                  {/* Lead Detective Name & 3D Dice */}
                  <div className="bg-[#f7f2e7] border-2 border-ink-black p-4 md:p-5 shadow-[3px_3px_0_rgba(0,0,0,0.3)] relative">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs uppercase tracking-widest font-black text-ink-black/80 flex items-center gap-2">
                        <span>🛡️ Lead Detective Assignment</span>
                        <span className="text-[10px] text-ink-black/50 font-mono">(Identity & Credentials)</span>
                      </label>
                      <span className="text-[11px] font-mono text-ink-black/60 uppercase">Click Dice to Roll Alias</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        placeholder="e.g. Det. Poirot"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        maxLength={25}
                        className="flex-1 bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none py-2 px-1 text-ink-black font-mono text-xl sm:text-2xl font-black placeholder:text-ink-black/30 placeholder:font-handwriting placeholder:text-3xl"
                      />
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <DiceRoller3D 
                          isRolling={rollingDice}
                          onRollStart={handleRandomizeStart}
                          onRollComplete={handleRandomizeComplete}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Case Selection Dossier Card */}
                  <div className="bg-[#f7f2e7] border-2 border-ink-black p-4 md:p-5 shadow-[3px_3px_0_rgba(0,0,0,0.3)]">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-xs uppercase tracking-widest font-black text-ink-black/80 flex items-center gap-2">
                        <span>📁 Primary Case Requisition</span>
                      </label>
                      
                      <button
                        type="button"
                        onClick={() => setIsCaseBrowserOpen(!isCaseBrowserOpen)}
                        className="text-xs font-mono font-bold text-ink-black/80 hover:text-ink-black underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        {isCaseBrowserOpen ? 'Close Case Docket ▲' : 'Browse All 8 Cases ▼'}
                      </button>
                    </div>

                    {/* Active Selected Case Preview */}
                    <div className="border border-ink-black/30 p-4 bg-white/70 shadow-inner rounded-sm relative">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-black/20 pb-2 mb-2">
                        <div>
                          <span className="text-[11px] font-mono font-bold text-ink-black/60 uppercase block">
                            {selectedCase.incidentNumber}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-ink-black m-0 leading-tight">
                            {selectedCase.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2.5 py-0.5 font-bold uppercase border tracking-wider font-mono ${getDifficultyBadge(selectedCase.difficulty)}`}>
                            {selectedCase.difficulty}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-black/10 text-ink-black font-mono font-bold uppercase border border-ink-black/20">
                            {selectedCase.playerRange}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-ink-black/80 italic font-mono leading-relaxed mb-1">
                        "{selectedCase.summary}"
                      </p>
                    </div>

                    {/* Expandable Case Docket Grid */}
                    <AnimatePresence>
                      {isCaseBrowserOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-3 pt-3 border-t-2 border-dashed border-ink-black/20"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                            {cases.map((c) => {
                              const isSelected = c.caseId === selectedCaseId;
                              return (
                                <div
                                  key={c.caseId}
                                  onClick={() => {
                                    setSelectedCaseId(c.caseId);
                                    setIsCaseBrowserOpen(false);
                                  }}
                                  className={`p-3 border-2 cursor-pointer transition-all text-left relative ${
                                    isSelected 
                                      ? 'bg-amber-100/90 border-ink-black shadow-[2px_2px_0_rgba(0,0,0,0.5)] font-bold' 
                                      : 'bg-white/60 border-ink-black/30 hover:border-ink-black hover:bg-white'
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="absolute top-2 right-2 text-[10px] font-black uppercase text-red-700 border border-red-700 px-1 transform rotate-6">
                                      SELECTED
                                    </span>
                                  )}
                                  <div className="text-[10px] font-mono text-ink-black/60 uppercase">{c.incidentNumber}</div>
                                  <div className="text-sm font-bold text-ink-black leading-snug">{c.title}</div>
                                  <div className="text-xs text-ink-black/60 italic truncate">{c.subtitle}</div>
                                  <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono">
                                    <span className={`px-1.5 py-0.2 border ${getDifficultyBadge(c.difficulty)}`}>{c.difficulty}</span>
                                    <span className="text-ink-black/50">{c.playerRange}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Security Clearance Lock (Optional Password) */}
                  <div className="bg-[#f7f2e7] border-2 border-ink-black p-4 shadow-[3px_3px_0_rgba(0,0,0,0.3)]">
                    <label className="text-xs uppercase tracking-widest font-black text-ink-black/80 block mb-1">
                      🔒 Security Clearance Passcode (Optional)
                    </label>
                    <input 
                      type="password" 
                      placeholder="Leave blank for open precinct access"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      maxLength={20}
                      className="w-full bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none py-1.5 px-1 font-mono text-sm text-ink-black placeholder:text-ink-black/40 placeholder:font-mono"
                    />
                  </div>

                  {/* Submit Action Button */}
                  <button 
                    type="submit" 
                    disabled={isCreating}
                    className="w-full bg-ink-black text-paper-cream py-4 px-6 text-base sm:text-lg font-black uppercase tracking-[0.2em] border-2 border-ink-black shadow-[5px_5px_0_rgba(0,0,0,0.6)] hover:bg-ink-black/90 active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.6)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <span>{isCreating ? 'DISPATCHING UNITS...' : '📂 OPEN CASE FILE & DISPATCH SQUAD'}</span>
                    <span className="text-xl">→</span>
                  </button>
                </form>
              )}

              {/* TAB 2: JOIN ROOM (REPORT TO ACTIVE SCENE) */}
              {activeTab === 'join' && (
                <form onSubmit={handleJoinRoom} className="space-y-6">
                  
                  {/* Detective Identity Input */}
                  <div className="bg-white/80 border-2 border-ink-black p-4 md:p-5 shadow-[3px_3px_0_rgba(0,0,0,0.3)]">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs uppercase tracking-widest font-black text-ink-black/80 flex items-center gap-2">
                        <span>🛡️ Responding Detective Name</span>
                      </label>
                      <span className="text-[11px] font-mono text-ink-black/60 uppercase">Click Dice to Roll Alias</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        placeholder="e.g. Det. Marple"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        maxLength={25}
                        className="flex-1 bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none py-2 px-1 text-ink-black font-mono text-xl sm:text-2xl font-black placeholder:text-ink-black/30 placeholder:font-handwriting placeholder:text-3xl"
                      />
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <DiceRoller3D 
                          isRolling={rollingDice}
                          onRollStart={handleRandomizeStart}
                          onRollComplete={handleRandomizeComplete}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 6-Letter Room Code Teletype */}
                  <div className="bg-white/80 border-2 border-ink-black p-4 md:p-6 shadow-[3px_3px_0_rgba(0,0,0,0.3)] text-center">
                    <label className="text-xs uppercase tracking-widest font-black text-ink-black/80 block mb-2">
                      📟 Incident Room Code (6-Character Access Identifier)
                    </label>
                    <input 
                      type="text" 
                      placeholder="XXXXXX"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      maxLength={6}
                      className="w-full max-w-xs mx-auto bg-amber-50/50 border-2 border-ink-black py-3 px-4 text-center text-3xl sm:text-4xl tracking-[0.35em] font-mono font-black text-ink-blue focus:outline-none focus:bg-white placeholder:text-gray-300 shadow-inner"
                    />
                    <span className="text-[11px] font-mono text-ink-black/50 uppercase mt-2 block">
                      Obtain this dispatch code from the session lead detective
                    </span>
                  </div>

                  {/* Security Clearance Passcode */}
                  <div className="bg-white/80 border-2 border-ink-black p-4 shadow-[3px_3px_0_rgba(0,0,0,0.3)]">
                    <label className="text-xs uppercase tracking-widest font-black text-ink-black/80 block mb-1">
                      🔒 Security Clearance Passcode (If Protected)
                    </label>
                    <input 
                      type="password" 
                      placeholder="Enter room password (if required)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      maxLength={20}
                      className="w-full bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none py-1.5 px-1 font-mono text-sm text-ink-black placeholder:text-ink-black/40"
                    />
                  </div>

                  {/* Submit Action Button */}
                  <button 
                    type="submit" 
                    disabled={isJoining}
                    className="w-full bg-blue-900 text-white py-4 px-6 text-base sm:text-lg font-black uppercase tracking-[0.2em] border-2 border-ink-black shadow-[5px_5px_0_rgba(0,0,0,0.6)] hover:bg-blue-800 active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.6)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <span>{isJoining ? 'VERIFYING CREDENTIALS...' : '🚨 REPORT TO CRIME SCENE & JOIN'}</span>
                    <span className="text-xl">→</span>
                  </button>
                </form>
              )}

              {/* Error Notice Stamp */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-100 border-2 border-red-700 text-red-900 font-mono text-sm font-bold shadow-[3px_3px_0_rgba(185,28,28,0.5)] flex items-center gap-3"
                >
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>

        {/* Detective Field Manual Accordion */}
        <div className="w-full max-w-3xl mt-6">
          <button
            type="button"
            onClick={() => setShowHandbook(!showHandbook)}
            className="w-full py-2.5 px-4 bg-black/40 hover:bg-black/60 border border-amber-600/30 text-amber-300 font-mono text-xs uppercase tracking-widest flex items-center justify-between transition-colors cursor-pointer rounded backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <span>📖</span>
              <span>Standard Operating Procedure (How to Play)</span>
            </span>
            <span>{showHandbook ? '▲ HIDE MANUAL' : '▼ READ BRIEFING'}</span>
          </button>

          <AnimatePresence>
            {showHandbook && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-2 bg-[#1b1510] border border-amber-600/40 p-5 rounded font-mono text-xs text-amber-200/90 shadow-2xl space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                  <div className="border-l-2 border-amber-500 pl-3">
                    <span className="text-amber-400 font-bold block mb-1">01. INVESTIGATE</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Analyze autopsy reports, recovered CCTV footage, suspect timelines, and physical evidence logs.
                    </p>
                  </div>

                  <div className="border-l-2 border-purple-500 pl-3">
                    <span className="text-purple-400 font-bold block mb-1">02. DECRYPT</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Crack encoded ciphers (Morse, T9, Polybius square, NATO phonetic) to unlock delayed clue waves.
                    </p>
                  </div>

                  <div className="border-l-2 border-blue-500 pl-3">
                    <span className="text-blue-400 font-bold block mb-1">03. INTERROGATE</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Question prime suspects with your team to expose conflicting statements and fraudulent alibis.
                    </p>
                  </div>

                  <div className="border-l-2 border-red-500 pl-3">
                    <span className="text-red-400 font-bold block mb-1">04. CONVICT</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      Cast your final accusation. AI detective intelligence grades your killer, motive, and method accuracy.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Desk Ticker */}
      <footer className="w-full border-t border-amber-900/40 bg-black/70 backdrop-blur-md py-3 px-4 text-center font-mono text-[11px] text-amber-500/70 uppercase tracking-widest z-10 flex flex-wrap justify-between items-center gap-2">
        <span>Homicide Records & Archives Division // System v2.4</span>
        <span className="text-amber-400/90 font-bold">Synchronized Multi-Detective Crime Lab</span>
        <span>Caseprint © {new Date().getFullYear()}</span>
      </footer>

    </div>
  );
};

export default HomePage;
