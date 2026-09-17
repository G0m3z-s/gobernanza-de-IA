const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIDataWizard.tsx', 'utf8');
code = code.replace(/\\\$/g, "$");
fs.writeFileSync('src/components/ai/AIDataWizard.tsx', code);
