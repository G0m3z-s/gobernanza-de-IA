const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIDataWizard.tsx', 'utf8');

code = code.replace(
  /className=\{\\`(.*?)\\`\}/g,
  "className={`$1`}"
);

fs.writeFileSync('src/components/ai/AIDataWizard.tsx', code);
