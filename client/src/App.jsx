import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { ToastProvider } from './contexts/ToastContext';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import GamePage from './pages/GamePage';
import VerdictPage from './pages/VerdictPage';
import FloatingDust from './components/ui/FloatingDust';

import './styles/index.css';
import './styles/casefile.css';
import './styles/animations.css';

function App() {
  return (
    <Router>
      <ToastProvider>
        <GameProvider>
          <FloatingDust />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomCode" element={<RoomPage />} />
            <Route path="/game/:roomCode" element={<GamePage />} />
            <Route path="/verdict/:roomCode" element={<VerdictPage />} />
          </Routes>
        </GameProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
