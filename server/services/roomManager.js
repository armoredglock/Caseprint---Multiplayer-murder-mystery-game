const Room = require('../models/Room');
const crypto = require('crypto');

// In-memory cache for fast socket lookups, synced with DB
const activeRooms = new Map();

const generateRoomCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

const sanitizeRoom = (roomObj) => {
  if (!roomObj) return null;
  const sanitized = JSON.parse(JSON.stringify(roomObj));
  delete sanitized.password;
  sanitized.isPasswordProtected = Boolean(roomObj.password);
  if (Array.isArray(sanitized.players)) {
    sanitized.players.forEach(p => {
      delete p.sessionToken;
    });
  }
  return sanitized;
};

const createRoom = async (hostSocketId, hostName, scenarioId, password = '') => {
  if (typeof hostName !== 'string' || !hostName.trim()) {
    throw new Error('Valid host name is required');
  }

  let roomCode;
  let isUnique = false;
  
  // Ensure unique room code
  while (!isUnique) {
    roomCode = generateRoomCode();
    const existing = await Room.findOne({ roomCode });
    if (!existing) isUnique = true;
  }

  const sessionToken = crypto.randomBytes(24).toString('hex');

  const room = new Room({
    roomCode,
    hostSocketId,
    hostName: hostName.trim(),
    scenarioId,
    caseId: scenarioId, // placeholder until game starts
    password: typeof password === 'string' ? password.trim() : '',
    players: [{
      socketId: hostSocketId,
      name: hostName.trim(),
      isHost: true,
      sessionToken
    }]
  });

  await room.save();
  activeRooms.set(roomCode, room.toObject());
  
  return {
    roomCode,
    sessionToken,
    room: sanitizeRoom(room.toObject())
  };
};

const joinRoom = async (roomCode, socketId, playerName, password = '', sessionToken = null) => {
  if (typeof roomCode !== 'string' || !roomCode.trim()) {
    throw new Error('Invalid room code');
  }
  const cleanRoomCode = roomCode.toUpperCase().trim();
  const cleanPlayerName = typeof playerName === 'string' ? playerName.trim() : '';

  const room = await Room.findOne({ roomCode: cleanRoomCode });
  if (!room) throw new Error('Room not found');

  // Clean up any ghost players (same socket, different name)
  const ghostIndex = room.players.findIndex(p => p.socketId === socketId && p.name !== cleanPlayerName);
  if (ghostIndex !== -1) {
    const wasHost = room.players[ghostIndex].isHost;
    room.players.splice(ghostIndex, 1);
    if (wasHost && room.players.length > 0) {
      room.players[0].isHost = true;
      room.hostSocketId = room.players[0].socketId;
      room.hostName = room.players[0].name;
    }
  }

  let playerSessionToken = sessionToken;
  let existingPlayerIndex = -1;

  if (sessionToken && typeof sessionToken === 'string') {
    existingPlayerIndex = room.players.findIndex(p => p.sessionToken === sessionToken);
  }

  if (existingPlayerIndex !== -1) {
    // Player is reconnecting with verified session token
    room.players[existingPlayerIndex].socketId = socketId;
    room.players[existingPlayerIndex].isOffline = false;
    if (room.hostName === room.players[existingPlayerIndex].name) {
      room.hostSocketId = socketId;
    }
    playerSessionToken = room.players[existingPlayerIndex].sessionToken;
  } else {
    if (!cleanPlayerName) {
      throw new Error('Player name is required');
    }

    // Check if name is already taken in the room
    const nameTaken = room.players.some(p => p.name.toLowerCase() === cleanPlayerName.toLowerCase());
    if (nameTaken) {
      throw new Error('A player with this name is already in the room. If this is you, provide a valid session.');
    }

    // New player joining
    if (room.password && room.password !== (typeof password === 'string' ? password.trim() : '')) {
      throw new Error('Incorrect password');
    }
    if (room.status !== 'LOBBY') {
      throw new Error('Game already in progress');
    }
    if (room.players.length >= room.maxPlayers) {
      throw new Error('Room is full');
    }

    playerSessionToken = crypto.randomBytes(24).toString('hex');
    room.players.push({
      socketId,
      name: cleanPlayerName,
      sessionToken: playerSessionToken
    });
  }

  await room.save();
  activeRooms.set(cleanRoomCode, room.toObject());
  return {
    room: sanitizeRoom(room.toObject()),
    sessionToken: playerSessionToken
  };
};

