module.exports = {
  caseId: "midnight-manor-v1",
  scenarioId: "midnight-manor",
  title: "Midnight at the Manor",
  subtitle: "A classic locked-room mystery.",
  difficulty: "Easy",
  playerRange: "2-8 Players",
  thumbnail: "/cases/midnight-manor.jpg",
  themeColor: "#4B5320",
  overview: {
    incidentNumber: "WSS-2024-1102",
    date: "2024-10-31",
    time: "23:45",
    location: "Blackwood Manor, The Study",
    jurisdiction: "Westshire County Sheriff",
    reportingOfficer: "Dep. Thomas Higgins",
    summary: "At approximately 23:45, a frantic call was placed to the sheriff's office by the butler of Blackwood Manor. Lord Archibald Blackwood was found dead in his study. The heavy oak doors were locked from the inside, and the only window was bolted shut. The family had gathered for a reading of his new will. The storm knocked out the power at 23:30. By the time the lights came back on, Lord Blackwood was dead."
  },
  victim: {
    name: "Lord Archibald Blackwood",
    age: 72,
    occupation: "Aristocrat / Industrialist",
    photo: "https://i.pravatar.cc/150?u=ArchibaldBlackwood",
    dateOfBirth: "1952-03-14",
    biography: "A wealthy and eccentric industrialist. He recently announced his intention to disinherit his entire family and leave his massive fortune to his pet corgi and a local cat sanctuary. He was widely disliked by his heirs.",
    knownAssociates: [
      { name: "Beatrice Blackwood", relation: "Niece", photo: "https://i.pravatar.cc/150?u=BeatriceBlackwood" },
      { name: "Reginald Sterling", relation: "Nephew", photo: "https://i.pravatar.cc/150?u=ReginaldSterling" }
    ]
  },
  suspects: [
    {
      id: "suspect-1",
      name: "Beatrice Blackwood",
      age: 45,
      occupation: "Socialite",
      photo: "https://i.pravatar.cc/150?u=BeatriceBlackwood",
      relationToVictim: "Niece",
      lastKnownWhereabouts: "The Drawing Room",
      alibi: "Claims she was in the drawing room drinking sherry when the lights went out.",
      motiveAssessment: "HIGH",
      background: "She has massive gambling debts. She was relying on her uncle's inheritance to avoid bankruptcy.",
      status: "PRIME SUSPECT"
    },
    {
      id: "suspect-2",
      name: "Reginald Sterling",
      age: 38,
      occupation: "Failed Investor",
      photo: "https://i.pravatar.cc/150?u=ReginaldSterling",
      relationToVictim: "Nephew",
      lastKnownWhereabouts: "The Billiard Room",
      alibi: "Claims he was playing billiards alone in the dark.",
      motiveAssessment: "HIGH",
      background: "Begged his uncle for a bailout yesterday and was publicly humiliated.",
      status: "SUSPECT"
    },
    {
      id: "suspect-3",
      name: "Jeeves",
      age: 60,
      occupation: "Butler",
      photo: "https://i.pravatar.cc/150?u=JeevesButler",
      relationToVictim: "Employee",
      lastKnownWhereabouts: "The Kitchen",
      alibi: "Was preparing the midnight tea in the kitchen.",
      motiveAssessment: "LOW",
      background: "Has served the family for 40 years. However, he is secretly the true author of the new will, which actually leaves everything to him, not the pets.",
      status: "PERSON OF INTEREST"
    },
    {
      id: "suspect-4",
      name: "Lady Penelope",
      age: 68,
      occupation: "Widow",
      photo: "https://i.pravatar.cc/150?u=LadyPenelope",
      relationToVictim: "Sister-in-law",
      lastKnownWhereabouts: "Upstairs Bedroom",
      alibi: "Claims she was asleep and slept through the storm.",
      motiveAssessment: "MEDIUM",
      background: "Always hated Archibald for how he treated her late husband.",
      status: "ALIBI UNVERIFIED"
    }
  ],
  witnessStatements: [
    {
      witnessName: "Jeeves",
      age: 60,
      occupation: "Butler",
      address: "Blackwood Manor",
      takenBy: "Dep. Higgins",
      timestamp: "2024-11-01T00:15:00Z",
      body: "The power went out precisely at 11:30 PM. I went to fetch candles. I heard a loud thump from the study at 11:35 PM. I rushed over but the door was locked. I had to fetch the spare key from the pantry.",
      signature: "jeeves"
    },
    {
      witnessName: "Beatrice Blackwood",
      age: 45,
      occupation: "Socialite",
      address: "London",
      takenBy: "Dep. Higgins",
      timestamp: "2024-11-01T01:30:00Z",
      body: "I was in the drawing room. When the lights went out, I heard Reginald swearing in the hallway. He definitely wasn't in the billiard room the whole time.",
      signature: "beatrice"
    }
  ],
  forensics: {
    labName: "County Medical Examiner",
    reportNumber: "ME-2024-88A",
    examiner: "Dr. L. Vance",
    dateOfExam: "2024-11-01",
    externalExam: "Blunt force trauma to the back of the head. Trace amounts of fireplace ash found in the wound.",
    internalExam: "Otherwise healthy.",
    toxicology: [
      { substance: "All common toxins", result: "Negative", level: "N/A", reference: "Negative" }
    ],
    fingerprints: "Numerous prints on the murder weapon (a heavy brass candlestick). Matches to Jeeves and Archibald himself.",
    dna: "None found.",
    causeOfDeath: "Blunt force trauma.",
    mannerOfDeath: "Homicide",
    additionalNotes: "The angle of the strike indicates the attacker was quite tall, or the victim was seated."
  },
  physicalEvidence: [
    {
      tagNumber: "EV-001",
      description: "Brass Candlestick",
      locationFound: "Next to the victim.",
      photo: "/cases/ev-candlestick.jpg",
      significance: "The murder weapon. It belongs on the mantlepiece in the study.",
      chainOfCustody: [{ officer: "Dep. Higgins", date: "2024-10-31 23:50", action: "Secured" }]
    },
    {
      tagNumber: "EV-002",
      description: "Muddy Shoe Print",
      locationFound: "Outside the study window.",
      photo: "/cases/ev-shoeprint.jpg",
      significance: "A size 11 men's Oxford shoe print found in the mud right outside the window.",
      chainOfCustody: [{ officer: "Crime Scene Tech", date: "2024-11-01 06:00", action: "Photographed" }]
    }
  ],
  timeline: [
    { time: "22:00", event: "Lord Blackwood announces his intention to change the will.", linkedEvidence: [], critical: false },
    { time: "23:30", event: "Power goes out.", linkedEvidence: [], critical: true },
    { time: "23:35", event: "Loud thump heard by Jeeves.", linkedEvidence: [], critical: true },
    { time: "23:40", event: "Jeeves unlocks the door and finds the body.", linkedEvidence: [], critical: true }
  ],
  digitalEvidence: {
    phoneRecords: [],
    emails: [
      {
        from: "archibald@blackwood.co.uk",
        to: "lawyer@firm.co.uk",
        subject: "The New Will",
        date: "2024-10-31 18:00",
        body: "I've finalized the draft. Bring it tomorrow morning. The leeches get nothing.",
        attachments: [],
        flagged: true
      }
    ],
    cctvLogs: [],
    puzzles: [],
    socialMedia: "",
    other: "A secret passage was discovered behind the bookshelf in the study, leading directly to the Kitchen pantry. It was recently oiled."
  },
  solution: {
    killer: "Jeeves the Butler",
    method: "Jeeves used the secret passage from the pantry to enter the study. He struck Lord Blackwood with the candlestick, locked the door from the inside, and returned through the passage to 'discover' the body.",
    motive: "Lord Blackwood actually intended to leave the fortune to the pets. Jeeves forged a fake will leaving it to himself, and needed Archibald dead before the real lawyer arrived the next morning."
  }
};
