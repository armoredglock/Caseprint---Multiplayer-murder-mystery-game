import React, { createContext, useContext, useState, useEffect } from 'react';
import { socket } from '../socket';
import { useToast } from './ToastContext';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { addToast } = useToast();
  const [roomState, setRoomState] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    // Room events
    socket.on('room:player-joined', (data) => {
      setRoomState(prev => prev ? { ...prev, players: data.players } : null);
    });

    socket.on('room:state', (room) => {
      setRoomState(room);
      setCurrentPlayer(prev => {
        if (!prev) return null;
        const updated = room.players.find(p => p.socketId === prev.socketId);
        return updated || prev;
      });
    });

    socket.on('kicked_from_room', () => {
      addToast("You have been kicked from the room by the host.", 'error', 5000);
      setRoomState(null);
      setCurrentPlayer(null);
      window.location.href = '/';
    });

    socket.on('session_ended', () => {
      addToast("The host has ended the session.", 'error', 5000);
      setRoomState(null);
      setCurrentPlayer(null);
      window.location.href = '/';
    });

    // Game events
    socket.on('game:started', (data) => {
      setRoomState(prev => prev ? { ...prev, status: 'IN_GAME', phase: data.phase } : null);
    });

    socket.on('game:phase-change', (data) => {
      setRoomState(prev => prev ? { ...prev, phase: data.phase } : null);
    });

    socket.on('game:case-data', (data) => {
      if (data.caseData) {
        setCaseData(data.caseData);
      } else {
        setCaseData(data); // Fallback for backwards compatibility if needed
      }
    });

    socket.on('game:clue-wave', (data) => {
      const msgText = data.message || `WAVE ${data.wave} UNLOCKED: New evidence has been added to your case folder.`;
      addToast(msgText, 'info', 10000); // 10 seconds for longer narrative texts
      setMessages(prev => [...prev, {
        sender: 'SYSTEM',
        message: msgText,
        timestamp: new Date().toISOString()
      }]);
      setRoomState(prev => prev ? { ...prev, currentWave: data.wave } : null);
      setCaseData(data.caseData);
    });

    socket.on('game:player-accused', (data) => {
      setMessages(prev => [...prev, {
        sender: 'SYSTEM',
        message: `${data.playerName} has submitted their final accusation.`,
        timestamp: new Date().toISOString()
      }]);
    });

    socket.on('game:verdict', (data) => {
      setRoomState(prev => prev ? { ...prev, phase: 'VERDICT', status: 'FINISHED' } : null);
      setGameResult(data);
    });

    // Chat events
    socket.on('chat:broadcast', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('room:player-joined');
      socket.off('room:state');
      socket.off('game:started');
      socket.off('game:phase-change');
      socket.off('game:case-data');
      socket.off('game:clue-wave');
      socket.off('game:player-accused');
      socket.off('game:verdict');
      socket.off('chat:broadcast');
      socket.off('kicked_from_room');
      socket.off('session_ended');
    };
  }, []);

  const initSession = (room, player) => {
    setRoomState(room);
    setCurrentPlayer(player);
  };

  const clearSession = () => {
    setRoomState(null);
    setCurrentPlayer(null);
    setCaseData(null);
    setMessages([]);
    setGameResult(null);
  };

  const sendMessage = (message) => {
    if (roomState) {
      socket.emit('chat:message', { roomCode: roomState.roomCode, message });
    }
  };

  const submitAccusation = (accusation) => {
    if (roomState) {
      socket.emit('game:submit-accusation', { roomCode: roomState.roomCode, accusation });
    }
  };

  return (
    <GameContext.Provider value={{
      roomState,
      currentPlayer,
      caseData,
      messages,
      gameResult,
      initSession,
      clearSession,
      sendMessage,
      submitAccusation
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
