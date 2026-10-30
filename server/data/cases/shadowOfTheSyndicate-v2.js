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
  "caseId": "shadow-of-the-syndicate-v2",
  "suspects": [
    {
      "id": "s1",
      "name": "Det. Mike O'Connor",
      "age": 42,
      "occupation": "Undercover Cop",
      "photo": "https://i.pravatar.cc/150?u=MikeO",
      "relationToVictim": "Informant Handler",
      "lastKnownWhereabouts": "Alleyway",
      "alibi": "Claims he arrived after the shooting.",
      "motiveAssessment": "HIGH",
      "background": "Sal was his key informant, but Sal was about to burn him.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Forensics",
    "reportNumber": "F-202",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-12-11",
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
    "fingerprints": "Police issue ammunition casings found at scene.",
    "dna": "None.",
    "causeOfDeath": "Gunshot wounds",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The weapon used was actually a police-issued sidearm, masked to sound like a machine gun using a rapid-fire modification."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Det. Mike O'Connor",
    "method": "Mike shot Sal when a deal went wrong, using a modified weapon to make it sound like a mob hit.",
    "motive": "Self-preservation to maintain his cover and avoid internal affairs."
  }
};
