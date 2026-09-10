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

const encodeBase64 = (text) => ({
  content: Buffer.from(text).toString('base64'),
  format: "BASE64",
  hint: "Looks like standard MIME encoding..."
});

const encodeBinary = (text) => ({
  content: text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
  format: "BINARY",
  hint: "Convert the binary sequences to ASCII text."
});

const encodeHex = (text) => ({
  content: text.split('').map(char => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' '),
  format: "HEXADECIMAL",
  hint: "Looks like base-16 numerical data."
});

const encodeAtbash = (text) => {
  const result = text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
    }
    return char;
  }).join('');
  return {
    content: result,
    format: "ATBASH",
    hint: "The alphabet has been entirely reversed (A=Z, B=Y)."
  };
};

const encodeA1Z26 = (text) => {
  const result = text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return (char.charCodeAt(0) - 64).toString();
    }
    return char; // Keep spaces as is
  }).join('-');
  return {
    content: result.replace(/- -/g, '   '), // Fix spacing around spaces
    format: "A1Z26",
    hint: "Numbers represent letters of the alphabet (1=A, 2=B)."
  };
};

const encodeCaesar = (text, shift = 3) => {
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
    hint: `Every letter has been shifted forward by ${shift} places in the alphabet.`
  };
};

const PUZZLE_TYPES = [
  { generator: encodeBase64, difficulty: "Medium", type: "Base64 Cipher" },
  { generator: encodeBinary, difficulty: "Medium", type: "Binary Encryption" },
  { generator: encodeHex, difficulty: "Hard", type: "Hexadecimal Dump" },
  { generator: encodeAtbash, difficulty: "Easy", type: "Atbash Cipher" },
  { generator: encodeA1Z26, difficulty: "Easy", type: "Number Substitution" },
  { generator: (text) => encodeCaesar(text, Math.floor(Math.random() * 5) + 2), difficulty: "Hard", type: "Caesar Shift" }
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
    const puzzleType = PUZZLE_TYPES[Math.floor(Math.random() * PUZZLE_TYPES.length)];
    const encoded = puzzleType.generator(phrase);
    
    // Some narrative descriptions
    const descriptions = [
      "We recovered a secure flash drive from the crime scene. We need this deciphered immediately.",
      "An anonymous tip came in with this encrypted string. It might hold the key.",
      "We found this scrawled on a torn piece of paper near the victim.",
      "Our cyber forensics team pulled this anomalous string from a deleted email draft.",
      "This looks like an old-school cipher used by organized crime."
    ];
    const desc = descriptions[Math.floor(Math.random() * descriptions.length)];

    puzzles.push({
      id: `puz-${crypto.randomBytes(4).toString('hex')}`,
      title: `${puzzleType.type} [${puzzleType.difficulty}]`,
      description: desc,
      data: encoded.content,       // Frontend supports content or data
      format: encoded.format,      // Frontend supports encodedType or format
      hint: encoded.hint,          // Frontend supports clue or hint
      answer: phrase,
      wave: Math.floor(Math.random() * 3) + 2 // Assign to wave 2, 3, or 4
    });
  }
  
  return puzzles;
};

module.exports = {
  generateRandomPuzzles
};
