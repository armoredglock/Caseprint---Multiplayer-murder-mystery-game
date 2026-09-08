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

// Setup CORS - allow Vercel frontend in prod, localhost in dev
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173'] : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/api/seed', async (req, res) => {
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

io.on('connection', (socket) => {
  console.log(`[Socket] User connected: ${socket.id}`);

  // Room Management
  socket.on('room:create', async (data, callback) => {
    try {
      const roomCode = await roomManager.createRoom(socket.id, data.playerName, data.caseId, data.password);
      socket.join(roomCode);
      const roomState = await roomManager.getRoom(roomCode);
      if (callback) callback({ success: true, roomCode, room: roomState });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('room:join', async (data, callback) => {
    try {
      const room = await roomManager.joinRoom(data.roomCode, socket.id, data.playerName, data.password);
      socket.join(data.roomCode);
      
      // Notify others in room
      io.to(data.roomCode).emit('room:player-joined', { players: room.players });
      
      if (callback) callback({ success: true, room });

      // If room is already in game (e.g. player reconnects or refreshes), send them the current case data!
      if (room.status === 'IN_GAME' || room.status === 'FINISHED') {
        const caseService = require('./services/caseService');
        const caseData = await caseService.getCaseDataForWave(data.roomCode, room.currentWave || 1);
        socket.emit('game:case-data', { wave: room.currentWave || 1, caseData });
      }
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('room:kick', async (data, callback) => {
    try {
      const { roomCode, targetSocketId } = data;
      const { room } = await roomManager.kickPlayer(roomCode, socket.id, targetSocketId);
      
      // Notify the kicked player directly
      io.to(targetSocketId).emit('kicked_from_room');
      
      // Remove them from the socket.io room
      const targetSocket = io.sockets.sockets.get(targetSocketId);
      if (targetSocket) {
        targetSocket.leave(roomCode);
      }

      // Check if we should end the game
      const activePlayers = room.players.filter(p => !p.isOffline);
      if (room.status !== 'LOBBY' && activePlayers.length < 2) {
        io.to(roomCode).emit('session_ended');
        gameEngine.clearTimersForRoom(roomCode);
        await roomManager.deleteRoom(roomCode);
      } else {
        // Notify others in room
        io.to(roomCode).emit('room:player-joined', { players: room.players });
      }
      
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('room:leave', async (data, callback) => {
    try {
      const result = await roomManager.leaveRoom(data.roomCode, socket.id);
      if (result) {
        socket.leave(data.roomCode);
        if (!result.destroyed) {
          const activePlayers = result.room.players.filter(p => !p.isOffline);
          if (result.room.status !== 'LOBBY' && activePlayers.length < 2) {
            io.to(data.roomCode).emit('session_ended');
            gameEngine.clearTimersForRoom(data.roomCode);
            await roomManager.deleteRoom(data.roomCode);
          } else {
            io.to(data.roomCode).emit('room:player-joined', { players: result.room.players });
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
      const room = await roomManager.changePlayerName(roomCode, socket.id, newName);
      io.to(roomCode).emit('room:state', room);
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ error: err.message });
    }
  });

  socket.on('room:end', async (data, callback) => {
    try {
      const room = await roomManager.getRoom(data.roomCode);
      if (room && room.hostSocketId === socket.id) {
        io.to(data.roomCode).emit('session_ended');
        gameEngine.clearTimersForRoom(data.roomCode);
        await roomManager.deleteRoom(data.roomCode);
      }
      if (callback) callback({ success: true });
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  // Chat System
  socket.on('chat:message', async (data) => {
    const room = await roomManager.getRoom(data.roomCode);
    if (!room) return;
    
    const player = room.players.find(p => p.socketId === socket.id);
    if (!player) return;

    io.to(data.roomCode).emit('chat:broadcast', {
      sender: player.name,
      message: data.message,
      timestamp: new Date(),
      isHost: player.isHost
    });
  });

  // Game Flow
  socket.on('game:start', async (data) => {
    const room = await roomManager.getRoom(data.roomCode);
    if (!room || room.hostSocketId !== socket.id) return;
    
    await gameEngine.startGame(io, data.roomCode, data.caseId);
  });

  socket.on('game:advance-phase', async (data) => {
    const room = await roomManager.getRoom(data.roomCode);
    if (!room || room.hostSocketId !== socket.id) return;
    
    if (room.phase === 'INVESTIGATION') {
      await gameEngine.advancePhase(io, data.roomCode, 'INVESTIGATION');
    }
  });

  socket.on('game:submit-puzzle', async (data, callback) => {
    try {
      const room = await roomManager.getRoom(data.roomCode);
      if (!room) throw new Error("Room not found");
      const player = room.players.find(p => p.socketId === socket.id);
      
      const result = await gameEngine.solvePuzzle(io, data.roomCode, socket.id, data.puzzleId, data.answer, player?.name);
      if (callback) callback(result);
    } catch (err) {
      if (callback) callback({ success: false, error: err.message });
    }
  });

  socket.on('game:submit-accusation', async (data) => {
    await gameEngine.submitAccusation(io, data.roomCode, socket.id, data.accusation);
  });

  // Disconnect handling
  socket.on('disconnect', async () => {
    console.log(`[Socket] User disconnected: ${socket.id}`);
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
