const mongoose = require('mongoose');

const playerResultSchema = new mongoose.Schema({
  name: String,
  socketId: String,
  accusation: {
    suspect: String,
    motive: String,
    method: String
  },
  score: { type: Number, default: 0 },
  correctKiller: { type: Boolean, default: false },
  correctMotive: { type: Boolean, default: false },
  correctMethod: { type: Boolean, default: false },
  speedBonus: { type: Number, default: 0 },
  rank: Number
}, { _id: false });

const gameSessionSchema = new mongoose.Schema({
  roomCode: { type: String, required: true },
  caseId: { type: String, required: true },
  caseTitle: String,
  players: [playerResultSchema],
  winner: {
    name: String,
    score: Number
  },
  playerCount: Number,
  duration: Number, // seconds
  completedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for leaderboard queries
gameSessionSchema.index({ 'players.score': -1 });
gameSessionSchema.index({ completedAt: -1 });

module.exports = mongoose.model('GameSession', gameSessionSchema);
