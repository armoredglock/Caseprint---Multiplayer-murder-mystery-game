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
const canvasOfBloodV3 = require('./cases/canvasOfBlood-v3');
const echoesInCodeV1 = require('./cases/echoesInCode-v1');
const echoesInCodeV2 = require('./cases/echoesInCode-v2');
const echoesInCodeV3 = require('./cases/echoesInCode-v3');

// New Cases
const shadowV1 = require('./cases/shadowOfTheSyndicate-v1');
const shadowV2 = require('./cases/shadowOfTheSyndicate-v2');
const shadowV3 = require('./cases/shadowOfTheSyndicate-v3');
const whispersV1 = require('./cases/whispersInTheAlley-v1');
const whispersV2 = require('./cases/whispersInTheAlley-v2');
const whispersV3 = require('./cases/whispersInTheAlley-v3');
const phantomV1 = require('./cases/phantomHeist-v1');
const phantomV2 = require('./cases/phantomHeist-v2');
const phantomV3 = require('./cases/phantomHeist-v3');

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
  canvasOfBloodV3,
  echoesInCodeV1,
  echoesInCodeV2,
  echoesInCodeV3,
  shadowV1,
  shadowV2,
  shadowV3,
  whispersV1,
  whispersV2,
  whispersV3,
  phantomV1,
  phantomV2,
  phantomV3
];

module.exports = { seedCases };
