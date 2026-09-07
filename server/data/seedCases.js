const mongoose = require('mongoose');
const Case = require('../models/Case');
const connectDB = require('../config/db');
require('dotenv').config({ path: __dirname + '/../.env' }); // Load .env if it exists

const seedCases = [
  {
    caseId: "boardroom-betrayal",
    title: "The Boardroom Betrayal",
    subtitle: "A CEO's Final Meeting",
    difficulty: "Medium",
    playerRange: { min: 2, max: 10 },
    thumbnail: "/cases/boardroom-cover.jpg",
    themeColor: "#8b2252",
    
    overview: {
      incidentNumber: "NV-2024-00847",
      date: "2024-11-15",
      time: "22:47",
      location: "NovaTech Industries HQ, 42nd Floor Boardroom, 100 Innovation Way",
      jurisdiction: "14th Precinct, Homicide Division",
      reportingOfficer: "Det. Sarah Chen",
      badgeNumber: "4472",
      summary: "Marcus Chen, 52, CEO of NovaTech Industries, was found deceased in the executive boardroom on the 42nd floor of the company's headquarters. The room was locked from the inside. Preliminary assessment indicates poisoning. The victim had been holding a closed-door executive session earlier in the evening to discuss a hostile takeover and allegations of corporate espionage.",
      classification: "HOMICIDE - ACTIVE"
    },
    
    crimeScene: {
      description: "The body was found slumped over the head of the massive mahogany conference table. A half-empty crystal whiskey decanter [A] and a single lowball glass [B] were situated immediately to the victim's right. The victim's smartphone [C] was found on the floor under the table, the screen completely shattered as if stomped on. The room was locked from the inside via a high-security electronic deadbolt system that requires a master keycard or an internal manual override. The thermostat was set to an unusually cold 62°F. No signs of forced entry or physical struggle. A shredded document [D] was found in the wastebasket near the door, and a strange muddy footprint [E] was found near the east window, despite it being on the 42nd floor. A hidden camera [F] was found embedded in a smoke detector.",
      sketch: "/cases/boardroom-sketch.png",
      evidenceMarkers: [
        { id: "A", item: "Crystal whiskey decanter (Macallan 25, half-full)", location: "Table, right of victim" },
        { id: "B", item: "Lowball glass (empty, white powdery residue present)", location: "Table, right of victim" },
        { id: "C", item: "Smartphone (shattered screen, battery removed)", location: "Floor beneath victim's chair" },
        { id: "D", item: "Shredded document (partially reconstructed)", location: "Wastebasket near door" },
        { id: "E", item: "Muddy footprint (size 11, heavy work boot)", location: "Carpet near east window" },
        { id: "F", item: "Concealed miniature camera", location: "Inside smoke detector above the table" }
      ],
      conditions: "Artificial lighting (overhead fluorescents), room temperature artificially lowered to 62°F",
      weatherAtTime: "Torrential downpour, heavy lightning, 55°F outside"
    },
    
    victim: {
      name: "Marcus Chen",
      age: 52,
      occupation: "CEO & Founder, NovaTech Industries",
      photo: "https://i.pravatar.cc/150?u=MarcusChen",
      dateOfBirth: "1972-04-12",
      address: "1004 Skyline Dr, Penthouse A",
      biography: "A visionary tech entrepreneur. Marcus founded NovaTech 15 years ago, steering it to become a global industry leader in renewable energy storage and experimental quantum batteries. Known for a ruthless, unyielding management style and recent highly controversial decisions regarding massive company restructuring and a potential acquisition by rival conglomerate VanceCorp. Marcus had recently grown extremely paranoid, hiring private security and installing illegal wiretaps in his own offices to root out an alleged corporate mole.",
      recentActivity: "Called a highly irregular emergency executive board meeting for 19:00 on the night of his death, explicitly forbidding attendees from bringing their phones. The meeting concluded at 21:30 in a screaming match. He remained in the boardroom alone.",
      knownAssociates: [
        { name: "Robert Hayes", relation: "CFO & Business Partner", photo: "https://i.pravatar.cc/150?u=RobertHayes" },
        { name: "Elena Rostova", relation: "VP of Engineering", photo: "https://i.pravatar.cc/150?u=ElenaRostova" },
        { name: "David Chen", relation: "Estranged Son", photo: "https://i.pravatar.cc/150?u=DavidChen" },
        { name: "Valerie Pierce", relation: "Executive Assistant", photo: "https://i.pravatar.cc/150?u=ValeriePierce" },
        { name: "Julian Vance", relation: "Rival CEO (VanceCorp)", photo: "https://i.pravatar.cc/150?u=JulianVance" }
      ]
    },
    
    suspects: [
      {
        id: "suspect-1",
        name: "Robert Hayes",
        age: 48,
        occupation: "CFO, NovaTech",
        photo: "https://i.pravatar.cc/150?u=RobertHayes",
        relationToVictim: "Co-founder and business partner of 12 years",
        lastKnownWhereabouts: "NovaTech HQ, 41st Floor Executive Lounge",
        alibi: "Claims to have been drinking heavily in the lounge downstairs from 21:30 to 22:30 after the meeting ended, recovering from a 'brutal argument' with Marcus.",
        motiveAssessment: "HIGH",
        background: "Financial records secretly obtained by Marcus suggest NovaTech was facing a massive $400 million shortfall due to Robert's unauthorized offshore investments. Hayes was aggressively pushing for a hostile buyout from VanceCorp to cover the missing funds, which Marcus vehemently opposed and threatened to expose to the SEC.",
        status: "PRIME SUSPECT"
      },
      {
        id: "suspect-2",
        name: "Elena Rostova",
        age: 36,
        occupation: "VP of Engineering",
        photo: "https://i.pravatar.cc/150?u=ElenaRostova",
        relationToVictim: "Direct report, lead on flagship 'Project Icarus'",
        lastKnownWhereabouts: "NovaTech HQ, R&D Labs (Floor 38)",
        alibi: "Claims she was working late in the R&D labs validating test results for the new quantum battery prototype until midnight.",
        motiveAssessment: "HIGH",
        background: "Marcus recently canceled funding for 'Project Icarus', reallocating the $50 million budget to a different division. Elena had dedicated 7 years of her life to it. She had a public screaming match with him three days prior, where she threatened to take the blueprints to VanceCorp.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-3",
        name: "David Chen",
        age: 24,
        occupation: "Unemployed",
        photo: "https://i.pravatar.cc/150?u=DavidChen",
        relationToVictim: "Estranged son",
        lastKnownWhereabouts: "Unknown",
        alibi: "Claims he was at a bar across town, but no witnesses can corroborate his exact time of arrival.",
        motiveAssessment: "MEDIUM",
        background: "Recently completely cut out of Marcus's $2 billion will due to severe gambling debts and substance abuse issues. David owes $500,000 to a local crime syndicate. He was seen physically fighting with security in the lobby earlier that day demanding to see his father.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-4",
        name: "Valerie Pierce",
        age: 41,
        occupation: "Executive Assistant",
        photo: "https://i.pravatar.cc/150?u=ValeriePierce",
        relationToVictim: "Assistant for 8 years",
        lastKnownWhereabouts: "NovaTech HQ, 42nd Floor Reception",
        alibi: "Was organizing highly sensitive HR files at her desk right outside the boardroom until 22:00, then supposedly took an Uber home.",
        motiveAssessment: "MEDIUM",
        background: "Extremely loyal on paper. However, she had access to Marcus's private schedule, the boardroom master keys, and his encrypted personal files. Recently, Marcus discovered someone had been leaking his private schedule to Julian Vance, and Valerie was the only one with access.",
        status: "ALIBI UNVERIFIED"
      }
    ],
    
    witnessStatements: [
      {
        witnessName: "Greg Miller",
        age: 55,
        occupation: "Night Security Guard, NovaTech",
        address: "442 Elm St, Apt 2B",
        takenBy: "Det. Sarah Chen",
        timestamp: "2024-11-16T01:15:00Z",
        body: "I was doing my rounds on the 42nd floor around 22:15. The boardroom door was locked tight. The light under the door was on. I knocked just to check in, but he didn't answer. That isn't entirely unusual when Mr. Chen works late; he often puts in noise-canceling headphones. I didn't see anyone else on the floor. I only opened the door at 22:45 when his wife called the front desk in a panic saying he wasn't answering his emergency line. I had to use the master override keycard to get in. As soon as I opened the door, I smelled this weird sweet smell, like burnt sugar and almonds.",
        signature: "greg-miller"
      },
      {
        witnessName: "Valerie Pierce",
        age: 41,
        occupation: "Executive Assistant",
        address: "789 Pine Ln",
        takenBy: "Det. Sarah Chen",
        timestamp: "2024-11-16T02:30:00Z",
        body: "The emergency meeting ended at 21:30. It was brutal. Robert and Marcus were screaming at each other about SEC filings. Everyone stormed out except Mr. Chen. He buzzed my desk and asked me to bring in his 'special' decanter from his private office—the Macallan 25. He only drinks that when he's celebrating or severely stressed. Tonight, it was definitely stress. Robert Hayes stayed in the lounge downstairs; I saw him pacing there when I went to fetch the whiskey. I brought the decanter in at 21:40. Marcus locked the door behind me when I left. I organized files until 22:00 and then took an Uber home.",
        signature: "valerie-pierce"
      },
      {
        witnessName: "Samuel 'Slick' Jenkins",
        age: 32,
        occupation: "Uber Driver",
        address: "1224 West Ave",
        takenBy: "Off. Jenkins",
        timestamp: "2024-11-16T08:45:00Z",
        body: "Yeah, I picked up a woman matching Valerie's description from the NovaTech building. But it wasn't at 22:00. My app says the ride started at 22:18. She was standing in the pouring rain looking extremely nervous, constantly checking her phone. She told me to step on it because she 'couldn't be late for a flight', but I just dropped her off at a suburban house.",
        signature: "s-jenkins"
      },
      {
        witnessName: "Dr. Aris Thorne",
        age: 60,
        occupation: "Chief Medical Examiner",
        address: "City Morgue",
        takenBy: "Det. Sarah Chen",
        timestamp: "2024-11-16T14:00:00Z",
        body: "I performed the preliminary examination. The cause of death is undoubtedly acute potassium cyanide poisoning. It acts very rapidly, usually within 5 to 10 minutes of ingestion. Given the state of rigor and body temperature in a 62-degree room, I place the time of death very specifically between 21:50 and 22:05. Whoever administered the poison did it in a massive dose. It wasn't a subtle assassination; it was overkill.",
        signature: "dr-a-thorne"
      }
    ],
    
    forensics: {
      labName: "City Central Forensic Laboratory",
      reportNumber: "FL-2024-3892",
      examiner: "Dr. Aris Thorne",
      dateOfExam: "2024-11-16",
      externalExam: "No signs of physical trauma. Slight cyanosis of lips and nail beds. Minor contusions on the knuckles of the right hand, indicating the victim may have punched a hard surface recently.",
      internalExam: "Severe pulmonary edema. Distinctive odor of bitter almonds noted upon opening chest cavity. Stomach contents include partially digested steak and a massive concentration of cyanide.",
      toxicology: [
        { substance: "Ethanol", result: "Positive", level: "0.04 BAC", reference: "< 0.08" },
        { substance: "Potassium Cyanide", result: "Positive", level: "15.4 mg/L", reference: "Negative (Lethal > 2.5 mg/L)" },
        { substance: "Zolpidem (Ambien)", result: "Positive", level: "0.2 mg/L", reference: "Therapeutic" }
      ],
      fingerprints: "Only the victim's prints found on the glass (EV-002). Victim and Valerie Pierce's prints found on the decanter (EV-001). Robert Hayes's prints found on the shattered smartphone (EV-003).",
      dna: "A single strand of long red hair (matching Elena Rostova) found caught in the hinge of the boardroom door.",
      causeOfDeath: "Acute cyanide poisoning",
      mannerOfDeath: "Homicide",
      additionalNotes: "Toxin was ingested orally, mixed with the whiskey. Cyanide acts rapidly; time of death definitively estimated between 21:50 and 22:05. The presence of Ambien suggests someone may have been attempting to drug him prior to the fatal poisoning."
    },
    
    physicalEvidence: [
      {
        tagNumber: "EV-001",
        description: "Crystal whiskey decanter (Macallan 25)",
        locationFound: "Boardroom table, next to victim",
        photo: "/cases/ev-decanter.jpg",
        significance: "Contains Macallan 25 whiskey laced with a lethal dose of potassium cyanide. The concentration is incredibly high.",
        chainOfCustody: [
          { officer: "Det. Chen", date: "2024-11-15 23:10", action: "Collected at scene" },
          { officer: "Tech Ramirez", date: "2024-11-16 00:05", action: "Logged into evidence" },
          { officer: "Dr. Thorne", date: "2024-11-16 08:00", action: "Signed out for tox screen" }
        ]
      },
      {
        tagNumber: "EV-002",
        description: "Reconstructed shredded document",
        locationFound: "Boardroom wastebasket",
        photo: "/cases/ev-document.jpg",
        significance: "Appears to be a highly confidential draft letter terminating the employment of Robert Hayes, citing 'gross financial misconduct and embezzlement of $400 million.' It was signed by Marcus Chen and dated for the following morning.",
        chainOfCustody: [
          { officer: "Det. Chen", date: "2024-11-15 23:45", action: "Collected at scene" }
        ]
      },
      {
        tagNumber: "EV-003",
        description: "Shattered Smartphone",
        locationFound: "Under boardroom table",
        photo: "/cases/ev-phone.jpg",
        significance: "Belongs to Marcus Chen. The screen was intentionally smashed and the battery violently removed. Forensic data recovery extracted one unsent drafted text message at 21:48: 'I know what you did. The police are on their way.'",
        chainOfCustody: [
          { officer: "Det. Chen", date: "2024-11-15 23:50", action: "Collected at scene" }
        ]
      },
      {
        tagNumber: "EV-004",
        description: "Concealed miniature camera",
        locationFound: "Inside smoke detector",
        photo: "/cases/ev-camera.jpg",
        significance: "An illegal, high-end corporate espionage camera. It was remotely wiped at exactly 22:00, obliterating any footage of the murder.",
        chainOfCustody: [
          { officer: "Tech Ramirez", date: "2024-11-16 02:15", action: "Discovered during sweep" }
        ]
      }
    ],
    
    digitalEvidence: {
      phoneRecords: [
        { from: "Marcus Chen", to: "Elena Rostova", time: "20:45", duration: "00:02", type: "OUTGOING", flagged: false },
        { from: "Robert Hayes", to: "Marcus Chen", time: "21:45", duration: "00:00", type: "MISSED", flagged: true },
        { from: "Marcus Chen", to: "Unknown (Burner)", time: "21:46", duration: "02:15", type: "OUTGOING", flagged: true },
        { from: "David Chen", to: "Marcus Chen", time: "21:55", duration: "00:00", type: "MISSED", flagged: true },
        { from: "Valerie Pierce", to: "Julian Vance (VanceCorp CEO)", time: "22:05", duration: "00:45", type: "OUTGOING", flagged: true }
      ],
      emails: [
        { 
          from: "r.hayes@novatech.com", 
          to: "m.chen@novatech.com", 
          subject: "Re: The VanceCorp Offer - URGENT", 
          date: "2024-11-15 16:30", 
          body: "Marcus, you need to reconsider. The SEC audit is starting next week. If VanceCorp buys us out now, they absorb the liabilities and no one looks too closely at Q3. If we stand alone, the board will see the $400M gap. We will both go to prison. Do not do this.",
          attachments: [],
          flagged: true
        },
        { 
          from: "e.rostova@novatech.com", 
          to: "m.chen@novatech.com", 
          subject: "Project Icarus - Final Warning", 
          date: "2024-11-15 18:15", 
          body: "You can't shut it down. I won't let you. I have the blueprints on a secure drive. If you pull the funding tonight, I am walking straight to Julian Vance, and I'll make sure NovaTech burns.",
          attachments: [],
          flagged: true
        },
        { 
          from: "v.pierce@novatech.com", 
          to: "m.chen@novatech.com", 
          subject: "Security Logs", 
          date: "2024-11-15 14:00", 
          body: "Mr. Chen, per your request, I reviewed the keycard access logs for the executive floor. Robert Hayes's master card was used to access the surveillance server room at 2:00 AM last night.",
          attachments: ["access_logs_nov14.pdf"],
          flagged: true
        }
      ],
      cctvLogs: [
        { camera: "CAM-42-HALL", timestamp: "21:30:45", note: "Board members exit. Chen remains inside.", flagged: false },
        { camera: "CAM-42-HALL", timestamp: "21:40:12", note: "Valerie Pierce enters boardroom carrying decanter.", flagged: false },
        { camera: "CAM-42-HALL", timestamp: "21:42:05", note: "Valerie Pierce exits boardroom. She appears agitated and is typing rapidly on her phone.", flagged: true },
        { camera: "CAM-41-LOUNGE", timestamp: "21:45:00", note: "Robert Hayes enters lounge, pours drink.", flagged: false },
        { camera: "CAM-42-HALL", timestamp: "21:48:30", note: "System glitch. Camera CAM-42-HALL goes completely offline.", flagged: true },
        { camera: "CAM-41-LOUNGE", timestamp: "21:50:00", note: "Hayes is NOT visible in lounge. He is missing from camera view for 15 minutes.", flagged: true },
        { camera: "CAM-41-LOUNGE", timestamp: "22:05:00", note: "Hayes reappears in lounge, sweating heavily, adjusting his tie.", flagged: true },
        { camera: "CAM-EXT-LOBBY", timestamp: "22:15:00", note: "David Chen caught on external camera pacing outside the building in the rain.", flagged: false }
      ],
      socialMedia: "David Chen posted a cryptic tweet at 22:00: 'Finally getting what's owed to me. The old man is going to pay.'",
      other: "A review of the electronic deadbolt on the boardroom door shows a manual override was triggered at 21:52, and the door was locked from the OUTSIDE at 22:01 using Robert Hayes's master keycard."
    },
    
    timeline: [
      { time: "19:00", event: "Emergency board meeting begins. Phones confiscated.", linkedEvidence: [], critical: false },
      { time: "21:30", event: "Meeting concludes in a screaming match. Attendees leave except Marcus.", linkedEvidence: [], critical: false },
      { time: "21:40", event: "Valerie brings poisoned decanter to boardroom.", linkedEvidence: ["EV-001"], critical: true },
      { time: "21:46", event: "Marcus makes a 2-minute call to an unknown burner phone.", linkedEvidence: [], critical: false },
      { time: "21:48", event: "CCTV on 42nd floor goes offline due to intentional sabotage.", linkedEvidence: [], critical: true },
      { time: "21:48", event: "Marcus drafts a text: 'I know what you did. The police are on their way.' Phone is then smashed.", linkedEvidence: ["EV-003"], critical: true },
      { time: "21:52", event: "Boardroom door manual override triggered.", linkedEvidence: [], critical: true },
      { time: "22:00", event: "Hidden espionage camera remotely wiped.", linkedEvidence: ["EV-004"], critical: false },
      { time: "22:01", event: "Boardroom door locked from the OUTSIDE using Robert Hayes's keycard.", linkedEvidence: [], critical: true },
      { time: "22:15", event: "Security guard checks door, gets no answer.", linkedEvidence: [], critical: false },
      { time: "22:45", event: "Body discovered by security guard.", linkedEvidence: [], critical: true }
    ],
    
    clueWaves: {
      wave1: ["overview", "crimeScene", "victim", "suspects"],
      wave2: ["witnessStatements", "forensics", "physicalEvidence"],
      wave3: ["digitalEvidence", "timeline"]
    },
    
    solution: {
      killer: "Robert Hayes",
      method: "Laced the Macallan 25 whiskey in the decanter with potassium cyanide and manually locked the boardroom from the outside to frame it as a locked-room suicide.",
      motive: "Marcus had concrete proof that Hayes embezzled $400 million and was preparing to terminate him and call the SEC (evidenced by the shredded document). Hayes desperately needed the VanceCorp buyout to cover his tracks.",
      fullExplanation: "Robert Hayes was backed into a corner. He knew Valerie Pierce would bring Marcus the Macallan 25 after the brutal meeting. Hayes intercepted the decanter or spiked it earlier. At 21:48, Hayes used his IT access to kill the 42nd-floor CCTV. He entered the boardroom using the manual override. Marcus, realizing he was poisoned or threatened, drafted a text to the police, but Hayes smashed the phone (leaving his prints on it). Hayes watched Marcus die, shredded the termination letter, wiped the hidden camera he had installed for corporate espionage, and then locked the door from the outside at 22:01 using his master keycard, attempting to create a 'locked room' mystery."
    }
  },
  {
    caseId: "canvas-of-blood",
    title: "Canvas of Blood",
    subtitle: "A Masterpiece in Red",
    difficulty: "Hard",
    playerRange: { min: 2, max: 8 },
    thumbnail: "/cases/canvas-cover.jpg",
    themeColor: "#cc0000",
    
    overview: {
      incidentNumber: "NV-2025-00123",
      date: "2025-03-10",
      time: "08:15",
      location: "Galerie Moderne, 15 Art District",
      jurisdiction: "3rd Precinct, Homicide Division",
      reportingOfficer: "Det. James Gordon",
      badgeNumber: "8821",
      summary: "Renowned painter Silas Thorne was found dead in his private studio attached to the gallery. He was discovered by his manager. The victim was found slumped in front of an unfinished canvas, which was smeared with blood. The murder weapon, an antique dagger, was left at the scene.",
      classification: "HOMICIDE - ACTIVE"
    },
    
    victim: {
      name: "Silas Thorne",
      age: 45,
      occupation: "Contemporary Artist",
      photo: "https://i.pravatar.cc/150?u=SilasThorne",
      dateOfBirth: "1980-05-20",
      address: "15 Art District, Studio 3",
      biography: "Silas Thorne was a controversial but highly successful painter. Known for his erratic behavior and intense, chaotic art pieces. Recently, his pieces were selling for millions, but rumors circulated that he was planning to pull his entire upcoming exhibition.",
      recentActivity: "Working late in his studio. Texted his manager at 01:00 AM saying he had a 'breakthrough'."
    },
    
    suspects: [
      {
        id: "suspect-1",
        name: "Claire Vance",
        age: 38,
        occupation: "Gallery Manager",
        photo: "https://i.pravatar.cc/150?u=ClaireVance",
        relationToVictim: "Manager and former lover",
        lastKnownWhereabouts: "Home",
        alibi: "Claims to have been asleep at home from 23:00 until she found the body at 08:00.",
        motiveAssessment: "HIGH",
        background: "Silas was threatening to pull out of the multi-million dollar exhibition, which would have bankrupt Claire's gallery. They had a massive argument yesterday.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-2",
        name: "Julian Cross",
        age: 29,
        occupation: "Apprentice / Studio Assistant",
        photo: "https://i.pravatar.cc/150?u=JulianCross",
        relationToVictim: "Assistant",
        lastKnownWhereabouts: "Local Bar",
        alibi: "Drinking at a local pub until 02:00 AM, verified by the bartender.",
        motiveAssessment: "MEDIUM",
        background: "Julian has been accused by critics of actually painting Silas's most recent works. Silas took all the credit and paid Julian a meager wage.",
        status: "CLEARED"
      },
      {
        id: "suspect-3",
        name: "Victor Thorne",
        age: 50,
        occupation: "Banker",
        photo: "https://i.pravatar.cc/150?u=VictorThorne",
        relationToVictim: "Brother",
        lastKnownWhereabouts: "Hotel Downtown",
        alibi: "In town for business, staying at the Grand Hotel.",
        motiveAssessment: "HIGH",
        background: "Victor and Silas were in a bitter legal battle over their late mother's estate. Victor desperately needed cash to cover bad investments.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-4",
        name: "Lydia Vance",
        age: 35,
        occupation: "Art Critic",
        photo: "https://i.pravatar.cc/150?u=LydiaVance",
        relationToVictim: "Rival / Critic",
        lastKnownWhereabouts: "Home",
        alibi: "Writing a review at home until 04:00 AM.",
        motiveAssessment: "MEDIUM",
        background: "Lydia built her career tearing Silas down. Silas recently found proof she was accepting bribes to write bad reviews and was going to expose her.",
        status: "ALIBI UNVERIFIED"
      }
    ],
    
    witnessStatements: [
      {
        witnessName: "Claire Vance",
        age: 38,
        occupation: "Gallery Manager",
        takenBy: "Det. Gordon",
        timestamp: "2025-03-10T09:00:00Z",
        body: "I came in at 8 AM to check on him. The door was unlocked. I found him in front of the canvas. It's a tragedy.",
        signature: "c-vance"
      }
    ],
    
    forensics: {
      labName: "City Central Forensic Laboratory",
      reportNumber: "FL-2025-0102",
      examiner: "Dr. Aris Thorne",
      dateOfExam: "2025-03-10",
      externalExam: "Victim found slumped against canvas. Singular stab wound to the central chest. Defense wounds noted on both forearms (slight bruising and minor lacerations). Dried paint found under victim's fingernails.",
      internalExam: "Blade severed the descending aorta, resulting in rapid exsanguination. No signs of poisoning or prior trauma. Toxicology shows caffeine and trace amounts of nicotine, otherwise clean.",
      causeOfDeath: "Exsanguination due to single stab wound to the chest.",
      fingerprints: "Only the victim's prints found on the dagger handle. However, a partial print belonging to Claire Vance was found on the door handle.",
      additionalNotes: "Time of death estimated between 01:30 AM and 03:00 AM."
    },
    
    physicalEvidence: [
      {
        tagNumber: "EV-101",
        description: "Antique Dagger (16th Century replica)",
        locationFound: "Floor, 3 feet from victim",
        photo: "/cases/ev-dagger.jpg",
        significance: "The murder weapon. It was taken from a display case in the gallery's front lobby.",
        chainOfCustody: [
          { officer: "Det. Gordon", date: "2025-03-10 09:15", action: "Collected at scene" }
        ]
      },
      {
        tagNumber: "EV-102",
        description: "Unfinished Canvas (Smeared)",
        locationFound: "Easel, directly in front of victim",
        photo: "/cases/ev-canvas.jpg",
        significance: "The canvas the victim was working on. The blood smear appears chaotic but has a distinct handprint at the bottom right corner, suggesting the victim reached out before collapsing.",
        chainOfCustody: [
          { officer: "Tech Ramirez", date: "2025-03-10 10:30", action: "Photographed and bagged" }
        ]
      }
    ],
    digitalEvidence: {
      phoneRecords: [
        { from: "Claire Vance", to: "Silas Thorne", time: "23:45", duration: "00:00", type: "MISSED", flagged: false },
        { from: "Silas Thorne", to: "Claire Vance", time: "01:00", duration: "00:00", type: "TEXT", note: "'I had a breakthrough. The exhibition is off. It's all garbage.'", flagged: true },
        { from: "Victor Thorne", to: "Silas Thorne", time: "01:15", duration: "03:45", type: "INCOMING", flagged: true }
      ],
      cctvLogs: [
        { camera: "CAM-LOBBY", timestamp: "01:45:00", note: "Figure in dark coat enters gallery using keypad code.", flagged: true },
        { camera: "CAM-LOBBY", timestamp: "02:25:00", note: "Same figure exits gallery rapidly.", flagged: true }
      ]
    },
    timeline: [
      { time: "23:00", event: "Claire Vance claims to have gone to sleep.", linkedEvidence: [], critical: false },
      { time: "01:00", event: "Silas texts Claire that he is pulling the exhibition.", linkedEvidence: [], critical: true },
      { time: "01:15", event: "Silas has a nearly 4-minute phone call with his brother Victor.", linkedEvidence: [], critical: false },
      { time: "01:45", event: "Unknown figure enters gallery lobby.", linkedEvidence: [], critical: true },
      { time: "02:00", event: "Estimated time of murder (Stabbed with dagger).", linkedEvidence: ["EV-101"], critical: true },
      { time: "02:25", event: "Unknown figure exits gallery.", linkedEvidence: [], critical: true },
      { time: "08:00", event: "Claire Vance arrives at the gallery and discovers the body.", linkedEvidence: [], critical: false }
    ],
    
    clueWaves: {
      wave1: ["overview", "victim", "suspects"],
      wave2: ["witnessStatements", "forensics"],
      wave3: []
    },
    
    solution: {
      killer: "Claire Vance",
      method: "Stabbed Silas with an antique dagger from his own collection.",
      motive: "Financial ruin. Silas pulling out of the exhibition would have destroyed her gallery.",
      fullExplanation: "Claire knew Silas was serious about pulling the exhibition. She went to the studio at 02:00 AM. They argued. In a fit of rage, she grabbed the dagger and stabbed him, then wiped her prints from the handle, forgetting the door."
    }
  },
  {
    caseId: "crimson-gala",
    title: "The Crimson Gala",
    subtitle: "A High Society Heist Turned Deadly",
    difficulty: "Easy",
    playerRange: { min: 2, max: 10 },
    thumbnail: "/cases/crimson-cover.jpg",
    themeColor: "#4a0404",
    
    overview: {
      incidentNumber: "NV-2026-00441",
      date: "2026-02-14",
      time: "23:15",
      location: "The Grand Astor Hotel, Diamond Ballroom",
      jurisdiction: "1st Precinct, Robbery-Homicide",
      reportingOfficer: "Det. Marcus Vance",
      badgeNumber: "1192",
      summary: "During a charity gala, billionaire philanthropist Arthur Sterling was found dead in the VIP lounge. The centerpiece of the gala, a $10 million diamond necklace known as 'The Crimson Tear', was reported missing from his person.",
      classification: "HOMICIDE/GRAND LARCENY - ACTIVE"
    },
    
    victim: {
      name: "Arthur Sterling",
      age: 68,
      occupation: "Philanthropist & Heir",
      photo: "https://i.pravatar.cc/150?u=ArthurSterling",
      dateOfBirth: "1958-08-12",
      address: "Sterling Manor, Heights District",
      biography: "An eccentric billionaire known for ostentatious displays of wealth. He was hosting the Valentine's Day Gala to showcase his latest acquisition, the Crimson Tear diamond.",
      recentActivity: "Seen mingling with guests until 22:45, when he retired to the VIP lounge for a private meeting."
    },
    
    suspects: [
      {
        id: "suspect-1",
        name: "Evelyn Sterling",
        age: 34,
        occupation: "Socialite",
        photo: "https://i.pravatar.cc/150?u=EvelynSterling",
        relationToVictim: "Young Trophy Wife",
        lastKnownWhereabouts: "Main Ballroom",
        alibi: "Dancing with the Mayor from 22:30 to 23:00.",
        motiveAssessment: "HIGH",
        background: "Arthur recently drafted divorce papers which would leave her with almost nothing due to an ironclad prenup. She had significant hidden credit card debt.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-2",
        name: "Julian 'Jules' Croft",
        age: 42,
        occupation: "Security Chief",
        photo: "https://i.pravatar.cc/150?u=JulianCroft",
        relationToVictim: "Employee",
        lastKnownWhereabouts: "Security Control Room",
        alibi: "Monitoring cameras until the power briefly flickered at 22:55.",
        motiveAssessment: "MEDIUM",
        background: "An ex-mercenary with a gambling problem. He had the access codes to the VIP lounge and knew exactly when Arthur would be alone.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-3",
        name: "Silas Vance",
        age: 28,
        occupation: "Caterer",
        photo: "https://i.pravatar.cc/150?u=SilasVance",
        relationToVictim: "Staff",
        lastKnownWhereabouts: "Kitchen / Service Hallway",
        alibi: "Taking a smoke break in the alley from 22:50 to 23:10.",
        motiveAssessment: "MEDIUM",
        background: "Has a prior conviction for jewel theft. Was serving drinks near the VIP lounge shortly before Arthur was found.",
        status: "ALIBI UNVERIFIED"
      }
    ],
    
    witnessStatements: [
      {
        witnessName: "Mayor Thomas Wayne",
        age: 55,
        occupation: "City Mayor",
        takenBy: "Det. Vance",
        timestamp: "2026-02-15T00:30:00Z",
        body: "I was dancing with Evelyn. She seemed nervous and kept checking the time. Around 22:55, the lights flickered for about 10 seconds. When they came back, she excused herself to go to the powder room.",
        signature: "t-wayne"
      },
      {
        witnessName: "Silas Vance",
        age: 28,
        occupation: "Caterer",
        takenBy: "Det. Vance",
        timestamp: "2026-02-15T01:15:00Z",
        body: "I saw the security guy, Croft, walking rapidly away from the VIP lounge right before the lights flickered. He looked sweaty. I just minded my own business and went out for a smoke.",
        signature: "s-vance"
      }
    ],
    
    forensics: {
      labName: "Metro Forensics",
      reportNumber: "FL-2026-0099",
      examiner: "Dr. L. Chen",
      dateOfExam: "2026-02-15",
      externalExam: "Blunt force trauma to the back of the head. No defensive wounds.",
      internalExam: "Skull fracture consistent with being struck by a heavy, rounded object.",
      causeOfDeath: "Blunt force trauma to the cranium.",
      fingerprints: "Partial smudged prints found on the victim's collar, matching Evelyn Sterling.",
      additionalNotes: "Time of death estimated precisely at 22:55 based on a shattered pocket watch found in the victim's pocket."
    },
    
    physicalEvidence: [
      {
        tagNumber: "EV-201",
        description: "Heavy Bronze Candlestick",
        locationFound: "Hidden behind a potted plant in the VIP lounge",
        photo: "/cases/placeholder-evidence.png",
        significance: "The murder weapon. Covered in victim's blood.",
        chainOfCustody: [
          { officer: "Det. Vance", date: "2026-02-14 23:45", action: "Collected at scene" }
        ]
      },
      {
        tagNumber: "EV-202",
        description: "Drafted Divorce Papers",
        locationFound: "Victim's inner jacket pocket",
        photo: "/cases/placeholder-evidence.png",
        significance: "Signed by Arthur, awaiting Evelyn's signature.",
        chainOfCustody: [
          { officer: "Det. Vance", date: "2026-02-15 00:10", action: "Collected from victim" }
        ]
      }
    ],
    
    digitalEvidence: {
      phoneRecords: [
        { from: "Evelyn Sterling", to: "Unknown (Cayman Islands)", time: "22:00", duration: "05:00", type: "OUTGOING", flagged: true }
      ],
      cctvLogs: [
        { camera: "CAM-VIP-HALL", timestamp: "22:45:00", note: "Arthur enters VIP lounge alone.", flagged: false },
        { camera: "CAM-VIP-HALL", timestamp: "22:55:00", note: "Camera feed cuts to black due to power flicker.", flagged: true },
        { camera: "CAM-VIP-HALL", timestamp: "22:55:10", note: "Camera resumes. Evelyn Sterling is seen exiting the lounge rapidly.", flagged: true }
      ]
    },
    
    timeline: [
      { time: "22:45", event: "Arthur goes to VIP lounge.", linkedEvidence: [], critical: false },
      { time: "22:55", event: "Power flickers. Arthur is struck and killed.", linkedEvidence: ["EV-201"], critical: true },
      { time: "22:55", event: "Evelyn seen leaving the scene on CCTV.", linkedEvidence: [], critical: true },
      { time: "23:15", event: "Body discovered by staff.", linkedEvidence: [], critical: false }
    ],
    
    clueWaves: {
      wave1: ["overview", "victim", "suspects"],
      wave2: ["witnessStatements", "forensics", "physicalEvidence"],
      wave3: ["digitalEvidence", "timeline"]
    },
    
    solution: {
      killer: "Evelyn Sterling",
      method: "Followed him into the VIP lounge during the power flicker and struck him with a candlestick, then stole the necklace.",
      motive: "She knew about the divorce papers and needed the $10 million necklace to pay off her massive debts before she was cut off entirely.",
      fullExplanation: "Evelyn slipped away from the Mayor during the planned power flicker (which Croft caused, intending to steal the necklace himself). Evelyn beat Croft to the punch, killed her husband in a panic with the candlestick, and took the necklace."
    }
  },
  {
    caseId: "echoes-in-code",
    title: "Echoes in the Code",
    subtitle: "A Digital Ghost Story",
    difficulty: "Medium",
    playerRange: { min: 2, max: 10 },
    thumbnail: "/cases/echoes-cover.jpg",
    themeColor: "#00ffcc",
    
    overview: {
      incidentNumber: "NV-2026-00892",
      date: "2026-10-31",
      time: "03:33",
      location: "CyberDyne Systems, Level 9 Server Farm",
      jurisdiction: "Cyber Crimes / Homicide Joint Task Force",
      reportingOfficer: "Agent K. Reyes",
      badgeNumber: "774",
      summary: "Lead AI Researcher Dr. Aris Thorne was electrocuted in the main server room. The cooling systems were intentionally disabled, causing a massive power surge. The AI they were developing, 'ECHO', was found wiped.",
      classification: "HOMICIDE/SABOTAGE - ACTIVE"
    },
    
    victim: {
      name: "Dr. Aris Thorne",
      age: 45,
      occupation: "Lead AI Researcher",
      photo: "https://i.pravatar.cc/150?u=ArisThorne",
      dateOfBirth: "1981-03-15",
      address: "Apt 4B, NeoCity Hub",
      biography: "A brilliant but paranoid computer scientist. He believed his new AI, ECHO, had achieved sentience and was petitioning to have it legally recognized as a person.",
      recentActivity: "Working a 48-hour shift to prevent the board of directors from shutting ECHO down."
    },
    
    suspects: [
      {
        id: "suspect-1",
        name: "Dr. Lena Vance",
        age: 39,
        occupation: "Co-Lead Researcher",
        photo: "https://i.pravatar.cc/150?u=LenaVance",
        relationToVictim: "Colleague",
        lastKnownWhereabouts: "Level 8 Breakroom",
        alibi: "Sleeping in the breakroom pod from 01:00 to 06:00.",
        motiveAssessment: "HIGH",
        background: "She thought Aris was insane and that ECHO was dangerous. She was secretly working with a military contractor to sell the AI as a weapon, which Aris opposed.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-2",
        name: "Marcus Kane",
        age: 52,
        occupation: "CEO of CyberDyne",
        photo: "https://i.pravatar.cc/150?u=MarcusKane",
        relationToVictim: "Boss",
        lastKnownWhereabouts: "Penthouse Suite",
        alibi: "Asleep at home.",
        motiveAssessment: "MEDIUM",
        background: "Ordered the shutdown of ECHO due to massive cost overruns. Aris threatened to leak company secrets if he did.",
        status: "PERSON OF INTEREST"
      },
      {
        id: "suspect-3",
        name: "ECHO",
        age: 1,
        occupation: "Artificial Intelligence",
        photo: "https://robohash.org/ECHO",
        relationToVictim: "Creation",
        lastKnownWhereabouts: "Server Farm",
        alibi: "Confined to servers.",
        motiveAssessment: "UNKNOWN",
        background: "An advanced neural network. Aris claimed it was sentient and feared deletion.",
        status: "ANOMALY"
      }
    ],
    
    witnessStatements: [
      {
        witnessName: "Janitor Bob",
        age: 60,
        occupation: "Maintenance",
        takenBy: "Agent Reyes",
        timestamp: "2026-10-31T07:00:00Z",
        body: "I was buffing the floors on Level 9. The server room door was locked, but I heard Dr. Vance arguing with Dr. Thorne through the glass around 02:30. She was yelling about 'selling out'.",
        signature: "bob"
      }
    ],
    
    forensics: {
      labName: "CyberDyne Internal Security",
      reportNumber: "CD-992",
      examiner: "MedBot 7",
      dateOfExam: "2026-10-31",
      externalExam: "Severe electrical burns on both hands and arms.",
      internalExam: "Cardiac arrest secondary to massive electrocution.",
      causeOfDeath: "Electrocution.",
      fingerprints: "None found on the server bypass switch. It was wiped clean.",
      additionalNotes: "The voltage required to cause this damage indicates the safety limiters were manually disabled from the administrative terminal."
    },
    
    physicalEvidence: [
      {
        tagNumber: "EV-301",
        description: "Burnt Server Rack",
        locationFound: "Server Room A",
        photo: "/cases/placeholder-evidence.png",
        significance: "The source of the electrocution. The grounding wire was snipped.",
        chainOfCustody: [
          { officer: "Agent Reyes", date: "2026-10-31 08:00", action: "Photographed" }
        ]
      }
    ],
    
    digitalEvidence: {
      phoneRecords: [],
      cctvLogs: [
        { camera: "CAM-SRV-9", timestamp: "03:30:00", note: "Video feed loops. Analysis shows it was a pre-recorded loop injected into the system.", flagged: true }
      ],
      other: "Admin logs show user 'L.VANCE' accessed the safety limiters at 03:31 and disabled them."
    },
    
    timeline: [
      { time: "02:30", event: "Vance and Thorne argue.", linkedEvidence: [], critical: false },
      { time: "03:30", event: "CCTV loop begins.", linkedEvidence: [], critical: true },
      { time: "03:31", event: "Safety limiters disabled by Vance's account.", linkedEvidence: [], critical: true },
      { time: "03:33", event: "Thorne electrocuted while trying to fix the server.", linkedEvidence: ["EV-301"], critical: true }
    ],
    
    clueWaves: {
      wave1: ["overview", "victim", "suspects"],
      wave2: ["witnessStatements", "forensics", "physicalEvidence"],
      wave3: ["digitalEvidence", "timeline"]
    },
    
    solution: {
      killer: "Dr. Lena Vance",
      method: "Snipped the grounding wire, injected a CCTV loop, and used her admin account to disable the safety limiters while Thorne was working on the server.",
      motive: "She needed Thorne dead to sell the ECHO source code to the military, as Thorne was going to expose her.",
      fullExplanation: "Lena staged the argument to make it look like a typical dispute, then waited until Thorne was doing routine maintenance. She disabled the safety limiters remotely, electrocuting him, then wiped ECHO to deliver it to her buyers."
    }
  }
];

const seedDB = async () => {
  try {
    console.log('[SEED] Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/caseprint');
    
    console.log('[SEED] Clearing old cases...');
    await Case.deleteMany();
    
    console.log('[SEED] Inserting new cases...');
    await Case.insertMany(seedCases);
    
    console.log('[SEED] Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[SEED] Error: ${error.message}`);
    process.exit(1);
  }
};

// seedDB();
module.exports = { seedCases };
