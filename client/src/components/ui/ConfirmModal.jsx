import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-md bg-white border-2 border-[#1c2431] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Clean Modern Header */}
            <div className="bg-[#1c2431] px-6 py-4 border-b-2 border-[#1c2431]">
              <h3 className="text-xl font-mono font-bold text-white uppercase tracking-widest">{title}</h3>
            </div>
            
            {/* Modal Body */}
            <div className="px-6 py-8 bg-white">
              <p className="text-gray-800 font-mono text-lg">{message}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t-2 border-[#1c2431] flex justify-end gap-3">
              <button 
                onClick={onCancel}
                className="px-4 py-2 font-bold uppercase tracking-widest text-[#1c2431] hover:bg-gray-200 transition-colors font-mono"
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmModal;
