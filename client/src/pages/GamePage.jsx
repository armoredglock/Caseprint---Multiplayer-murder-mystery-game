import React, { useState, useEffect } from 'react';
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
  
  const [activeRightTab, setActiveRightTab] = useState('chat'); // 'chat' or 'notes' (Desktop)
  const [mobileTab, setMobileTab] = useState('case'); // 'case', 'chat', 'notes' (Mobile)

  // Sync mobile tab to right tab
  useEffect(() => {
    if (mobileTab === 'chat' || mobileTab === 'notes') {
      setActiveRightTab(mobileTab);
    }
  }, [mobileTab]);

  // Security redirect
  useEffect(() => {
    if (!roomState || !currentPlayer) {
      navigate('/');
    } else if (roomState.status === 'FINISHED') {
      navigate(`/verdict/${roomCode}`);
    }
  }, [roomState, currentPlayer, navigate, roomCode]);

  if (!roomState || !currentPlayer) return null;

  const isAccusationPhase = roomState.phase === 'ACCUSATION';

  return (
    <div className="h-[100dvh] w-screen overflow-hidden bg-bg flex flex-col">
      {/* Top Bar */}
      <PhaseHeader phase={roomState.phase} duration={0} />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Case File */}
        {/* Visible on mobile if mobileTab === 'case'. Always visible on desktop. */}
        <div className={`w-full lg:w-[65%] h-full p-2 sm:p-4 pt-10 lg:pt-12 relative z-10 ${mobileTab === 'case' ? 'block' : 'hidden lg:block'}`}>
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

        {/* Right Side: Comms & Notes */}
        {/* Visible on mobile if mobileTab !== 'case'. Always visible on desktop. */}
        <div className={`w-full lg:w-[35%] h-full flex-col border-l border-border bg-surface relative z-20 lg:shadow-[-5px_0_15px_rgba(0,0,0,0.5)] ${mobileTab !== 'case' ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* Desktop Tabs (Hidden on mobile) */}
          <div className="hidden lg:flex bg-surface-light border-b border-border">
            <button 
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeRightTab === 'chat' ? 'bg-surface text-accent border-t-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => { setActiveRightTab('chat'); setMobileTab('chat'); }}
            >
              Comms
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeRightTab === 'notes' ? 'bg-surface text-accent border-t-2 border-accent' : 'text-text-secondary hover:text-text-primary'}`}
              onClick={() => { setActiveRightTab('notes'); setMobileTab('notes'); }}
            >
              Notebook
            </button>
          </div>

          {/* Content Pane */}
          <div className="flex-1 overflow-hidden">
            {activeRightTab === 'chat' ? (
              <ChatPanel roomCode={roomCode} currentPlayer={currentPlayer} />
            ) : (
              <Notebook />
            )}
          </div>
        </div>

      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden flex bg-surface-light border-t border-border z-50">
        <button 
          onClick={() => setMobileTab('case')} 
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide flex flex-col items-center justify-center transition-colors ${mobileTab === 'case' ? 'text-accent bg-surface' : 'text-text-secondary'}`}
        >
          <span className="text-xl mb-1">📁</span>
          Case File
        </button>
        <button 
          onClick={() => setMobileTab('chat')} 
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide flex flex-col items-center justify-center transition-colors ${mobileTab === 'chat' ? 'text-accent bg-surface' : 'text-text-secondary'}`}
        >
          <span className="text-xl mb-1">💬</span>
          Comms
        </button>
        <button 
          onClick={() => setMobileTab('notes')} 
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide flex flex-col items-center justify-center transition-colors ${mobileTab === 'notes' ? 'text-accent bg-surface' : 'text-text-secondary'}`}
        >
          <span className="text-xl mb-1">📝</span>
          Notes
        </button>
      </div>

    </div>
  );
};

export default GamePage;
