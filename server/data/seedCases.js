const boardroomV1 = require('./cases/boardroom-v1');
const boardroomV2 = require('./cases/boardroom-v2');
const boardroomV3 = require('./cases/boardroom-v3');
const crimsonCipherV1 = require('./cases/crimsonCipher');
const crimsonCipherV2 = require('./cases/crimsonCipher-v2');
const crimsonCipherV3 = require('./cases/crimsonCipher-v3');
const midnightManorV1 = require('./cases/midnightManor');
const midnightManorV2 = require('./cases/midnightManor-v2');
const midnightManorV3 = require('./cases/midnightManor-v3');
const canvasOfBloodV1 = require('./cases/canvasOfBlood-v1');
const canvasOfBloodV2 = require('./cases/canvasOfBlood-v2');
const echoesInCodeV1 = require('./cases/echoesInCode-v1');
const echoesInCodeV2 = require('./cases/echoesInCode-v2');

const seedCases = [
  boardroomV1,
  boardroomV2,
  boardroomV3,
  crimsonCipherV1,
  crimsonCipherV2,
  crimsonCipherV3,
  midnightManorV1,
  midnightManorV2,
  midnightManorV3,
  canvasOfBloodV1,
  canvasOfBloodV2,
  echoesInCodeV1,
  echoesInCodeV2
];

module.exports = { seedCases };
