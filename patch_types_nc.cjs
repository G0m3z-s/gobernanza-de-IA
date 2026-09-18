const fs = require('fs');
let content = fs.readFileSync('src/types/index.ts', 'utf8');

// Add requirementId to NonConformity
content = content.replace(
  /sourceType\?: 'manual' \| 'control_effectiveness_test' \| 'other';/,
  "sourceType?: 'manual' | 'control_effectiveness_test' | 'other' | 'audit';"
);

content = content.replace(
  /controlId\?: string;/,
  "controlId?: string;\n  requirementId?: string;"
);

fs.writeFileSync('src/types/index.ts', content);
console.log('patched types for NonConformity');
