const fs = require('fs');
let content = fs.readFileSync('src/components/forms/ControlForm42001.tsx', 'utf8');

content = content.replace(
  `value={s.name}>{s.name} ({s.role})</option>`,
  `value={s.name}>{s.name} ({s.category})</option>`
);

fs.writeFileSync('src/components/forms/ControlForm42001.tsx', content);
console.log("Patched ControlForm42001.tsx for role");
