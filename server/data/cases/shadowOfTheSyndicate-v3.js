module.exports = {
  "scenarioId": "shadow-of-the-syndicate",
  "title": "Shadow of the Syndicate",
  "subtitle": "Blood on the Streets",
  "difficulty": "Expert",
  "playerRange": "4-12 Players",
  "thumbnail": "/cases/shadow-syndicate.jpg",
  "themeColor": "#333333",
  "overview": {
    "incidentNumber": "ORG-2024-001",
    "date": "2024-12-10",
    "time": "23:45",
    "location": "The Velvet Lounge, Back Alley",
    "jurisdiction": "Organized Crime Division",
    "reportingOfficer": "Det. Russo",
    "summary": "Salvatore 'The Razor' Maroni, a notorious underboss, was found gunned down in the alley behind a mob-owned nightclub. The weapon used is a signature tommy gun, normally favored by a rival syndicate."
  },
  "victim": {
    "name": "Salvatore Maroni",
    "age": 45,
    "occupation": "Underboss",
    "photo": "https://i.pravatar.cc/150?u=SalvatoreMaroni",
    "dateOfBirth": "1979-05-15",
    "biography": "Ruthless enforcer for the Falcone crime family.",
    "knownAssociates": []
  },
  "witnessStatements": [
    {
      "witnessName": "Tony 'Fingers'",
      "age": 38,
      "occupation": "Bouncer",
      "address": "Local",
      "takenBy": "Det. Russo",
      "timestamp": "2024-12-11T00:30:00Z",
      "body": "I was at the front door. Heard the rattle of a chopper in the back. By the time I got there, Sal was already on the ground.",
      "signature": "tony"
    }
  ],
  "timeline": [
    {
      "time": "23:30",
      "event": "Sal leaves the VIP room.",
      "critical": false
    },
    {
      "time": "23:45",
      "event": "Gunshots heard in the alley.",
      "critical": true
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [],
    "emails": [],
    "cctvLogs": [],
    "puzzles": [],
    "socialMedia": "",
    "other": "A burner phone was found in the drain."
  },
  "caseId": "shadow-of-the-syndicate-v3",
  "suspects": [
    {
      "id": "s1",
      "name": "Don Moretti",
      "age": 65,
      "occupation": "Rival Boss",
      "photo": "https://i.pravatar.cc/150?u=DonMoretti",
      "relationToVictim": "Rival",
      "lastKnownWhereabouts": "His mansion",
      "alibi": "Hosting a dinner party.",
      "motiveAssessment": "HIGH",
      "background": "Wanted to send a message without starting an all-out war.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Forensics",
    "reportNumber": "F-203",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-11",
    "externalExam": "Gunshot wounds are post-mortem.",
    "internalExam": "Severe liver necrosis.",
    "toxicology": [
      {
        "substance": "Ricin",
        "result": "Positive",
        "level": "Lethal",
        "reference": "Negative"
      }
    ],
    "fingerprints": "None.",
    "dna": "None.",
    "causeOfDeath": "Ricin poisoning",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The victim was already dead from poisoning when the shots were fired into his body."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Don Moretti",
    "method": "Moretti poisoned Sal's favorite cigar supply. The gunshots in the alley were a theatrical distraction performed by a hired thug on an already dead body.",
    "motive": "A silent assassination disguised as a loud mob hit."
  }
};
