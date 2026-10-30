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
  "caseId": "whispers-in-the-alley-v1",
  "suspects": [
    {
      "id": "s1",
      "name": "Arthur Pendelton",
      "age": 45,
      "occupation": "Shop Owner",
      "photo": "https://i.pravatar.cc/150?u=ArthurP",
      "relationToVictim": "Debtor",
      "lastKnownWhereabouts": "His shop",
      "alibi": "Doing inventory.",
      "motiveAssessment": "HIGH",
      "background": "Owed Mickey $50,000.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Lab",
    "reportNumber": "F-301",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-12",
    "externalExam": "Blunt trauma to the head.",
    "internalExam": "Normal.",
    "toxicology": [
      {
        "substance": "None",
        "result": "Negative",
        "level": "N/A",
        "reference": "Negative"
      }
    ],
    "fingerprints": "Arthur's prints on the victim's collar.",
    "dna": "None.",
    "causeOfDeath": "Blunt force trauma",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "Weapon appears to be a heavy ledger book."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Arthur Pendelton",
    "method": "Arthur confronted Mickey and hit him with his shop's heavy ledger in a moment of panic.",
    "motive": "Desperation to escape his crushing debt."
  }
};
