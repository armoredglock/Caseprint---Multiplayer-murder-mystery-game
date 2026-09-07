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
    <div className="flex flex-col h-full bg-surface-light border-l border-border">
      <div className="p-3 border-b border-border bg-surface flex justify-between items-center">
        <h3 className="font-ui font-semibold text-sm uppercase tracking-wider text-text-secondary">Precinct Comms</h3>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => {
          const isMe = msg.sender === currentPlayer.name;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-text-secondary mb-1 flex gap-2">
                {!isMe && <span className="font-bold text-accent">{msg.sender} {msg.isHost && '(Capt)'}</span>}
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {isMe && <span className="font-bold text-accent">You</span>}
              </span>
              <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${isMe ? 'bg-accent text-bg rounded-br-none' : 'bg-surface border border-border rounded-bl-none text-text-primary'}`}>
                {msg.message}
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-surface flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share intel..."
          className="flex-1 text-sm py-2 px-3 bg-bg border-border rounded"
        />
        <button type="submit" className="btn btn-primary px-4 py-2" disabled={!input.trim()}>
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
