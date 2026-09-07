import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { useSocket } from '../../hooks/useSocket';

const PhaseHeader = ({ phase, duration }) => {
  const { roomState, currentPlayer, clearSession } = useGame();
  const { leaveRoom, endSession, advancePhase } = useSocket();
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleLeaveOrEnd = async () => {
    if (currentPlayer.isHost) {
      if (window.confirm("Are you sure you want to end this session for everyone?")) {
        await endSession(roomState.roomCode);
        clearSession();
        navigate('/');
      }
    } else {
      if (window.confirm("Are you sure you want to leave the game?")) {
        await leaveRoom(roomState.roomCode);
        clearSession();
        navigate('/');
      }
    }
  };

  useEffect(() => {
    // Reset elapsed time when phase changes
    setElapsedTime(0);
    
    if (phase === 'VERDICT') return;

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const phaseNames = {
    'BRIEFING': 'Initial Briefing',
    'INVESTIGATION': 'Active Investigation',
    'ACCUSATION': 'Final Accusations',
    'VERDICT': 'Case Closed'
  };

  return (
    <div className="bg-surface border-b border-border p-3 flex justify-between items-center z-20 relative shadow-sm">
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-xl font-typewriter text-accent">
            {roomState?.caseId?.replace('-', ' ').toUpperCase() || 'UNKNOWN CASE'}
          </h2>
          <p className="text-xs text-text-secondary uppercase tracking-widest font-bold">
            Phase: <span className="text-paper-cream">{phaseNames[phase]}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {phase === 'INVESTIGATION' && currentPlayer?.isHost && (
          <div className="mr-4 pr-4 border-r border-border">
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to end the investigation and move to accusations?")) {
                  advancePhase(roomState.roomCode);
                }
              }}
              className="btn btn-primary text-xs px-4 py-2 hover:bg-white hover:text-black transition-colors"
            >
              MOVE TO ACCUSATIONS
            </button>
          </div>
        )}

        <div className="text-right">
          <span className="text-xs text-text-secondary uppercase block">Elapsed Time</span>
          {phase !== 'VERDICT' ? (
            <span className="font-mono text-2xl font-bold text-paper-cream">
              {formatTime(elapsedTime)}
            </span>
          ) : (
            <span className="font-mono text-2xl font-bold text-text-secondary">--:--</span>
          )}
        </div>
        
        <div className="ml-4 pl-4 border-l border-border">
          <button 
            onClick={handleLeaveOrEnd}
            className="btn btn-outline text-xs px-3 py-1 border-danger text-danger hover:bg-danger hover:text-white"
            title={currentPlayer?.isHost ? "End Session" : "Leave Game"}
          >
            {currentPlayer?.isHost ? "END" : "LEAVE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseHeader;
