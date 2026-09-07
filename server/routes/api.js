const express = require('express');
const router = express.Router();
const caseService = require('../services/caseService');
const GameSession = require('../models/GameSession');

// Get all cases for the lobby
router.get('/cases', async (req, res) => {
  try {
    const cases = await caseService.getPublicCases();
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
});

// Get leaderboard/stats (for future use)
router.get('/stats/recent', async (req, res) => {
  try {
    const recentGames = await GameSession.find()
      .sort({ completedAt: -1 })
      .limit(10)
      .select('roomCode caseTitle winner duration completedAt playerCount');
    res.json(recentGames);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
