const Case = require('../models/Case');
const Room = require('../models/Room');

const getPublicCases = async () => {
  // Only return metadata for the lobby (no spoilers!)
  return await Case.find({}, 'caseId title subtitle difficulty playerRange thumbnail themeColor');
};

const getCaseDataForWave = async (caseId, currentWave) => {
  const fullCase = await Case.findOne({ caseId });
  if (!fullCase) return null;

  // Clone the object so we can delete fields safely
  const caseObj = fullCase.toObject();
  
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
    // Handle nested fields like 'suspects.basic' if we implemented that
    if (caseObj[field] !== undefined) {
      filteredCase[field] = caseObj[field];
    }
  });

  return filteredCase;
};

const getCaseSolution = async (caseId) => {
  const fullCase = await Case.findOne({ caseId });
  return fullCase ? fullCase.solution : null;
};

module.exports = {
  getPublicCases,
  getCaseDataForWave,
  getCaseSolution
};
