const mongoose = require('mongoose');

const evidenceMarkerSchema = new mongoose.Schema({
  id: String,
  item: String,
  location: String
}, { _id: false });

const associateSchema = new mongoose.Schema({
  name: String,
  relation: String,
  photo: String
}, { _id: false });

const suspectSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  occupation: String,
  photo: String,
  relationToVictim: String,
  lastKnownWhereabouts: String,
  alibi: String,
  motiveAssessment: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'UNKNOWN'] },
  background: String,
  status: { type: String, enum: ['PERSON OF INTEREST', 'ALIBI UNVERIFIED', 'CLEARED', 'PRIME SUSPECT', 'ANOMALY'] },
  wave: { type: Number, default: 1 }
}, { _id: false });

const witnessStatementSchema = new mongoose.Schema({
  witnessName: String,
  age: Number,
  occupation: String,
  address: String,
  takenBy: String,
  timestamp: String,
  body: String,
  signature: String,
  wave: { type: Number, default: 1 }
}, { _id: false });

const toxicologyEntrySchema = new mongoose.Schema({
  substance: String,
  result: String,
  level: String,
  reference: String
}, { _id: false });

const physicalEvidenceSchema = new mongoose.Schema({
  tagNumber: String,
  description: String,
  locationFound: String,
  photo: String,
  significance: String,
  chainOfCustody: [{
    officer: String,
    date: String,
    action: String
  }],
  wave: { type: Number, default: 1 }
}, { _id: false });

const phoneRecordSchema = new mongoose.Schema({
  from: String,
  to: String,
  time: String,
  duration: String,
  type: { type: String, enum: ['INCOMING', 'OUTGOING', 'MISSED', 'TEXT'] },
  note: String,
  flagged: { type: Boolean, default: false },
  wave: { type: Number, default: 1 }
}, { _id: false });

const emailSchema = new mongoose.Schema({
  from: String,
  to: String,
  subject: String,
  date: String,
  body: String,
  attachments: [String],
  flagged: { type: Boolean, default: false },
  wave: { type: Number, default: 1 }
}, { _id: false });

const cctvLogSchema = new mongoose.Schema({
  camera: String,
  timestamp: String,
  note: String,
  flagged: { type: Boolean, default: false },
  wave: { type: Number, default: 1 }
}, { _id: false });

const timelineEventSchema = new mongoose.Schema({
  time: String,
  event: String,
  linkedEvidence: [String],
  critical: { type: Boolean, default: false },
  wave: { type: Number, default: 1 }
}, { _id: false });

const puzzleSchema = new mongoose.Schema({
  title: String,
  content: String,
  encodedType: String, // e.g. "Caesar Cipher", "Base64", "Hex"
  clue: String,
  wave: { type: Number, default: 1 }
}, { _id: false });

const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true, index: true },
  scenarioId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  subtitle: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  playerRange: {
    min: { type: Number, default: 2 },
    max: { type: Number, default: 10 }
  },
  thumbnail: String,
  themeColor: String,

  overview: {
    incidentNumber: String,
    date: String,
    time: String,
    location: String,
    jurisdiction: String,
    reportingOfficer: String,
    badgeNumber: String,
    summary: String,
    classification: String
  },

  crimeScene: {
    description: String,
    sketch: String,
    evidenceMarkers: [evidenceMarkerSchema],
    conditions: String,
    weatherAtTime: String
  },

  victim: {
    name: String,
    age: Number,
    occupation: String,
    photo: String,
    dateOfBirth: String,
    address: String,
    biography: String,
    recentActivity: String,
    knownAssociates: [associateSchema]
  },

  suspects: [suspectSchema],

  witnessStatements: [witnessStatementSchema],

  forensics: {
    labName: String,
    reportNumber: String,
    examiner: String,
    dateOfExam: String,
    externalExam: String,
    internalExam: String,
    toxicology: [toxicologyEntrySchema],
    fingerprints: String,
    dna: String,
    causeOfDeath: String,
    mannerOfDeath: String,
    additionalNotes: String
  },

  physicalEvidence: [physicalEvidenceSchema],

  digitalEvidence: {
    phoneRecords: [phoneRecordSchema],
    emails: [emailSchema],
    cctvLogs: [cctvLogSchema],
    socialMedia: String,
    other: String,
    puzzles: [puzzleSchema]
  },

  timeline: [timelineEventSchema],

  clueWaves: {
    wave1: [String],
    wave2: [String],
    wave3: [String]
  },

  solution: {
    killer: String,
    method: String,
    motive: String,
    fullExplanation: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Case', caseSchema);
