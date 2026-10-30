const fs = require('fs');
const path = require('path');

const casesDir = path.join(__dirname, '../data/cases');

fs.readdirSync(casesDir).forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(casesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace pravatar and robohash URLs with DiceBear
    // Extract the name from the seed (e.g. u=MarcusChen -> MarcusChen)
    content = content.replace(/photo:\s*"https:\/\/i\.pravatar\.cc\/150\?u=([^"]+)"/g, 'photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=$1"');
    content = content.replace(/photo:\s*"https:\/\/robohash\.org\/([^"]+)"/g, 'photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=$1"');
    
    // Some placeholders might still be left
    content = content.replace(/photo:\s*"\/cases\/placeholder-suspect\.png"/g, 'photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Suspect"');
    content = content.replace(/photo:\s*"\/cases\/placeholder-victim\.png"/g, 'photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Victim"');

    // For specific cases like seedCases.js
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated photos in ${file}`);
  }
});

const seedCasesPath = path.join(__dirname, '../data/seedCases.js');
if (fs.existsSync(seedCasesPath)) {
    let content = fs.readFileSync(seedCasesPath, 'utf-8');
    content = content.replace(/photo:\s*"https:\/\/i\.pravatar\.cc\/150\?u=([^"]+)"/g, 'photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=$1"');
    content = content.replace(/photo:\s*"https:\/\/robohash\.org\/([^"]+)"/g, 'photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=$1"');
    fs.writeFileSync(seedCasesPath, content, 'utf-8');
    console.log(`Updated photos in seedCases.js`);
}
