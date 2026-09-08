const Case = require('../models/Case');
const Room = require('../models/Room');
const { seedCases } = require('../data/seedCases');

const getPublicCases = async () => {
  try {
    // We want to return unique scenarios, not every variation
    const cases = await Case.aggregate([
      {
        $group: {
          _id: "$scenarioId",
          caseId: { $first: "$scenarioId" }, // We use scenarioId as the ID for the lobby
          title: { $first: "$title" },
          subtitle: { $first: "$subtitle" },
          difficulty: { $first: "$difficulty" },
          playerRange: { $first: "$playerRange" },
          thumbnail: { $first: "$thumbnail" },
          themeColor: { $first: "$themeColor" }
        }
      },
      { $project: { _id: 0 } }
    ]);
    if (cases && cases.length > 0) return cases;
  } catch (err) {
    console.log("DB fetch failed for public cases, using fallback memory cases.");
  }
  // Fallback - filter unique by scenarioId
  const uniqueScenarios = {};
  seedCases.forEach(c => {
    if (!uniqueScenarios[c.scenarioId]) {
      uniqueScenarios[c.scenarioId] = {
        caseId: c.scenarioId, // Map scenarioId to caseId for backwards compatibility
        title: c.title,
        subtitle: c.subtitle,
        difficulty: c.difficulty,
        playerRange: c.playerRange,
        thumbnail: c.thumbnail,
        themeColor: c.themeColor
      };
    }
  });
  return Object.values(uniqueScenarios);
};

const filterByWave = (arr, currentWave) => {
  if (!Array.isArray(arr)) return arr;
  return arr.filter(item => !item.wave || item.wave <= currentWave);
};

const getFullCase = async (caseId) => {
  let fullCase = null;
  try {
    fullCase = await Case.findOne({ caseId });
  } catch (err) {}

  if (fullCase) return fullCase.toObject();
  return seedCases.find(c => c.caseId === caseId) || null;
};

const getCaseDataForWave = async (roomCode, currentWave) => {
  let caseObj = null;
  
  // Try to find the room and its overridden case data
  try {
    const room = await Room.findOne({ roomCode });
    if (room && room.caseDataOverride) {
      caseObj = room.caseDataOverride;
    } else if (room) {
      caseObj = await getFullCase(room.caseId);
    }
  } catch (err) {}

  if (!caseObj) return null;
  
  // Base fields that don't need wave filtering
  const filteredCase = {
    caseId: caseObj.caseId,
    scenarioId: caseObj.scenarioId,
    title: caseObj.title,
    subtitle: caseObj.subtitle,
    themeColor: caseObj.themeColor,
    overview: caseObj.overview,
    victim: caseObj.victim
  };

  // Filter arrays by wave
  filteredCase.suspects = filterByWave(caseObj.suspects, currentWave);
  filteredCase.witnessStatements = filterByWave(caseObj.witnessStatements, currentWave);
  filteredCase.physicalEvidence = filterByWave(caseObj.physicalEvidence, currentWave);
  filteredCase.timeline = filterByWave(caseObj.timeline, currentWave);

  if (caseObj.forensics) {
    if (!caseObj.forensics.wave || caseObj.forensics.wave <= currentWave) {
      filteredCase.forensics = caseObj.forensics;
    }
  }

  if (caseObj.digitalEvidence) {
    filteredCase.digitalEvidence = {
      phoneRecords: filterByWave(caseObj.digitalEvidence.phoneRecords, currentWave),
      emails: filterByWave(caseObj.digitalEvidence.emails, currentWave),
      cctvLogs: filterByWave(caseObj.digitalEvidence.cctvLogs, currentWave),
      puzzles: filterByWave(caseObj.digitalEvidence.puzzles || [], currentWave),
      socialMedia: caseObj.digitalEvidence.socialMedia,
      other: caseObj.digitalEvidence.other
    };
  }

  return filteredCase;
};

const getCaseSolution = async (caseId) => {
  const caseObj = await getFullCase(caseId);
  return caseObj ? caseObj.solution : null;
};

module.exports = {
  getPublicCases,
  getCaseDataForWave,
  getCaseSolution,
  getFullCase
};
