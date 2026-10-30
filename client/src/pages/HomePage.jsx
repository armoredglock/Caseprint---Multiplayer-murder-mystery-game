import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';
import { useGame } from '../contexts/GameContext';
import DiceRoller3D from '../components/DiceRoller3D';

const HomePage = () => {
  const navigate = useNavigate();
  const { createRoom, joinRoom } = useSocket();
  const { initSession } = useGame();
  
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [cases, setCases] = useState([
    { caseId: 'boardroom-betrayal', title: 'The Boardroom Betrayal', subtitle: "A CEO's Final Meeting", difficulty: 'Medium' },
    { caseId: 'canvas-of-blood', title: 'Canvas of Blood', subtitle: 'A Masterpiece of Murder', difficulty: 'Hard' },
    { caseId: 'crimson-gala', title: 'The Crimson Gala', subtitle: 'Blood Amongst High Society', difficulty: 'Easy' },
    { caseId: 'echoes-in-code', title: 'Echoes in the Code', subtitle: 'A Cybernetic Execution', difficulty: 'Medium' },
    { caseId: 'midnight-at-the-manor', title: 'Midnight at the Manor', subtitle: 'The Poisoned Aristocrat', difficulty: 'Hard' },
    { caseId: 'shadow-of-the-syndicate', title: 'Shadow of the Syndicate', subtitle: 'The Underworld Cleanse', difficulty: 'Expert' },
    { caseId: 'whispers-in-the-alley', title: 'Whispers in the Alley', subtitle: 'Midnight Gunfire in Chinatown', difficulty: 'Easy' },
    { caseId: 'the-phantom-heist', title: 'The Phantom Heist', subtitle: 'Vault Break and Bloodshed', difficulty: 'Medium' }
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [selectedCaseId, setSelectedCaseId] = useState('boardroom-betrayal');
  const [loadingCases, setLoadingCases] = useState(false);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Fetch dynamic cases from backend if available
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoadingCases(true);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/cases`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setCases(data);
          }
        }
      } catch (err) {
        console.warn("Using default static cases, failed to fetch dynamic cases:", err);
      } finally {
        setLoadingCases(false);
      }
    };
    fetchCases();
  }, []);

  const getRandomName = () => {
    const names = ["Poirot", "Marple", "Holmes", "Watson", "Tracy", "Spade", "Marlowe", "Drew", "Fletcher", "Columbo", "Monk", "Benson", "Stabler", "Rosa", "Peralta"];
    return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 99 + 1);
  };

  const [rollingCreate, setRollingCreate] = useState(false);
  const handleRandomizeCreateStart = () => setRollingCreate(true);
  const handleRandomizeCreateComplete = () => {
    setPlayerName(getRandomName());
    setRollingCreate(false);
  };

  const [rollingJoin, setRollingJoin] = useState(false);
  const handleRandomizeJoinStart = () => setRollingJoin(true);
  const handleRandomizeJoinComplete = () => {
    setPlayerName(getRandomName());
    setRollingJoin(false);
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const finalName = playerName.trim() || getRandomName();
    
    setIsCreating(true);
    setError('');
    
    try {
      if (!selectedCaseId) {
        throw new Error(`No case selected.`);
      }
      
      const res = await createRoom(finalName, selectedCaseId, password);
      const player = res.room.players.find(p => p.name === finalName);
      initSession(res.room, player, res.sessionToken);
      navigate(`/lobby/${res.roomCode}`);
    } catch (err) {
      setError(err.message || 'Failed to create room');
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const finalName = playerName.trim() || getRandomName();
    if (!roomCode.trim()) return setError('Enter a room code');
    
    setIsJoining(true);
    setError('');
    
    try {
      const code = roomCode.toUpperCase().trim();
      const res = await joinRoom(code, finalName, password);
      const player = res.room.players.find(p => p.name === finalName);
      initSession(res.room, player, res.sessionToken);
      navigate(`/lobby/${code}`);
    } catch (err) {
      setError(err.message || 'Failed to join room');
      setIsJoining(false);
    }
  };

  const selectedCase = cases.find(c => c.caseId === selectedCaseId) || cases[0];

  return (
    <div className="home-page min-h-[100dvh] relative overflow-y-auto overflow-x-hidden py-10 md:py-14 flex flex-col items-center justify-center font-typewriter">
      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}

      <motion.div 
        className="container mx-auto px-4 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-10 mt-2 md:mt-0 select-none">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-typewriter text-paper-cream mb-2 tracking-tighter" 
            style={{ 
              textShadow: '0 4px 15px rgba(0,0,0,0.95), 0 0 30px rgba(212,168,83,0.25)',
              letterSpacing: '-0.02em'
            }}
          >
            CASEPRINT
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-accent font-ui tracking-[0.25em] uppercase font-bold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            The Detective Game
          </p>
        </div>

        {/* Dual Manila Folders */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center !overflow-visible">
          
          {/* Create Room Folder */}
          <motion.div 
            className="w-full md:w-1/2 relative group !overflow-visible"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background folder shape */}
            <div 
              className="absolute inset-0 bg-manila-dark border-2 border-[#8c713e] before:content-[''] before:absolute before:top-0 before:left-4 before:w-14 before:h-2 before:bg-[#8c713e] shadow-[0_12px_32px_rgba(0,0,0,0.85)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.95)] transition-shadow duration-300"
              style={{ clipPath: 'polygon(0 0, 32% 0, 35% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px' }}
            >
              {/* Distressed Inner Borders */}
              <div className="absolute inset-2 border-2 border-ink-black/20 border-dashed pointer-events-none opacity-80" style={{ clipPath: 'polygon(0 0, 32% 0, 34% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
              <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-60" style={{ clipPath: 'polygon(0 0, 31% 0, 33% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
              <div className="absolute top-4 right-4 stamp stamp-red opacity-25 mix-blend-multiply text-xl transform rotate-12 z-10 pointer-events-none font-bold">
                TOP SECRET
              </div>
            </div>
            
            {/* Paperclip Graphic */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-3 -left-3 text-stone-900/70 transform -rotate-12 drop-shadow-md z-20 pointer-events-none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>

            {/* Content container */}
            <div className="relative z-10 text-ink-black p-6 md:p-8 pt-[32px] h-full flex flex-col !overflow-visible">
              <h2 className="text-2xl sm:text-3xl mb-6 border-b-2 border-ink-black/30 pb-2 text-center font-bold font-ui relative z-10 text-ink-black tracking-wide">
                Start an Investigation
              </h2>

              <form onSubmit={handleCreateRoom} className="space-y-5 font-ui relative z-10">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="block text-xs text-ink-black font-bold uppercase tracking-wider">
                      Lead Detective Name
                    </label>
                    <span className="text-[10px] font-mono text-ink-black/60 uppercase">
                      Roll for alias
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Poirot"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      maxLength={20}
                      className="flex-1 bg-transparent border-b-2 border-black/50 focus:border-ink-black focus:outline-none px-2 py-1 placeholder:text-gray-600/70 placeholder:font-handwriting placeholder:text-2xl text-ink-black font-mono text-xl sm:text-2xl font-bold"
                    />
                    <DiceRoller3D 
                      isRolling={rollingCreate}
                      onRollStart={handleRandomizeCreateStart}
                      onRollComplete={handleRandomizeCreateComplete}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-ink-black font-bold mb-1 uppercase tracking-wider">
                    Select Case File
                  </label>
                  {loadingCases ? (
                    <div className="animate-pulse h-10 bg-[#967d4a] rounded"></div>
                  ) : (
                    <div className="relative" ref={dropdownRef}>
                      <div 
                        className="w-full bg-black/5 hover:bg-black/10 border-b-2 border-black/50 focus:border-ink-black focus:outline-none px-2.5 py-2 font-mono text-sm text-ink-black cursor-pointer flex justify-between items-center transition-colors rounded-t"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <div className="truncate pr-2">
                          <span className="font-bold text-ink-black">{selectedCase?.title || 'Select a Case'}</span>
                          {selectedCase?.subtitle && (
                            <span className="block text-xs text-ink-black/70 font-mono italic truncate">
                              {selectedCase.subtitle}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] px-1.5 py-0.5 rounded border border-ink-black/30 font-bold uppercase tracking-wider bg-black/5">
                            {selectedCase?.difficulty}
                          </span>
                          <motion.svg 
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </motion.svg>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 w-full mt-1 bg-manila-dark border-2 border-solid border-ink-black shadow-[4px_6px_0_rgba(0,0,0,0.6)] z-50 max-h-56 overflow-y-auto custom-scrollbar"
                          >
                            <div>
                              {cases.map(c => (
                                <div 
                                  key={c.caseId} 
                                  className="px-3 py-2 cursor-pointer font-mono text-sm border-b border-ink-black/10 last:border-0 hover:bg-black/15 transition-colors flex justify-between items-center"
                                  onClick={() => {
                                    setSelectedCaseId(c.caseId);
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  <div className="pr-2 truncate">
                                    <div className="font-bold text-ink-black leading-tight">{c.title}</div>
                                    {c.subtitle && <div className="text-[11px] text-ink-black/60 italic truncate">{c.subtitle}</div>}
                                  </div>
                                  <span className="text-[10px] px-1.5 py-0.5 border border-ink-black/20 font-bold uppercase rounded bg-black/5 flex-shrink-0">
                                    {c.difficulty}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-ink-black font-bold mb-1 uppercase tracking-wider">
                    Security Clearance (Password)
                  </label>
                  <input 
                    type="password" 
                    placeholder="Leave blank for public access"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={20}
                    className="w-full bg-transparent border-b-2 border-black/50 focus:border-ink-black focus:outline-none px-2 py-1 placeholder:text-gray-600/70 placeholder:font-mono placeholder:text-xs text-ink-black font-mono font-bold text-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-ink-black text-paper-cream py-3.5 font-bold uppercase tracking-widest hover:bg-ink-black/85 transition-all mt-6 border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)] cursor-pointer flex items-center justify-center gap-2"
                  disabled={isCreating}
                >
                  <span>{isCreating ? 'Opening File...' : 'Open Case File'}</span>
                  <span className="text-lg">→</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Join Room Folder */}
          <motion.div 
            className="w-full md:w-1/2 relative group !overflow-visible"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background folder shape */}
            <div 
              className="absolute inset-0 bg-manila-dark border-2 border-[#8c713e] before:content-[''] before:absolute before:top-0 before:left-4 before:w-14 before:h-2 before:bg-[#8c713e] shadow-[0_12px_32px_rgba(0,0,0,0.85)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.95)] transition-shadow duration-300"
              style={{ clipPath: 'polygon(0 0, 32% 0, 35% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px' }}
            >
              {/* Distressed Inner Borders */}
              <div className="absolute inset-2 border-2 border-ink-black/20 border-dashed pointer-events-none opacity-80" style={{ clipPath: 'polygon(0 0, 32% 0, 34% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
              <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-60" style={{ clipPath: 'polygon(0 0, 31% 0, 33% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
              <div className="absolute top-4 right-4 stamp stamp-black opacity-20 mix-blend-multiply text-xl transform -rotate-6 z-10 pointer-events-none font-bold">
                URGENT
              </div>
            </div>
            
            {/* Paperclip Graphic */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-2 -left-2 text-stone-900/70 transform -rotate-6 drop-shadow-md z-20 pointer-events-none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>

            {/* Content container */}
            <div className="relative z-10 text-ink-black p-6 md:p-8 pt-[32px] h-full flex flex-col !overflow-visible">
              <h2 className="text-2xl sm:text-3xl mb-6 border-b-2 border-ink-black/30 pb-2 text-center font-bold font-ui relative z-10 text-ink-black tracking-wide">
                Join the Force
              </h2>

              <form onSubmit={handleJoinRoom} className="space-y-5 font-ui relative z-10">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="block text-xs text-ink-black font-bold uppercase tracking-wider">
                      Detective Name
                    </label>
                    <span className="text-[10px] font-mono text-ink-black/60 uppercase">
                      Roll for alias
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. Marple"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      maxLength={20}
                      className="flex-1 bg-transparent border-b-2 border-black/50 focus:border-ink-black focus:outline-none px-2 py-1 placeholder:text-gray-600/70 placeholder:font-handwriting placeholder:text-2xl text-ink-black font-mono text-xl sm:text-2xl font-bold"
                    />
                    <DiceRoller3D 
                      isRolling={rollingJoin}
                      onRollStart={handleRandomizeJoinStart}
                      onRollComplete={handleRandomizeJoinComplete}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-ink-black font-bold mb-1 uppercase tracking-wider">
                    Case File Number (Room Code)
                  </label>
                  <input 
                    type="text" 
                    placeholder="6-LETTER CODE"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="w-full bg-transparent border-b-2 border-black/50 focus:border-ink-black focus:outline-none px-2 py-1 uppercase text-center text-3xl tracking-[0.25em] font-mono font-black text-ink-blue placeholder:text-gray-600/70 placeholder:font-mono placeholder:text-xl placeholder:tracking-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ink-black font-bold mb-1 uppercase tracking-wider">
                    Security Clearance (Password)
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={20}
                    className="w-full bg-transparent border-b-2 border-black/50 focus:border-ink-black focus:outline-none px-2 py-1 placeholder:text-gray-600/70 placeholder:font-mono placeholder:text-xs text-ink-black font-mono font-bold text-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-transparent text-ink-black py-3.5 font-bold uppercase tracking-widest hover:bg-ink-black/10 transition-all mt-6 border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)] cursor-pointer flex items-center justify-center gap-2"
                  disabled={isJoining}
                >
                  <span>{isJoining ? 'Connecting...' : 'Join Investigation'}</span>
                  <span className="text-lg">→</span>
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>

        {error && (
          <div className="mt-8 bg-danger text-white px-6 py-3 rounded shadow-glow font-bold border border-red-400">
            {error}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;
