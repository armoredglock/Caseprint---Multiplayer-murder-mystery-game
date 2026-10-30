module.exports = {
  "scenarioId": "the-phantom-heist",
  "title": "The Phantom Heist",
  "subtitle": "Death in the Museum",
  "difficulty": "Medium",
  "playerRange": "3-8 Players",
  "thumbnail": "/cases/phantom-heist.jpg",
  "themeColor": "#FFD700",
  "overview": {
    "incidentNumber": "HST-2024-555",
    "date": "2024-12-20",
    "time": "03:00",
    "location": "City Antiquities Museum",
    "jurisdiction": "Major Crimes",
    "reportingOfficer": "Det. Blake",
    "summary": "The fabled 'Star of the East' diamond was stolen. The night guard, Henry Thomas, was found dead in the vault room."
  },
  "victim": {
    "name": "Henry Thomas",
    "age": 58,
    "occupation": "Night Guard",
    "photo": "https://i.pravatar.cc/150?u=HenryT",
    "dateOfBirth": "1966-03-21",
    "biography": "A dedicated guard months away from retirement.",
    "knownAssociates": []
  },
  "witnessStatements": [],
  "timeline": [
    {
      "time": "02:45",
      "event": "Henry completes his rounds.",
      "critical": false
    },
    {
      "time": "03:00",
      "event": "Vault alarm triggers.",
      "critical": true
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [],
    "emails": [],
    "cctvLogs": [],
    "puzzles": [],
    "socialMedia": "",
    "other": ""
  },
  "caseId": "the-phantom-heist-v1",
  "suspects": [
    {
      "id": "s1",
      "name": "Dr. Alistair Sterling",
      "age": 52,
      "occupation": "Museum Curator",
      "photo": "https://i.pravatar.cc/150?u=AlistairS",
      "relationToVictim": "Boss",
      "lastKnownWhereabouts": "His office",
      "alibi": "Working late.",
      "motiveAssessment": "HIGH",
      "background": "In massive debt to dangerous people.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Lab",
    "reportNumber": "F-401",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-20",
    "externalExam": "Blunt force trauma.",
    "internalExam": "Normal.",
    "toxicology": [
      {
        "substance": "None",
        "result": "Negative",
        "level": "N/A",
        "reference": "Negative"
      }
    ],
    "fingerprints": "Alistair's prints on the glass case.",
    "dna": "None.",
    "causeOfDeath": "Blunt force trauma",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The glass was broken from the INSIDE out."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Dr. Alistair Sterling",
    "method": "Alistair used his access to steal the diamond, replacing it with a fake earlier in the day. He killed Henry when Henry caught him staging the break-in.",
    "motive": "To sell the real diamond to pay off debts."
  }
};
