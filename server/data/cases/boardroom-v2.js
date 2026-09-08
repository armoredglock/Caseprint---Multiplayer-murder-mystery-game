module.exports = {
  "caseId": "boardroom-betrayal-v2",
  "scenarioId": "boardroom-betrayal",
  "title": "The Boardroom Betrayal",
  "subtitle": "A CEO's Final Meeting",
  "difficulty": "Medium",
  "playerRange": {
    "min": 2,
    "max": 10
  },
  "thumbnail": "/cases/boardroom-cover.jpg",
  "themeColor": "#8b2252",
  "overview": {
    "incidentNumber": "NV-2024-00847",
    "date": "2024-11-15",
    "time": "22:47",
    "location": "NovaTech Industries HQ, 42nd Floor Boardroom, 100 Innovation Way",
    "jurisdiction": "14th Precinct, Homicide Division",
    "reportingOfficer": "Det. Sarah Chen",
    "badgeNumber": "4472",
    "summary": "Marcus Chen, 52, CEO of NovaTech Industries, was found deceased in the executive boardroom on the 42nd floor of the company's headquarters. The room was locked from the inside. Preliminary assessment indicates poisoning.",
    "classification": "HOMICIDE - ACTIVE"
  },
  "crimeScene": {
    "description": "The body was found slumped over the head of the massive mahogany conference table. A half-empty crystal whiskey decanter [A] and a single lowball glass [B] were situated immediately to the victim's right.",
    "sketch": "/cases/boardroom-sketch.png",
    "evidenceMarkers": [
      {
        "id": "A",
        "item": "Crystal whiskey decanter (Macallan 25, half-full)",
        "location": "Table, right of victim"
      },
      {
        "id": "B",
        "item": "Lowball glass (empty, white powdery residue present)",
        "location": "Table, right of victim"
      }
    ],
    "conditions": "Artificial lighting (overhead fluorescents), room temperature artificially lowered to 62°F",
    "weatherAtTime": "Torrential downpour, heavy lightning, 55°F outside"
  },
  "victim": {
    "name": "Marcus Chen",
    "age": 52,
    "occupation": "CEO & Founder, NovaTech Industries",
    "photo": "https://i.pravatar.cc/150?u=MarcusChen",
    "dateOfBirth": "1972-04-12",
    "address": "1004 Skyline Dr, Penthouse A",
    "biography": "A visionary tech entrepreneur. Marcus founded NovaTech 15 years ago.",
    "recentActivity": "Called a highly irregular emergency executive board meeting for 19:00 on the night of his death.",
    "knownAssociates": [
      {
        "name": "Robert Hayes",
        "relation": "CFO & Business Partner",
        "photo": "https://i.pravatar.cc/150?u=RobertHayes"
      }
    ]
  },
  "suspects": [
    {
      "id": "suspect-1",
      "name": "Robert Hayes",
      "age": 48,
      "occupation": "CFO, NovaTech",
      "photo": "https://i.pravatar.cc/150?u=RobertHayes",
      "relationToVictim": "Co-founder and business partner of 12 years",
      "lastKnownWhereabouts": "NovaTech HQ, 41st Floor Executive Lounge",
      "alibi": "Claims to have been drinking heavily in the lounge downstairs from 21:30 to 22:30.",
      "motiveAssessment": "HIGH",
      "background": "Financial records secretly obtained by Marcus suggest NovaTech was facing a massive $400 million shortfall.",
      "status": "PERSON OF INTEREST",
      "wave": 1
    },
    {
      "id": "suspect-2",
      "name": "Valerie Pierce",
      "age": 41,
      "occupation": "Executive Assistant",
      "photo": "https://i.pravatar.cc/150?u=ValeriePierce",
      "relationToVictim": "Assistant for 8 years",
      "lastKnownWhereabouts": "NovaTech HQ, 42nd Floor Reception",
      "alibi": "Was organizing highly sensitive HR files at her desk right outside the boardroom until 22:00, then supposedly took an Uber home.",
      "motiveAssessment": "HIGH",
      "background": "Extremely loyal on paper. However, Marcus recently discovered someone had been leaking his private schedule to Julian Vance, and Valerie was the only one with access.",
      "status": "PRIME SUSPECT",
      "wave": 1
    }
  ],
  "witnessStatements": [
    {
      "witnessName": "Greg Miller",
      "age": 55,
      "occupation": "Night Security Guard",
      "address": "442 Elm St, Apt 2B",
      "takenBy": "Det. Sarah Chen",
      "timestamp": "2024-11-16T01:15:00Z",
      "body": "I was doing my rounds on the 42nd floor around 22:15. The boardroom door was locked tight. The light under the door was on.",
      "signature": "greg-miller",
      "wave": 1
    },
    {
      "witnessName": "Valerie Pierce",
      "age": 41,
      "occupation": "Executive Assistant",
      "address": "789 Pine Ln",
      "takenBy": "Det. Sarah Chen",
      "timestamp": "2024-11-16T02:30:00Z",
      "body": "I brought the decanter in at 21:40. Marcus locked the door behind me when I left. I swear I didn't touch it after that.",
      "signature": "valerie-pierce",
      "wave": 1
    },
    {
      "witnessName": "Samuel 'Slick' Jenkins",
      "age": 32,
      "occupation": "Uber Driver",
      "address": "1224 West Ave",
      "takenBy": "Off. Jenkins",
      "timestamp": "2024-11-16T08:45:00Z",
      "body": "I picked up Valerie from the NovaTech building. She was standing in the pouring rain looking extremely nervous, constantly checking her phone.",
      "signature": "s-jenkins",
      "wave": 2
    }
  ],
  "forensics": {
    "labName": "City Central Forensic Laboratory",
    "reportNumber": "FL-2024-3892",
    "examiner": "Dr. Aris Thorne",
    "dateOfExam": "2024-11-16",
    "externalExam": "No signs of physical trauma.",
    "internalExam": "Severe pulmonary edema.",
    "toxicology": [
      {
        "substance": "Potassium Cyanide",
        "result": "Positive",
        "level": "15.4 mg/L",
        "reference": "Negative (Lethal > 2.5 mg/L)"
      }
    ],
    "fingerprints": "Only the victim's prints found on the glass (EV-002). Victim and Valerie Pierce's prints found on the decanter (EV-001), including a clear thumbprint near the stopper.",
    "dna": "None found.",
    "causeOfDeath": "Acute cyanide poisoning",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "Time of death definitively estimated between 21:50 and 22:05."
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "Crystal whiskey decanter",
      "locationFound": "Boardroom table, next to victim",
      "photo": "/cases/ev-decanter.jpg",
      "significance": "Contains Macallan 25 whiskey laced with a lethal dose of potassium cyanide.",
      "chainOfCustody": [
        {
          "officer": "Det. Chen",
          "date": "2024-11-15 23:10",
          "action": "Collected at scene"
        }
      ],
      "wave": 1
    },
    {
      "tagNumber": "EV-004",
      "description": "VanceCorp Offer Letter",
      "locationFound": "Valerie's Desk Drawer",
      "photo": "/cases/placeholder-evidence.png",
      "significance": "A $2 million sign-on bonus offer for Valerie Pierce from rival CEO Julian Vance, contingent on her providing 'actionable corporate intelligence'.",
      "chainOfCustody": [
        {
          "officer": "Tech Ramirez",
          "date": "2024-11-16 02:15",
          "action": "Discovered during sweep"
        }
      ],
      "wave": 3
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [
      {
        "from": "Valerie Pierce",
        "to": "Julian Vance (VanceCorp CEO)",
        "time": "22:05",
        "duration": "00:45",
        "type": "OUTGOING",
        "flagged": true,
        "wave": 2
      }
    ],
    "emails": [
      {
        "from": "m.chen@novatech.com",
        "to": "v.pierce@novatech.com",
        "subject": "YOU ARE FIRED",
        "date": "2024-11-15 21:35",
        "body": "Valerie, I found out about your little arrangement with Vance. Security will escort you out at 10 PM. Don't test me.",
        "attachments": [],
        "flagged": true,
        "wave": 2
      }
    ],
    "cctvLogs": [
      {
        "camera": "CAM-42-HALL",
        "timestamp": "21:40:12",
        "note": "Valerie Pierce enters boardroom carrying decanter.",
        "flagged": false,
        "wave": 1
      },
      {
        "camera": "CAM-42-HALL",
        "timestamp": "21:42:05",
        "note": "Valerie Pierce exits boardroom. She appears agitated and is typing rapidly on her phone.",
        "flagged": true,
        "wave": 1
      },
      {
        "camera": "CAM-41-LOUNGE",
        "timestamp": "21:50:00",
        "note": "Robert Hayes is visible in the lounge the entire time, asleep on the couch.",
        "flagged": false,
        "wave": 2
      }
    ],
    "puzzles": [
      {
        "title": "VanceCorp Cipher",
        "content": "11-9-12-12 8-9-13 20-15-14-9-7-8-20",
        "encodedType": "A1Z26",
        "clue": "Numbers represent letters of the alphabet (1=A, 2=B).",
        "wave": 3
      }
    ],
    "socialMedia": "",
    "other": "A review of the electronic deadbolt shows the door was locked from the inside by Marcus Chen. He never left."
  },
  "timeline": [
    {
      "time": "21:35",
      "event": "Marcus fires Valerie via email.",
      "linkedEvidence": [],
      "critical": true,
      "wave": 2
    },
    {
      "time": "21:40",
      "event": "Valerie brings poisoned decanter to boardroom.",
      "linkedEvidence": [
        "EV-001"
      ],
      "critical": true,
      "wave": 1
    },
    {
      "time": "21:42",
      "event": "Valerie leaves the boardroom rapidly.",
      "linkedEvidence": [],
      "critical": true,
      "wave": 1
    },
    {
      "time": "22:05",
      "event": "Valerie calls Julian Vance to confirm the deed is done.",
      "linkedEvidence": [],
      "critical": true,
      "wave": 2
    }
  ],
  "solution": {
    "killer": "Valerie Pierce",
    "method": "Laced the whiskey in the decanter with potassium cyanide before bringing it to Marcus.",
    "motive": "Marcus discovered she was selling corporate secrets to VanceCorp and fired her. She killed him to protect her $2 million payout from Vance.",
    "fullExplanation": "Valerie Pierce was cornered after Marcus discovered her treason at 21:35. Knowing he would want a drink after the brutal meeting, she poisoned the Macallan 25 decanter and brought it to him. She then fled the building, calling Vance to confirm the hit."
  }
};