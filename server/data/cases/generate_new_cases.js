const fs = require('fs');
const path = require('path');

const cases = {};

// SHADOW OF THE SYNDICATE
const shadowBase = {
  scenarioId: "shadow-of-the-syndicate",
  title: "Shadow of the Syndicate",
  subtitle: "Blood on the Streets",
  difficulty: "Expert",
  playerRange: "4-12 Players",
  thumbnail: "/cases/shadow-syndicate.jpg",
  themeColor: "#333333",
  overview: {
    incidentNumber: "ORG-2024-001",
    date: "2024-12-10",
    time: "23:45",
    location: "The Velvet Lounge, Back Alley",
    jurisdiction: "Organized Crime Division",
    reportingOfficer: "Det. Russo",
    summary: "Salvatore 'The Razor' Maroni, a notorious underboss, was found gunned down in the alley behind a mob-owned nightclub. The weapon used is a signature tommy gun, normally favored by a rival syndicate."
  },
  victim: {
    name: "Salvatore Maroni",
    age: 45,
    occupation: "Underboss",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=SalvatoreMaroni",
    dateOfBirth: "1979-05-15",
    biography: "Ruthless enforcer for the Falcone crime family.",
    knownAssociates: []
  },
  witnessStatements: [
    {
      witnessName: "Tony 'Fingers'",
      age: 38,
      occupation: "Bouncer",
      address: "Local",
      takenBy: "Det. Russo",
      timestamp: "2024-12-11T00:30:00Z",
      body: "I was at the front door. Heard the rattle of a chopper in the back. By the time I got there, Sal was already on the ground.",
      signature: "tony"
    }
  ],
  timeline: [
    { time: "23:30", event: "Sal leaves the VIP room.", critical: false },
    { time: "23:45", event: "Gunshots heard in the alley.", critical: true }
  ],
  digitalEvidence: {
    phoneRecords: [],
    emails: [],
    cctvLogs: [],
    puzzles: [],
    socialMedia: "",
    other: "A burner phone was found in the drain."
  }
};

cases['shadowOfTheSyndicate-v1'] = {
  ...JSON.parse(JSON.stringify(shadowBase)),
  caseId: "shadow-of-the-syndicate-v1",
  suspects: [
    {
      id: "s1", name: "Frankie Falcone", age: 50, occupation: "Mob Boss", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Frankie", relationToVictim: "Boss",
      lastKnownWhereabouts: "VIP Room", alibi: "Drinking.", motiveAssessment: "HIGH", background: "Suspected Sal was turning informant.", status: "PRIME SUSPECT"
    },
    {
      id: "s2", name: "Vinny 'The Icepick'", age: 35, occupation: "Hitman", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vinny", relationToVictim: "Rival",
      lastKnownWhereabouts: "Across town", alibi: "Playing cards.", motiveAssessment: "HIGH", background: "Works for the rival Moretti family.", status: "PERSON OF INTEREST"
    }
  ],
  forensics: {
    labName: "City Forensics", reportNumber: "F-201", examiner: "Dr. Aris", dateOfExam: "2024-12-11",
    externalExam: "Multiple gunshot wounds.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }],
    fingerprints: "Frankie's prints found on the burner phone.", dna: "None.", causeOfDeath: "Gunshot wounds", mannerOfDeath: "Homicide",
    additionalNotes: "The bullets were traced to a gun registered to Frankie's bodyguard, not a rival gang."
  },
  physicalEvidence: [],
  solution: {
    killer: "Frankie Falcone",
    method: "Frankie orchestrated the hit using a rival gang's signature weapon style to start a turf war and eliminate a suspected rat simultaneously.",
    motive: "Paranoia and consolidation of power."
  }
};

