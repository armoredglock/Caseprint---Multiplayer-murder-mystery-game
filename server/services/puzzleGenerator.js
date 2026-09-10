const crypto = require('crypto');

// A pool of typical detective-themed phrases
const PHRASES = [
  "MEET AT MIDNIGHT",
  "DESTROY THE EVIDENCE",
  "THE MONEY IS GONE",
  "WE ARE BEING WATCHED",
  "KILL HIM TONIGHT",
  "I KNOW WHAT YOU DID",
  "TRUST NO ONE",
  "FOLLOW THE BLOOD",
  "HIDE THE BODY",
  "THEY FOUND US"
];

// Difficulty sets for dynamic hints
const getHint = (difficulty, explicit, vague) => {
  if (difficulty === "Easy") return explicit;
  if (difficulty === "Medium") return `[Medium] ${vague}`;
  return `[Hard] Figure out the pattern.`;
};

// 1. Phone Keypad (T9)
const encodeT9 = (text, difficulty) => {
  const T9_MAP = {
    'A': '2', 'B': '22', 'C': '222', 'D': '3', 'E': '33', 'F': '333',
    'G': '4', 'H': '44', 'I': '444', 'J': '5', 'K': '55', 'L': '555',
    'M': '6', 'N': '66', 'O': '666', 'P': '7', 'Q': '77', 'R': '777', 'S': '7777',
    'T': '8', 'U': '88', 'V': '888', 'W': '9', 'X': '99', 'Y': '999', 'Z': '9999', ' ': '/'
  };
  const content = text.toUpperCase().split('').map(c => T9_MAP[c] || c).join(' ');
  return {
    content,
    format: "SMS T9 CIPHER",
    hint: getHint(difficulty, "Numbers map to letters on a classic flip-phone keypad (e.g., 22=B).", "Think of an old mobile phone keypad.")
  };
};

// 2. Polybius Square (Prison Tap Code)
const encodePolybius = (text, difficulty) => {
  const POLYBIUS = {
    'A': '11', 'B': '12', 'C': '13', 'D': '14', 'E': '15',
    'F': '21', 'G': '22', 'H': '23', 'I': '24', 'J': '24', // I/J combined
    'K': '25', 'L': '31', 'M': '32', 'N': '33', 'O': '34',
    'P': '35', 'Q': '41', 'R': '42', 'S': '43', 'T': '44',
    'U': '45', 'V': '51', 'W': '52', 'X': '53', 'Y': '54', 'Z': '55', ' ': '  '
  };
  const content = text.toUpperCase().split('').map(c => POLYBIUS[c] || c).join(' ');
  return {
    content,
    format: "POLYBIUS TAP CODE",
    hint: getHint(difficulty, "Pairs of numbers represent row and column coordinates on a 5x5 grid of the alphabet (I and J share a cell).", "Coordinates on a 5x5 grid. Used by prisoners knocking on pipes.")
  };
};

// 3. Morse Code
const encodeMorse = (text, difficulty) => {
  const MORSE = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..", " ": "/"
  };
  const content = text.toUpperCase().split('').map(c => MORSE[c] || c).join(' ');
  return {
    content,
    format: "MORSE CODE",
    hint: getHint(difficulty, "Standard Morse code. Dots and dashes translate to letters. Slashes are spaces.", "Listen to the dots and dashes.")
  };
};

// 4. Keyboard Shift (Right shift)
const encodeKeyboardShift = (text, difficulty) => {
  const QWERTY = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const SHIFTED = "WERTYUIOPQSDFGHJKL AZXCVBNMX"; // 1 to the right
  const content = text.toUpperCase().split('').map(c => {
    const idx = QWERTY.indexOf(c);
    if (idx !== -1) return SHIFTED[idx];
    return c;
  }).join('');
  return {
    content,
    format: "KEYBOARD SHIFT",
    hint: getHint(difficulty, "Every letter was typed one key to the right on a standard QWERTY keyboard (e.g. Q becomes W).", "Look down at your computer keyboard. Hands were placed incorrectly.")
  };
};

