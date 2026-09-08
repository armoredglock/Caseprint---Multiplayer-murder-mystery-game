module.exports = {
  "caseId": "crimson-cipher-v2",
  "scenarioId": "crimson-cipher",
  "title": "The Crimson Cipher",
  "subtitle": "A serial killer's twisted game.",
  "difficulty": "Hard",
  "playerRange": "4-10 Players",
  "thumbnail": "/cases/crimson-cipher.jpg",
  "themeColor": "#800020",
  "overview": {
    "incidentNumber": "HMD-2024-9981",
    "date": "2024-11-20",
    "time": "03:15",
    "location": "Abandoned Warehouse, District 9",
    "jurisdiction": "City Major Crimes Unit",
    "reportingOfficer": "Det. James Miller",
    "summary": "At 03:15, patrol officers responded to reports of a foul odor at an abandoned warehouse. Upon entry, they discovered the brutally mutilated body of Arthur Vance, a prominent investigative journalist. Painted on the wall above the victim in the victim's own blood was a cryptic symbol and a sequence of numbers. The 'Crimson Killer' has struck again. The press is breathing down our necks. We need to solve this before he strikes a fourth time."
  },
  "victim": {
    "name": "Arthur Vance",
    "age": 45,
    "occupation": "Investigative Journalist, The Daily Chronicle",
    "photo": "https://i.pravatar.cc/150?u=ArthurVance",
    "dateOfBirth": "1979-05-12",
    "biography": "Arthur Vance was a Pulitzer-prize winning journalist known for his aggressive deep dives into organized crime and corruption. Recently, he began publishing a series of articles claiming he had identified the elusive 'Crimson Killer'. He was scheduled to reveal the killer's identity in Sunday's edition.",
    "knownAssociates": [
      {
        "name": "Eleanor Vance",
        "relation": "Wife",
        "photo": "https://i.pravatar.cc/150?u=EleanorVance"
      }
    ]
  },
  "suspects": [
    {
      "id": "suspect-1",
      "name": "Dr. Silas Crane",
      "age": 52,
      "occupation": "Surgeon",
      "photo": "https://i.pravatar.cc/150?u=SilasCrane",
      "relationToVictim": "Subject of a previous hit piece by Vance.",
      "lastKnownWhereabouts": "City Hospital, Night Shift",
      "alibi": "Claims he was performing emergency surgery from 01:00 to 04:00.",
      "motiveAssessment": "HIGH",
      "background": "Vance's article destroyed his private practice. Crane has the surgical knowledge required to perform the specific mutilations found on the victims.",
      "status": "PRIME SUSPECT"
    },
    {
      "id": "suspect-2",
      "name": "Eleanor Vance",
      "age": 42,
      "occupation": "Novelist",
      "photo": "https://i.pravatar.cc/150?u=EleanorVance",
      "relationToVictim": "Wife",
      "lastKnownWhereabouts": "Home",
      "alibi": "Claims she was asleep at home. No witnesses.",
      "motiveAssessment": "LOW",
      "background": "She stands to inherit a $2 million life insurance policy. She has a documented history of violence and a recent restraining order filed against Arthur.",
      "status": "ALIBI VERIFIED"
    },
    {
      "id": "suspect-3",
      "name": "Victor 'Viper' Thorne",
      "age": 38,
      "occupation": "Enforcer, The Syndicate",
      "photo": "https://i.pravatar.cc/150?u=VictorThorne",
      "relationToVictim": "Investigated by Vance.",
      "lastKnownWhereabouts": "The Velvet Lounge (Nightclub)",
      "alibi": "Club bouncers swear he was in the VIP room all night. Camera footage is conveniently missing.",
      "motiveAssessment": "HIGH",
      "background": "A known hitman. Vance was getting close to linking Thorne to the Mayor's office.",
      "status": "SUSPECT"
    },
    {
      "id": "suspect-4",
      "name": "Det. James Miller",
      "age": 49,
      "occupation": "Homicide Detective",
      "photo": "https://i.pravatar.cc/150?u=JamesMiller",
      "relationToVictim": "Reporting Officer / Vance's 'Source'",
      "lastKnownWhereabouts": "Precinct 9",
      "alibi": "Claims he was doing paperwork until he got the radio call at 03:15.",
      "motiveAssessment": "HIGH",
      "background": "Miller was the first on the scene. He was also Vance's confidential informant inside the department. Could he be the Crimson Killer hiding in plain sight?",
      "status": "PRIME SUSPECT"
    },
    {
      "id": "suspect-5",
      "name": "Elias Vance",
      "age": 22,
      "occupation": "Student",
      "photo": "https://i.pravatar.cc/150?u=EliasVance",
      "relationToVictim": "Son",
      "lastKnownWhereabouts": "University Library",
      "alibi": "Studying for finals. Library swipe records confirm entry at 22:00, but no exit record.",
      "motiveAssessment": "MEDIUM",
      "background": "Deeply in debt to a local cartel. Needs money fast. Has a strained relationship with his father.",
      "status": "ALIBI UNVERIFIED"
    }
  ],
  "witnessStatements": [
    {
      "witnessName": "Homeless Pete",
      "age": 61,
      "occupation": "Unemployed",
      "address": "Alley behind the warehouse",
      "takenBy": "Off. Ramirez",
      "timestamp": "2024-11-20T04:15:00Z",
      "body": "I saw a black sedan pull up around 2 AM. A tall man in a dark trench coat got out, dragged something heavy inside. About 30 minutes later, he came out, but he was limping. He sped off heading north.",
      "signature": "pete"
    },
    {
      "witnessName": "Nurse Betty",
      "age": 35,
      "occupation": "Scrub Nurse",
      "address": "City Hospital",
      "takenBy": "Det. Miller",
      "timestamp": "2024-11-20T08:30:00Z",
      "body": "Dr. Crane was operating with us, but he took an unusually long break from 01:30 to 02:45. He said he needed air. When he came back, his scrubs were stained, but he said it was just coffee.",
      "signature": "betty"
    }
  ],
  "forensics": {
    "labName": "City Forensics Unit",
    "reportNumber": "FR-2024-112",
    "examiner": "Dr. Aris Thorne",
    "dateOfExam": "2024-11-20",
    "externalExam": "Multiple precise surgical incisions on the torso. The victim's right index finger was amputated post-mortem.",
    "internalExam": "Toxin found in the bloodstream.",
    "toxicology": [
      {
        "substance": "Tetrodotoxin (Pufferfish Poison)",
        "result": "Positive",
        "level": "Lethal",
        "reference": "Negative"
      }
    ],
    "fingerprints": "A bloody fingerprint on the victim's collar belongs to Arthur Vance. However, a hair found clutched in the victim's hand matches Det. James Miller.",
    "dna": "Skin cells under the victim's fingernails belong to Dr. Silas Crane.",
    "causeOfDeath": "Paralysis leading to asphyxiation, followed by post-mortem mutilation.",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The killer possesses advanced anatomical knowledge."
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "A bloody surgical scalpel",
      "locationFound": "Near the victim's right hand.",
      "photo": "/cases/ev-scalpel.jpg",
      "significance": "The murder weapon. Matches the brand used at City Hospital.",
      "chainOfCustody": [
        {
          "officer": "Det. Miller",
          "date": "2024-11-20 03:30",
          "action": "Collected at scene"
        }
      ]
    },
    {
      "tagNumber": "EV-002",
      "description": "A burnt piece of paper",
      "locationFound": "In a trash can outside the warehouse.",
      "photo": "/cases/ev-burnt-paper.jpg",
      "significance": "Contains a partial hex code.",
      "chainOfCustody": [
        {
          "officer": "CSU Tech",
          "date": "2024-11-20 05:00",
          "action": "Recovered"
        }
      ]
    }
  ],
  "timeline": [
    {
      "time": "00:45",
      "event": "Arthur Vance leaves the Daily Chronicle office.",
      "linkedEvidence": [],
      "critical": true
    },
    {
      "time": "01:30",
      "event": "Dr. Crane leaves the operating room.",
      "linkedEvidence": [],
      "critical": false
    },
    {
      "time": "02:00",
      "event": "Black sedan arrives at warehouse (Witness Pete).",
      "linkedEvidence": [],
      "critical": true
    },
    {
      "time": "02:30",
      "event": "Killer leaves the warehouse, limping.",
      "linkedEvidence": [],
      "critical": true
    },
    {
      "time": "03:15",
      "event": "Police arrive at the scene.",
      "linkedEvidence": [],
      "critical": true
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [
      {
        "from": "Arthur Vance",
        "to": "Det. Miller",
        "time": "00:15",
        "duration": "02:14",
        "type": "OUTGOING",
        "flagged": true
      },
      {
        "from": "Unknown (Burner)",
        "to": "Arthur Vance",
        "time": "00:30",
        "duration": "00:45",
        "type": "INCOMING",
        "flagged": true
      }
    ],
    "emails": [
      {
        "from": "a.vance@chronicle.com",
        "to": "e.vance@gmail.com",
        "subject": "I know everything.",
        "date": "2024-11-19 23:00",
        "body": "Eleanor, I found the bank statements. I know you've been paying Thorne. We are done.",
        "attachments": [],
        "flagged": true
      },
      {
        "from": "s.crane@cityhospital.org",
        "to": "a.vance@chronicle.com",
        "subject": "You ruined me.",
        "date": "2024-11-18 14:20",
        "body": "You think you can just destroy a man's life with your lies? You will pay for this, Arthur. I promise you.",
        "attachments": [],
        "flagged": true
      }
    ],
    "cctvLogs": [
      {
        "camera": "CAM-STREET-9",
        "timestamp": "02:05:12",
        "note": "[DISTORTED] A dark vehicle passes the camera, license plate unreadable.",
        "flagged": true
      },
      {
        "camera": "CAM-HOSPITAL-EXIT",
        "timestamp": "01:32:00",
        "note": "Dr. Crane exits the hospital, visibly agitated.",
        "flagged": false
      },
      {
        "camera": "CAM-HOSPITAL-ENTRY",
        "timestamp": "02:47:00",
        "note": "Dr. Crane returns, walking with a slight limp.",
        "flagged": true
      }
    ],
    "puzzles": [
      {
        "id": "puz-002",
        "title": "The Bloody Wall Cipher",
        "description": "The killer left this message painted in blood on the wall. It appears to be Base64.",
        "data": "VGhlIHBvbGljZSBhcmUgaW5jb21wZXRlbnQuIEV2ZW4gd2hlbiB0aGUga2lsbGVyIGlzIHJpZ2h0IGluIGZyb250IG9mIHRoZW0sIHRoZXkgaWdub3JlIHRoZSB0cnV0aC4=",
        "format": "BASE64",
        "hint": "Convert Base64 to Text."
      },
      {
        "id": "puz-003",
        "title": "The Burnt Note",
        "description": "Recovered from the trash can. It's a classic Caesar cipher (Shift 3).",
        "data": "Wkh zluh wUDQVIHU ZHQW WKURXJK. 7KRUQH LV SDLG RII.",
        "format": "CAESAR-3",
        "hint": "Shift letters back by 3."
      }
    ],
    "socialMedia": "",
    "other": "A hidden folder named 'Crimson' revealed that Arthur had definitive proof that Det. Miller was staging the Crimson Killer murders to cover up his own cartel hits."
  },
  "solution": {
    "killer": "Det. James Miller",
    "method": "Miller paralyzed Arthur with Tetrodotoxin, then brutally mutilated him to match the M.O. of the 'Crimson Killer' he was supposed to be hunting.",
    "motive": "Arthur Vance had discovered Miller was a dirty cop and was going to publish the exposé on Sunday."
  }
};