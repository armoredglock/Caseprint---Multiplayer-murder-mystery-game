const boardroomV1 = require('./cases/boardroom-v1');
const boardroomV2 = require('./cases/boardroom-v2');
const crimsonCipher = require('./cases/crimsonCipher');
const midnightManor = require('./cases/midnightManor');

const seedCases = [
  boardroomV1,
  boardroomV2,
  crimsonCipher,
  midnightManor
];

module.exports = { seedCases };
