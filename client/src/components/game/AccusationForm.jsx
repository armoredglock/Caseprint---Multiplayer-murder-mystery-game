import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { motion } from 'framer-motion';

const AccusationForm = () => {
  const { caseData, submitAccusation, currentPlayer, roomState } = useGame();
  
  const [suspect, setSuspect] = useState('');
  const [method, setMethod] = useState('');
  const [motive, setMotive] = useState('');
  const [submitted, setSubmitted] = useState(currentPlayer?.hasAccused || false);

  // Sync state if it updates externally
  React.useEffect(() => {
    if (roomState?.players) {
      const me = roomState.players.find(p => p.socketId === currentPlayer?.socketId);
      if (me && me.hasAccused) {
        setSubmitted(true);
      }
    }
  }, [roomState, currentPlayer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!suspect || !method.trim() || !motive.trim()) return;

    submitAccusation({ suspect, method, motive });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-surface-light border border-border rounded-lg shadow-inner">
        <div className="w-16 h-16 rounded-full bg-surface border-2 border-accent flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-ui font-bold mb-2">Accusation Filed</h3>
        <p className="text-text-secondary">Your theory has been submitted to the Captain. Awaiting other detectives...</p>
        <div className="mt-8 flex justify-center gap-2">
           {roomState?.players?.map(p => (
             <div key={p.socketId} className={`w-3 h-3 rounded-full ${p.hasAccused ? 'bg-accent' : 'bg-surface border border-border'}`} title={p.name} />
           ))}
        </div>
        <p className="text-xs text-text-secondary mt-2">Waiting for {roomState?.players?.filter(p => !p.hasAccused).length} more...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-surface-light border border-border rounded-lg shadow-lg relative overflow-hidden"
    >
      {/* Official form styling */}
      <div className="absolute top-0 left-0 w-full h-2 bg-danger" />
      <div className="absolute top-8 right-8 stamp stamp-red opacity-20">OFFICIAL USE ONLY</div>
      
      <div className="mb-6 border-b border-border pb-4">
        <h2 className="font-typewriter text-3xl text-paper-cream">FINAL ACCUSATION FORM</h2>
        <p className="text-sm font-mono text-text-secondary mt-1">INCIDENT NO: {caseData?.overview?.incidentNumber || 'UNKNOWN'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase mb-2">1. The Suspect (Who)</label>
          <select 
            value={suspect} 
            onChange={(e) => setSuspect(e.target.value)}
            className="w-full bg-bg border-border text-paper-cream p-3 font-mono text-lg"
            required
          >
            <option value="" disabled>Select the killer...</option>
            {caseData?.suspects?.map(s => (
              <option key={s.id} value={s.name}>{s.name} - {s.occupation}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase mb-2">2. The Method (How)</label>
          <textarea 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            placeholder="Explain how the crime was committed based on the evidence..."
            className="w-full bg-bg border-border text-paper-cream p-3 h-24 font-ui resize-none"
            required
            maxLength={300}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase mb-2">3. The Motive (Why)</label>
          <textarea 
            value={motive} 
            onChange={(e) => setMotive(e.target.value)}
            placeholder="Explain the suspect's reason for committing the crime..."
            className="w-full bg-bg border-border text-paper-cream p-3 h-24 font-ui resize-none"
            required
            maxLength={300}
          />
        </div>

        <div className="pt-4 flex justify-between items-center border-t border-border">
          <div className="text-xs text-text-secondary font-mono">
            AUTHORIZING AGENT: <span className="text-accent">{currentPlayer?.name}</span>
          </div>
          <button type="submit" className="btn btn-danger font-bold tracking-widest px-8 shadow-md">
            SUBMIT VERDICT
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AccusationForm;
