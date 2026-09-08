module.exports = {
  "caseId": "midnight-manor-v3",
  "scenarioId": "midnight-manor",
  "title": "Midnight Manor",
  "subtitle": "The Jealous Heir",
  "difficulty": "Hard",
  "playerRange": {
    "min": 2,
    "max": 10
  },
  "thumbnail": "/cases/manor-cover.jpg",
  "themeColor": "#2f4f4f",
  "overview": {
    "incidentNumber": "MM-2024-00421-V3",
    "date": "2024-11-20",
    "time": "02:30",
    "location": "Blackwood Manor, Library",
    "jurisdiction": "County Sheriff's Office",
    "reportingOfficer": "Sheriff T. Brooks",
    "badgeNumber": "001",
    "summary": "Lord Arthur Blackwood was found dead in his locked library. He was stabbed with an antique dagger. The room was sealed from the inside.",
    "classification": "HOMICIDE - ACTIVE"
  },
  "crimeScene": {
    "description": "Blackwood is lying on the Persian rug, an antique dagger protruding from his chest. The windows are locked from the inside, and the heavy oak door was bolted.",
    "sketch": "/cases/manor-sketch.png",
    "evidenceMarkers": [
      {
        "id": "A",
        "item": "Antique Dagger",
        "location": "Victim's chest"
      },
      {
        "id": "B",
        "item": "Scorched Will",
        "location": "Fireplace grate"
      }
    ],
    "conditions": "Fire dying in the grate. Room temperature 65°F.",
    "weatherAtTime": "Heavy snowstorm, roads impassable."
  },
  "victim": {
    "name": "Lord Arthur Blackwood",
    "age": 72,
    "occupation": "Aristocrat, Businessman",
    "photo": "https://i.pravatar.cc/150?u=ArthurBlackwood",
    "dateOfBirth": "1952-03-15",
    "biography": "Wealthy patriarch of the Blackwood family. Known for his eccentricities and vast fortune.",
    "recentActivity": "Announced he was changing his will during dinner.",
    "knownAssociates": []
  },
  "suspects": [
    {
      "id": "suspect-1",
      "name": "Eleanor Blackwood",
      "age": 68,
      "occupation": "Socialite",
      "photo": "https://i.pravatar.cc/150?u=EleanorBlackwood",
      "relationToVictim": "Wife",
      "lastKnownWhereabouts": "Master Bedroom",
      "alibi": "Sleeping. Took a sleeping pill at 23:00.",
      "motiveAssessment": "MEDIUM",
      "background": "Strained marriage. Stood to lose half her allowance in the new will.",
      "status": "PERSON OF INTEREST",
      "wave": 1
    },
    {
      "id": "suspect-2",
      "name": "Julian Blackwood",
      "age": 35,
      "occupation": "Playboy, Gambler",
      "photo": "https://i.pravatar.cc/150?u=JulianBlackwood",
      "relationToVictim": "Son",
      "lastKnownWhereabouts": "Billiard Room",
      "alibi": "Playing snooker alone until 01:00.",
      "motiveAssessment": "HIGH",
      "background": "Deep in gambling debt. The new will would have cut him off completely in favor of charity.",
      "status": "PRIME SUSPECT",
      "wave": 1
    },
    {
      "id": "suspect-3",
      "name": "Victoria Sterling",
      "age": 28,
      "occupation": "Private Secretary",
      "photo": "https://i.pravatar.cc/150?u=VictoriaSterling",
      "relationToVictim": "Employee/Mistress",
      "lastKnownWhereabouts": "Guest Wing",
      "alibi": "Working on correspondence until midnight, then went to bed.",
      "motiveAssessment": "MEDIUM",
      "background": "Rumored to be Blackwood's mistress. She typed the draft of the new will.",
      "status": "SUSPECT",
      "wave": 2
    }
  ],
  "witnessStatements": [
    {
      "witnessName": "Thomas (Butler)",
      "age": 60,
      "occupation": "Head Butler",
      "takenBy": "Sheriff T. Brooks",
      "timestamp": "2024-11-20T03:00:00Z",
      "body": "I heard an argument in the library around midnight, but the door was locked. Lord Blackwood shouted, 'You'll not see a penny!'",
      "wave": 1
    }
  ],
  "forensics": {
    "labName": "County Forensics",
    "reportNumber": "CF-2024-442",
    "examiner": "Dr. H. Lecter",
    "dateOfExam": "2024-11-20",
    "toxicology": [],
    "causeOfDeath": "Punctured heart via blade.",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "No fingerprints on the dagger haft. It was wiped clean.",
    "wave": 2
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "Secret Passage Blueprint",
      "locationFound": "Julian's Bedroom Desk",
      "photo": "/cases/ev-blueprint.jpg",
      "significance": "Shows a hidden door connecting the Billiard Room to the Library behind the bookcase.",
      "wave": 2
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [
      {
        "from": "Julian Blackwood",
        "to": "Sharkey (Loan Shark)",
        "time": "23:30",
        "duration": "00:02",
        "type": "OUTGOING",
        "flagged": true,
        "wave": 1
      }
    ],
    "emails": [],
    "cctvLogs": [],
    "puzzles": [
      {
        "id": "puz-005",
        "title": "Julian's Diary Lock",
        "description": "Julian keeps a digital diary encrypted with ROT13.",
        "data": "V zhfg fgbc uvz. GUR Jvyy pnaabg or fvtArQ.",
        "format": "ROT13",
        "hint": "Rotate letters by 13.",
        "answer": "I must stop him",
        "wave": 3
      }
    ]
  },
  "timeline": [
    {
      "time": "00:00",
      "event": "Argument heard in library.",
      "critical": true,
      "wave": 1
    },
    {
      "time": "00:15",
      "event": "Julian uses secret passage to enter library.",
      "critical": true,
      "wave": 3
    }
  ],
  "solution": {
    "killer": "Julian Blackwood",
    "method": "Used the secret passage to enter the locked library, stabbed his father with a display dagger, threw the draft of the new will into the fire, and escaped back through the passage.",
    "motive": "Facing death threats from loan sharks, Julian could not afford to be cut out of the will.",
    "fullExplanation": "Julian Blackwood was desperate. Hearing his father was finalizing the new will, he used a forgotten secret passage from the billiard room to bypass the locked library door. He confronted his father, stabbed him, burned the draft will, and fled back through the passage, leaving the illusion of a locked-room mystery."
  }
};
