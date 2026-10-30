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
  "caseId": "the-phantom-heist-v2",
  "suspects": [
    {
      "id": "s1",
      "name": "The Ghost",
      "age": 30,
      "occupation": "Cat Burglar",
      "photo": "https://i.pravatar.cc/150?u=Ghost",
      "relationToVictim": "None",
      "lastKnownWhereabouts": "Unknown",
      "alibi": "None.",
      "motiveAssessment": "MEDIUM",
      "background": "A famous international jewel thief.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Lab",
    "reportNumber": "F-402",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-20",
    "externalExam": "Strangulation marks.",
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
    "causeOfDeath": "Asphyxiation",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "A high-tensile climbing wire was used to strangle the victim."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "The Ghost",
    "method": "The Ghost repelled from the skylight and strangled Henry from behind before silently bypassing the laser grid.",
    "motive": "Theft of the diamond."
  }
};
