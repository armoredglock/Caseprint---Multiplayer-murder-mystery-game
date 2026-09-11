import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';
import { useGame } from '../contexts/GameContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { createRoom, joinRoom } = useSocket();
  const { initSession } = useGame();
  
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  const [cases, setCases] = useState([
    { caseId: 'boardroom-betrayal', title: 'The Boardroom Betrayal', difficulty: 'Medium' },
    { caseId: 'canvas-of-blood', title: 'Canvas of Blood', difficulty: 'Hard' },
    { caseId: 'crimson-gala', title: 'The Crimson Gala', difficulty: 'Easy' },
    { caseId: 'echoes-in-code', title: 'Echoes in the Code', difficulty: 'Medium' }
  ]);
  const [selectedCaseId, setSelectedCaseId] = useState('boardroom-betrayal');
  const [loadingCases, setLoadingCases] = useState(false);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // We can still try to fetch in the background in case new cases are added,
  // but we default to the hardcoded ones immediately so there is no wait.
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/cases`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setCases(data);
          }
        }
      } catch (err) {
        console.warn("Using default static cases, failed to fetch dynamic cases:", err);
      }
    };
    fetchCases();
  }, []);

const getRandomName = () => {
    const names = ["Poirot", "Marple", "Holmes", "Watson", "Tracy", "Spade", "Marlowe", "Drew", "Fletcher", "Columbo", "Monk", "Benson", "Stabler", "Rosa", "Peralta"];
    return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 99 + 1);
  };

  const [rollingCreate, setRollingCreate] = useState(false);
  const handleRandomizeCreate = () => {
    setRollingCreate(true);
    setPlayerName(getRandomName());
    setTimeout(() => setRollingCreate(false), 500);
  };

  const [rollingJoin, setRollingJoin] = useState(false);
  const handleRandomizeJoin = () => {
    setRollingJoin(true);
    setPlayerName(getRandomName());
    setTimeout(() => setRollingJoin(false), 500);
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
      initSession(res.room, player);
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
      initSession(res.room, player);
      navigate(`/lobby/${code}`);
    } catch (err) {
      setError(err.message || 'Failed to join room');
      setIsJoining(false);
    }
  };

  return (
    <div className="home-page min-h-[100dvh] relative overflow-y-auto overflow-x-hidden md:overflow-hidden py-12 md:py-0 flex flex-col items-center justify-center">
      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}

      <motion.div 
        className="container mx-auto px-4 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-6 md:mb-8 mt-4 md:mt-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-typewriter text-paper-cream mb-2 tracking-tighter" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>
            CASEPRINT
          </h1>
          <p className="text-lg md:text-xl text-accent font-ui tracking-widest uppercase">
            The Detective Game
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
          
          {/* Create Room Card */}
          <motion.div 
            className="bg-manila-dark text-ink-black p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-[#967d4a] w-full md:w-1/2 relative before:content-[''] before:absolute before:top-0 before:left-4 before:w-12 before:h-2 before:bg-[#967d4a]"
            style={{ clipPath: 'polygon(0 0, 30% 0, 33% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px 4px 4px 4px', paddingTop: '32px' }}
            whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(0,0,0,0.9)' }}
          >
            {/* Distressed Inner Borders */}
            <div className="absolute inset-2 border-2 border-ink-black/15 border-dashed pointer-events-none opacity-70" style={{ clipPath: 'polygon(0 0, 30% 0, 32% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
            <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-50" style={{ clipPath: 'polygon(0 0, 29% 0, 31% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
            
            {/* Paperclip Graphic */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-3 -left-3 text-gray-800/60 transform -rotate-12 drop-shadow-md z-10 pointer-events-none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>

            <div className="absolute top-2 right-4 stamp stamp-red opacity-30 text-xl transform rotate-12">TOP SECRET</div>
            <h2 className="text-3xl mb-6 border-b-2 border-ink-black/30 pb-2 text-center font-bold font-ui relative z-10">Start an Investigation</h2>
            <form onSubmit={handleCreateRoom} className="space-y-4 font-ui relative z-10">
              <div>
                <label className="block text-sm text-ink-black/80 font-bold mb-1 uppercase tracking-wider">Lead Detective Name</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Poirot"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={20}
                    className="flex-1 bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none px-2 py-1 !placeholder-gray-800/60 placeholder:text-lg !text-ink-black font-mono text-2xl font-bold"
                  />
                  <motion.button 
                    type="button" 
                    onClick={handleRandomizeCreate} 
                    className="px-3 text-2xl" 
                    title="Randomize Name"
                    whileHover={{ scale: 1.1 }}
                    animate={rollingCreate ? { 
                      rotate: [0, 180, 360, 540, 720], 
                      x: [0, 15, -5, 0], 
                      y: [0, -25, 0, -10, 0] 
                    } : { rotate: 0, x: 0, y: 0 }}
                    transition={{ duration: 0.6, times: [0, 0.4, 0.7, 0.9, 1], ease: "easeInOut" }}
                  >
                    🎲
                  </motion.button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-ink-black/80 font-bold mb-1 uppercase tracking-wider">Select Case File</label>
                {loadingCases ? (
                  <div className="animate-pulse h-10 bg-[#967d4a] rounded"></div>
                ) : (
                  <select 
                    value={selectedCaseId} 
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none px-2 py-1 font-mono text-sm !text-ink-black font-bold"
                  >
                    {cases.map(c => (
                      <option key={c.caseId} value={c.caseId} className="bg-manila-dark text-ink-black font-bold">
                        {c.title} [{c.difficulty}]
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm text-ink-black/80 font-bold mb-1 uppercase tracking-wider">Security Clearance (Password)</label>
                <input 
                  type="password" 
                  placeholder="Leave blank for public access"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={20}
                  className="w-full bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none px-2 py-1 !placeholder-gray-800/60 !text-ink-black font-mono font-bold"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-ink-black text-paper-cream py-3 font-bold uppercase tracking-widest hover:bg-ink-black/80 transition-colors mt-6 border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
                disabled={isCreating}
              >
                {isCreating ? 'Opening File...' : 'Create Room'}
              </button>
            </form>
          </motion.div>

          {/* Join Room Card */}
          <motion.div 
            className="bg-manila-dark text-ink-black p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-[#967d4a] w-full md:w-1/2 relative before:content-[''] before:absolute before:top-0 before:left-4 before:w-12 before:h-2 before:bg-[#967d4a]"
            style={{ clipPath: 'polygon(0 0, 30% 0, 33% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px 4px 4px 4px', paddingTop: '32px' }}
            whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(0,0,0,0.9)' }}
          >
            {/* Distressed Inner Borders */}
            <div className="absolute inset-2 border-2 border-ink-black/15 border-dashed pointer-events-none opacity-70" style={{ clipPath: 'polygon(0 0, 30% 0, 32% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
            <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-50" style={{ clipPath: 'polygon(0 0, 29% 0, 31% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
            
            {/* Paperclip Graphic */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-2 -left-2 text-gray-800/60 transform -rotate-6 drop-shadow-md z-10 pointer-events-none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>

             <div className="absolute top-2 right-4 stamp stamp-blue opacity-30 text-xl transform -rotate-6">URGENT</div>
            <h2 className="text-3xl mb-6 border-b-2 border-ink-black/30 pb-2 text-center font-bold font-ui relative z-10">Join the Force</h2>
            <form onSubmit={handleJoinRoom} className="space-y-4 font-ui relative z-10">
              <div>
                <label className="block text-sm text-ink-black/80 font-bold mb-1 uppercase tracking-wider">Detective Name</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Marple"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={20}
                    className="flex-1 bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none px-2 py-1 !placeholder-gray-800/60 placeholder:text-lg !text-ink-black font-mono text-2xl font-bold"
                  />
                  <motion.button 
                    type="button" 
                    onClick={handleRandomizeJoin} 
                    className="px-3 text-2xl" 
                    title="Randomize Name"
                    whileHover={{ scale: 1.1 }}
                    animate={rollingJoin ? { 
                      rotate: [0, 180, 360, 540, 720], 
                      x: [0, 15, -5, 0], 
                      y: [0, -25, 0, -10, 0] 
                    } : { rotate: 0, x: 0, y: 0 }}
                    transition={{ duration: 0.6, times: [0, 0.4, 0.7, 0.9, 1], ease: "easeInOut" }}
                  >
                    🎲
                  </motion.button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-ink-black/80 font-bold mb-1 uppercase tracking-wider">Case File Number (Room Code)</label>
                <input 
                  type="text" 
                  placeholder="6-LETTER CODE"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="w-full bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none px-2 py-1 uppercase text-center text-3xl tracking-widest font-mono font-bold !text-ink-blue !placeholder-gray-800/40"
                />
              </div>
              <div>
                <label className="block text-sm text-ink-black/80 font-bold mb-1 uppercase tracking-wider">Security Clearance (Password)</label>
                <input 
                  type="password" 
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={20}
                  className="w-full bg-transparent border-b-2 border-ink-black/40 focus:border-ink-black focus:outline-none px-2 py-1 !placeholder-gray-800/60 !text-ink-black font-mono font-bold"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-transparent text-ink-black py-3 font-bold uppercase tracking-widest hover:bg-ink-black/10 transition-colors mt-6 border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
                disabled={isJoining}
              >
                {isJoining ? 'Connecting...' : 'Join Room'}
              </button>
            </form>
          </motion.div>
          
        </div>

        {error && (
          <div className="mt-8 bg-danger text-white px-6 py-3 rounded shadow-glow font-bold">
            {error}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HomePage;
