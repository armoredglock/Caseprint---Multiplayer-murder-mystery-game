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
            className="max-w-md w-full flex flex-col items-start drop-shadow-2xl"
          >
            {/* Folder Tab */}
            <div className="bg-[#d6b87e] border-2 border-b-0 border-[#1c2431] px-6 py-2 rounded-t-[8px] shadow-[inset_0_4px_0_#9a3324] relative z-10 translate-y-[2px] ml-2">
              <h3 className="text-xl font-typewriter font-bold text-[#1c2431] uppercase tracking-widest">{title}</h3>
            </div>
            
            {/* Folder Body */}
            <div className="bg-[#d6b87e] border-2 border-[#1c2431] w-full p-2 relative z-20">
              {/* Paper Document */}
              <div className="bg-white border-2 border-[#1c2431]">
                <div className="px-6 py-8 text-gray-800 font-mono text-lg bg-white">
                  <p>{message}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t-2 border-[#1c2431] flex justify-end gap-3">
                  <button 
                    onClick={onCancel}
                    className="px-4 py-2 font-bold uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors font-mono"
                  >
                    {cancelText}
                  </button>
                  <button 
                    onClick={onConfirm}
                    className="bg-[#9a3324] text-white px-6 py-2 font-bold uppercase tracking-widest hover:bg-red-800 transition-colors font-mono border-2 border-[#1c2431]"
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmModal;
