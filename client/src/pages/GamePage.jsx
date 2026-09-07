import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import PhaseHeader from '../components/game/PhaseHeader';
import ChatPanel from '../components/game/ChatPanel';
import Notebook from '../components/game/Notebook';
import AccusationForm from '../components/game/AccusationForm';
import CaseFolder from '../components/casefile/CaseFolder';

const GamePage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { roomState, currentPlayer } = useGame();
  
  const [activeRightTab, setActiveRightTab] = useState('chat'); // 'chat' or 'notes'

  // Security redirect
  React.useEffect(() => {
    if (!roomState || !currentPlayer) {
      navigate('/');
    } else if (roomState.status === 'FINISHED') {
      navigate(`/verdict/${roomCode}`);
    }
  }, [roomState, currentPlayer, navigate, roomCode]);

  if (!roomState || !currentPlayer) return null;

  const isAccusationPhase = roomState.phase === 'ACCUSATION';

  return (
    <div className="h-screen w-screen overflow-hidden bg-bg flex flex-col">
      {/* Top Bar */}
      <PhaseHeader phase={roomState.phase} duration={0} /> {/* We rely on server for phase changes now, duration just UI visual if we passed it down from context */}

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Case File (65%) */}
        <div className="w-full lg:w-[65%] h-full p-4 pt-12 relative z-10">
           {isAccusationPhase ? (
             <div className="h-full flex items-center justify-center p-4">
               <div className="max-w-2xl w-full">
                 <AccusationForm />
               </div>
             </div>
           ) : (
             <CaseFolder />
           )}
        </div>

        {/* Right Side: Comms & Notes (35%) */}
        <div className="hidden lg:flex w-[35%] h-full flex-col border-l border-border bg-surface relative z-20 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]">
          
          {/* Tabs */}
          <div className="flex bg-surface-light border-b border-border">
            <button 
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeRightTab === 'chat' ? 'bg-surface text-accent border-t-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => setActiveRightTab('chat')}
            >
              Comms
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeRightTab === 'notes' ? 'bg-surface text-accent border-t-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => setActiveRightTab('notes')}
            >
              Notebook
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeRightTab === 'chat' ? (
              <ChatPanel roomCode={roomCode} currentPlayer={currentPlayer} />
            ) : (
              <Notebook />
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default GamePage;
