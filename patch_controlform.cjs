const fs = require('fs');
let content = fs.readFileSync('src/components/forms/ControlForm42001.tsx', 'utf8');

content = content.replace(
  `control: control.code,`,
  `control: control.id,`
);

fs.writeFileSync('src/components/forms/ControlForm42001.tsx', content);
console.log("Patched ControlForm42001.tsx");
