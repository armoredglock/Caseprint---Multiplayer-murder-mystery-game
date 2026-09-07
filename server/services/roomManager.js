const Room = require('../models/Room');
const crypto = require('crypto');

// In-memory cache for fast socket lookups, synced with DB
const activeRooms = new Map();

const generateRoomCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

const createRoom = async (hostSocketId, hostName, scenarioId, password = '') => {
  let roomCode;
  let isUnique = false;
  
  // Ensure unique room code
  while (!isUnique) {
    roomCode = generateRoomCode();
    const existing = await Room.findOne({ roomCode });
    if (!existing) isUnique = true;
  }

  const room = new Room({
    roomCode,
    hostSocketId,
    hostName,
    scenarioId,
    caseId: scenarioId, // placeholder until game starts
    password,
    players: [{ socketId: hostSocketId, name: hostName, isHost: true }]
  });

  await room.save();
  activeRooms.set(roomCode, room.toObject());
  
  return roomCode;
};

const joinRoom = async (roomCode, socketId, playerName, password = '') => {
  const room = await Room.findOne({ roomCode });
  
  if (!room) throw new Error('Room not found');
  if (room.password && room.password !== password) throw new Error('Incorrect password');
  if (room.status !== 'LOBBY') throw new Error('Game already in progress');
  if (room.players.length >= room.maxPlayers) throw new Error('Room is full');
  if (room.players.some(p => p.name === playerName)) throw new Error('Name already taken');

  room.players.push({ socketId, name: playerName });
  await room.save();
  
  activeRooms.set(roomCode, room.toObject());
  return room;
};

const leaveRoom = async (roomCode, socketId) => {
  const room = await Room.findOne({ roomCode });
  if (!room) return null;

  const playerIndex = room.players.findIndex(p => p.socketId === socketId);
  if (playerIndex === -1) return null;

  const wasHost = room.players[playerIndex].isHost;
  const leftPlayer = room.players[playerIndex];
  
  room.players.splice(playerIndex, 1);

  if (room.players.length === 0) {
    // Room is empty, destroy it
    await Room.deleteOne({ roomCode });
    activeRooms.delete(roomCode);
    return { destroyed: true, leftPlayer };
  }

  if (wasHost) {
    // Assign new host
    room.players[0].isHost = true;
    room.hostSocketId = room.players[0].socketId;
    room.hostName = room.players[0].name;
  }

  await room.save();
  activeRooms.set(roomCode, room.toObject());
  
  return { destroyed: false, room, leftPlayer };
};

const getRoom = async (roomCode) => {
  if (activeRooms.has(roomCode)) {
    return activeRooms.get(roomCode);
  }
  const room = await Room.findOne({ roomCode });
  if (room) {
    activeRooms.set(roomCode, room.toObject());
    return room.toObject();
  }
  return null;
};

const updateRoom = async (roomCode, updateObj) => {
  const room = await Room.findOneAndUpdate(
    { roomCode },
    { $set: updateObj },
    { new: true }
  );
  if (room) {
    activeRooms.set(roomCode, room.toObject());
  }
  return room;
};

const kickPlayer = async (roomCode, hostSocketId, playerSocketIdToKick) => {
  const room = await Room.findOne({ roomCode });
  if (!room) throw new Error('Room not found');
  if (room.hostSocketId !== hostSocketId) throw new Error('Only the host can kick players');
  if (room.hostSocketId === playerSocketIdToKick) throw new Error('Host cannot kick themselves');

  const playerIndex = room.players.findIndex(p => p.socketId === playerSocketIdToKick);
  if (playerIndex === -1) throw new Error('Player not found in room');

  const kickedPlayer = room.players[playerIndex];
  room.players.splice(playerIndex, 1);
  
  await room.save();
  activeRooms.set(roomCode, room.toObject());
  
  return { room, kickedPlayer };
};

const changePlayerName = async (roomCode, socketId, newName) => {
  const room = await Room.findOne({ roomCode });
  if (!room) throw new Error('Room not found');

  const playerIndex = room.players.findIndex(p => p.socketId === socketId);
  if (playerIndex === -1) throw new Error('Player not found');

  if (room.players.some(p => p.name === newName && p.socketId !== socketId)) {
    throw new Error('Name already taken');
  }

  room.players[playerIndex].name = newName;
  if (room.hostSocketId === socketId) {
    room.hostName = newName;
  }

  await room.save();
  activeRooms.set(roomCode, room.toObject());
  return room.toObject();
};

const deleteRoom = async (roomCode) => {
  await Room.deleteOne({ roomCode });
  activeRooms.delete(roomCode);
};

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoom,
  updateRoom,
  kickPlayer,
  changePlayerName,
  deleteRoom
};
