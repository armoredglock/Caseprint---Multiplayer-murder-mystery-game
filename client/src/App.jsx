import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { ToastProvider } from './contexts/ToastContext';
import HomePage from './pages/HomePage';
import FloatingDust from './components/ui/FloatingDust';

import './styles/index.css';
import './styles/casefile.css';
import './styles/animations.css';

// Lazy loaded components for better performance
const LobbyPage = lazy(() => import('./pages/LobbyPage'));
const GamePage = lazy(() => import('./pages/GamePage'));
const VerdictPage = lazy(() => import('./pages/VerdictPage'));

// A simple loading screen while chunks are fetched
const PageLoader = () => (
  <div className="min-h-screen bg-bg flex items-center justify-center font-mono text-ink-black/60">
    Loading Case Files...
  </div>
);

function App() {
  return (
    <Router>
      <ToastProvider>
        <GameProvider>
          <FloatingDust />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lobby/:roomCode" element={<LobbyPage />} />
              <Route path="/game/:roomCode" element={<GamePage />} />
              <Route path="/verdict/:roomCode" element={<VerdictPage />} />
            </Routes>
          </Suspense>
        </GameProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
