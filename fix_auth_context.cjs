const fs = require('fs');
let code = fs.readFileSync('src/context/AuthContext.tsx', 'utf8');

code = code.replace(
  /const q = query\(collection\(db, 'memberships'\), where\('userId', '==', currentUser\.uid\), where\('status', '==', 'active'\)\);/g,
  `const q = query(collection(db, 'memberships'), where('userId', '==', currentUser.uid));`
);

fs.writeFileSync('src/context/AuthContext.tsx', code);
