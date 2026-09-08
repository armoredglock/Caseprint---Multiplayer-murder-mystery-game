import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { useSocket } from '../../hooks/useSocket';
import { useToast } from '../../contexts/ToastContext';

const PlayersModal = ({ isOpen, onClose }) => {
  const { roomState, currentPlayer } = useGame();
  const { kickPlayer } = useSocket();
  const { addToast } = useToast();

  if (!roomState) return null;

  const handleKickPlayer = async (targetSocketId) => {
    try {
      await kickPlayer(roomState.roomCode, targetSocketId);
      addToast("Player kicked successfully.", "success");
    } catch (err) {
      addToast("Failed to kick player: " + err.message, "error");
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-black/80" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-paper-cream border-2 border-ink-black shadow-[8px_8px_0_rgba(0,0,0,0.8)] max-w-md w-full overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="bg-manila-dark px-6 py-4 border-b-2 border-ink-black flex justify-between items-center shrink-0 relative">
              <h3 className="text-xl font-typewriter font-bold text-ink-black flex items-center gap-2 uppercase tracking-widest relative z-10">
                Team Roster
                <span className="text-sm font-mono text-ink-black/70 font-bold px-2 border border-ink-black/20 rounded">
                  {roomState.players?.length} / {roomState.maxPlayers}
                </span>
              </h3>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none"></div>
              <button onClick={onClose} className="text-ink-black/60 hover:text-ink-black text-2xl font-bold leading-none relative z-10">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 bg-paper-cream relative">
              <div className="absolute inset-2 border-2 border-ink-black/10 border-dashed pointer-events-none" />
              
              {roomState.players?.map((player) => {
                const isMe = player.name === currentPlayer?.name;
                
                return (
                  <div 
                    key={player.socketId}
                    className={`bg-[#fdfdfd] p-3 border-2 ${player.isHost ? 'border-ink-red shadow-[4px_4px_0_rgba(204,0,0,0.2)]' : 'border-ink-black/20 shadow-sm'} flex items-center gap-3 relative z-10 transform ${Math.random() > 0.5 ? 'rotate-1' : '-rotate-1'}`}
                  >
                    <div className="w-10 h-10 bg-paper-cream flex items-center justify-center text-xl border-2 border-ink-black/20 shrink-0 shadow-sm">
                      🕵️
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`font-bold truncate text-base font-handwriting ${player.isOffline ? 'text-ink-black/40 line-through' : 'text-ink-black'}`}>
                        {player.name} 
                        {isMe && <span className="text-[10px] bg-ink-black text-paper-cream px-1.5 py-0.5 ml-2 font-bold font-mono tracking-widest uppercase">YOU</span>}
                        {player.isOffline && <span className="text-[10px] bg-ink-black/10 text-ink-black/50 border border-ink-black/20 px-1.5 py-0.5 ml-2 font-bold font-mono tracking-widest uppercase">OFFLINE</span>}
                      </p>
                      {player.isHost && <span className={`text-[10px] uppercase font-bold block font-mono tracking-widest ${player.isOffline ? 'text-ink-black/40' : 'text-ink-red'}`}>Captain</span>}
                    </div>
                    {currentPlayer.isHost && !player.isHost && !isMe && (
                      <button 
                        onClick={() => handleKickPlayer(player.socketId)}
                        className="text-ink-red hover:text-paper-cream border-2 border-ink-red hover:bg-ink-red font-bold text-xs uppercase tracking-widest px-2 py-1 transition-colors shrink-0 font-mono shadow-[2px_2px_0_rgba(204,0,0,0.3)] active:translate-y-px active:shadow-none"
                        title="Kick Player"
                      >
                        Kick
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="px-6 py-4 bg-paper-cream border-t-2 border-ink-black/20 flex justify-end shrink-0">
              <button 
                onClick={onClose}
                className="px-6 py-2 font-bold uppercase tracking-widest text-ink-black hover:bg-ink-black/5 transition-colors border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
              >
                Close File
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PlayersModal;
