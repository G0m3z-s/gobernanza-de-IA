const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

const newRules = `    match /documents/{documentId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      allow create: if isSignedIn() && request.resource.data.organizationId != null && hasActiveMembership(request.resource.data.organizationId);
      allow update: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId) && request.resource.data.organizationId == resource.data.organizationId;
      allow delete: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
    }
    match /evidences/{evidenceId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      allow create: if isSignedIn() && request.resource.data.organizationId != null && hasActiveMembership(request.resource.data.organizationId);
      allow update: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId) && request.resource.data.organizationId == resource.data.organizationId;
      allow delete: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
    }
  }
}`;

rules = rules.replace(/  \}\n\}$/, newRules);
fs.writeFileSync('firestore.rules', rules);
