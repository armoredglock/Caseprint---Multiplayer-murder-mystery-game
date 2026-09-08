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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-lg" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white border-4 border-[#1c2431] shadow-[12px_12px_0_rgba(28,36,49,1)] flex flex-col overflow-hidden max-h-[85vh]"
          >
            {/* Clean Modern Header */}
            <div className="bg-[#1c2431] px-6 py-4 flex justify-between items-center border-b-4 border-[#1c2431] shrink-0">
              <h3 className="text-xl font-mono font-bold text-white uppercase tracking-widest flex items-center gap-3">
                Team Roster
                <span className="text-sm font-mono text-[#1c2431] font-bold px-2 py-0.5 bg-white/90 rounded-full border-2 border-white">
                  {roomState.players?.length} / {roomState.maxPlayers}
                </span>
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl font-bold leading-none">&times;</button>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3 bg-white min-h-[200px] border-b-4 border-[#1c2431]">
              {roomState.players?.map((player) => {
                const isMe = player.name === currentPlayer?.name;
                
                return (
                  <div 
                    key={player.socketId}
                    className={`bg-gray-50 p-3 border-2 ${player.isHost ? 'border-[#1c2431] border-l-8' : 'border-gray-200'} flex items-center gap-3 shadow-[4px_4px_0_rgba(0,0,0,0.1)]`}
                  >
                    <div className="w-10 h-10 bg-white flex items-center justify-center text-xl border-2 border-gray-200 shrink-0">
                      🕵️
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className={`font-bold truncate text-lg font-mono ${player.isOffline ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {player.name} 
                        {isMe && <span className="text-[10px] bg-[#1c2431] text-white px-2 py-1 ml-2 font-bold font-mono tracking-widest uppercase align-middle">YOU</span>}
                        {player.isOffline && <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 ml-2 font-bold font-mono tracking-widest uppercase align-middle">OFFLINE</span>}
                      </p>
                      {player.isHost && <span className={`text-[10px] uppercase font-bold block font-mono tracking-widest ${player.isOffline ? 'text-gray-400' : 'text-[#9a3324]'}`}>Captain</span>}
                    </div>
                    {currentPlayer.isHost && !player.isHost && !isMe && (
                      <button 
                        onClick={() => handleKickPlayer(player.socketId)}
                        className="text-red-600 hover:text-white border-2 border-red-600 hover:bg-red-600 font-bold text-xs uppercase tracking-widest px-2 py-1 transition-all shrink-0 font-mono shadow-[2px_2px_0_#dc2626] hover:shadow-none hover:translate-y-[2px]"
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
            <div className="px-6 py-4 bg-gray-100 flex justify-end shrink-0">
              <button 
                onClick={onClose}
                className="px-8 py-2 font-bold uppercase tracking-widest text-[#1c2431] hover:bg-gray-200 transition-all border-2 border-[#1c2431] font-mono shadow-[4px_4px_0_#1c2431] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1c2431] active:translate-y-[4px] active:shadow-none"
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
