const fs = require('fs');
let content = fs.readFileSync('src/components/forms/NonConformityForm.tsx', 'utf8');

// Add createdBy to payload
content = content.replace(
  /reportedBy: user.uid,/,
  `reportedBy: user.uid,
        createdBy: user.uid,`
);

fs.writeFileSync('src/components/forms/NonConformityForm.tsx', content);
console.log('patched NC form createdBy');
