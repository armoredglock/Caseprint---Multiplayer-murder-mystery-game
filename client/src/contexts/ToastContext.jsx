import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none w-full max-w-lg px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } }}
              className={`px-4 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.3)] pointer-events-auto flex items-center justify-between gap-3 border-2 w-full font-typewriter relative ${
                toast.type === 'success' ? 'bg-[#e2edd8] text-ink-black border-[#4a7c59]' :
                toast.type === 'error' ? 'bg-[#f2d8d8] text-[#900] border-[#900]' :
                'bg-paper-cream text-ink-black border-ink-black/40'
              }`}
            >
              <div className="flex-1">
                {toast.type === 'error' && <span className="font-bold text-[#900] mr-2">URGENT:</span>}
                {toast.type === 'info' && <span className="font-bold text-ink-black/70 mr-2">MEMO:</span>}
                <span className="text-sm tracking-wide font-bold">{toast.message}</span>
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-ink-black/40 hover:text-ink-black transition-colors text-xl font-bold px-2"
                title="Dismiss"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
