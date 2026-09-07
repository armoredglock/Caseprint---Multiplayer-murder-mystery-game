import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';

const Notebook = () => {
  const { roomState } = useGame();
  
  // Use roomCode to separate notes per game
  const storageKey = `caseprint_notes_${roomState?.roomCode || 'unknown'}`;
  
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem(storageKey) || '';
  });

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotes(val);
    localStorage.setItem(storageKey, val);
  };

  return (
    <div className="flex flex-col h-full bg-surface relative overflow-hidden">
      <div className="p-3 border-b border-border bg-surface flex justify-between items-center z-10">
        <h3 className="font-ui font-semibold text-sm uppercase tracking-wider text-text-secondary">Personal Notebook</h3>
      </div>
      
      {/* Lined paper background */}
      <div className="flex-1 relative bg-[#fdfdfd] text-ink-blue">
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e0e0e0 27px, #e0e0e0 28px)',
            backgroundPosition: '0 0px'
          }}
        />
        <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-[#ffaaaa] pointer-events-none z-10" />
        
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Jot down clues, suspect motives, and contradictions here..."
          className="w-full h-full bg-transparent resize-none outline-none p-4 pl-14 font-handwriting text-xl leading-[28px] text-ink-blue relative z-20"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default Notebook;
