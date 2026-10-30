require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

// Services
const roomManager = require('./services/roomManager');
const gameEngine = require('./services/gameEngine');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);

// In-memory REST Rate Limiter (CP-SEC-08)
const restRateLimitMap = new Map();
const restRateLimiter = (limit = 120, windowMs = 60 * 1000) => (req, res, next) => {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();
  const clientData = restRateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count += 1;
  }

  restRateLimitMap.set(ip, clientData);

  if (clientData.count > limit) {
    return res.status(429).json({ error: "Too many requests, please try again later." });
  }
  next();
};

// Setup CORS - allow Vercel frontend in prod, localhost in dev
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173'] : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(restRateLimiter(120, 60 * 1000));

// Routes
app.use('/api', apiRoutes);
app.get('/health', (req, res) => res.status(200).send('OK'));

// Database seeding - restricted to development or protected with ADMIN_SEED_SECRET (CP-SEC-01)
app.post('/api/seed', async (req, res) => {
  const adminSecret = process.env.ADMIN_SEED_SECRET;
  const authHeader = req.headers['authorization'];
  const isDev = process.env.NODE_ENV !== 'production';

  if (!isDev && (!adminSecret || authHeader !== `Bearer ${adminSecret}`)) {
    return res.status(403).json({ success: false, error: "Unauthorized access to seed endpoint." });
  }

  try {
    const Case = require('./models/Case');
    const { seedCases } = require('./data/seedCases');
    await Case.deleteMany({});
    await Case.insertMany(seedCases);
    res.json({ success: true, message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST']
  }
});

// Per-socket event rate limiting (CP-SEC-08)
const socketRateLimits = new Map();
const isSocketThrottled = (socketId, action, maxPerSec = 5) => {
  const key = `${socketId}:${action}`;
  const now = Date.now();
  const entry = socketRateLimits.get(key) || { count: 0, windowStart: now };

  if (now - entry.windowStart > 1000) {
    entry.count = 1;
    entry.windowStart = now;
  } else {
    entry.count += 1;
  }
  socketRateLimits.set(key, entry);
  return entry.count > maxPerSec;
};

// Input validation helpers (CP-SEC-07)
const isSafeString = (val, maxLen = 100) => {
  return typeof val === 'string' && val.trim().length > 0 && val.length <= maxLen;
};

io.on('connection', (socket) => {
  console.log(`[Socket] User connected: ${socket.id}`);

  // Room Management
  socket.on('room:create', async (data, callback) => {
    try {
      if (isSocketThrottled(socket.id, 'room_create', 2)) {
        throw new Error('Too many requests. Please wait a moment.');
      }
      if (!data || !isSafeString(data.playerName, 50) || !isSafeString(data.caseId, 80)) {
        throw new Error('Invalid player name or case selection');
      }

      const { roomCode, sessionToken, room } = await roomManager.createRoom(
        socket.id,
        data.playerName,
        data.caseId,
        data.password
      );
      socket.join(roomCode);
      if (callback) callback({ success: true, roomCode, sessionToken, room });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('room:join', async (data, callback) => {
    try {
      if (isSocketThrottled(socket.id, 'room_join', 4)) {
        throw new Error('Too many requests. Please wait a moment.');
      }
      if (!data || !isSafeString(data.roomCode, 20)) {
        throw new Error('Invalid room code');
      }

      const { room, sessionToken } = await roomManager.joinRoom(
        data.roomCode,
        socket.id,
        data.playerName,
        data.password,
        data.sessionToken
      );
      const cleanRoomCode = data.roomCode.toUpperCase().trim();
      socket.join(cleanRoomCode);
      
      // Notify others in room with sanitized state
      io.to(cleanRoomCode).emit('room:player-joined', { players: room.players });
      
      if (callback) callback({ success: true, room, sessionToken });

      // If room is already in game (e.g. player reconnects or refreshes), send them current case data
      if (room.status === 'IN_GAME' || room.status === 'FINISHED') {
        const caseService = require('./services/caseService');
        const caseData = await caseService.getCaseDataForWave(cleanRoomCode, room.currentWave || 1);
        socket.emit('game:case-data', { wave: room.currentWave || 1, caseData });
      }
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('room:kick', async (data, callback) => {
    try {
      if (!data || !isSafeString(data.roomCode, 20) || !isSafeString(data.targetSocketId, 60)) {
        throw new Error('Invalid kick request parameters');
      }
      const { roomCode, targetSocketId } = data;
      const cleanRoomCode = roomCode.toUpperCase().trim();
      const { room } = await roomManager.kickPlayer(cleanRoomCode, socket.id, targetSocketId);
      
      // Notify the kicked player directly
      io.to(targetSocketId).emit('kicked_from_room');
      
      // Remove them from the socket.io room
      const targetSocket = io.sockets.sockets.get(targetSocketId);
      if (targetSocket) {
        targetSocket.leave(cleanRoomCode);
      }

      // Check if we should end the game
      const activePlayers = room.players.filter(p => !p.isOffline);
      if (room.status !== 'LOBBY' && activePlayers.length < 2) {
        io.to(cleanRoomCode).emit('session_ended');
        gameEngine.clearTimersForRoom(cleanRoomCode);
        await roomManager.deleteRoom(cleanRoomCode);
      } else {
        io.to(cleanRoomCode).emit('room:player-joined', { players: room.players });
      }
      
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('room:leave', async (data, callback) => {
    try {
      if (!data || !isSafeString(data.roomCode, 20)) {
        if (callback) callback({ success: false, error: 'Invalid room code' });
        return;
      }
      const cleanRoomCode = data.roomCode.toUpperCase().trim();
      const result = await roomManager.leaveRoom(cleanRoomCode, socket.id);
      if (result) {
        socket.leave(cleanRoomCode);
        if (!result.destroyed) {
          const activePlayers = result.room.players.filter(p => !p.isOffline);
          if (result.room.status !== 'LOBBY' && activePlayers.length < 2) {
            io.to(cleanRoomCode).emit('session_ended');
            gameEngine.clearTimersForRoom(cleanRoomCode);
            await roomManager.deleteRoom(cleanRoomCode);
          } else {
            io.to(cleanRoomCode).emit('room:player-joined', { players: result.room.players });
          }
        }
      }
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  // Change player name
  socket.on('room:change-name', async ({ roomCode, newName }, callback) => {
    try {
      if (!isSafeString(roomCode, 20) || !isSafeString(newName, 50)) {
        throw new Error('Invalid room or name input');
      }
      const cleanRoomCode = roomCode.toUpperCase().trim();
      const room = await roomManager.changePlayerName(cleanRoomCode, socket.id, newName.trim());
      io.to(cleanRoomCode).emit('room:state', room);
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ error: err.message });
    }
  });

  socket.on('room:end', async (data, callback) => {
    try {
      if (!data || !isSafeString(data.roomCode, 20)) return;
      const cleanRoomCode = data.roomCode.toUpperCase().trim();
      const room = await roomManager.getRoom(cleanRoomCode);
      if (room && room.hostSocketId === socket.id) {
        io.to(cleanRoomCode).emit('session_ended');
        gameEngine.clearTimersForRoom(cleanRoomCode);
        await roomManager.deleteRoom(cleanRoomCode);
      }
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  // Chat System
  socket.on('chat:message', async (data) => {
    if (!data || !isSafeString(data.roomCode, 20) || !isSafeString(data.message, 1000)) return;
    if (isSocketThrottled(socket.id, 'chat', 3)) return;

    const cleanRoomCode = data.roomCode.toUpperCase().trim();
    const room = await roomManager.getRoom(cleanRoomCode);
    if (!room) return;
    
    const player = room.players.find(p => p.socketId === socket.id);
    if (!player) return;

    io.to(cleanRoomCode).emit('chat:broadcast', {
      sender: player.name,
      message: data.message.trim(),
      timestamp: new Date(),
      isHost: player.isHost
    });
  });

  // Game Flow
  socket.on('game:start', async (data) => {
    if (!data || !isSafeString(data.roomCode, 20)) return;
    const cleanRoomCode = data.roomCode.toUpperCase().trim();
    const room = await roomManager.getRoom(cleanRoomCode);
    if (!room || room.hostSocketId !== socket.id) return;
    
    await gameEngine.startGame(io, cleanRoomCode, data.caseId || room.scenarioId);
  });

  socket.on('game:advance-phase', async (data) => {
    if (!data || !isSafeString(data.roomCode, 20)) return;
    const cleanRoomCode = data.roomCode.toUpperCase().trim();
    const room = await roomManager.getRoom(cleanRoomCode);
    if (!room || room.hostSocketId !== socket.id) return;
    
    if (room.phase === 'INVESTIGATION') {
      await gameEngine.advancePhase(io, cleanRoomCode, 'INVESTIGATION');
    }
  });

  socket.on('game:submit-puzzle', async (data, callback) => {
    try {
      if (isSocketThrottled(socket.id, 'puzzle', 2)) {
        throw new Error('Please wait before submitting another answer.');
      }
      if (!data || !isSafeString(data.roomCode, 20) || !isSafeString(data.puzzleId, 50) || !isSafeString(data.answer, 200)) {
        throw new Error("Invalid puzzle submission");
      }
      const cleanRoomCode = data.roomCode.toUpperCase().trim();
      const room = await roomManager.getRoom(cleanRoomCode);
      if (!room) throw new Error("Room not found");
      const player = room.players.find(p => p.socketId === socket.id);
      
      const result = await gameEngine.solvePuzzle(io, cleanRoomCode, socket.id, data.puzzleId, data.answer, player?.name);
      if (callback) callback(result);
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('game:interrogate-suspect', async (data, callback) => {
    try {
      if (!data || !isSafeString(data.roomCode, 20) || !isSafeString(data.suspectId, 80)) {
        throw new Error("Invalid request");
      }
      const cleanRoomCode = data.roomCode.toUpperCase().trim();
      const room = await roomManager.getRoom(cleanRoomCode);
      if (!room) throw new Error("Room not found");
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id);
      if (playerIndex === -1) throw new Error("Player not found in room");
      
      const player = room.players[playerIndex];
      const interrogated = Array.isArray(player.interrogatedSuspects) ? player.interrogatedSuspects : [];
      
      if (interrogated.length >= 2) {
        if (callback) callback({ success: false, error: "Maximum interrogations reached." });
        return;
      }
      
      if (interrogated.includes(data.suspectId)) {
        if (callback) callback({ success: false, error: "Suspect already interrogated." });
        return;
      }
      
      const updateObj = {};
      updateObj[`players.${playerIndex}.interrogatedSuspects`] = [...interrogated, data.suspectId];
      
      const updatedRoomDocument = await roomManager.updateRoom(cleanRoomCode, updateObj);
      const updatedRoom = roomManager.sanitizeRoom(updatedRoomDocument.toObject());
      
      io.to(cleanRoomCode).emit('room:state', updatedRoom);
      
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('game:submit-accusation', async (data) => {
    if (!data || !isSafeString(data.roomCode, 20) || !data.accusation) return;
    const cleanRoomCode = data.roomCode.toUpperCase().trim();
    await gameEngine.submitAccusation(io, cleanRoomCode, socket.id, data.accusation);
  });

  // Disconnect handling
  socket.on('disconnect', async () => {
    console.log(`[Socket] User disconnected: ${socket.id}`);
    
    // Clear rate limiting keys
    socketRateLimits.delete(`${socket.id}:room_create`);
    socketRateLimits.delete(`${socket.id}:room_join`);
    socketRateLimits.delete(`${socket.id}:chat`);
    socketRateLimits.delete(`${socket.id}:puzzle`);

    const affectedRooms = await roomManager.setPlayerOffline(socket.id);
    for (const room of affectedRooms) {
      const activePlayers = room.players.filter(p => !p.isOffline);
      if (room.status !== 'LOBBY' && activePlayers.length < 2) {
        io.to(room.roomCode).emit('session_ended');
        gameEngine.clearTimersForRoom(room.roomCode);
        await roomManager.deleteRoom(room.roomCode);
      } else {
        io.to(room.roomCode).emit('room:state', room);
      }
    }
  });
});

const PORT = process.env.PORT || 4000;

// Connect DB then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`[Server] Running on port ${PORT}`);
  });
});