cases['shadowOfTheSyndicate-v2'] = {
  ...JSON.parse(JSON.stringify(shadowBase)),
  caseId: "shadow-of-the-syndicate-v2",
  suspects: [
    {
      id: "s1", name: "Det. Mike O'Connor", age: 42, occupation: "Undercover Cop", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=MikeO", relationToVictim: "Informant Handler",
      lastKnownWhereabouts: "Alleyway", alibi: "Claims he arrived after the shooting.", motiveAssessment: "HIGH", background: "Sal was his key informant, but Sal was about to burn him.", status: "PRIME SUSPECT"
    }
  ],
  forensics: {
    labName: "City Forensics", reportNumber: "F-202", examiner: "Dr. Aris", dateOfExam: "2024-12-11",
    externalExam: "Multiple gunshot wounds.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }],
    fingerprints: "Police issue ammunition casings found at scene.", dna: "None.", causeOfDeath: "Gunshot wounds", mannerOfDeath: "Homicide",
    additionalNotes: "The weapon used was actually a police-issued sidearm, masked to sound like a machine gun using a rapid-fire modification."
  },
  physicalEvidence: [],
  solution: {
    killer: "Det. Mike O'Connor",
    method: "Mike shot Sal when a deal went wrong, using a modified weapon to make it sound like a mob hit.",
    motive: "Self-preservation to maintain his cover and avoid internal affairs."
  }
};

cases['shadowOfTheSyndicate-v3'] = {
  ...JSON.parse(JSON.stringify(shadowBase)),
  caseId: "shadow-of-the-syndicate-v3",
  suspects: [
    {
      id: "s1", name: "Don Moretti", age: 65, occupation: "Rival Boss", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=DonMoretti", relationToVictim: "Rival",
      lastKnownWhereabouts: "His mansion", alibi: "Hosting a dinner party.", motiveAssessment: "HIGH", background: "Wanted to send a message without starting an all-out war.", status: "PRIME SUSPECT"
    }
  ],
  forensics: {
    labName: "City Forensics", reportNumber: "F-203", examiner: "Dr. Aris", dateOfExam: "2024-12-11",
    externalExam: "Gunshot wounds are post-mortem.", internalExam: "Severe liver necrosis.", toxicology: [{ substance: "Ricin", result: "Positive", level: "Lethal", reference: "Negative" }],
    fingerprints: "None.", dna: "None.", causeOfDeath: "Ricin poisoning", mannerOfDeath: "Homicide",
    additionalNotes: "The victim was already dead from poisoning when the shots were fired into his body."
  },
  physicalEvidence: [],
  solution: {
    killer: "Don Moretti",
    method: "Moretti poisoned Sal's favorite cigar supply. The gunshots in the alley were a theatrical distraction performed by a hired thug on an already dead body.",
    motive: "A silent assassination disguised as a loud mob hit."
  }
};


