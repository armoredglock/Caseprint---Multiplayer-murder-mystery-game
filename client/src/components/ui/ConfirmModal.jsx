import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-surface border border-border rounded-lg shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-surface-light px-6 py-4 border-b border-border">
              <h3 className="text-xl font-ui font-bold text-paper-cream">{title}</h3>
            </div>
            <div className="px-6 py-6 text-text-secondary">
              <p>{message}</p>
            </div>
            <div className="px-6 py-4 bg-surface-light border-t border-border flex justify-end gap-3">
              <button 
                onClick={onCancel}
                className="px-4 py-2 rounded text-text-secondary hover:text-paper-cream transition-colors"
              >
                {cancelText}
              </button>
              <button 
                onClick={onConfirm}
                className="px-4 py-2 rounded bg-danger hover:bg-danger/80 text-white transition-colors shadow shadow-danger/20"
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
