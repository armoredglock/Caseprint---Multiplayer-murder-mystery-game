import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';

const VerdictPage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { roomState, gameResult, currentPlayer, clearSession } = useGame();
  
  const [revealStep, setRevealStep] = useState(0); 
  // 0: Loading, 1: Accusations, 2: The Truth, 3: Scoreboard

  useEffect(() => {
    if (!roomState || !gameResult) {
      navigate('/');
      return;
    }

    // Sequence the dramatic reveal (sped up)
    const timers = [];
    timers.push(setTimeout(() => setRevealStep(1), 1000)); // Show accusations after 1s
    timers.push(setTimeout(() => setRevealStep(2), 3000)); // Show truth after 3s
    timers.push(setTimeout(() => setRevealStep(3), 5000)); // Show scoreboard after 5s

    return () => timers.forEach(t => clearTimeout(t));
  }, [roomState, gameResult, navigate]);

  const handlePlayAgain = () => {
    clearSession();
    navigate('/');
  };

  if (!gameResult) return null;

  return (
    <div className="min-h-screen bg-bg text-paper-cream overflow-y-auto relative p-4 md:p-8">
      {/* Blood Splatter Background Overlay for Reveal */}
      {revealStep >= 2 && (
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/textures/blood-splatter.png')] bg-cover bg-center z-0"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <div className="container mx-auto max-w-4xl relative z-10 space-y-12 pb-20">
        
        {/* Title Sequence */}
        <div className="text-center mt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-typewriter text-danger mb-4"
          >
            CASE CLOSED
          </motion.h1>
          <p className="text-xl font-mono text-text-secondary uppercase tracking-widest">
            The verdict is in.
          </p>
        </div>

        {/* Step 1: Show everyone's accusations */}
        {revealStep >= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-ui font-bold border-b border-border pb-2 text-accent">The Theories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameResult.results.map((result, idx) => (
                <div key={idx} className="bg-surface-light p-4 rounded border border-border flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-surface border border-border flex-shrink-0 flex items-center justify-center font-bold text-accent">
                    {result.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{result.name}</h3>
                    <p className="text-sm font-mono text-text-secondary">Accused: <span className="text-danger font-bold">{result.accusation.suspect}</span></p>
                    <p className="text-xs text-text-secondary mt-2 line-clamp-2 italic">"{result.accusation.motive}"</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: The Truth Reveal */}
        {revealStep >= 2 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-surface p-8 rounded-lg border-2 border-danger shadow-[0_0_30px_rgba(139,34,82,0.3)] relative overflow-hidden mt-12"
          >
            <div className="absolute -right-4 -top-4 stamp stamp-red text-4xl">GUILTY</div>
            
            <h2 className="text-3xl font-typewriter mb-6 text-paper-cream">THE TRUTH</h2>
            
            <div className="space-y-6">
              <div>
                <span className="text-sm font-mono text-text-secondary block mb-1">The Killer</span>
                <p className="text-2xl font-bold text-danger bg-danger/10 p-3 rounded border-l-4 border-danger inline-block">
                  {gameResult.solution.killer}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-mono text-text-secondary block mb-1">The Method</span>
                <p className="text-lg text-paper-cream">{gameResult.solution.method}</p>
              </div>

              <div>
                <span className="text-sm font-mono text-text-secondary block mb-1">The Motive</span>
                <p className="text-lg text-paper-cream">{gameResult.solution.motive}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/50">
                <span className="text-sm font-mono text-text-secondary block mb-2">Full Reconstruction</span>
                <p className="text-paper-cream/80 leading-relaxed text-sm">
                  {gameResult.solution.fullExplanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Scoreboard */}
        {revealStep >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-ui font-bold border-b border-border pb-2 text-accent flex justify-between items-end mb-6">
              Final Standings
              <span className="text-sm font-mono text-text-secondary font-normal">Points Breakdown</span>
            </h2>

            <div className="space-y-3">
              {gameResult.results.map((result, idx) => {
                const isMe = result.name === currentPlayer.name;
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded border flex items-center justify-between ${
                      idx === 0 
                        ? 'bg-accent/10 border-accent' 
                        : 'bg-surface-light border-border'
                    } ${isMe ? 'ring-1 ring-white/30' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono ${
                        idx === 0 ? 'bg-accent text-bg' : 'bg-surface text-text-secondary border border-border'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-lg flex items-center gap-2">
                          {result.name}
                          {isMe && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-normal uppercase tracking-wide">You</span>}
                        </p>
                        <div className="flex gap-3 text-xs font-mono mt-1">
                           <span className={result.correctKiller ? 'text-green-400' : 'text-danger'}>Killer: {result.correctKiller ? '+50' : '0'}</span>
                           <span className="text-text-secondary">|</span>
                           <span className={result.correctMotive ? 'text-green-400' : 'text-danger'}>Motive: {result.correctMotive ? '+25' : '0'}</span>
                           <span className="text-text-secondary">|</span>
                           <span className={result.correctMethod ? 'text-green-400' : 'text-danger'}>Method: {result.correctMethod ? '+25' : '0'}</span>
                           <span className="text-text-secondary">|</span>
                           <span className="text-accent">Speed: +{result.speedBonus}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold font-typewriter text-accent">{result.score}</span>
                      <span className="text-xs text-text-secondary block">PTS</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <button onClick={handlePlayAgain} className="btn btn-primary px-8 py-3 text-lg">
                Return to Precinct
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default VerdictPage;
