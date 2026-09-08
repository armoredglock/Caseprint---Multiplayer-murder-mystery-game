const fs = require('fs');
const path = require('path');

const casesDir = path.join(__dirname, '../data/cases');

// CANVAS OF BLOOD - BASE OBJECT
const canvasBase = {
  scenarioId: "canvas-of-blood",
  title: "Canvas of Blood",
  subtitle: "A Masterpiece of Murder",
  difficulty: "Medium",
  playerRange: "2-8 Players",
  thumbnail: "/cases/canvas-of-blood.jpg",
  themeColor: "#5E2129",
  overview: {
    incidentNumber: "ART-2024-001",
    date: "2024-12-05",
    time: "02:00",
    location: "The Vanguard Gallery, Downtown",
    jurisdiction: "Art Crimes & Homicide Division",
    reportingOfficer: "Det. Vance",
    summary: "At 02:00, the silent alarm at The Vanguard Gallery was tripped. Police arrived to find the gallery owner, Julian Sterling, bludgeoned to death in the main exhibition hall. The centerpiece of the exhibition, a priceless 17th-century painting titled 'The Crimson Saint', has been cut from its frame."
  },
  victim: {
    name: "Julian Sterling",
    age: 55,
    occupation: "Gallery Owner",
    photo: "https://i.pravatar.cc/150?u=JulianSterling",
    dateOfBirth: "1969-08-22",
    biography: "A ruthless art dealer known for acquiring disputed artifacts.",
    knownAssociates: []
  },
  witnessStatements: [
    { witnessName: "Night Watchman", age: 62, occupation: "Guard", address: "Local", takenBy: "Det. Vance", timestamp: "2024-12-05T02:15:00Z", body: "I was in the basement security room. The cameras loop, I swear they do. I didn't see anyone enter. Just heard the glass smash.", signature: "watchman" }
  ],
  timeline: [
    { time: "00:30", event: "Julian remains in the gallery after the closing party.", linkedEvidence: [], critical: false },
    { time: "02:00", event: "Silent alarm tripped.", linkedEvidence: [], critical: true }
  ],
  digitalEvidence: {
    phoneRecords: [],
    emails: [
      { from: "j.sterling@vanguard.com", to: "insurance@lloyds.com", subject: "Policy Update", date: "2024-12-04 15:00", body: "Please confirm the policy on 'The Crimson Saint' is active for $15 million.", attachments: [], flagged: true }
    ],
    cctvLogs: [
      { camera: "MAIN HALL", timestamp: "01:50:00", note: "Feed loops. A static image is being broadcast.", flagged: true }
    ],
    puzzles: [],
    socialMedia: "",
    other: ""
  }
};

// Canvas V1 (Insurance Fraud)
let c1 = JSON.parse(JSON.stringify(canvasBase));
c1.caseId = 'canvas-of-blood-v1';
c1.suspects = [
  { id: 's1', name: 'Sebastian Vance', age: 40, occupation: 'Business Partner', photo: 'https://i.pravatar.cc/150?u=SebastianVance', relationToVictim: 'Co-owner', lastKnownWhereabouts: 'Home', alibi: 'Asleep.', motiveAssessment: 'HIGH', background: 'The gallery is heavily in debt. Sebastian is the sole beneficiary of the business insurance.', status: 'PRIME SUSPECT' },
  { id: 's2', name: 'Chloe Price', age: 28, occupation: 'Artist', photo: 'https://i.pravatar.cc/150?u=ChloePrice', relationToVictim: 'Rejected Artist', lastKnownWhereabouts: 'Her studio', alibi: 'Painting all night.', motiveAssessment: 'MEDIUM', background: 'Julian ruined her career in an editorial last month.', status: 'SUSPECT' }
];
c1.forensics = {
  labName: "City Forensics", reportNumber: "F-100", examiner: "Dr. Thorne", dateOfExam: "2024-12-05",
  externalExam: "Blunt force trauma to the occipital lobe.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }],
  fingerprints: "Sebastian's prints found on the frame of the missing painting.", dna: "None.", causeOfDeath: "Blunt force trauma", mannerOfDeath: "Homicide", additionalNotes: "The cut on the painting frame was precise, requiring a surgical scalpel or a professional framer's knife."
};
c1.physicalEvidence = [
  { tagNumber: "EV-001", description: "Bronze Sculpture", locationFound: "Next to body", photo: "/cases/ev-sculpture.jpg", significance: "Murder weapon.", chainOfCustody: [] }
];
c1.solution = { killer: 'Sebastian Vance', method: 'Sebastian looped the CCTV, bludgeoned Julian with a sculpture, and cut the painting out to claim the $15 million insurance.', motive: 'Financial ruin. The gallery was bankrupt.' };
fs.writeFileSync(path.join(casesDir, 'canvasOfBlood-v1.js'), 'module.exports = ' + JSON.stringify(c1, null, 2) + ';');

