import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RealisticPaperclip from './RealisticPaperclip';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-manila-dark text-ink-black p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-[#967d4a] w-full max-w-md relative before:content-[''] before:absolute before:top-0 before:left-4 before:w-12 before:h-2 before:bg-[#967d4a]"
            style={{ clipPath: 'polygon(0 0, 30% 0, 33% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px 4px 4px 4px', paddingTop: '32px' }}
          >
            {/* Distressed Inner Borders */}
            <div className="absolute inset-2 border-2 border-ink-black/15 border-dashed pointer-events-none opacity-70" style={{ clipPath: 'polygon(0 0, 30% 0, 32% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
            <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-50" style={{ clipPath: 'polygon(0 0, 29% 0, 31% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
            
            {/* Realistic Metal Paperclip */}
            <RealisticPaperclip className="-top-4 left-4" angle={-10} size={68} variant="brass" />

            {/* Clean Modern Header */}
            <h2 className="text-2xl mb-6 border-b-2 border-ink-black/30 pb-2 text-center font-bold font-ui relative z-10">{title}</h2>
            
            {/* Modal Body */}
            <div className="px-2 py-4 relative z-10">
              <p className="text-ink-black/90 font-typewriter text-lg font-bold text-center">{message}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3 relative z-10">
              <button 
                onClick={onCancel}
                className="px-4 py-2 font-bold uppercase tracking-widest text-ink-black hover:bg-ink-black/10 transition-colors font-typewriter"
              >
                {cancelText}
              </button>
              <button 
                onClick={onConfirm}
                className="bg-ink-black text-paper-cream px-6 py-2 font-bold uppercase tracking-widest hover:bg-ink-black/80 transition-colors font-typewriter border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
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
