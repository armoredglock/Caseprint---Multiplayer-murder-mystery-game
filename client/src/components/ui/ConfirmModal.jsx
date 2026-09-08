import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-md bg-white border-4 border-[#1c2431] shadow-[12px_12px_0_rgba(28,36,49,1)] flex flex-col overflow-hidden"
          >
            {/* Clean Modern Header */}
            <div className="bg-[#1c2431] px-6 py-4 border-b-4 border-[#1c2431]">
              <h3 className="text-xl font-mono font-bold text-white uppercase tracking-widest">{title}</h3>
            </div>
            
            {/* Modal Body */}
            <div className="px-6 py-8 bg-white border-b-4 border-[#1c2431]">
              <p className="text-gray-800 font-mono text-lg">{message}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-100 flex justify-end gap-4">
              <button 
                onClick={onCancel}
                className="px-6 py-2 font-bold uppercase tracking-widest text-[#1c2431] hover:bg-gray-200 transition-all font-mono border-2 border-[#1c2431] shadow-[4px_4px_0_#1c2431] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1c2431] active:translate-y-[4px] active:shadow-none"
              >
                {cancelText}
              </button>
              <button 
                onClick={onConfirm}
                className="bg-[#9a3324] text-white px-6 py-2 font-bold uppercase tracking-widest hover:bg-red-800 transition-all font-mono border-2 border-[#1c2431] shadow-[4px_4px_0_#1c2431] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1c2431] active:translate-y-[4px] active:shadow-none"
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
