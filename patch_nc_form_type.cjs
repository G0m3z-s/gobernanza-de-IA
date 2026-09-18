const fs = require('fs');
let content = fs.readFileSync('src/components/forms/NonConformityForm.tsx', 'utf8');

content = content.replace(
  /sourceType\?: 'manual' \| 'control_effectiveness_test' \| 'other';/,
  "sourceType?: 'manual' | 'control_effectiveness_test' | 'other' | 'audit';"
);

fs.writeFileSync('src/components/forms/NonConformityForm.tsx', content);
console.log('patched NonConformityForm sourceType');
