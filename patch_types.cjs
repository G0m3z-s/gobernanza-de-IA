const fs = require('fs');
let content = fs.readFileSync('src/types/index.ts', 'utf8');

content = content.replace(
  /targetType: 'control' | 'requirement' | 'risk' | 'auditFinding' | 'capa';/,
  "targetType: 'control' | 'requirement' | 'risk' | 'auditFinding' | 'capa' | 'auditItem';"
);

content = content.replace(
  /relationType: 'supports';/,
  "relationType: 'supports' | 'reviewed';"
);

fs.writeFileSync('src/types/index.ts', content);
console.log('patched types');
