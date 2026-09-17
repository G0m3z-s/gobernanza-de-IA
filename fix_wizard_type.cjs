const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIDataWizard.tsx', 'utf8');

code = code.replace(
  'systemId?: string',
  'systemId?: string,\n  key?: any'
);

fs.writeFileSync('src/components/ai/AIDataWizard.tsx', code);
