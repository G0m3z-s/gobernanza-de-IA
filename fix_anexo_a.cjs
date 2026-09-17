const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/NormativeStatus.tsx', 'utf8');

const regex = /if \(clause === 'Anexo A'\) \{[\s\S]*?return \{ color: 'bg-slate-200', text: 'Ver controles', percent: 0, isAnnex: true \};[\s\S]*?\}/;
const replacement = `if (clause === 'Anexo A' && std === 'ISO/IEC 42001') {
      return { color: 'bg-slate-200', text: 'Ver controles', percent: 0, isAnnex: true };
    }`;

if (regex.test(content)) {
  fs.writeFileSync('src/components/dashboard/NormativeStatus.tsx', content.replace(regex, replacement));
  console.log("Success");
} else {
  console.log("Failed");
}
