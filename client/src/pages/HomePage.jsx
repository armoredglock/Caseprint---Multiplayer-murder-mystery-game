import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';
import { useGame } from '../contexts/GameContext';

const BackgroundProps = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.85]">
    {/* Blood Splatter */}
    <div className="absolute top-[10%] right-[5%] md:right-[15%] opacity-80 mix-blend-multiply scale-150 -rotate-12">
      <svg width="250" height="250" viewBox="0 0 100 100" fill="#7a0a0a">
        <path d="M50 15 C 65 25, 75 45, 60 70 C 45 95, 20 80, 25 55 C 30 30, 35 20, 50 15 Z" />
        <path d="M70 20 C 75 25, 80 30, 75 35 C 70 30, 65 25, 70 20 Z" />
        <circle cx="15" cy="45" r="5" />
        <circle cx="85" cy="65" r="6" />
        <circle cx="35" cy="85" r="4" />
        <circle cx="95" cy="45" r="7" />
        <circle cx="10" cy="65" r="3" />
      </svg>
    </div>

    {/* Detective Hat */}
    <div className="absolute bottom-[5%] md:bottom-[15%] left-[2%] md:left-[10%] opacity-60 -rotate-12 scale-110 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
      <svg width="300" height="200" viewBox="0 0 100 100">
        {/* Brim shadow */}
        <ellipse cx="50" cy="72" rx="46" ry="16" fill="#0a0a0a" />
        {/* Brim */}
        <ellipse cx="50" cy="70" rx="45" ry="15" fill="#1f1f1f" />
        {/* Crown base */}
        <path d="M25 65 C 25 30, 35 15, 50 15 C 65 15, 75 30, 75 65 Z" fill="#242424" />
        {/* Crown indent */}
        <path d="M35 15 C 45 25, 55 25, 65 15 C 60 10, 40 10, 35 15 Z" fill="#151515" />
        {/* Band */}
        <path d="M25 60 C 35 65, 65 65, 75 60 L 73 50 C 60 55, 40 55, 27 50 Z" fill="#080808" />
      </svg>
    </div>

    {/* Dagger */}
    <div className="absolute top-[20%] md:top-[25%] left-[5%] md:left-[25%] opacity-70 rotate-[135deg] scale-125 filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.9)]">
      <svg width="180" height="180" viewBox="0 0 100 100">
        {/* Blade */}
        <path d="M45 10 L55 10 L50 60 Z" fill="#777" />
        <path d="M45 10 L50 10 L50 60 Z" fill="#a3a3a3" />
        {/* Blood on blade */}
        <path d="M50 10 L55 10 L52 35 C 50 30, 48 35, 50 45 Z" fill="#7a0a0a" opacity="0.8" mixBlendMode="multiply" />
        {/* Guard */}
        <rect x="32" y="58" width="36" height="6" fill="#222" rx="2" />
        <rect x="35" y="60" width="30" height="2" fill="#555" />
        {/* Handle */}
        <rect x="42" y="64" width="16" height="26" fill="#382110" rx="2" />
        <line x1="42" y1="70" x2="58" y2="70" stroke="#111" strokeWidth="1" />
        <line x1="42" y1="76" x2="58" y2="76" stroke="#111" strokeWidth="1" />
        <line x1="42" y1="82" x2="58" y2="82" stroke="#111" strokeWidth="1" />
        {/* Pommel */}
        <circle cx="50" cy="92" r="7" fill="#222" />
        <circle cx="50" cy="92" r="4" fill="#555" />
      </svg>
    </div>

    {/* Detective Gloves */}
    <div className="absolute bottom-[2%] md:bottom-[20%] right-[2%] md:right-[20%] opacity-60 rotate-45 scale-[1.15] filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.8)]">
       <svg width="220" height="220" viewBox="0 0 100 100" fill="#291d12">
         {/* Glove 1 */}
         <path d="M25 85 L65 85 L70 50 C 70 30, 60 20, 60 20 C 60 20, 60 10, 55 10 C 50 10, 50 20, 50 20 L 45 10 L 40 10 L 40 25 L 35 15 L 30 15 L 30 30 L 20 25 L 15 30 C 15 30, 20 50, 25 50 Z" />
         <rect x="25" y="80" width="40" height="8" fill="#1a110a" />
         {/* Glove 2 (Underneath slightly offset) */}
         <path d="M40 95 L80 95 L85 60 C 85 40, 75 30, 75 30 C 75 30, 75 20, 70 20 C 65 20, 65 30, 65 30 L 60 20 L 55 20 L 55 35 L 50 25 L 45 25 L 45 40 L 35 35 L 30 40 C 30 40, 35 60, 40 60 Z" fill="#1f150d" />
       </svg>
    </div>
  </div>
);

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
      <BackgroundProps />

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
            className="bg-surface-light p-6 md:p-8 rounded-lg shadow-lg border border-border w-full md:w-1/2"
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
          >
            <h2 className="text-2xl mb-6 border-b border-border pb-2 text-center">Start an Investigation</h2>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Detective Name</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Poirot"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={20}
                    className="flex-1"
                  />
                  <button type="button" onClick={() => setPlayerName(getRandomName())} className="btn btn-outline px-3" title="Randomize Name">
                    🎲
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1 uppercase tracking-wide">Select Case</label>
                {loadingCases ? (
                  <div className="animate-pulse h-10 bg-surface rounded"></div>
                ) : (
                  <select 
                    value={selectedCaseId} 
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    className="w-full bg-surface border-accent"
                  >
                    {cases.map(c => (
                      <option key={c.caseId} value={c.caseId}>
                        {c.title} [{c.difficulty}]
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Room Password (Optional)</label>
                <input 
                  type="password" 
                  placeholder="Leave blank for public"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={20}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isCreating}
              >
                {isCreating ? 'Opening File...' : 'Create Room'}
              </button>
            </form>
          </motion.div>

          {/* Join Room Card */}
          <motion.div 
            className="bg-surface-light p-6 md:p-8 rounded-lg shadow-lg border border-border w-full md:w-1/2"
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
          >
            <h2 className="text-2xl mb-6 border-b border-border pb-2 text-center">Join the Force</h2>
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Detective Name</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Marple"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    maxLength={20}
                    className="flex-1"
                  />
                  <button type="button" onClick={() => setPlayerName(getRandomName())} className="btn btn-outline px-3" title="Randomize Name">
                    🎲
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Room Code</label>
                <input 
                  type="text" 
                  placeholder="6-Letter Code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="uppercase text-center text-xl tracking-widest"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Room Password (If applicable)</label>
                <input 
                  type="password" 
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={20}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-outline w-full"
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
