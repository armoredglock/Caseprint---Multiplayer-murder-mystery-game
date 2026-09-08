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
            className="bg-white border-4 border-[#1c2431] max-w-md w-full flex flex-col max-h-[80vh] relative shadow-xl"
          >
            <div className="bg-[#1c2431] px-6 py-4 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                Team Roster
                <span className="text-sm font-mono text-gray-300 font-normal px-2 border border-gray-600 rounded">
                  {roomState.players?.length} / {roomState.maxPlayers}
                </span>
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-3 bg-white">
              {roomState.players?.map((player) => {
                const isMe = player.name === currentPlayer?.name;
                
                return (
                  <div 
                    key={player.socketId}
                    className={`bg-gray-50 p-3 border ${player.isHost ? 'border-[#1c2431] border-l-4' : 'border-gray-200'} flex items-center gap-3`}
                  >
                    <div className="w-10 h-10 bg-white flex items-center justify-center text-xl border border-gray-200 shrink-0">
                      🕵️
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`font-bold truncate text-base font-mono ${player.isOffline ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {player.name} 
                        {isMe && <span className="text-[10px] bg-gray-900 text-white px-1.5 py-0.5 ml-2 font-bold font-mono tracking-widest uppercase">YOU</span>}
                        {player.isOffline && <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 ml-2 font-bold font-mono tracking-widest uppercase">OFFLINE</span>}
                      </p>
                      {player.isHost && <span className={`text-[10px] uppercase font-bold block font-mono tracking-widest ${player.isOffline ? 'text-gray-400' : 'text-[#1c2431]'}`}>Captain</span>}
                    </div>
                    {currentPlayer.isHost && !player.isHost && !isMe && (
                      <button 
                        onClick={() => handleKickPlayer(player.socketId)}
                        className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 font-bold text-xs uppercase tracking-widest px-2 py-1 transition-colors shrink-0 font-mono"
                        title="Kick Player"
                      >
                        Kick
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
              <button 
                onClick={onClose}
                className="px-6 py-2 font-bold uppercase tracking-widest text-[#1c2431] hover:bg-gray-200 transition-colors border-2 border-[#1c2431] font-mono"
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
