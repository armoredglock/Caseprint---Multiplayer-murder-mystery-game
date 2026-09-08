import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useToast } from '../contexts/ToastContext';
import { socket } from '../socket';
import { useSocket } from '../hooks/useSocket';
import ConfirmModal from '../components/ui/ConfirmModal';

const LobbyPage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { roomState, currentPlayer, isRestoring, clearSession } = useGame();
  const { kickPlayer, leaveRoom, endSession, changePlayerName } = useSocket();
  const { addToast } = useToast();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");
  const [confirmAction, setConfirmAction] = useState(null); // 'end', 'leave'

  const handleSaveName = async () => {
    if (editNameValue.trim() && editNameValue !== currentPlayer.name) {
      try {
        await changePlayerName(roomCode, editNameValue.trim());
      } catch (err) {
        addToast("Failed to change name: " + err.message, "error");
      }
    }
    setIsEditingName(false);
  };

  const handleLeaveOrEnd = () => {
    if (currentPlayer.isHost) {
      setConfirmAction('end');
    } else {
      setConfirmAction('leave');
    }
  };

  const executeConfirmAction = async () => {
    const action = confirmAction;
    setConfirmAction(null);
    if (action === 'end') {
      await endSession(roomCode);
      clearSession();
      navigate('/');
    } else if (action === 'leave') {
      await leaveRoom(roomCode);
      clearSession();
      navigate('/');
    }
  };

  useEffect(() => {
    if (isRestoring) return;
    // If user refreshes or direct navigates without session, send to home
    if (!roomState || !currentPlayer) {
      navigate('/');
      return;
    }
  }, [roomState, currentPlayer, navigate, isRestoring]);

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
      addToast("Failed to kick player: " + err.message, "error");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomCode);
    // Could add a toast notification here
  };

  if (isRestoring) {
    return <div className="min-h-screen bg-bg flex items-center justify-center font-typewriter text-white text-xl">RESTORING CONNECTION...</div>;
  }

  if (!roomState) return null;

  return (
    <div className="lobby-page home-page min-h-[100dvh] overflow-y-auto p-4 md:p-8 relative font-typewriter">
      {/* Background Particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center border-b-2 border-paper-cream/20 pb-6 mb-8 mt-4">
          <div>
            <h1 className="font-typewriter text-5xl md:text-6xl text-paper-cream mb-1" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>Precinct Lobby</h1>
            <p className="text-manila uppercase tracking-widest text-sm font-bold">Assemble your team</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-col items-center bg-paper-cream text-ink-black p-3 md:p-4 border-2 border-ink-black/20 shadow-folder transform rotate-1 md:rotate-2 max-w-xs relative before:content-[''] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:rounded-full before:bg-red-800 before:shadow-[inset_0_3px_5px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.4)]">
            <span className="text-xs text-ink-black/60 uppercase mb-1 font-bold tracking-widest">Case Room Code</span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-3xl font-bold text-ink-blue tracking-widest">{roomCode}</span>
              <button onClick={handleCopyLink} className="bg-transparent border-2 border-ink-black text-ink-black text-xs px-2 py-1 font-bold uppercase tracking-widest hover:bg-ink-black hover:text-paper-cream transition-colors shadow-[2px_2px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                Copy
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Players Roster */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl mb-6 font-ui font-bold text-paper-cream flex justify-between items-end border-b-2 border-paper-cream/20 pb-2">
              Detectives 
              <span className="text-lg text-manila font-mono">
                {roomState.players?.length || 0} / {roomState.maxPlayers || 10}
              </span>
            </h2>
            
            <div className="max-h-[50vh] lg:max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {roomState.players?.map((player, idx) => {
                  const isMe = player.name === currentPlayer?.name;
                  const isEditing = isMe && isEditingName;
                  const rotation = (idx % 2 === 0 ? -1 : 1) * (1 + (idx % 3));
                  
                  return (
                    <motion.div 
                      key={player.socketId}
                      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                      animate={{ opacity: 1, scale: 1, rotate: rotation }}
                      transition={{ delay: idx * 0.1 }}
                      className={`bg-paper-cream text-ink-black p-4 shadow-paper border-2 ${player.isHost ? 'border-ink-red' : 'border-ink-black/20'} flex items-center gap-3 relative transition-transform hover:scale-[1.02] z-10`}
                    >
                      {player.isHost && (
                         <div className="absolute top-1 right-2 text-ink-red font-bold text-[10px] uppercase tracking-widest opacity-80 transform rotate-12">Captain</div>
                      )}
                      {isMe && !player.isHost && (
                         <div className="absolute top-1 right-2 text-ink-blue font-bold text-[10px] uppercase tracking-widest opacity-80 transform rotate-6">You</div>
                      )}
                      
                      <div className="w-12 h-12 bg-white flex items-center justify-center text-2xl border-2 border-ink-black/10 flex-shrink-0 shadow-sm transform -rotate-3">
                        🕵️
                      </div>
                      <div className="flex-1 overflow-hidden ml-1">
                        {isEditing ? (
                          <div className="flex gap-1">
                            <input 
                              autoFocus
                              type="text" 
                              value={editNameValue}
                              onChange={(e) => setEditNameValue(e.target.value)}
                              className="w-full text-xl px-1 py-0.5 bg-transparent border-b-2 border-ink-black focus:outline-none font-handwriting !text-ink-black"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveName();
                                if (e.key === 'Escape') setIsEditingName(false);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-handwriting text-2xl font-bold truncate !text-ink-black" title={player.name}>{player.name}</p>
                            {isMe && (
                              <button onClick={() => { setIsEditingName(true); setEditNameValue(player.name); }} className="text-sm text-ink-black/50 hover:text-ink-black transition-colors" title="Edit Name">✏️</button>
                            )}
                          </div>
                        )}
                      </div>
                      {currentPlayer.isHost && !player.isHost && !isMe && (
                        <button 
                          onClick={() => handleKickPlayer(player.socketId)}
                          className="text-ink-red hover:text-white border border-ink-red hover:bg-ink-red text-xs px-2 py-1 rounded-sm transition-colors uppercase tracking-widest font-bold"
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
                <div key={`empty-${i}`} className="bg-paper-cream/20 p-4 shadow-sm border-2 border-paper-cream/30 border-dashed flex items-center gap-3 opacity-60">
                   <div className="w-12 h-12 bg-transparent flex items-center justify-center border-2 border-paper-cream/30 border-dashed" />
                   <p className="text-paper-cream font-bold font-handwriting text-xl tracking-wide opacity-80">Awaiting Agent...</p>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Mission Briefing / Case Selection */}
          <motion.div 
            className="bg-manila-dark text-ink-black p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-[#967d4a] relative before:content-[''] before:absolute before:top-0 before:left-4 before:w-16 before:h-3 before:bg-[#967d4a] self-start sticky top-8 mt-6 lg:mt-0"
            style={{ clipPath: 'polygon(0 0, 30% 0, 35% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px 4px 4px 4px', paddingTop: '40px' }}
          >
            {/* Distressed Inner Borders */}
            <div className="absolute inset-2 border-2 border-ink-black/15 border-dashed pointer-events-none opacity-70" style={{ clipPath: 'polygon(0 0, 29% 0, 34% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
            <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-50" style={{ clipPath: 'polygon(0 0, 28% 0, 33% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
            
            {/* Paperclip Graphic */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-3 -left-3 text-gray-800/60 transform -rotate-12 drop-shadow-md z-10 pointer-events-none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>

            <h2 className="text-3xl mb-6 border-b-2 border-ink-black/30 pb-2 text-center font-bold font-ui relative z-10">Mission Briefing</h2>
            
            {currentPlayer?.isHost ? (
              <div className="space-y-6 relative z-10">
                <div className="bg-paper-cream p-4 border-2 border-ink-black/20 shadow-sm relative">
                  <div className="absolute top-2 right-2 stamp stamp-red opacity-40 text-sm transform rotate-12">CLASSIFIED</div>
                  <p className="font-mono text-ink-red font-bold mb-2 uppercase tracking-widest text-sm border-b-2 border-ink-black/10 pb-1 inline-block">Top Secret</p>
                  <p className="text-ink-black/80 font-bold leading-relaxed">
                    You have selected Case File <span className="font-mono bg-ink-black/10 px-1 text-ink-black">#{roomState.caseId}</span>. Wait for your team to assemble before opening the file.
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  <button 
                    onClick={handleStartGame}
                    disabled={roomState.players?.length < 2}
                    className="w-full bg-ink-black text-paper-cream py-3 font-bold uppercase tracking-widest hover:bg-ink-black/80 transition-colors border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Open the Case File
                  </button>
                  {roomState.players?.length < 2 && (
                    <p className="text-ink-red text-sm text-center font-bold uppercase tracking-widest">Requires at least 2 detectives</p>
                  )}
                  <button 
                    onClick={handleLeaveOrEnd}
                    className="w-full bg-transparent text-ink-red py-3 font-bold uppercase tracking-widest hover:bg-ink-red/10 transition-colors border-2 border-ink-red shadow-[4px_4px_0_rgba(204,0,0,0.3)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(204,0,0,0.3)] mt-4"
                  >
                    End Session
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center py-8 relative z-10">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-ink-black/20 border-t-ink-black animate-spin mb-6" />
                <p className="text-2xl font-bold font-handwriting !text-ink-black tracking-wide">Awaiting Captain's Orders...</p>
                <p className="text-ink-black/70 font-bold mb-8">The host is reviewing the case file.</p>
                
                <div className="pt-6 border-t-2 border-ink-black/20">
                  <button 
                    onClick={handleLeaveOrEnd}
                    className="w-full bg-transparent text-ink-red py-3 font-bold uppercase tracking-widest hover:bg-ink-red/10 transition-colors border-2 border-ink-red shadow-[4px_4px_0_rgba(204,0,0,0.3)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(204,0,0,0.3)]"
                  >
                    Leave Room
                  </button>
                </div>
              </div>
            )}
          </motion.div>
          
        </div>
      </div>

      <ConfirmModal 
        isOpen={confirmAction !== null}
        title={confirmAction === 'end' ? 'End Session' : 'Leave Room'}
        message={
          confirmAction === 'end' ? 'Are you sure you want to end this session for everyone?' :
          'Are you sure you want to leave the room?'
        }
        confirmText={confirmAction === 'end' ? 'End Session' : 'Leave Room'}
        onConfirm={executeConfirmAction}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
};

export default LobbyPage;
