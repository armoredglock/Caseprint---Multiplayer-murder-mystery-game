module.exports = {
  "caseId": "boardroom-betrayal-v1",
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
      "status": "PRIME SUSPECT",
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
      "motiveAssessment": "MEDIUM",
      "background": "Extremely loyal on paper, but has the boardroom master keys.",
      "status": "ALIBI UNVERIFIED",
      "wave": 1
    },
    {
      "id": "suspect-3",
      "name": "David Chen",
      "age": 26,
      "occupation": "Unemployed",
      "photo": "https://i.pravatar.cc/150?u=DavidChen",
      "relationToVictim": "Estranged Son",
      "lastKnownWhereabouts": "Unknown",
      "alibi": "No verified alibi. Claims he was at a movie theater downtown.",
      "motiveAssessment": "MEDIUM",
      "background": "Cut out of Marcus's will 6 months ago. Has a history of substance abuse and severe debt.",
      "status": "PERSON OF INTEREST",
      "wave": 2
    },
    {
      "id": "suspect-4",
      "name": "Richard Sterling",
      "age": 60,
      "occupation": "CEO, Horizon Corp",
      "photo": "https://i.pravatar.cc/150?u=RichardSterling",
      "relationToVictim": "Rival CEO",
      "lastKnownWhereabouts": "Horizon Corp HQ",
      "alibi": "Working late in office. Security logged him out at 23:45.",
      "motiveAssessment": "HIGH",
      "background": "Horizon was losing a major government contract to NovaTech. Rumors say Sterling swore he would stop Marcus at any cost.",
      "status": "PERSON OF INTEREST"
    },
    {
      "id": "suspect-5",
      "name": "Liam Davies",
      "age": 28,
      "occupation": "Former Lead Engineer",
      "photo": "https://i.pravatar.cc/150?u=LiamDavies",
      "relationToVictim": "Fired Employee",
      "lastKnownWhereabouts": "The Rusty Anchor Bar",
      "alibi": "Drinking alone. Bartender vaguely remembers him leaving around 22:30.",
      "motiveAssessment": "MEDIUM",
      "background": "Fired by Marcus three weeks ago for alleged IP theft. He filed a wrongful termination suit yesterday.",
      "status": "SUSPECT"
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
      "body": "I brought the decanter in at 21:40. Marcus locked the door behind me when I left.",
      "signature": "valerie-pierce",
      "wave": 1
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
      },
      {
        "substance": "Arsenic",
        "result": "Trace Amounts",
        "level": "Non-Lethal",
        "reference": "Negative"
      }
    ],
    "fingerprints": "Only the victim's prints found on the glass (EV-002). Victim and Valerie Pierce's prints found on the decanter (EV-001).",
    "dna": "None found.",
    "causeOfDeath": "Acute cyanide poisoning",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "Time of death definitively estimated between 21:50 and 22:05.",
    "wave": 2
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
      "tagNumber": "EV-002",
      "description": "Reconstructed shredded document",
      "locationFound": "Boardroom wastebasket",
      "photo": "/cases/ev-document.jpg",
      "significance": "Highly confidential draft letter terminating the employment of Robert Hayes for embezzlement.",
      "chainOfCustody": [
        {
          "officer": "Det. Chen",
          "date": "2024-11-15 23:45",
          "action": "Collected at scene"
        }
      ],
      "wave": 2
    },
    {
      "tagNumber": "EV-004",
      "description": "Concealed miniature camera",
      "locationFound": "Inside smoke detector",
      "photo": "/cases/ev-camera.jpg",
      "significance": "An illegal, high-end corporate espionage camera. It was remotely wiped.",
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
        "from": "Robert Hayes",
        "to": "Marcus Chen",
        "time": "21:45",
        "duration": "00:00",
        "type": "MISSED",
        "flagged": true,
        "wave": 1
      }
    ],
    "emails": [
      {
        "from": "r.hayes@novatech.com",
        "to": "m.chen@novatech.com",
        "subject": "Re: The VanceCorp Offer - URGENT",
        "date": "2024-11-15 16:30",
        "body": "Marcus, you need to reconsider. If VanceCorp buys us out now, they absorb the liabilities and no one looks too closely at Q3. We will both go to prison. Do not do this.",
        "attachments": [],
        "flagged": true,
        "wave": 2
      },
      {
        "from": "r.sterling@horizon.com",
        "to": "m.chen@novatech.com",
        "subject": "Last Warning",
        "date": "2024-11-14 09:15",
        "body": "Marcus, you are playing a dangerous game with this contract. I suggest you back down before someone gets hurt.",
        "attachments": [],
        "flagged": true
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
        "note": "Valerie Pierce exits boardroom.",
        "flagged": false,
        "wave": 1
      },
      {
        "camera": "CAM-42-HALL",
        "timestamp": "21:48:30",
        "note": "System glitch. Camera CAM-42-HALL goes completely offline.",
        "flagged": true,
        "wave": 1
      },
      {
        "camera": "CAM-41-STAIRS",
        "timestamp": "21:55:12",
        "note": "[DISTORTED FEED RECOVERED] A figure matching Robert Hayes's build is seen exiting the stairwell onto the 42nd floor.",
        "flagged": true,
        "wave": 3
      }
    ],
    "puzzles": [
      {
        "id": "puz-001",
        "title": "Encrypted Flash Drive",
        "description": "We recovered a flash drive from Marcus's desk. The root folder contains a text file with a heavily encoded message. We need this deciphered immediately.",
        "data": "V2UgYXJlIGJlaW5nIHdhdGNoZWQuIFRoZSB0cmFuc2ZlcnMgd2VyZSBqdXN0IHRoZSBiZWdpbm5pbmcuIElmIEkgZGllLCBsb29rIGludG8gdGhlIFN3aXNzIGFjY291bnRzLg==",
        "format": "BASE64",
        "hint": "Looks like standard MIME encoding...",
        "answer": "We are being watched",
        "wave": 4
      }
    ],
    "socialMedia": "",
    "other": "A review of the electronic deadbolt shows a manual override was triggered at 21:52, and the door was locked from the OUTSIDE at 22:01 using Robert Hayes's master keycard."
  },
  "timeline": [
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
      "time": "21:48",
      "event": "CCTV on 42nd floor goes offline.",
      "linkedEvidence": [],
      "critical": true,
      "wave": 1
    },
    {
      "time": "22:01",
      "event": "Boardroom door locked from the OUTSIDE using Robert Hayes's keycard.",
      "linkedEvidence": [],
      "critical": true,
      "wave": 3
    }
  ],
  "solution": {
    "killer": "Robert Hayes",
    "method": "Laced the whiskey in the decanter with potassium cyanide and manually locked the boardroom from the outside to frame it as a locked-room suicide.",
    "motive": "Marcus had proof that Hayes embezzled $400 million and was preparing to terminate him. Hayes desperately needed the VanceCorp buyout to cover his tracks.",
    "fullExplanation": "Robert Hayes was backed into a corner. He used his IT access to kill the 42nd-floor CCTV at 21:48. He entered the boardroom using the manual override. He watched Marcus die, shredded the termination letter, and then locked the door from the outside at 22:01 using his master keycard."
  }
};