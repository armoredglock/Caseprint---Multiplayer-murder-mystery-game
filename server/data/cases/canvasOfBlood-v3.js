module.exports = {
  "scenarioId": "canvas-of-blood",
  "title": "Canvas of Blood",
  "subtitle": "A Masterpiece of Murder",
  "difficulty": "Hard",
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
      "body": "I didn't see anyone enter. The cameras were working perfectly. A man in a suit walked right in using Julian's own keycode.",
      "signature": "watchman"
    }
  ],
  "timeline": [
    {
      "time": "00:30",
      "event": "Julian remains in the gallery after the closing party to meet a private buyer.",
      "linkedEvidence": [],
      "critical": true
    },
    {
      "time": "01:45",
      "event": "Suspect enters the gallery using Julian's private access code.",
      "linkedEvidence": [],
      "critical": true
    },
    {
      "time": "02:00",
      "event": "Silent alarm tripped.",
      "linkedEvidence": [],
      "critical": true
    }
  ],
  "digitalEvidence": {
    "phoneRecords": [
      {
        "from": "Elias Thorne",
        "to": "Julian Sterling",
        "time": "01:15",
        "duration": "03:45",
        "type": "RECEIVED",
        "flagged": true
      }
    ],
    "emails": [
      {
        "from": "e.thorne@globalinvest.com",
        "to": "j.sterling@vanguard.com",
        "subject": "The Crimson Saint - Final Offer",
        "date": "2024-12-04 22:00",
        "body": "Julian, I am not accustomed to hearing the word 'no'. I will be there tonight. We will conclude our business.",
        "attachments": [],
        "flagged": true
      }
    ],
    "cctvLogs": [
      {
        "camera": "MAIN HALL",
        "timestamp": "01:46:00",
        "note": "A wealthy man in a tailored suit enters. He strikes Julian with a heavy object during an argument.",
        "flagged": true
      }
    ],
    "puzzles": [],
    "socialMedia": "",
    "other": ""
  },
  "caseId": "canvas-of-blood-v3",
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
      "status": "CLEARED"
    },
    {
      "id": "s2",
      "name": "Elias Thorne",
      "age": 60,
      "occupation": "Billionaire Collector",
      "photo": "https://i.pravatar.cc/150?u=EliasThorne",
      "relationToVictim": "Obsessive Buyer",
      "lastKnownWhereabouts": "The Vanguard Gallery",
      "alibi": "Refuses to speak without his lawyer.",
      "motiveAssessment": "HIGH",
      "background": "Known for acquiring rare art at any cost, sometimes employing illegal means.",
      "status": "PRIME SUSPECT"
    }
  ],
  "forensics": {
    "labName": "City Forensics",
    "reportNumber": "F-102",
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
    "fingerprints": "Elias Thorne's fingerprints found on the vault keypad and the painting frame.",
    "dna": "None.",
    "causeOfDeath": "Blunt force trauma",
    "mannerOfDeath": "Homicide",
    "additionalNotes": "The murder weapon has remnants of gold leaf, matching Elias Thorne's gold-handled cane."
  },
  "physicalEvidence": [
    {
      "tagNumber": "EV-001",
      "description": "Gold-Handled Cane",
      "locationFound": "Abandoned in alleyway behind gallery",
      "photo": "/cases/ev-cane.jpg",
      "significance": "Murder weapon. Covered in victim's blood.",
      "chainOfCustody": []
    }
  ],
  "solution": {
    "killer": "Elias Thorne",
    "method": "Elias used Julian's personal code to enter, struck him with his gold-handled cane when Julian refused the sale, and forcefully cut the painting from its frame.",
    "motive": "Obsession and entitlement. Elias wanted 'The Crimson Saint' and refused to take no for an answer."
  }
};
