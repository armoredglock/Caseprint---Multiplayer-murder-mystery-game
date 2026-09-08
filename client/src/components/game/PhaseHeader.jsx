import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { useSocket } from '../../hooks/useSocket';
import ConfirmModal from '../ui/ConfirmModal';
import PlayersModal from '../ui/PlayersModal';

const PhaseHeader = ({ phase, duration }) => {
  const { roomState, currentPlayer, clearSession } = useGame();
  const { leaveRoom, endSession, advancePhase } = useSocket();
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [confirmAction, setConfirmAction] = useState(null); // 'end', 'leave', 'advance'
  const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false);

  const handleLeaveOrEnd = () => {
    if (currentPlayer.isHost) {
      setConfirmAction('end');
    } else {
      setConfirmAction('leave');
    }
  };

  const executeConfirmAction = async () => {
    const action = confirmAction;
    setConfirmAction(null);

    if (action === 'end') {
      await endSession(roomState.roomCode);
      clearSession();
      navigate('/');
    } else if (action === 'leave') {
      await leaveRoom(roomState.roomCode);
      clearSession();
      navigate('/');
    } else if (action === 'advance') {
      advancePhase(roomState.roomCode);
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
    <div className="bg-transparent border-b border-ink-black/20 p-2 sm:p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2 z-20 relative shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
        <div>
          <h2 className="text-sm sm:text-xl font-typewriter text-[#d6b87e] font-bold">
            {roomState?.scenarioId?.replace('-', ' ').toUpperCase() || roomState?.caseId?.replace('-', ' ').toUpperCase() || 'UNKNOWN CASE'}
          </h2>
          <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest font-bold flex gap-2 flex-wrap">
            <span className="text-white">PHASE: <span className="text-[#d6b87e]">{phaseNames[phase]}</span></span>
            {roomState?.currentWave && phase === 'INVESTIGATION' && (
              <span className="text-white border-l border-white/20 pl-2">
                WAVE: {roomState.currentWave}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        
        <div className="mr-1 sm:mr-4 pr-2 sm:pr-4 border-r border-border flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setIsPlayersModalOpen(true)}
            className="btn btn-outline text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1.5 hover:border-accent hover:text-accent transition-colors"
            title="View Team Roster"
          >
            <span className="text-sm">🕵️</span>
            <span className="hidden sm:inline">TEAM ({roomState?.players?.length || 0})</span>
          </button>
          
          {phase === 'INVESTIGATION' && currentPlayer?.isHost && (
            <button 
              onClick={() => setConfirmAction('advance')}
              className="btn btn-primary text-[10px] sm:text-xs px-2 sm:px-4 py-1 sm:py-1.5 hover:bg-white hover:text-black transition-colors"
            >
              <span className="hidden sm:inline">MOVE TO ACCUSATIONS</span>
              <span className="sm:hidden">ACCUSE</span>
            </button>
          )}
        </div>

        <div className="text-right">
          <span className="hidden sm:block text-[10px] sm:text-xs text-text-secondary uppercase">Elapsed Time</span>
          {phase !== 'VERDICT' ? (
            <span className="font-mono text-sm sm:text-2xl font-bold text-paper-cream">
              {formatTime(elapsedTime)}
            </span>
          ) : (
            <span className="font-mono text-sm sm:text-2xl font-bold text-text-secondary">--:--</span>
          )}
        </div>
        
        <div className="ml-1 sm:ml-4 pl-2 sm:pl-4 border-l border-border">
          <button 
            onClick={handleLeaveOrEnd}
            className="btn btn-outline text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 border-danger text-danger hover:bg-danger hover:text-white"
            title={currentPlayer?.isHost ? "End Session" : "Leave Game"}
          >
            {currentPlayer?.isHost ? "END" : "LEAVE"}
          </button>
        </div>
      </div>

      <ConfirmModal 
        isOpen={confirmAction !== null}
        title={
          confirmAction === 'end' ? 'End Session' :
          confirmAction === 'leave' ? 'Leave Game' :
          'Move to Accusations'
        }
        message={
          confirmAction === 'end' ? 'Are you sure you want to end this session for everyone?' :
          confirmAction === 'leave' ? 'Are you sure you want to leave the game?' :
          'Are you sure you want to end the investigation and force everyone to submit their final accusations?'
        }
        confirmText={
          confirmAction === 'end' ? 'End Session' :
          confirmAction === 'leave' ? 'Leave Game' :
          'Move to Accusations'
        }
        onConfirm={executeConfirmAction}
        onCancel={() => setConfirmAction(null)}
      />

      <PlayersModal 
        isOpen={isPlayersModalOpen} 
        onClose={() => setIsPlayersModalOpen(false)} 
      />
    </div>
  );
};

export default PhaseHeader;
