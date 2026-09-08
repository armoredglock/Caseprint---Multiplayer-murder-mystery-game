module.exports = {
  "scenarioId": "canvas-of-blood",
  "title": "Canvas of Blood",
  "subtitle": "A Masterpiece of Murder",
  "difficulty": "Medium",
  "playerRange": "2-8 Players",
  "thumbnail": "/cases/canvas-of-blood.jpg",
  "themeColor": "#5E2129",
  "overview": {
    "incidentNumber": "ART-2024-001",
    "date": "2024-12-05",
    "time": "02:00",
    "location": "The Vanguard Gallery, Downtown",
    "jurisdiction": "Art Crimes & Homicide Division",
    "reportingOfficer": "Det. Vance",
    "summary": "At 02:00, the silent alarm at The Vanguard Gallery was tripped. Police arrived to find the gallery owner, Julian Sterling, bludgeoned to death in the main exhibition hall. The centerpiece of the exhibition, a priceless 17th-century painting titled 'The Crimson Saint', has been cut from its frame."
  },
  "victim": {
    "name": "Julian Sterling",
    "age": 55,
    "occupation": "Gallery Owner",
    "photo": "https://i.pravatar.cc/150?u=JulianSterling",
    "dateOfBirth": "1969-08-22",
    "biography": "A ruthless art dealer known for acquiring disputed artifacts.",
    "knownAssociates": []
  },
  "witnessStatements": [
    {
      "witnessName": "Night Watchman",
      "age": 62,
      "occupation": "Guard",
      "address": "Local",
      "takenBy": "Det. Vance",
      "timestamp": "2024-12-05T02:15:00Z",
      "body": "I was in the basement security room. The cameras loop, I swear they do. I didn't see anyone enter. Just heard the glass smash.",
      "signature": "watchman"
    }
  ],
  "timeline": [
    {
      "time": "00:30",
      "event": "Julian remains in the gallery after the closing party.",
      "linkedEvidence": [],
      "critical": false
    },
    {
      "time": "02:00",
      "event": "Silent alarm tripped.",
      "linkedEvidence": [],
      "critical": true
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [],
    "emails": [
      {
        "from": "j.sterling@vanguard.com",
        "to": "insurance@lloyds.com",
        "subject": "Policy Update",
        "date": "2024-12-04 15:00",
        "body": "Please confirm the policy on 'The Crimson Saint' is active for $15 million.",
        "attachments": [],
        "flagged": true
      }
    ],
    "cctvLogs": [
      {
        "camera": "MAIN HALL",
        "timestamp": "01:50:00",
        "note": "Feed loops. A static image is being broadcast.",
        "flagged": true
      }
    ],
    "puzzles": [],
    "socialMedia": "",
    "other": ""
  },
  "caseId": "canvas-of-blood-v1",
  "suspects": [
    {
      "id": "s1",
      "name": "Sebastian Vance",
      "age": 40,
      "occupation": "Business Partner",
      "photo": "https://i.pravatar.cc/150?u=SebastianVance",
      "relationToVictim": "Co-owner",
      "lastKnownWhereabouts": "Home",
      "alibi": "Asleep.",
      "motiveAssessment": "HIGH",
      "background": "The gallery is heavily in debt. Sebastian is the sole beneficiary of the business insurance.",
      "status": "PRIME SUSPECT"
    },
    {
      "id": "s2",
      "name": "Chloe Price",
      "age": 28,
      "occupation": "Artist",
      "photo": "https://i.pravatar.cc/150?u=ChloePrice",
      "relationToVictim": "Rejected Artist",
      "lastKnownWhereabouts": "Her studio",
      "alibi": "Painting all night.",
      "motiveAssessment": "MEDIUM",
      "background": "Julian ruined her career in an editorial last month.",
      "status": "SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Forensics",
    "reportNumber": "F-100",
    "examiner": "Dr. Thorne",
    "dateOfExam": "2024-12-05",
    "externalExam": "Blunt force trauma to the occipital lobe.",
    "internalExam": "Normal.",
    "toxicology": [
      {
        "substance": "None",
        "result": "Negative",
        "level": "N/A",
        "reference": "Negative"
      }
    ],
    "fingerprints": "Sebastian's prints found on the frame of the missing painting.",
    "dna": "None.",
    "causeOfDeath": "Blunt force trauma",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The cut on the painting frame was precise, requiring a surgical scalpel or a professional framer's knife."
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "Bronze Sculpture",
      "locationFound": "Next to body",
      "photo": "/cases/ev-sculpture.jpg",
      "significance": "Murder weapon.",
      "chainOfCustody": []
    }
  ],
  "solution": {
    "killer": "Sebastian Vance",
    "method": "Sebastian looped the CCTV, bludgeoned Julian with a sculpture, and cut the painting out to claim the $15 million insurance.",
    "motive": "Financial ruin. The gallery was bankrupt."
  }
};