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
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [loadingCases, setLoadingCases] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/cases`);
        const data = await res.json();
        setCases(data);
        if (data.length > 0) {
          setSelectedCaseId(data[0].caseId);
        }
      } catch (err) {
        console.error("Failed to fetch cases", err);
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
    <div className="home-page min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
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
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-typewriter text-paper-cream mb-4 tracking-tighter" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>
            CASEPRINT
          </h1>
          <p className="text-xl md:text-2xl text-accent font-ui tracking-widest uppercase">
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
