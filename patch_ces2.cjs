const fs = require('fs');
let content = fs.readFileSync('src/components/forms/ControlEffectivenessSection.tsx', 'utf8');

content = content.replace(
  /const existingFinding = \(data\?\.nonConformities \|\| \[\]\)\.find\(\(nc: any\) => nc\.sourceId === test\.id\);/,
  `const existingFinding = (data?.nonConformities || []).find((nc: any) => nc.sourceId === test.id && nc.sourceType === 'control_effectiveness_test' && nc.organizationId === currentOrgId);`
);

fs.writeFileSync('src/components/forms/ControlEffectivenessSection.tsx', content);
console.log('patched CES duplicate check');
