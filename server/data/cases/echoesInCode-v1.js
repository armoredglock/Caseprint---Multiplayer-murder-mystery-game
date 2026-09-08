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
        "title": "The Kill Switch",
        "description": "We intercepted the packet that triggered the surge. It is Hex encoded.",
        "data": "4F 6D 6E 69 43 6F 72 70 20 53 65 63 75 72 69 74 79",
        "format": "HEX",
        "hint": "Convert Hex to Text."
      }
    ],
    "socialMedia": "",
    "other": "The server logs are heavily encrypted."
  },
  "caseId": "echoes-in-code-v1",
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
      "motiveAssessment": "HIGH",
      "background": "Eli was blackmailing OmniCorp with stolen data.",
      "status": "PRIME SUSPECT"
    },
    {
      "id": "s2",
      "name": "Cipher",
      "age": 24,
      "occupation": "Hacker Protégé",
      "photo": "https://i.pravatar.cc/150?u=CipherHacker",
      "relationToVictim": "Student",
      "lastKnownWhereabouts": "Online",
      "alibi": "Streaming on Twitch.",
      "motiveAssessment": "LOW",
      "background": "Eli taught Cipher everything.",
      "status": "SUSPECT"
    }
  ],
  "forensics": {
    "labName": "Cyber Forensics",
    "reportNumber": "CF-20",
    "examiner": "Dr. Aris",
    "dateOfExam": "2024-11-30",
    "externalExam": "Severe electrical burns on the hands.",
    "internalExam": "Cardiac arrest.",
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
    "causeOfDeath": "Electrocution",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The power surge was intentionally routed through the keyboard via a remote hardware exploit."
  },
  "physicalEvidence": [],
  "solution": {
    "killer": "Marcus Thorne (OmniCorp Security)",
    "method": "OmniCorp mercenaries remotely triggered a hardware exploit in Eli's rig, causing a lethal power surge while he was hacking them.",
    "motive": "To silence Eli and stop the blackmail."
  }
};