// WHISPERS IN THE ALLEY
const whispersBase = {
  scenarioId: "whispers-in-the-alley", title: "Whispers in the Alley", subtitle: "A Crime of Desperation", difficulty: "Easy", playerRange: "2-6 Players", thumbnail: "/cases/whispers-alley.jpg", themeColor: "#4B5320",
  overview: { incidentNumber: "HOM-2024-112", date: "2024-12-12", time: "01:15", location: "Cobblestone Alley, East End", jurisdiction: "East End Precinct", reportingOfficer: "Officer Davis", summary: "A notorious local loan shark, Mickey 'The Tooth' O'Neil, was found dead in an alleyway. His wallet is missing, suggesting a mugging." },
  victim: { name: "Mickey O'Neil", age: 52, occupation: "Loan Shark", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=MickeyO", dateOfBirth: "1972-01-01", biography: "Everyone in the East End owed him money.", knownAssociates: [] },
  witnessStatements: [], timeline: [{ time: "01:00", event: "Mickey leaves his office.", critical: false }, { time: "01:15", event: "Body discovered by a homeless man.", critical: true }],
  digitalEvidence: { phoneRecords: [], emails: [], cctvLogs: [], puzzles: [], socialMedia: "", other: "" }
};

cases['whispersInTheAlley-v1'] = {
  ...JSON.parse(JSON.stringify(whispersBase)), caseId: "whispers-in-the-alley-v1",
  suspects: [{ id: "s1", name: "Arthur Pendelton", age: 45, occupation: "Shop Owner", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=ArthurP", relationToVictim: "Debtor", lastKnownWhereabouts: "His shop", alibi: "Doing inventory.", motiveAssessment: "HIGH", background: "Owed Mickey $50,000.", status: "PRIME SUSPECT" }],
  forensics: { labName: "City Lab", reportNumber: "F-301", examiner: "Dr. Aris", dateOfExam: "2024-12-12", externalExam: "Blunt trauma to the head.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }], fingerprints: "Arthur's prints on the victim's collar.", dna: "None.", causeOfDeath: "Blunt force trauma", mannerOfDeath: "Homicide", additionalNotes: "Weapon appears to be a heavy ledger book." },
  physicalEvidence: [], solution: { killer: "Arthur Pendelton", method: "Arthur confronted Mickey and hit him with his shop's heavy ledger in a moment of panic.", motive: "Desperation to escape his crushing debt." }
};

cases['whispersInTheAlley-v2'] = {
  ...JSON.parse(JSON.stringify(whispersBase)), caseId: "whispers-in-the-alley-v2",
  suspects: [{ id: "s1", name: "Jack 'The Snipe' Kelly", age: 22, occupation: "Petty Thief", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=JackK", relationToVictim: "None", lastKnownWhereabouts: "East End Alleys", alibi: "None.", motiveAssessment: "MEDIUM", background: "Known for violent muggings.", status: "PRIME SUSPECT" }],
  forensics: { labName: "City Lab", reportNumber: "F-302", examiner: "Dr. Aris", dateOfExam: "2024-12-12", externalExam: "Stab wound to the abdomen.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }], fingerprints: "None.", dna: "None.", causeOfDeath: "Exsanguination", mannerOfDeath: "Homicide", additionalNotes: "A rare 1922 silver dollar was found dropped near the body, matching Jack's known stolen stash." },
  physicalEvidence: [], solution: { killer: "Jack 'The Snipe' Kelly", method: "A standard mugging that escalated. Jack stabbed Mickey when he resisted.", motive: "Robbery." }
};

cases['whispersInTheAlley-v3'] = {
  ...JSON.parse(JSON.stringify(whispersBase)), caseId: "whispers-in-the-alley-v3",
  suspects: [{ id: "s1", name: "Eleanor Vance", age: 60, occupation: "Wealthy Heiress", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=EleanorV", relationToVictim: "Secret Benefactor", lastKnownWhereabouts: "Her Estate", alibi: "Sleeping.", motiveAssessment: "HIGH", background: "Mickey was blackmailing her grandson.", status: "PRIME SUSPECT" }],
  forensics: { labName: "City Lab", reportNumber: "F-303", examiner: "Dr. Aris", dateOfExam: "2024-12-12", externalExam: "Single clean stab wound to the heart.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }], fingerprints: "None.", dna: "None.", causeOfDeath: "Stab wound", mannerOfDeath: "Homicide", additionalNotes: "The precision of the strike indicates a highly trained assassin." },
  physicalEvidence: [], solution: { killer: "Eleanor Vance (via hired assassin)", method: "Eleanor hired a professional to eliminate Mickey and stage it as a random alley mugging by stealing his wallet.", motive: "To protect her family's reputation from Mickey's blackmail." }
};


// THE PHANTOM HEIST
const heistBase = {
  scenarioId: "the-phantom-heist", title: "The Phantom Heist", subtitle: "Death in the Museum", difficulty: "Medium", playerRange: "3-8 Players", thumbnail: "/cases/phantom-heist.jpg", themeColor: "#FFD700",
  overview: { incidentNumber: "HST-2024-555", date: "2024-12-20", time: "03:00", location: "City Antiquities Museum", jurisdiction: "Major Crimes", reportingOfficer: "Det. Blake", summary: "The fabled 'Star of the East' diamond was stolen. The night guard, Henry Thomas, was found dead in the vault room." },
  victim: { name: "Henry Thomas", age: 58, occupation: "Night Guard", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=HenryT", dateOfBirth: "1966-03-21", biography: "A dedicated guard months away from retirement.", knownAssociates: [] },
  witnessStatements: [], timeline: [{ time: "02:45", event: "Henry completes his rounds.", critical: false }, { time: "03:00", event: "Vault alarm triggers.", critical: true }],
  digitalEvidence: { phoneRecords: [], emails: [], cctvLogs: [], puzzles: [], socialMedia: "", other: "" }
};

cases['phantomHeist-v1'] = {
  ...JSON.parse(JSON.stringify(heistBase)), caseId: "the-phantom-heist-v1",
  suspects: [{ id: "s1", name: "Dr. Alistair Sterling", age: 52, occupation: "Museum Curator", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=AlistairS", relationToVictim: "Boss", lastKnownWhereabouts: "His office", alibi: "Working late.", motiveAssessment: "HIGH", background: "In massive debt to dangerous people.", status: "PRIME SUSPECT" }],
  forensics: { labName: "City Lab", reportNumber: "F-401", examiner: "Dr. Aris", dateOfExam: "2024-12-20", externalExam: "Blunt force trauma.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }], fingerprints: "Alistair's prints on the glass case.", dna: "None.", causeOfDeath: "Blunt force trauma", mannerOfDeath: "Homicide", additionalNotes: "The glass was broken from the INSIDE out." },
  physicalEvidence: [], solution: { killer: "Dr. Alistair Sterling", method: "Alistair used his access to steal the diamond, replacing it with a fake earlier in the day. He killed Henry when Henry caught him staging the break-in.", motive: "To sell the real diamond to pay off debts." }
};

cases['phantomHeist-v2'] = {
  ...JSON.parse(JSON.stringify(heistBase)), caseId: "the-phantom-heist-v2",
  suspects: [{ id: "s1", name: "The Ghost", age: 30, occupation: "Cat Burglar", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ghost", relationToVictim: "None", lastKnownWhereabouts: "Unknown", alibi: "None.", motiveAssessment: "MEDIUM", background: "A famous international jewel thief.", status: "PRIME SUSPECT" }],
  forensics: { labName: "City Lab", reportNumber: "F-402", examiner: "Dr. Aris", dateOfExam: "2024-12-20", externalExam: "Strangulation marks.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }], fingerprints: "None.", dna: "None.", causeOfDeath: "Asphyxiation", mannerOfDeath: "Homicide", additionalNotes: "A high-tensile climbing wire was used to strangle the victim." },
  physicalEvidence: [], solution: { killer: "The Ghost", method: "The Ghost repelled from the skylight and strangled Henry from behind before silently bypassing the laser grid.", motive: "Theft of the diamond." }
};

cases['phantomHeist-v3'] = {
  ...JSON.parse(JSON.stringify(heistBase)), caseId: "the-phantom-heist-v3",
  suspects: [{ id: "s1", name: "Marcus 'The Vault' Vance", age: 40, occupation: "Mercenary", photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=MarcusV", relationToVictim: "None", lastKnownWhereabouts: "Getaway Van", alibi: "None.", motiveAssessment: "HIGH", background: "Hired muscle for a heist crew.", status: "PRIME SUSPECT" }],
  forensics: { labName: "City Lab", reportNumber: "F-403", examiner: "Dr. Aris", dateOfExam: "2024-12-20", externalExam: "Multiple gunshot wounds.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }], fingerprints: "None.", dna: "None.", causeOfDeath: "Gunshot wounds", mannerOfDeath: "Homicide", additionalNotes: "The bullets used were armor-piercing, completely unnecessary for an unarmored guard." },
  physicalEvidence: [], solution: { killer: "Marcus 'The Vault' Vance", method: "The museum owner hired Marcus's crew to steal the diamond for insurance fraud, instructing them to use non-lethal force. Marcus went rogue and executed the guard anyway.", motive: "Insurance fraud gone wrong." }
};

// Write files
const outputDir = path.join(__dirname);
for (const [key, caseData] of Object.entries(cases)) {
  const fileContent = `module.exports = ${JSON.stringify(caseData, null, 2)};\n`;
  fs.writeFileSync(path.join(outputDir, `${key}.js`), fileContent);
  console.log(`Generated ${key}.js`);
}
