module.exports = {
  "scenarioId": "whispers-in-the-alley",
  "title": "Whispers in the Alley",
  "subtitle": "A Crime of Desperation",
  "difficulty": "Easy",
  "playerRange": "2-6 Players",
  "thumbnail": "/cases/whispers-alley.jpg",
  "themeColor": "#4B5320",
  "overview": {
    "incidentNumber": "HOM-2024-112",
    "date": "2024-12-12",
    "time": "01:15",
    "location": "Cobblestone Alley, East End",
    "jurisdiction": "East End Precinct",
    "reportingOfficer": "Officer Davis",
    "summary": "A notorious local loan shark, Mickey 'The Tooth' O'Neil, was found dead in an alleyway. His wallet is missing, suggesting a mugging."
  },
  "victim": {
    "name": "Mickey O'Neil",
    "age": 52,
    "occupation": "Loan Shark",
    "photo": "https://i.pravatar.cc/150?u=MickeyO",
    "dateOfBirth": "1972-01-01",
    "biography": "Everyone in the East End owed him money.",
    "knownAssociates": []
  },
  "witnessStatements": [],
  "timeline": [
    {
      "time": "01:00",
      "event": "Mickey leaves his office.",
      "critical": false
    },
    {
      "time": "01:15",
      "event": "Body discovered by a homeless man.",
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
  "caseId": "whispers-in-the-alley-v2",
  "suspects": [
    {
      "id": "s1",
      "name": "Jack 'The Snipe' Kelly",
      "age": 22,
      "occupation": "Petty Thief",
      "photo": "https://i.pravatar.cc/150?u=JackK",
      "relationToVictim": "None",
      "lastKnownWhereabouts": "East End Alleys",
      "alibi": "None.",
      "motiveAssessment": "MEDIUM",
      "background": "Known for violent muggings.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Lab",
    "reportNumber": "F-302",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-12",
    "externalExam": "Stab wound to the abdomen.",
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
    "causeOfDeath": "Exsanguination",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "A rare 1922 silver dollar was found dropped near the body, matching Jack's known stolen stash."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Jack 'The Snipe' Kelly",
    "method": "A standard mugging that escalated. Jack stabbed Mickey when he resisted.",
    "motive": "Robbery."
  }
};
