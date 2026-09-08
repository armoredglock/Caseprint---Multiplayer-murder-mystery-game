module.exports = {
  "caseId": "boardroom-betrayal-v3",
  "scenarioId": "boardroom-betrayal",
  "title": "The Boardroom Betrayal",
  "subtitle": "Corporate Espionage",
  "difficulty": "Hard",
  "playerRange": {
    "min": 2,
    "max": 10
  },
  "thumbnail": "/cases/boardroom-cover.jpg",
  "themeColor": "#8b2252",
  "overview": {
    "incidentNumber": "NV-2024-00847-V3",
    "date": "2024-11-15",
    "time": "22:47",
    "location": "NovaTech Industries HQ, 42nd Floor Boardroom",
    "jurisdiction": "14th Precinct, Corporate Crimes Division",
    "reportingOfficer": "Det. Sarah Chen",
    "badgeNumber": "4472",
    "summary": "Marcus Chen, 52, CEO of NovaTech Industries, was found deceased in the executive boardroom. Initial reports suggested poisoning, but forensics reveal a sophisticated neurotoxin administered via the HVAC system. This was a targeted hit.",
    "classification": "HOMICIDE - ACTIVE"
  },
  "crimeScene": {
    "description": "The body was found slumped over the conference table. The air vents in the ceiling show signs of tampering. A USB drive is lodged in the CEO's laptop, wiping the main server.",
    "sketch": "/cases/boardroom-sketch.png",
    "evidenceMarkers": [
      {
        "id": "A",
        "item": "Tampered HVAC vent cover",
        "location": "Ceiling directly above victim"
      },
      {
        "id": "B",
        "item": "Melted USB kill-drive",
        "location": "Victim's laptop port"
      }
    ],
    "conditions": "Air conditioning running on maximum, room temperature 58°F",
    "weatherAtTime": "Torrential downpour, 55°F outside"
  },
  "victim": {
    "name": "Marcus Chen",
    "age": 52,
    "occupation": "CEO & Founder, NovaTech Industries",
    "photo": "https://i.pravatar.cc/150?u=MarcusChen",
    "dateOfBirth": "1972-04-12",
    "biography": "A ruthless tech entrepreneur. Marcus recently acquired military contracts that put him in the crosshairs of international competitors.",
    "recentActivity": "Attempting to lock down a $2.4 Billion defense contract. He had scheduled a midnight call with the Pentagon.",
    "knownAssociates": []
  },
  "suspects": [
    {
      "id": "suspect-1",
      "name": "Elias Vance",
      "age": 55,
      "occupation": "CEO, VanceCorp",
      "photo": "https://i.pravatar.cc/150?u=EliasVance",
      "relationToVictim": "Bitter Rival",
      "lastKnownWhereabouts": "VanceCorp Penthouse",
      "alibi": "Attending a charity gala downtown. Left early at 21:00 due to 'illness'.",
      "motiveAssessment": "HIGH",
      "background": "VanceCorp lost the defense contract to NovaTech. Elias is known for employing corporate fixers.",
      "status": "PERSON OF INTEREST",
      "wave": 1
    },
    {
      "id": "suspect-2",
      "name": "Dr. Aris Thorne",
      "age": 42,
      "occupation": "Lead Chemical Engineer, NovaTech",
      "photo": "https://i.pravatar.cc/150?u=ArisThorne",
      "relationToVictim": "Employee",
      "lastKnownWhereabouts": "NovaTech Sub-level Labs",
      "alibi": "Running diagnostics on the air scrubber system from 20:00 to 23:00.",
      "motiveAssessment": "MEDIUM",
      "background": "Thorne developed the neurotoxin for a medical application, but Marcus weaponized it for the defense contract. Thorne was furious.",
      "status": "PRIME SUSPECT",
      "wave": 1
    },
    {
      "id": "suspect-3",
      "name": "Valerie Pierce",
      "age": 41,
      "occupation": "Executive Assistant",
      "photo": "https://i.pravatar.cc/150?u=ValeriePierce",
      "relationToVictim": "Assistant",
      "lastKnownWhereabouts": "NovaTech HQ, 42nd Floor",
      "alibi": "Left at 21:30. Swipes confirm she exited the building.",
      "motiveAssessment": "LOW",
      "background": "Highly paid, deeply loyal. But forensics found large deposits in her offshore accounts.",
      "status": "ALIBI UNVERIFIED",
      "wave": 2
    },
    {
      "id": "suspect-4",
      "name": "Kaelen Rusk",
      "age": 34,
      "occupation": "Head of Physical Security",
      "photo": "https://i.pravatar.cc/150?u=KaelenRusk",
      "relationToVictim": "Head of Security",
      "lastKnownWhereabouts": "Security Control Room",
      "alibi": "Monitoring cameras all night. Claims the 42nd-floor cameras glitched at 21:45.",
      "motiveAssessment": "HIGH",
      "background": "Former special forces. Rusk has the skills to deploy a gaseous agent and the clearance to bypass the cameras.",
      "status": "SUSPECT",
      "wave": 2
    }
  ],
  "witnessStatements": [
    {
      "witnessName": "Janitorial Staff (Maria)",
      "age": 50,
      "occupation": "Cleaner",
      "takenBy": "Det. Sarah Chen",
      "timestamp": "2024-11-16T01:15:00Z",
      "body": "I smelled something sweet, like almonds and burnt sugar, coming from the AC vents around 21:50 on the 41st floor. I thought it was just the new air freshener.",
      "wave": 1
    }
  ],
  "forensics": {
    "labName": "Hazmat Division",
    "reportNumber": "HZ-2024-991",
    "examiner": "Dr. Aris Thorne",
    "dateOfExam": "2024-11-16",
    "toxicology": [
      {
        "substance": "Compound V-7 (Synthetic Neurotoxin)",
        "result": "Positive",
        "level": "Lethal",
        "reference": "Negative"
      }
    ],
    "causeOfDeath": "Asphyxiation via neurotoxin",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The toxin was vaporized and distributed exclusively to the 42nd-floor boardroom via a bypass valve in the HVAC system.",
    "wave": 2
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "HVAC Bypass Valve",
      "locationFound": "Maintenance Shaft B",
      "photo": "/cases/ev-camera.jpg",
      "significance": "A custom 3D-printed valve used to divert the gas. The material matches the resin used in the sub-level labs.",
      "wave": 2
    },
    {
      "tagNumber": "EV-002",
      "description": "Burner Phone",
      "locationFound": "Dumpster behind HQ",
      "photo": "/cases/ev-document.jpg",
      "significance": "Only one message sent at 21:55: 'The package is delivered. Transfer the funds.'",
      "wave": 3
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [
      {
        "from": "Kaelen Rusk",
        "to": "Offshore Relay",
        "time": "21:56",
        "duration": "00:12",
        "type": "OUTGOING",
        "flagged": true,
        "wave": 1
      }
    ],
    "emails": [
      {
        "from": "a.thorne@novatech.com",
        "to": "m.chen@novatech.com",
        "subject": "RESIGNATION / CEASE AND DESIST",
        "date": "2024-11-15 18:30",
        "body": "Marcus, you are crossing a line. I will not let you sell my life's work to the military. I am shutting down the synthesis servers tonight.",
        "flagged": true,
        "wave": 1
      }
    ],
    "cctvLogs": [
      {
        "camera": "MAINTENANCE-SHAFT-B",
        "timestamp": "21:40:00",
        "note": "Camera offline for maintenance cycle.",
        "flagged": true,
        "wave": 2
      },
      {
        "camera": "LOBBY-EXIT",
        "timestamp": "21:30:15",
        "note": "Valerie Pierce exits the building.",
        "flagged": false,
        "wave": 1
      }
    ],
    "puzzles": [
      {
        "id": "puz-003",
        "title": "Burner Phone Pin",
        "description": "We need to unlock the burner phone found in the dumpster. The hint on the lock screen is 'VanceCorp Security Override Code (Binary)'.",
        "data": "01010110 01000001 01001110 01000011 01000101",
        "format": "BINARY",
        "hint": "Convert the binary to ASCII text.",
        "answer": "VANCE",
        "wave": 3
      }
    ]
  },
  "timeline": [
    {
      "time": "21:40",
      "event": "Maintenance shaft camera goes offline (authorized by Rusk).",
      "critical": true,
      "wave": 1
    },
    {
      "time": "21:45",
      "event": "Toxin released into HVAC.",
      "critical": true,
      "wave": 2
    }
  ],
  "solution": {
    "killer": "Kaelen Rusk",
    "method": "Used his security clearance to blind the cameras, accessed the HVAC maintenance shaft, and deployed the V-7 neurotoxin into the boardroom air supply using a 3D-printed valve stolen from Thorne's lab.",
    "motive": "Rusk was bought out by Elias Vance. He was paid a massive sum via offshore accounts to assassinate Marcus and sabotage the defense contract, framing Dr. Thorne in the process.",
    "fullExplanation": "Elias Vance orchestrated the hit. He bribed Kaelen Rusk to do the dirty work. Rusk stole the neurotoxin and the resin from Thorne's lab to frame him. Rusk then used his security privileges to turn off the cameras, plant the valve, and gas the CEO. The burner phone text at 21:55 was Rusk confirming the kill to Vance."
  }
};
