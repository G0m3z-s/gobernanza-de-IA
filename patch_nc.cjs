const fs = require('fs');
let content = fs.readFileSync('src/components/forms/NonConformityForm.tsx', 'utf8');

content = content.replace(
  /reportedBy: user\?\.displayName \|\| user\?\.email \|\| 'Sistema',/,
  `reportedBy: user.uid,`
);

fs.writeFileSync('src/components/forms/NonConformityForm.tsx', content);
console.log('patched NC form reportedBy');
