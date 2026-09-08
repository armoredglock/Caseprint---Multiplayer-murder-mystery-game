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
  "caseId": "canvas-of-blood-v2",
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
      "motiveAssessment": "LOW",
      "background": "The gallery is heavily in debt. Sebastian is the sole beneficiary of the business insurance.",
      "status": "ALIBI VERIFIED"
    },
    {
      "id": "s2",
      "name": "Chloe Price",
      "age": 28,
      "occupation": "Artist",
      "photo": "https://i.pravatar.cc/150?u=ChloePrice",
      "relationToVictim": "Rejected Artist",
      "lastKnownWhereabouts": "The Vanguard Gallery Alley",
      "alibi": "Claims she was just walking by.",
      "motiveAssessment": "HIGH",
      "background": "Julian ruined her career in an editorial last month. She has a history of violent outbursts.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Forensics",
    "reportNumber": "F-101",
    "examiner": "Dr. Thorne",
    "dateOfExam": "2024-12-05",
    "externalExam": "Multiple stab wounds to the chest.",
    "internalExam": "Normal.",
    "toxicology": [
      {
        "substance": "None",
        "result": "Negative",
        "level": "N/A",
        "reference": "Negative"
      }
    ],
    "fingerprints": "Chloe's prints found on a discarded palette knife near the body.",
    "dna": "Chloe's hair found on the victim's jacket.",
    "causeOfDeath": "Exsanguination due to stab wounds",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The cuts on the painting frame are jagged and frantic."
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "Palette Knife",
      "locationFound": "Next to body",
      "photo": "/cases/ev-sculpture.jpg",
      "significance": "Murder weapon.",
      "chainOfCustody": []
    }
  ],
  "solution": {
    "killer": "Chloe Price",
    "method": "Chloe confronted Julian in a rage, stabbed him with her palette knife, and then frantically cut the painting to make it look like a botched robbery.",
    "motive": "Revenge for ruining her artistic career."
  }
};