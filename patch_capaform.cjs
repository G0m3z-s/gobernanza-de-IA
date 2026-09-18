const fs = require('fs');
let content = fs.readFileSync('src/components/forms/CAPAForm.tsx', 'utf8');

// Change the initial state of ownerId to user.uid
content = content.replace(
  /ownerId: user\?\.displayName \|\| user\?\.email \|\| 'Sistema',/,
  `ownerId: user.uid,`
);

// Add createdBy to payload
content = content.replace(
  /dueDate: new Date\(formData\.dueDate\)\.toISOString\(\),/,
  `dueDate: new Date(formData.dueDate).toISOString(),
        createdBy: user.uid,`
);

fs.writeFileSync('src/components/forms/CAPAForm.tsx', content);
console.log('patched CAPAForm');
