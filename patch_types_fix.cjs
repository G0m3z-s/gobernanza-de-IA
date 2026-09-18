const fs = require('fs');
let content = fs.readFileSync('src/types/index.ts', 'utf8');

// Fix the typo
content = content.replace(
  /itemType:targetType: 'control' \| 'requirement' \| 'risk' \| 'auditFinding' \| 'capa' \| 'auditItem';\| 'control';/,
  "itemType: 'requirement' | 'control';"
);

content = content.replace(
  /targetType: 'control' \| 'requirement' \| 'risk' \| 'auditFinding' \| 'capa';/,
  "targetType: 'control' | 'requirement' | 'risk' | 'auditFinding' | 'capa' | 'auditItem';"
);

fs.writeFileSync('src/types/index.ts', content);
console.log('patched types fix');
