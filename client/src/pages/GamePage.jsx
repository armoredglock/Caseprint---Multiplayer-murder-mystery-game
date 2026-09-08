import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import PhaseHeader from '../components/game/PhaseHeader';
import ChatPanel from '../components/game/ChatPanel';
import Notebook from '../components/game/Notebook';
import AccusationForm from '../components/game/AccusationForm';
import CaseFolder from '../components/casefile/CaseFolder';

const GamePage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { roomState, currentPlayer, isRestoring } = useGame();
  
  const [showIntro, setShowIntro] = useState(true);
  
  // Auto-hide intro screen after 3 seconds
  useEffect(() => {
    if (showIntro && !isRestoring) {
      const timer = setTimeout(() => setShowIntro(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showIntro, isRestoring]);
  
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
    if (isRestoring) return;
    if (!roomState || !currentPlayer) {
      navigate('/');
    } else if (roomState.status === 'FINISHED') {
      navigate(`/verdict/${roomCode}`);
    }
  }, [roomState, currentPlayer, navigate, roomCode, isRestoring]);

  if (isRestoring) {
    return <div className="h-[100dvh] w-screen bg-bg flex items-center justify-center font-typewriter text-white text-xl">RESTORING CONNECTION...</div>;
  }

  if (!roomState || !currentPlayer) return null;

  const isAccusationPhase = roomState.phase === 'ACCUSATION';

  return (
    <div className="h-[100dvh] w-screen overflow-hidden bg-bg flex flex-col relative">
      {/* Intro Animation Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[200] home-page flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              className="bg-manila-dark p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-2 border-[#967d4a] relative max-w-xl text-center flex flex-col items-center justify-center"
              style={{ clipPath: 'polygon(0 0, 30% 0, 32% 20px, 100% 20px, 100% 100%, 0 100%)', borderRadius: '4px 4px 4px 4px', paddingTop: '40px' }}
            >
               {/* Distressed Inner Borders */}
               <div className="absolute inset-2 border-2 border-ink-black/15 border-dashed pointer-events-none opacity-70" style={{ clipPath: 'polygon(0 0, 29% 0, 31% 16px, 100% 16px, 100% 100%, 0 100%)' }} />
               <div className="absolute inset-3 border border-ink-black/10 pointer-events-none opacity-50" style={{ clipPath: 'polygon(0 0, 28% 0, 30% 14px, 100% 14px, 100% 100%, 0 100%)' }} />
               
               {/* Paperclip Graphic */}
               <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-4 -left-4 text-gray-800/60 transform -rotate-12 drop-shadow-md z-10 pointer-events-none">
                 <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
               </svg>

               <div className="absolute top-6 right-6 stamp stamp-red opacity-50 transform rotate-12 text-3xl">CLASSIFIED</div>
               <h1 className="font-typewriter text-5xl md:text-7xl font-bold text-ink-black mb-4 mt-8 px-4">CASE #{roomState.caseId}</h1>
               <div className="w-24 h-1 bg-ink-black/20 mx-auto mb-8"></div>
               <p className="font-handwriting text-4xl text-ink-black font-bold tracking-wide">Opening File...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
