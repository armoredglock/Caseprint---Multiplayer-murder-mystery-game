const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  socketId: String,
  name: String,
  avatar: { type: String, default: '' },
  joinedAt: { type: Date, default: Date.now },
  isHost: { type: Boolean, default: false },
  hasAccused: { type: Boolean, default: false }
}, { _id: false });

const accusationSchema = new mongoose.Schema({
  playerName: String,
  socketId: String,
  suspect: String,
  motive: String,
  method: String,
  submittedAt: { type: Date, default: Date.now }
}, { _id: false });

const roomSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true, index: true },
  hostSocketId: String,
  hostName: String,
  scenarioId: { type: String, required: true },
  caseId: { type: String, required: true },
  password: { type: String, default: '' },
  players: { type: [playerSchema], default: [] },
  maxPlayers: { type: Number, default: 10 },
  status: {
    type: String,
    enum: ['LOBBY', 'IN_GAME', 'FINISHED'],
    default: 'LOBBY'
  },
  phase: {
    type: String,
    enum: ['BRIEFING', 'INVESTIGATION', 'ACCUSATION', 'VERDICT', null],
    default: null
  },
  currentWave: { type: Number, default: 0 },
  accusations: { type: [accusationSchema], default: [] },
  phaseStartedAt: Date,
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
    index: { expires: 0 } // TTL index — auto-delete when expired
  }
});

module.exports = mongoose.model('Room', roomSchema);
