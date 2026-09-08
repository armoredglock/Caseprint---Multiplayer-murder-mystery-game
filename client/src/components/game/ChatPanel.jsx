import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';
import { motion } from 'framer-motion';

const ChatPanel = ({ roomCode, currentPlayer }) => {
  const { messages, sendMessage } = useGame();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="p-3 border-b-2 border-ink-black/20 bg-transparent flex justify-between items-center">
        <h3 className="font-typewriter font-bold text-sm uppercase tracking-widest text-ink-black/70">Precinct Comms</h3>
        <span className="w-2 h-2 rounded-full bg-ink-red animate-pulse shadow-glow" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => {
          const isSystem = msg.sender === 'SYSTEM';
          const isMe = !isSystem && msg.sender === currentPlayer.name;
          
          if (isSystem) {
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={idx} 
                className="flex justify-center my-4 relative"
              >
                <div className="bg-[#f4f1ea] shadow-[2px_5px_15px_rgba(0,0,0,0.4)] border border-ink-black/20 text-ink-black px-6 py-3 text-sm text-center font-bold tracking-widest uppercase font-typewriter transform rotate-[1deg] relative max-w-[90%] before:content-[''] before:absolute before:inset-0 before:bg-[url('/textures/paper-cream.png')] before:opacity-50 before:mix-blend-multiply before:pointer-events-none">
                  {/* Realistic Push Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-red-600 shadow-[1px_4px_6px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.4)] before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:w-1.5 before:h-1.5 before:bg-white/60 before:rounded-full">
                    {/* Pin Metal Needle Shadow */}
                    <div className="absolute -bottom-3 left-1 w-1 h-3 bg-black/30 rounded-full blur-[1px] -z-10 transform -rotate-[20deg]" />
                  </div>
                  <span className="relative z-10 block">{msg.message}</span>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                {!isMe && (
                  <span className="text-sm font-bold text-paper-cream/90 font-mono tracking-widest">
                    {msg.sender} {msg.isHost ? '(Capt)' : ''}
                  </span>
                )}
                <span className="text-xs text-white/50 font-bold font-mono tracking-widest">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {isMe && <span className="text-sm font-bold text-ink-red font-mono tracking-widest">You</span>}
              </div>
              <div className={`px-4 py-2 shadow-sm font-mono text-lg font-bold max-w-[85%] border-2 ${isMe ? 'bg-[#d6b87e] text-ink-black rounded-tl-xl rounded-tr-xl rounded-bl-xl border-ink-black' : 'bg-paper-cream border-ink-black rounded-tl-xl rounded-tr-xl rounded-br-xl text-ink-black'}`}>
                {msg.message}
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t-2 border-ink-black/20 bg-transparent flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share intel..."
          className="flex-1 text-lg py-2 px-3 !bg-paper-cream !border-2 !border-ink-black focus:!border-ink-black focus:!outline-none font-mono !text-ink-black font-bold !placeholder-ink-black/50 transition-colors shadow-inner"
        />
        <button type="submit" className="bg-ink-black text-paper-cream px-6 py-2 font-bold uppercase tracking-widest border-2 border-ink-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ink-black/80 transition-colors" disabled={!input.trim()}>
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
