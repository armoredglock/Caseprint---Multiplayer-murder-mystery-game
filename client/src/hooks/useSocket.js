import { useState, useEffect, useCallback } from 'react';
import { socket, connectSocket, disconnectSocket } from '../socket';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    connectSocket();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // We don't disconnect on unmount here so the connection persists across pages
    };
  }, []);

  const createRoom = useCallback((playerName, caseId, password) => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Server connection timed out. Is the backend running?")), 5000);
      socket.emit('room:create', { playerName, caseId, password }, (response) => {
        clearTimeout(timeout);
        if (response && response.success) resolve(response);
        else reject(new Error(response?.error || 'Unknown error'));
      });
    });
  }, []);

  const joinRoom = useCallback((roomCode, playerName, password) => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Server connection timed out.")), 5000);
      socket.emit('room:join', { roomCode, playerName, password }, (response) => {
        clearTimeout(timeout);
        if (response && response.success) resolve(response);
        else reject(new Error(response?.error || 'Unknown error'));
      });
    });
  }, []);

  const kickPlayer = useCallback((roomCode, targetSocketId) => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Request timed out.")), 5000);
      socket.emit('room:kick', { roomCode, targetSocketId }, (response) => {
        clearTimeout(timeout);
        if (response && response.success) resolve(response);
        else reject(new Error(response?.error || 'Unknown error'));
      });
    });
  }, []);

  const leaveRoom = useCallback((roomCode) => {
    return new Promise((resolve, reject) => {
      socket.emit('room:leave', { roomCode }, (response) => {
        if (response.success) resolve(response);
        else reject(new Error(response.error));
      });
    });
  }, []);

  const endSession = useCallback((roomCode) => {
    return new Promise((resolve, reject) => {
      socket.emit('room:end', { roomCode }, (response) => {
        if (response && response.success) resolve(response);
        else resolve(); // ignoring errors for broadcast
      });
    });
  }, []);

  const advancePhase = useCallback((roomCode) => {
    socket.emit('game:advance-phase', { roomCode });
  }, []);
  const changePlayerName = useCallback((roomCode, newName) => {
    return new Promise((resolve, reject) => {
      socket.emit('room:change-name', { roomCode, newName }, (response) => {
        if (response && response.success) resolve(response);
        else reject(new Error(response?.error || 'Failed to change name'));
      });
    });
  }, []);

  return { isConnected, createRoom, joinRoom, kickPlayer, leaveRoom, endSession, advancePhase, changePlayerName };
};