// Canvas V2 (Crime of Passion)
let c2 = JSON.parse(JSON.stringify(canvasBase));
c2.caseId = 'canvas-of-blood-v2';
c2.suspects = [
  { id: 's1', name: 'Sebastian Vance', age: 40, occupation: 'Business Partner', photo: 'https://i.pravatar.cc/150?u=SebastianVance', relationToVictim: 'Co-owner', lastKnownWhereabouts: 'Home', alibi: 'Asleep.', motiveAssessment: 'LOW', background: 'The gallery is heavily in debt. Sebastian is the sole beneficiary of the business insurance.', status: 'ALIBI VERIFIED' },
  { id: 's2', name: 'Chloe Price', age: 28, occupation: 'Artist', photo: 'https://i.pravatar.cc/150?u=ChloePrice', relationToVictim: 'Rejected Artist', lastKnownWhereabouts: 'The Vanguard Gallery Alley', alibi: 'Claims she was just walking by.', motiveAssessment: 'HIGH', background: 'Julian ruined her career in an editorial last month. She has a history of violent outbursts.', status: 'PRIME SUSPECT' }
];
c2.forensics = {
  labName: "City Forensics", reportNumber: "F-101", examiner: "Dr. Thorne", dateOfExam: "2024-12-05",
  externalExam: "Multiple stab wounds to the chest.", internalExam: "Normal.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }],
  fingerprints: "Chloe's prints found on a discarded palette knife near the body.", dna: "Chloe's hair found on the victim's jacket.", causeOfDeath: "Exsanguination due to stab wounds", mannerOfDeath: "Homicide", additionalNotes: "The cuts on the painting frame are jagged and frantic."
};
c2.physicalEvidence = [
  { tagNumber: "EV-001", description: "Palette Knife", locationFound: "Next to body", photo: "/cases/ev-sculpture.jpg", significance: "Murder weapon.", chainOfCustody: [] }
];
c2.solution = { killer: 'Chloe Price', method: 'Chloe confronted Julian in a rage, stabbed him with her palette knife, and then frantically cut the painting to make it look like a botched robbery.', motive: 'Revenge for ruining her artistic career.' };
fs.writeFileSync(path.join(casesDir, 'canvasOfBlood-v2.js'), 'module.exports = ' + JSON.stringify(c2, null, 2) + ';');


// ECHOES IN THE CODE - BASE OBJECT
const echoesBase = {
  scenarioId: "echoes-in-code",
  title: "Echoes in the Code",
  subtitle: "A Digital Assassination",
  difficulty: "Hard",
  playerRange: "4-10 Players",
  thumbnail: "/cases/echoes-in-code.jpg",
  themeColor: "#00FF00",
  overview: {
    incidentNumber: "CYB-2024-991",
    date: "2024-11-30",
    time: "04:15",
    location: "Underground Server Farm, District 12",
    jurisdiction: "Cyber Crimes & Homicide",
    reportingOfficer: "Det. Lin",
    summary: "At 04:15, a massive DDoS attack crippled the city's financial sector. Simultaneously, notorious gray-hat hacker 'ZeroDay' (real name: Eli Vance) was found dead in his underground server farm, electrocuted by his own rig."
  },
  victim: {
    name: "Eli 'ZeroDay' Vance",
    age: 29,
    occupation: "Hacker",
    photo: "https://i.pravatar.cc/150?u=EliVance",
    dateOfBirth: "1995-10-10",
    biography: "A legendary hacker known for breaching impenetrable systems.",
    knownAssociates: []
  },
  witnessStatements: [],
  timeline: [
    { time: "04:00", event: "City-wide cyber attack begins.", linkedEvidence: [], critical: true },
    { time: "04:15", event: "Power surge recorded at server farm. Victim dies.", linkedEvidence: [], critical: true }
  ],
  digitalEvidence: {
    phoneRecords: [],
    emails: [],
    cctvLogs: [],
    puzzles: [],
    socialMedia: "",
    other: "The server logs are heavily encrypted."
  }
};

