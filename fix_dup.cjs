const fs = require('fs');
let lines = fs.readFileSync('firestore.rules', 'utf8').split('\n');
let matchCount = 0;
let output = [];
let inDup = false;

for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('match /processes/{docId}')) {
    matchCount++;
    if(matchCount > 1) {
      inDup = true;
      continue;
    }
  }
  if (inDup && lines[i].includes('    }')) {
    inDup = false;
    continue;
  }
  if (!inDup) {
    output.push(lines[i]);
  }
}
fs.writeFileSync('firestore.rules', output.join('\n'));
