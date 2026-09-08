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
            className="bg-white border-4 border-[#1c2431] max-w-md w-full relative shadow-xl"
          >
            <div className="bg-[#1c2431] px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-mono font-bold text-white uppercase tracking-widest">{title}</h3>
            </div>
            <div className="px-6 py-8 text-gray-800 font-mono text-lg bg-white">
              <p>{message}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={onCancel}
                className="px-4 py-2 font-bold uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors font-mono"
              >
                {cancelText}
              </button>
              <button 
                onClick={onConfirm}
                className="bg-[#1c2431] text-white px-6 py-2 font-bold uppercase tracking-widest hover:bg-[#2a364a] transition-colors font-mono"
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
