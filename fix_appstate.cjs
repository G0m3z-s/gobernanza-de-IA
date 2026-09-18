const fs = require('fs');
let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

content = content.replace(
  /removeEvidenceLink: \(linkId: string\) => Promise<void>;/,
  `removeEvidenceLink: (linkId: string) => Promise<void>;\n  addRiskControlLink: (link: any) => Promise<void>;\n  removeRiskControlLink: (id: string) => Promise<void>;`
);

fs.writeFileSync('src/store/useStore.ts', content);
console.log("Fixed");