// 5. NATO Phonetic Alphabet
const encodeNATO = (text, difficulty) => {
  const NATO = {
    "A": "ALPHA", "B": "BRAVO", "C": "CHARLIE", "D": "DELTA", "E": "ECHO", "F": "FOXTROT", "G": "GOLF", "H": "HOTEL", "I": "INDIA", "J": "JULIET", "K": "KILO", "L": "LIMA", "M": "MIKE", "N": "NOVEMBER", "O": "OSCAR", "P": "PAPA", "Q": "QUEBEC", "R": "ROMEO", "S": "SIERRA", "T": "TANGO", "U": "UNIFORM", "V": "VICTOR", "W": "WHISKEY", "X": "XRAY", "Y": "YANKEE", "Z": "ZULU", " ": "/"
  };
  const content = text.toUpperCase().split('').map(c => NATO[c] || c).join(' ');
  return {
    content,
    format: "NATO PHONETICS",
    hint: getHint(difficulty, "First letter of each military callsign spells the message.", "Aviation and military radio spelling alphabet.")
  };
};

// 6. Atbash (Reversed Alphabet)
const encodeAtbash = (text, difficulty) => {
  const result = text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
    }
    return char;
  }).join('');
  return {
    content: result,
    format: "ATBASH",
    hint: getHint(difficulty, "The alphabet is entirely reversed (A=Z, B=Y, C=X).", "Fold the alphabet in half.")
  };
};

// 7. A1Z26 (Number Substitution)
const encodeA1Z26 = (text, difficulty) => {
  const result = text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return (char.charCodeAt(0) - 64).toString();
    }
    return char; 
  }).join('-');
  return {
    content: result.replace(/- -/g, '   '), 
    format: "A1Z26",
    hint: getHint(difficulty, "Numbers represent their exact position in the alphabet (1=A, 2=B).", "Numerical alphabetical index.")
  };
};

// 8. Caesar Shift
const encodeCaesar = (text, difficulty) => {
  const shift = Math.floor(Math.random() * 5) + 2;
  const result = text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      let newCode = char.charCodeAt(0) + shift;
      if (newCode > 90) newCode -= 26;
      return String.fromCharCode(newCode);
    }
    return char;
  }).join('');
  return {
    content: result,
    format: "CAESAR SHIFT",
    hint: getHint(difficulty, `Every letter has been shifted forward by ${shift} places in the alphabet.`, "Julius Caesar used this. Shift the letters backwards to decode.")
  };
};


const PUZZLE_TYPES = [
  encodeT9,
  encodePolybius,
  encodeMorse,
  encodeKeyboardShift,
  encodeNATO,
  encodeAtbash,
  encodeA1Z26,
  encodeCaesar
];

const generateRandomPuzzles = (count) => {
  const puzzles = [];
  const usedPhrases = new Set();
  
  for (let i = 0; i < count; i++) {
    // Pick unique random phrase
    let phrase;
    do {
      phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    } while (usedPhrases.has(phrase) && usedPhrases.size < PHRASES.length);
    usedPhrases.add(phrase);

    // Pick random puzzle type
    const generatorFunc = PUZZLE_TYPES[Math.floor(Math.random() * PUZZLE_TYPES.length)];
    
    // Pick random difficulty for THIS specific puzzle instance
    const difficulties = ["Easy", "Medium", "Hard"];
    const diff = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    const encoded = generatorFunc(phrase, diff);
    
    // Narrative descriptions
    const descriptions = [
      "We recovered a scrawled note from the crime scene. We need this deciphered immediately.",
      "An anonymous tip came in with this sequence. It might hold the key.",
      "We found this written in blood on the wall, but it doesn't make sense at first glance.",
      "Our forensics team pulled this anomalous string from a deleted text message.",
      "This looks like an old-school cipher used by organized crime.",
      "A strange audio recording was found. The transcription looks like this."
    ];
    const desc = descriptions[Math.floor(Math.random() * descriptions.length)];

    puzzles.push({
      id: `puz-${crypto.randomBytes(4).toString('hex')}`,
      title: `${encoded.format} [${diff}]`,
      description: desc,
      data: encoded.content,       
      format: encoded.format,      
      hint: encoded.hint,          
      answer: phrase,
      wave: Math.floor(Math.random() * 3) + 2 // Assign to wave 2, 3, or 4
    });
  }
  
  return puzzles;
};

module.exports = {
  generateRandomPuzzles
};
