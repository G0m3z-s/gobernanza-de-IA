const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIImpactWizard.tsx', 'utf8');

code = code.replace(
  'systemId?: string',
  'systemId?: string,\n  key?: any'
);

fs.writeFileSync('src/components/ai/AIImpactWizard.tsx', code);
