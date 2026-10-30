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
      "time": "03:50",
      "event": "Cipher's Twitch stream abruptly goes offline.",
      "linkedEvidence": [],
      "critical": true
    },
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
    "phoneRecords": [
      {
        "from": "Cipher",
        "to": "Eli Vance",
        "time": "03:45",
        "duration": "01:12",
        "type": "RECEIVED",
        "flagged": true
      }
    ],
    "emails": [
      {
        "from": "zeroday@darknet.io",
        "to": "cipher@darknet.io",
        "subject": "You're out.",
        "date": "2024-11-29 22:00",
        "body": "I know you stole the OmniCorp exploit code. You're sloppy. I'm cutting you out of the network permanently tonight.",
        "attachments": [],
        "flagged": true
      }
    ],
    "cctvLogs": [],
    "puzzles": [
      {
        "id": "puz-1",
        "title": "The Kill Switch",
        "description": "We intercepted the packet that triggered the surge. It is Hex encoded.",
        "data": "43 69 70 68 65 72 52 75 6C 65 73",
        "format": "HEX",
        "hint": "Convert Hex to Text."
      }
    ],
    "socialMedia": "",
    "other": "The server logs are heavily encrypted, but a local backdoor was found. Someone accessed the rig from the same local subnet."
  },
  "caseId": "echoes-in-code-v3",
  "suspects": [
    {
      "id": "s1",
      "name": "Marcus Thorne",
      "age": 50,
      "occupation": "CEO, OmniCorp",
      "photo": "https://i.pravatar.cc/150?u=MarcusThorne",
      "relationToVictim": "Blackmail Target",
      "lastKnownWhereabouts": "Private Jet",
      "alibi": "In the air during the attack. Flight logs verified.",
      "motiveAssessment": "LOW",
      "background": "Eli was blackmailing OmniCorp with stolen data.",
      "status": "CLEARED"
    },
    {
      "id": "s2",
      "name": "Cipher (Alex Mercer)",
      "age": 24,
      "occupation": "Hacker Protégé",
      "photo": "https://i.pravatar.cc/150?u=CipherHacker",
      "relationToVictim": "Student",
      "lastKnownWhereabouts": "Apartment 2 blocks away",
      "alibi": "Claims he was streaming on Twitch, but VOD shows a pre-recorded loop from 03:50 onwards.",
      "motiveAssessment": "HIGH",
      "background": "Eli taught Cipher everything, but recently discovered Cipher was stealing his work.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "Cyber Forensics",
    "reportNumber": "CF-22",
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
    "fingerprints": "Alex Mercer's partial print found on the physical server rack's maintenance panel.",
    "dna": "None.",
    "causeOfDeath": "Electrocution",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The power surge was triggered by a physical bypass installed in the server rack, not just software."
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "Hardware Bypass Dongle",
      "locationFound": "Attached to server rack",
      "photo": "/cases/ev-dongle.jpg",
      "significance": "Custom-built rig used to bypass the surge protectors.",
      "chainOfCustody": []
    }
  ],
  "solution": {
    "killer": "Cipher (Alex Mercer)",
    "method": "Cipher physically infiltrated Eli's server farm, installed a hardware bypass, and launched the OmniCorp attack using Eli's rig before triggering a lethal power surge.",
    "motive": "Eli found out Cipher was stealing his exploits and was going to banish him from the hacker community. Cipher eliminated him to steal the glory and silence him."
  }
};
