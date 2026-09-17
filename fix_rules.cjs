const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
  /match \/memberships\/\{membershipId\} \{\n      allow read: if isSignedIn\(\) && \(resource\.data\.userId == request\.auth\.uid \|\| isAdmin\(resource\.data\.organizationId\)\);/g,
  `match /memberships/{membershipId} {\n      allow read: if isSignedIn();`
);

fs.writeFileSync('firestore.rules', rules);
