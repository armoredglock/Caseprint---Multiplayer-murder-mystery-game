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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-manila-dark text-ink-black p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-[#967d4a] w-full max-w-md relative flex flex-col max-h-[85vh] before:content-[''] before:absolute before:top-0 before:left-4 before:w-12 before:h-2 before:bg-[#967d4a]"
            style={{ clipPath: 'polygon(0 0, 30% 0, 33% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px 4px 4px 4px', paddingTop: '32px' }}
          >
            {/* Distressed Inner Borders */}
            <div className="absolute inset-2 border-2 border-ink-black/15 border-dashed pointer-events-none opacity-70" style={{ clipPath: 'polygon(0 0, 30% 0, 32% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
            <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-50" style={{ clipPath: 'polygon(0 0, 29% 0, 31% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
            
            {/* Paperclip Graphic */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-3 -left-3 text-gray-800/60 transform -rotate-12 drop-shadow-md z-10 pointer-events-none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>

            {/* Clean Modern Header */}
            <div className="flex justify-between items-center mb-4 border-b-2 border-ink-black/30 pb-2 shrink-0 relative z-10">
              <h3 className="text-2xl font-bold font-ui text-ink-black uppercase flex items-center gap-3">
                Team Roster
                <span className="text-sm font-mono text-ink-black font-bold px-2 py-0.5 bg-ink-black/10 rounded">
                  {roomState.players?.length} / {roomState.maxPlayers}
                </span>
              </h3>
              <button onClick={onClose} className="text-ink-black/50 hover:text-ink-black transition-colors text-3xl font-bold leading-none">&times;</button>
            </div>
            
            {/* Modal Body */}
            <div className="overflow-y-auto custom-scrollbar flex-1 space-y-3 min-h-[200px] relative z-10 pr-2">
              {roomState.players?.map((player) => {
                const isMe = player.name === currentPlayer?.name;
                
                return (
                  <div 
                    key={player.socketId}
                    className={`bg-white/50 p-3 border-2 ${player.isHost ? 'border-ink-black' : 'border-ink-black/20'} flex items-center gap-3`}
                  >
                    <div className="w-10 h-10 bg-white flex items-center justify-center text-xl border-2 border-ink-black/20 shrink-0">
                      🕵️
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`font-bold truncate text-lg font-mono ${player.isOffline ? 'text-ink-black/40 line-through' : 'text-ink-black'}`}>
                        {player.name} 
                        {isMe && <span className="text-[10px] bg-ink-black text-paper-cream px-1.5 py-0.5 ml-2 font-bold font-mono tracking-widest uppercase align-middle">YOU</span>}
                        {player.isOffline && <span className="text-[10px] bg-ink-black/20 text-ink-black px-1.5 py-0.5 ml-2 font-bold font-mono tracking-widest uppercase align-middle">OFFLINE</span>}
                      </p>
                      {player.isHost && <span className={`text-[10px] uppercase font-bold block font-mono tracking-widest ${player.isOffline ? 'text-ink-black/40' : 'text-ink-black'}`}>Captain</span>}
                    </div>
                    {currentPlayer.isHost && !player.isHost && !isMe && (
                      <button 
                        onClick={() => handleKickPlayer(player.socketId)}
                        className="text-ink-red hover:text-white border-2 border-ink-red hover:bg-ink-red font-bold text-xs uppercase tracking-widest px-2 py-1 transition-colors shrink-0 font-mono shadow-[2px_2px_0_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-[1px_1px_0_rgba(0,0,0,0.5)]"
                        title="Kick Player"
                      >
                        Kick
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex justify-end shrink-0 relative z-10">
              <button 
                onClick={onClose}
                className="bg-ink-black text-paper-cream px-6 py-2 font-bold uppercase tracking-widest hover:bg-ink-black/80 transition-colors border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)] font-mono"
              >
                Close
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