// Echoes V1 (Corporate Hit)
let e1 = JSON.parse(JSON.stringify(echoesBase));
e1.caseId = 'echoes-in-code-v1';
e1.suspects = [
  { id: 's1', name: 'Marcus Thorne', age: 50, occupation: 'CEO, OmniCorp', photo: 'https://i.pravatar.cc/150?u=MarcusThorne', relationToVictim: 'Blackmail Target', lastKnownWhereabouts: 'Private Jet', alibi: 'In the air during the attack.', motiveAssessment: 'HIGH', background: 'Eli was blackmailing OmniCorp with stolen data.', status: 'PRIME SUSPECT' },
  { id: 's2', name: 'Cipher', age: 24, occupation: 'Hacker Protégé', photo: 'https://i.pravatar.cc/150?u=CipherHacker', relationToVictim: 'Student', lastKnownWhereabouts: 'Online', alibi: 'Streaming on Twitch.', motiveAssessment: 'LOW', background: 'Eli taught Cipher everything.', status: 'SUSPECT' }
];
e1.forensics = {
  labName: "Cyber Forensics", reportNumber: "CF-20", examiner: "Dr. Aris", dateOfExam: "2024-11-30",
  externalExam: "Severe electrical burns on the hands.", internalExam: "Cardiac arrest.", toxicology: [{ substance: "None", result: "Negative", level: "N/A", reference: "Negative" }],
  fingerprints: "None.", dna: "None.", causeOfDeath: "Electrocution", mannerOfDeath: "Homicide", additionalNotes: "The power surge was intentionally routed through the keyboard via a remote hardware exploit."
};
e1.physicalEvidence = [];
e1.digitalEvidence.puzzles = [
  { id: 'puz-1', title: 'The Kill Switch', description: 'We intercepted the packet that triggered the surge. It is Hex encoded.', data: '4F 6D 6E 69 43 6F 72 70 20 53 65 63 75 72 69 74 79', format: 'HEX', hint: 'Convert Hex to Text.' }
];
e1.solution = { killer: 'Marcus Thorne (OmniCorp Security)', method: "OmniCorp mercenaries remotely triggered a hardware exploit in Eli's rig, causing a lethal power surge while he was hacking them.", motive: 'To silence Eli and stop the blackmail.' };
fs.writeFileSync(path.join(casesDir, 'echoesInCode-v1.js'), 'module.exports = ' + JSON.stringify(e1, null, 2) + ';');

// Echoes V2 (Protégé Betrayal)
let e2 = JSON.parse(JSON.stringify(echoesBase));
e2.caseId = 'echoes-in-code-v2';
e2.suspects = [
  { id: 's1', name: 'Marcus Thorne', age: 50, occupation: 'CEO, OmniCorp', photo: 'https://i.pravatar.cc/150?u=MarcusThorne', relationToVictim: 'Blackmail Target', lastKnownWhereabouts: 'Private Jet', alibi: 'In the air during the attack.', motiveAssessment: 'LOW', background: 'Eli was blackmailing OmniCorp with stolen data.', status: 'ALIBI VERIFIED' },
  { id: 's2', name: 'Cipher', age: 24, occupation: 'Hacker Protégé', photo: 'https://i.pravatar.cc/150?u=CipherHacker', relationToVictim: 'Student', lastKnownWhereabouts: 'Unknown', alibi: 'Fake Twitch stream (pre-recorded).', motiveAssessment: 'HIGH', background: 'Cipher wanted to become the #1 hacker in the world, and Eli was in the way.', status: 'PRIME SUSPECT' }
];
e2.forensics = {
  labName: "Cyber Forensics", reportNumber: "CF-21", examiner: "Dr. Aris", dateOfExam: "2024-11-30",
  externalExam: "Lethal injection mark on the neck.", internalExam: "Cardiac arrest.", toxicology: [{ substance: "Succinylcholine", result: "Positive", level: "Lethal", reference: "Negative" }],
  fingerprints: "Cipher's prints found on the cooling rack.", dna: "None.", causeOfDeath: "Lethal Injection", mannerOfDeath: "Homicide", additionalNotes: "The electrocution was staged post-mortem."
};
e2.physicalEvidence = [];
e2.digitalEvidence.puzzles = [
  { id: 'puz-1', title: 'The Fake Log', description: 'A base64 encoded log file left on the server.', data: 'SSBhbSBDaXBoZXIuIEkgYW0gdGhlIGJlc3Qgbm93Lg==', format: 'BASE64', hint: 'Convert Base64 to Text.' }
];
e2.solution = { killer: 'Cipher', method: "Cipher snuck into the server farm, injected Eli with a paralytic, staged the electrocution, and launched the attack using Eli's rig to frame OmniCorp.", motive: 'Jealousy and a desire for absolute notoriety in the hacker underground.' };
fs.writeFileSync(path.join(casesDir, 'echoesInCode-v2.js'), 'module.exports = ' + JSON.stringify(e2, null, 2) + ';');

console.log('Successfully generated Canvas and Echoes cases (V1 & V2)');
