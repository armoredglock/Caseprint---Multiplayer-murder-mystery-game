const { generateRandomPuzzles } = require('../services/puzzleGenerator');

const puzzles = generateRandomPuzzles(3);
console.log(JSON.stringify(puzzles, null, 2));
