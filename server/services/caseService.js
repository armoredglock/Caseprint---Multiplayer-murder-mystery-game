const Case = require('../models/Case');
const Room = require('../models/Room');
const { seedCases } = require('../data/seedCases');

const getPublicCases = async () => {
  try {
    const cases = await Case.find({}, 'caseId title subtitle difficulty playerRange thumbnail themeColor');
    if (cases && cases.length > 0) return cases;
  } catch (err) {
    console.log("DB fetch failed for public cases, using fallback memory cases.");
  }
  // Fallback
  return seedCases.map(c => ({
    caseId: c.caseId,
    title: c.title,
    subtitle: c.subtitle,
    difficulty: c.difficulty,
    playerRange: c.playerRange,
    thumbnail: c.thumbnail,
    themeColor: c.themeColor
  }));
};

const getCaseDataForWave = async (caseId, currentWave) => {
  let fullCase = null;
  try {
    fullCase = await Case.findOne({ caseId });
  } catch (err) {}

  let caseObj = null;
  if (!fullCase) {
    // Fallback to memory
    caseObj = seedCases.find(c => c.caseId === caseId);
    if (!caseObj) return null;
  } else {
    caseObj = fullCase.toObject();
  }
  
  // NEVER send the solution to the client during gameplay
  // Provide all documents immediately to remove the wave system restriction
  const allowedFields = [
    'caseId', 'title', 'subtitle', 'themeColor', 'overview', 'victim', 
    'suspects', 'witnessStatements', 'forensics', 'physicalEvidence', 
    'digitalEvidence', 'timeline'
  ];

  // Filter the case object to only include allowed fields
  const filteredCase = {};
  allowedFields.forEach(field => {
    if (caseObj[field] !== undefined) {
      filteredCase[field] = caseObj[field];
    }
  });

  return filteredCase;
};

const getCaseSolution = async (caseId) => {
  let fullCase = null;
  try {
    fullCase = await Case.findOne({ caseId });
  } catch(err) {}

  if (fullCase) return fullCase.solution;
  
  const memoryCase = seedCases.find(c => c.caseId === caseId);
  return memoryCase ? memoryCase.solution : null;
};

module.exports = {
  getPublicCases,
  getCaseDataForWave,
  getCaseSolution
};
