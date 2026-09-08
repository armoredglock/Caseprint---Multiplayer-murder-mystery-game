const fs = require('fs');
const path = require('path');

const casesDir = path.join(__dirname, '../data/cases');

// 1. Crimson Cipher V2
let cc = JSON.parse(JSON.stringify(require(path.join(casesDir, 'crimsonCipher.js'))));
cc.caseId = 'crimson-cipher-v2';
cc.suspects.find(s => s.name === 'Det. James Miller').motiveAssessment = 'HIGH';
cc.suspects.find(s => s.name === 'Det. James Miller').status = 'PRIME SUSPECT';
cc.suspects.find(s => s.name === 'Eleanor Vance').motiveAssessment = 'LOW';
cc.suspects.find(s => s.name === 'Eleanor Vance').status = 'ALIBI VERIFIED';
cc.forensics.fingerprints = "A bloody fingerprint on the victim's collar belongs to Arthur Vance. However, a hair found clutched in the victim's hand matches Det. James Miller.";
cc.digitalEvidence.puzzles[0] = {
  id: 'puz-002', 
  title: 'The Bloody Wall Cipher', 
  description: 'The killer left this message painted in blood on the wall. It appears to be Base64.', 
  data: 'VGhlIHBvbGljZSBhcmUgaW5jb21wZXRlbnQuIEV2ZW4gd2hlbiB0aGUga2lsbGVyIGlzIHJpZ2h0IGluIGZyb250IG9mIHRoZW0sIHRoZXkgaWdub3JlIHRoZSB0cnV0aC4=', 
  format: 'BASE64', 
  hint: 'Convert Base64 to Text.'
};
cc.digitalEvidence.other = "A hidden folder named 'Crimson' revealed that Arthur had definitive proof that Det. Miller was staging the Crimson Killer murders to cover up his own cartel hits.";
cc.solution = {
  killer: 'Det. James Miller',
  method: "Miller paralyzed Arthur with Tetrodotoxin, then brutally mutilated him to match the M.O. of the 'Crimson Killer' he was supposed to be hunting.",
  motive: 'Arthur Vance had discovered Miller was a dirty cop and was going to publish the exposé on Sunday.'
};
fs.writeFileSync(path.join(casesDir, 'crimsonCipher-v2.js'), 'module.exports = ' + JSON.stringify(cc, null, 2) + ';');

// 2. Midnight Manor V2
let mm = JSON.parse(JSON.stringify(require(path.join(casesDir, 'midnightManor.js'))));
mm.caseId = 'midnight-manor-v2';
mm.suspects.find(s => s.name === 'Beatrice Blackwood').motiveAssessment = 'HIGH';
mm.suspects.find(s => s.name === 'Beatrice Blackwood').status = 'PRIME SUSPECT';
mm.suspects.find(s => s.name === 'Jeeves').motiveAssessment = 'LOW';
mm.suspects.find(s => s.name === 'Jeeves').status = 'ALIBI VERIFIED';
mm.forensics.causeOfDeath = 'Cardiac Arrest secondary to Aconite Poisoning.';
mm.forensics.externalExam = 'A minor bump on the head (blunt force trauma), but insufficient to cause death. The victim was already dead when he fell and struck his head on the desk.';
mm.forensics.toxicology = [ { substance: 'Aconite (Wolfsbane)', result: 'Positive', level: 'Lethal', reference: 'Negative' } ];
mm.physicalEvidence[0] = { tagNumber: 'EV-001', description: 'Small glass vial', locationFound: 'In the fireplace ashes', photo: '/cases/ev-vial.jpg', significance: 'Contains trace amounts of Aconite.', chainOfCustody: [{ officer: 'Crime Scene Tech', date: '2024-11-01 01:00', action: 'Recovered' }] };
mm.timeline[1].event = "Power goes out. Beatrice slips Aconite into Lord Blackwood's tea.";
mm.solution = {
  killer: 'Beatrice Blackwood',
  method: "Beatrice used the darkness of the power outage to slip Aconite into her uncle's tea. When the lights came back on, he suffered a heart attack and hit his head on the desk, explaining the thump Jeeves heard.",
  motive: "Desperate for money to pay off her gambling debts, she couldn't wait for him to rewrite the will."
};
fs.writeFileSync(path.join(casesDir, 'midnightManor-v2.js'), 'module.exports = ' + JSON.stringify(mm, null, 2) + ';');
