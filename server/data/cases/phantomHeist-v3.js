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
  "caseId": "the-phantom-heist-v3",
  "suspects": [
    {
      "id": "s1",
      "name": "Marcus 'The Vault' Vance",
      "age": 40,
      "occupation": "Mercenary",
      "photo": "https://i.pravatar.cc/150?u=MarcusV",
      "relationToVictim": "None",
      "lastKnownWhereabouts": "Getaway Van",
      "alibi": "None.",
      "motiveAssessment": "HIGH",
      "background": "Hired muscle for a heist crew.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Lab",
    "reportNumber": "F-403",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-20",
    "externalExam": "Multiple gunshot wounds.",
    "internalExam": "Normal.",
    "toxicology": [
      {
        "substance": "None",
        "result": "Negative",
        "level": "N/A",
        "reference": "Negative"
      }
    ],
    "fingerprints": "None.",
    "dna": "None.",
    "causeOfDeath": "Gunshot wounds",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The bullets used were armor-piercing, completely unnecessary for an unarmored guard."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Marcus 'The Vault' Vance",
    "method": "The museum owner hired Marcus's crew to steal the diamond for insurance fraud, instructing them to use non-lethal force. Marcus went rogue and executed the guard anyway.",
    "motive": "Insurance fraud gone wrong."
  }
};
