import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-black/80">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-paper-cream border-2 border-ink-black shadow-[8px_8px_0_rgba(0,0,0,0.8)] max-w-md w-full overflow-hidden relative"
          >
            {/* Top decorative tape/border could go here if wanted */}
            <div className="bg-manila-dark px-6 py-4 border-b-2 border-ink-black flex justify-between items-center relative">
              <h3 className="text-xl font-typewriter font-bold text-ink-black uppercase tracking-widest relative z-10">{title}</h3>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none"></div>
            </div>
            <div className="px-6 py-8 text-ink-black font-bold font-mono text-lg bg-[#fdfdfd] relative">
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[#ffaaaa] pointer-events-none z-10 opacity-50" />
              <p className="pl-6 relative z-20">{message}</p>
            </div>
            <div className="px-6 py-4 bg-paper-cream border-t-2 border-ink-black/20 flex justify-end gap-3 relative z-20">
              <button 
                onClick={onCancel}
                className="px-4 py-2 font-bold uppercase tracking-widest text-ink-black/60 hover:text-ink-black transition-colors"
              >
                {cancelText}
              </button>
              <button 
                onClick={onConfirm}
                className="bg-ink-red text-paper-cream px-6 py-2 font-bold uppercase tracking-widest border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] hover:bg-ink-red/80 active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)] transition-all"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmModal;