const leaveRoom = async (roomCode, socketId) => {
  if (typeof roomCode !== 'string') return null;
  const cleanRoomCode = roomCode.toUpperCase().trim();

  const room = await Room.findOne({ roomCode: cleanRoomCode });
  if (!room) return null;

  const playerIndex = room.players.findIndex(p => p.socketId === socketId);
  if (playerIndex === -1) return null;

  const wasHost = room.players[playerIndex].isHost;
  const leftPlayer = room.players[playerIndex];
  
  room.players.splice(playerIndex, 1);

  if (room.players.length === 0) {
    // Room is empty, destroy it
    await Room.deleteOne({ roomCode: cleanRoomCode });
    activeRooms.delete(cleanRoomCode);
    return { destroyed: true, leftPlayer };
  }

  if (wasHost) {
    // Assign new host
    room.players[0].isHost = true;
    room.hostSocketId = room.players[0].socketId;
    room.hostName = room.players[0].name;
  }

  await room.save();
  activeRooms.set(cleanRoomCode, room.toObject());
  
  return { destroyed: false, room: sanitizeRoom(room.toObject()), leftPlayer };
};

const getRoom = async (roomCode) => {
  if (typeof roomCode !== 'string') return null;
  const cleanRoomCode = roomCode.toUpperCase().trim();

  if (activeRooms.has(cleanRoomCode)) {
    return activeRooms.get(cleanRoomCode);
  }
  const room = await Room.findOne({ roomCode: cleanRoomCode });
  if (room) {
    activeRooms.set(cleanRoomCode, room.toObject());
    return room.toObject();
  }
  return null;
};

const updateRoom = async (roomCode, updateObj) => {
  if (typeof roomCode !== 'string') return null;
  const cleanRoomCode = roomCode.toUpperCase().trim();

  const room = await Room.findOneAndUpdate(
    { roomCode: cleanRoomCode },
    { $set: updateObj },
    { new: true }
  );
  if (room) {
    activeRooms.set(cleanRoomCode, room.toObject());
  }
  return room;
};

const kickPlayer = async (roomCode, hostSocketId, playerSocketIdToKick) => {
  if (typeof roomCode !== 'string') throw new Error('Invalid room code');
  const cleanRoomCode = roomCode.toUpperCase().trim();

  const room = await Room.findOne({ roomCode: cleanRoomCode });
  if (!room) throw new Error('Room not found');
  if (room.hostSocketId !== hostSocketId) throw new Error('Only the host can kick players');
  if (room.hostSocketId === playerSocketIdToKick) throw new Error('Host cannot kick themselves');

  const playerIndex = room.players.findIndex(p => p.socketId === playerSocketIdToKick);
  if (playerIndex === -1) throw new Error('Player not found in room');

  const kickedPlayer = room.players[playerIndex];
  room.players.splice(playerIndex, 1);
  
  await room.save();
  activeRooms.set(cleanRoomCode, room.toObject());
  
  return { room: sanitizeRoom(room.toObject()), kickedPlayer };
};

const changePlayerName = async (roomCode, socketId, newName) => {
  if (typeof roomCode !== 'string') throw new Error('Invalid room code');
  if (typeof newName !== 'string' || !newName.trim()) throw new Error('Invalid name');
  const cleanRoomCode = roomCode.toUpperCase().trim();
  const cleanName = newName.trim();

  const room = await Room.findOne({ roomCode: cleanRoomCode });
  if (!room) throw new Error('Room not found');

  const playerIndex = room.players.findIndex(p => p.socketId === socketId);
  if (playerIndex === -1) throw new Error('Player not found');

  if (room.players.some(p => p.name.toLowerCase() === cleanName.toLowerCase() && p.socketId !== socketId)) {
    throw new Error('Name already taken');
  }

  room.players[playerIndex].name = cleanName;
  if (room.hostSocketId === socketId) {
    room.hostName = cleanName;
  }

  await room.save();
  activeRooms.set(cleanRoomCode, room.toObject());
  return sanitizeRoom(room.toObject());
};

const deleteRoom = async (roomCode) => {
  if (typeof roomCode !== 'string') return;
  const cleanRoomCode = roomCode.toUpperCase().trim();
  await Room.deleteOne({ roomCode: cleanRoomCode });
  activeRooms.delete(cleanRoomCode);
};

const setPlayerOffline = async (socketId) => {
  const affectedRooms = [];
  const rooms = await Room.find({ "players.socketId": socketId });
  for (const room of rooms) {
    const playerIndex = room.players.findIndex(p => p.socketId === socketId);
    if (playerIndex !== -1) {
      room.players[playerIndex].isOffline = true;
      await room.save();
      const updated = room.toObject();
      activeRooms.set(room.roomCode, updated);
      affectedRooms.push(sanitizeRoom(updated));
    }
  }
  return affectedRooms;
};

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoom,
  updateRoom,
  kickPlayer,
  changePlayerName,
  deleteRoom,
  setPlayerOffline,
  sanitizeRoom
};
