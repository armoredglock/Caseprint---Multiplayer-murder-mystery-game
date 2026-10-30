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
  "caseId": "whispers-in-the-alley-v3",
  "suspects": [
    {
      "id": "s1",
      "name": "Eleanor Vance",
      "age": 60,
      "occupation": "Wealthy Heiress",
      "photo": "https://i.pravatar.cc/150?u=EleanorV",
      "relationToVictim": "Secret Benefactor",
      "lastKnownWhereabouts": "Her Estate",
      "alibi": "Sleeping.",
      "motiveAssessment": "HIGH",
      "background": "Mickey was blackmailing her grandson.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Lab",
    "reportNumber": "F-303",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-12",
    "externalExam": "Single clean stab wound to the heart.",
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
    "causeOfDeath": "Stab wound",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The precision of the strike indicates a highly trained assassin."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Eleanor Vance (via hired assassin)",
    "method": "Eleanor hired a professional to eliminate Mickey and stage it as a random alley mugging by stealing his wallet.",
    "motive": "To protect her family's reputation from Mickey's blackmail."
  }
};
