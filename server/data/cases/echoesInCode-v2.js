module.exports = {
  "scenarioId": "echoes-in-code",
  "title": "Echoes in the Code",
  "subtitle": "A Digital Assassination",
  "difficulty": "Hard",
  "playerRange": "4-10 Players",
  "thumbnail": "/cases/echoes-in-code.jpg",
  "themeColor": "#00FF00",
  "overview": {
    "incidentNumber": "CYB-2024-991",
    "date": "2024-11-30",
    "time": "04:15",
    "location": "Underground Server Farm, District 12",
    "jurisdiction": "Cyber Crimes & Homicide",
    "reportingOfficer": "Det. Lin",
    "summary": "At 04:15, a massive DDoS attack crippled the city's financial sector. Simultaneously, notorious gray-hat hacker 'ZeroDay' (real name: Eli Vance) was found dead in his underground server farm, electrocuted by his own rig."
  },
  "victim": {
    "name": "Eli 'ZeroDay' Vance",
    "age": 29,
    "occupation": "Hacker",
    "photo": "https://i.pravatar.cc/150?u=EliVance",
    "dateOfBirth": "1995-10-10",
    "biography": "A legendary hacker known for breaching impenetrable systems.",
    "knownAssociates": []
  },
  "witnessStatements": [],
  "timeline": [
    {
      "time": "04:00",
      "event": "City-wide cyber attack begins.",
      "linkedEvidence": [],
      "critical": true
    },
    {
      "time": "04:15",
      "event": "Power surge recorded at server farm. Victim dies.",
      "linkedEvidence": [],
      "critical": true
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [],
    "emails": [],
    "cctvLogs": [],
    "puzzles": [
      {
        "id": "puz-1",
        "title": "The Fake Log",
        "description": "A base64 encoded log file left on the server.",
        "data": "SSBhbSBDaXBoZXIuIEkgYW0gdGhlIGJlc3Qgbm93Lg==",
        "format": "BASE64",
        "hint": "Convert Base64 to Text."
      }
    ],
    "socialMedia": "",
    "other": "The server logs are heavily encrypted."
  },
  "caseId": "echoes-in-code-v2",
  "suspects": [
    {
      "id": "s1",
      "name": "Marcus Thorne",
      "age": 50,
      "occupation": "CEO, OmniCorp",
      "photo": "https://i.pravatar.cc/150?u=MarcusThorne",
      "relationToVictim": "Blackmail Target",
      "lastKnownWhereabouts": "Private Jet",
      "alibi": "In the air during the attack.",
      "motiveAssessment": "LOW",
      "background": "Eli was blackmailing OmniCorp with stolen data.",
      "status": "ALIBI VERIFIED"
    },
    {
      "id": "s2",
      "name": "Cipher",
      "age": 24,
      "occupation": "Hacker Protégé",
      "photo": "https://i.pravatar.cc/150?u=CipherHacker",
      "relationToVictim": "Student",
      "lastKnownWhereabouts": "Unknown",
      "alibi": "Fake Twitch stream (pre-recorded).",
      "motiveAssessment": "HIGH",
      "background": "Cipher wanted to become the #1 hacker in the world, and Eli was in the way.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "Cyber Forensics",
    "reportNumber": "CF-21",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-11-30",
    "externalExam": "Lethal injection mark on the neck.",
    "internalExam": "Cardiac arrest.",
    "toxicology": [
      {
        "substance": "Succinylcholine",
        "result": "Positive",
        "level": "Lethal",
        "reference": "Negative"
      }
    ],
    "fingerprints": "Cipher's prints found on the cooling rack.",
    "dna": "None.",
    "causeOfDeath": "Lethal Injection",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The electrocution was staged post-mortem."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Cipher",
    "method": "Cipher snuck into the server farm, injected Eli with a paralytic, staged the electrocution, and launched the attack using Eli's rig to frame OmniCorp.",
    "motive": "Jealousy and a desire for absolute notoriety in the hacker underground."
  }
};