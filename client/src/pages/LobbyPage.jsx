import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { socket } from '../socket';
import { useSocket } from '../hooks/useSocket';

const LobbyPage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { roomState, currentPlayer, clearSession } = useGame();
  const { kickPlayer, leaveRoom, endSession, changePlayerName } = useSocket();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");

  const handleSaveName = async () => {
    if (editNameValue.trim() && editNameValue !== currentPlayer.name) {
      try {
        await changePlayerName(roomCode, editNameValue.trim());
      } catch (err) {
        alert("Failed to change name: " + err.message);
      }
    }
    setIsEditingName(false);
  };

  const handleLeaveOrEnd = async () => {
    if (currentPlayer.isHost) {
      if (window.confirm("Are you sure you want to end this session for everyone?")) {
        await endSession(roomCode);
        clearSession();
        navigate('/');
      }
    } else {
      await leaveRoom(roomCode);
      clearSession();
      navigate('/');
    }
  };

  useEffect(() => {
    // If user refreshes or direct navigates without session, send to home
    if (!roomState || !currentPlayer) {
      navigate('/');
      return;
    }
  }, [roomState, currentPlayer, navigate]);

  // Handle game start redirect
  useEffect(() => {
    if (roomState && roomState.status === 'IN_GAME') {
      navigate(`/game/${roomCode}`);
    }
  }, [roomState, navigate, roomCode]);

  const handleStartGame = () => {
    socket.emit('game:start', { roomCode, caseId: roomState.caseId });
  };

  const handleKickPlayer = async (targetSocketId) => {
    try {
      await kickPlayer(roomCode, targetSocketId);
    } catch (err) {
      alert("Failed to kick player: " + err.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomCode);
    // Could add a toast notification here
  };

  if (!roomState) return null;

  return (
    <div className="lobby-page min-h-screen bg-bg p-4 md:p-8 relative">
      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-border pb-6 mb-8">
          <div>
            <h1 className="font-typewriter text-4xl text-paper-cream">Precinct Lobby</h1>
            <p className="text-text-secondary uppercase tracking-widest text-sm">Assemble your team</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-center bg-surface-light p-4 rounded border border-border shadow-md">
            <span className="text-xs text-text-secondary uppercase mb-1">Room Code</span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-3xl font-bold text-accent tracking-widest">{roomCode}</span>
              <button onClick={handleCopyLink} className="btn btn-outline text-xs px-2 py-1">
                Copy Code
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Players Roster */}
          <div className="col-span-2">
            <h2 className="text-2xl mb-4 font-ui font-semibold flex justify-between items-end">
              Detectives 
              <span className="text-sm text-text-secondary font-mono">
                {roomState.players?.length || 0} / {roomState.maxPlayers || 10}
              </span>
            </h2>
            
            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roomState.players?.map((player, idx) => {
                  const isMe = player.socketId === currentPlayer.socketId;
                  const isEditing = isMe && isEditingName;
                  
                  return (
                    <motion.div 
                      key={player.socketId}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`bg-surface p-4 rounded border ${player.isHost ? 'border-accent shadow-glow' : 'border-border'} flex items-center gap-3`}
                    >
                      <div className="w-10 h-10 rounded bg-surface-light flex items-center justify-center text-xl border border-border flex-shrink-0">
                        🕵️
                      </div>
                      <div className="flex-1 overflow-hidden">
                        {isEditing ? (
                          <div className="flex gap-1">
                            <input 
                              autoFocus
                              type="text" 
                              value={editNameValue}
                              onChange={(e) => setEditNameValue(e.target.value)}
                              className="w-full text-sm px-1 py-0.5 bg-bg border-accent"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveName();
                                if (e.key === 'Escape') setIsEditingName(false);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-bold truncate" title={player.name}>{player.name}</p>
                            {isMe && (
                              <button onClick={() => { setIsEditingName(true); setEditNameValue(player.name); }} className="text-xs text-text-secondary hover:text-white" title="Edit Name">✏️</button>
                            )}
                          </div>
                        )}
                        {player.isHost && <span className="text-[10px] text-accent uppercase font-bold block mt-0.5">Captain</span>}
                      </div>
                      {currentPlayer.isHost && !player.isHost && !isMe && (
                        <button 
                          onClick={() => handleKickPlayer(player.socketId)}
                          className="text-danger hover:text-white border border-danger hover:bg-danger text-xs px-2 py-1 rounded transition-colors"
                          title="Kick Player"
                        >
                          Kick
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              
              {/* Empty Slots */}
              {Array.from({ length: Math.max(0, (roomState.maxPlayers || 10) - (roomState.players?.length || 0)) }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-surface/50 p-4 rounded border border-border border-dashed flex items-center gap-3 opacity-50">
                   <div className="w-10 h-10 rounded bg-bg flex items-center justify-center border border-border border-dashed" />
                   <p className="text-text-secondary text-sm">Awaiting Agent...</p>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Mission Briefing / Case Selection */}
          <div className="bg-surface-light p-6 rounded-lg border border-border shadow-lg self-start sticky top-8">
            <h2 className="text-2xl mb-6 border-b border-border pb-2 font-ui font-semibold">Mission Briefing</h2>
            
            {currentPlayer?.isHost ? (
              <div className="space-y-6">
                <div className="bg-surface p-4 rounded text-sm border-l-2 border-accent">
                  <p className="font-mono text-accent mb-2">CLASSIFIED</p>
                  <p className="text-text-secondary">
                    You have selected Case File #{roomState.caseId}. Wait for your team to assemble before opening the file.
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <button 
                    onClick={handleStartGame}
                    disabled={roomState.players?.length < 2}
                    className="btn btn-primary w-full text-lg py-3"
                  >
                    Open the Case File
                  </button>
                  {roomState.players?.length < 2 && (
                    <p className="text-danger text-xs text-center font-mono">Requires at least 2 detectives</p>
                  )}
                  <button 
                    onClick={handleLeaveOrEnd}
                    className="btn btn-outline w-full py-2 border-danger text-danger hover:bg-danger hover:text-white"
                  >
                    End Session
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-t-accent animate-spin mb-4" />
                <p className="text-lg">Awaiting Captain's Orders...</p>
                <p className="text-text-secondary text-sm mb-6">The host is selecting the case file.</p>
                
                <div className="pt-4 border-t border-border">
                  <button 
                    onClick={handleLeaveOrEnd}
                    className="btn btn-outline w-full py-2 border-danger text-danger hover:bg-danger hover:text-white"
                  >
                    Leave Room
                  </button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
