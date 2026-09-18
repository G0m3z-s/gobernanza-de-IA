const fs = require('fs');
let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

content = content.replace(/\s*\}\)\);\n\s*\}\)\);/, '\n      }));');

fs.writeFileSync('src/store/useStore.ts', content);
console.log("Fixed syntax");
