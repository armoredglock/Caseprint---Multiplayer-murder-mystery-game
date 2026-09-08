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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-border rounded-lg shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="bg-surface-light px-6 py-4 border-b border-border flex justify-between items-center shrink-0">
              <h3 className="text-xl font-ui font-bold text-paper-cream flex items-center gap-2">
                Team Roster
                <span className="text-sm font-mono text-text-secondary font-normal px-2 bg-surface rounded">
                  {roomState.players?.length} / {roomState.maxPlayers}
                </span>
              </h3>
              <button onClick={onClose} className="text-text-secondary hover:text-white text-xl leading-none">&times;</button>
            </div>
            
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
              {roomState.players?.map((player) => {
                const isMe = player.name === currentPlayer?.name;
                
                return (
                  <div 
                    key={player.socketId}
                    className={`bg-bg p-3 rounded border ${player.isHost ? 'border-accent shadow-glow' : 'border-border'} flex items-center gap-3`}
                  >
                    <div className="w-10 h-10 rounded bg-surface-light flex items-center justify-center text-xl border border-border shrink-0">
                      🕵️
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`font-bold truncate text-sm ${player.isOffline ? 'text-text-secondary line-through' : ''}`}>
                        {player.name} 
                        {isMe && <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white ml-2 font-normal">YOU</span>}
                        {player.isOffline && <span className="text-[10px] bg-danger/20 text-danger border border-danger/50 px-1.5 py-0.5 rounded ml-2 font-normal">OFFLINE</span>}
                      </p>
                      {player.isHost && <span className={`text-[10px] uppercase font-bold block mt-0.5 ${player.isOffline ? 'text-text-secondary' : 'text-accent'}`}>Captain</span>}
                    </div>
                    {currentPlayer.isHost && !player.isHost && !isMe && (
                      <button 
                        onClick={() => handleKickPlayer(player.socketId)}
                        className="text-danger hover:text-white border border-danger hover:bg-danger text-xs px-2 py-1 rounded transition-colors shrink-0"
                        title="Kick Player"
                      >
                        Kick
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="px-6 py-4 bg-surface-light border-t border-border flex justify-end shrink-0">
              <button 
                onClick={onClose}
                className="btn btn-outline px-4 py-2 text-sm"
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
