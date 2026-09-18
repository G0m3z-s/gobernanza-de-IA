const fs = require('fs');
let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

content = content.replace(
  /\}\);\n\s*\}\)\);\n\s*\}\)\);/,
  `});\n        }\n      }));`
);

fs.writeFileSync('src/store/useStore.ts', content);
console.log("Fixed syntax");
