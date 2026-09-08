module.exports = {
  "caseId": "crimson-cipher-v3",
  "scenarioId": "crimson-cipher",
  "title": "The Crimson Cipher",
  "subtitle": "The Inside Job",
  "difficulty": "Hard",
  "playerRange": {
    "min": 2,
    "max": 10
  },
  "thumbnail": "/cases/crimson-cover.jpg",
  "themeColor": "#8b0000",
  "overview": {
    "incidentNumber": "CC-2024-00192-V3",
    "date": "2024-11-18",
    "time": "08:15",
    "location": "First City Bank, Main Vault",
    "jurisdiction": "Major Crimes Division",
    "reportingOfficer": "Det. J. Miller",
    "badgeNumber": "1190",
    "summary": "Bank Manager Harold Finch was found dead inside the time-locked main vault. The vault was supposed to be sealed until morning. The security system was bypassed from the inside.",
    "classification": "HOMICIDE - ACTIVE"
  },
  "crimeScene": {
    "description": "Finch is lying face up near safe deposit box #402. The box is open and empty. A bloody fingerprint is on the vault door's internal release mechanism.",
    "sketch": "/cases/crimson-sketch.png",
    "evidenceMarkers": [
      {
        "id": "A",
        "item": "Empty Safe Deposit Box #402",
        "location": "Wall rack, eye level"
      },
      {
        "id": "B",
        "item": "Bloody partial print",
        "location": "Internal vault release"
      }
    ],
    "conditions": "Vault temperature 68°F. No forced entry.",
    "weatherAtTime": "Clear, 45°F"
  },
  "victim": {
    "name": "Harold Finch",
    "age": 59,
    "occupation": "Bank Manager",
    "photo": "https://i.pravatar.cc/150?u=HaroldFinch",
    "dateOfBirth": "1965-08-22",
    "biography": "A 30-year veteran of First City Bank. Known for his strict adherence to protocol.",
    "recentActivity": "Stayed late to audit the vault contents after a suspected discrepancy.",
    "knownAssociates": []
  },
  "suspects": [
    {
      "id": "suspect-1",
      "name": "Elias Vance",
      "age": 55,
      "occupation": "CEO, VanceCorp",
      "photo": "https://i.pravatar.cc/150?u=EliasVance2",
      "relationToVictim": "Client",
      "lastKnownWhereabouts": "VanceCorp HQ",
      "alibi": "In a board meeting. Not verified for the time of the murder.",
      "motiveAssessment": "HIGH",
      "background": "Owner of Box #402. Rumored to hold blackmail material on city officials.",
      "status": "PERSON OF INTEREST",
      "wave": 1
    },
    {
      "id": "suspect-2",
      "name": "Claire Redfield",
      "age": 34,
      "occupation": "Security Chief, First City Bank",
      "photo": "https://i.pravatar.cc/150?u=ClaireRedfield",
      "relationToVictim": "Colleague",
      "lastKnownWhereabouts": "Bank Control Room",
      "alibi": "Monitoring cameras until 23:00. Claims she saw Finch leave.",
      "motiveAssessment": "MEDIUM",
      "background": "Recently passed over for promotion. Has access to all security overrides.",
      "status": "PRIME SUSPECT",
      "wave": 1
    },
    {
      "id": "suspect-3",
      "name": "Leo Rossi",
      "age": 41,
      "occupation": "Professional Safecracker (Paroled)",
      "photo": "https://i.pravatar.cc/150?u=LeoRossi",
      "relationToVictim": "None",
      "lastKnownWhereabouts": "Local Bar",
      "alibi": "Drinking with friends. Bartender confirms he was there until midnight.",
      "motiveAssessment": "LOW",
      "background": "Known associate of Elias Vance. Suspected of previous high-profile heists.",
      "status": "ALIBI UNVERIFIED",
      "wave": 2
    }
  ],
  "witnessStatements": [
    {
      "witnessName": "Night Watchman (Gary)",
      "age": 62,
      "occupation": "Security",
      "takenBy": "Det. J. Miller",
      "timestamp": "2024-11-18T09:00:00Z",
      "body": "I didn't see anyone enter or leave the vault area after 20:00. Claire told me she was handling the final lockdown.",
      "wave": 1
    }
  ],
  "forensics": {
    "labName": "City Forensics",
    "reportNumber": "CF-2024-112",
    "examiner": "Dr. E. Cross",
    "dateOfExam": "2024-11-18",
    "toxicology": [],
    "causeOfDeath": "Blunt force trauma to the back of the head.",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The bloody print on the vault release matches Claire Redfield. She claims she touched it when she found the body this morning.",
    "wave": 2
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "Heavy brass paperweight",
      "locationFound": "Under Finch's desk (outside vault)",
      "photo": "/cases/ev-paperweight.jpg",
      "significance": "Traces of Finch's blood found on the base.",
      "wave": 2
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [
      {
        "from": "Claire Redfield",
        "to": "Elias Vance",
        "time": "22:15",
        "duration": "00:05",
        "type": "OUTGOING",
        "flagged": true,
        "wave": 1
      }
    ],
    "emails": [
      {
        "from": "h.finch@firstcity.com",
        "to": "c.redfield@firstcity.com",
        "subject": "Security Audit - URGENT",
        "date": "2024-11-17 19:30",
        "body": "Claire, I've found a discrepancy in the access logs for Box 402. I'm going into the vault tonight to verify. Meet me there at 22:00.",
        "flagged": true,
        "wave": 1
      }
    ],
    "cctvLogs": [
      {
        "camera": "VAULT-CORRIDOR",
        "timestamp": "21:55:00",
        "note": "Finch enters the vault corridor.",
        "flagged": false,
        "wave": 1
      },
      {
        "camera": "VAULT-CORRIDOR",
        "timestamp": "22:05:00",
        "note": "Claire Redfield enters the vault corridor.",
        "flagged": true,
        "wave": 2
      },
      {
        "camera": "VAULT-CORRIDOR",
        "timestamp": "22:20:00",
        "note": "Claire Redfield exits the vault corridor carrying a small briefcase.",
        "flagged": true,
        "wave": 3
      }
    ],
    "puzzles": [
      {
        "id": "puz-004",
        "title": "Vance's Briefcase Lock",
        "description": "Claire was seen carrying a briefcase. We intercepted a text to Vance with a Caesar cipher (Shift +5).",
        "data": "HTRJSY",
        "format": "CAESAR-CIPHER (Shift +5)",
        "hint": "Shift backwards by 5 letters.",
        "answer": "CLIENT",
        "wave": 3
      }
    ]
  },
  "timeline": [
    {
      "time": "22:00",
      "event": "Finch discovers Claire tampering with Box 402.",
      "critical": true,
      "wave": 2
    },
    {
      "time": "22:10",
      "event": "Finch is struck and dragged into the vault.",
      "critical": true,
      "wave": 3
    }
  ],
  "solution": {
    "killer": "Claire Redfield",
    "method": "Struck Finch with the paperweight outside the vault, dragged his body inside, emptied Box #402, and locked the vault from the inside, using the internal release to escape.",
    "motive": "Hired by Elias Vance to retrieve blackmail material from Box #402. Finch discovered her during his audit.",
    "fullExplanation": "Claire Redfield was working for Elias Vance. When Finch scheduled his audit, Claire knew she had to act. She met Finch at the vault, struck him, dragged him inside, stole the contents of Box 402, and triggered the time-lock, escaping via the internal manual release, leaving her bloody print."
  }
};
