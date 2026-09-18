const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

// Replace the allow update block in evidenceLinks
const oldUpdate = `      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && request.resource.data.evidenceId == resource.data.evidenceId
        && request.resource.data.targetType == resource.data.targetType
        && request.resource.data.targetId == resource.data.targetId
        && request.resource.data.relationType == resource.data.relationType
        && request.resource.data.createdBy == resource.data.createdBy;`;

const newUpdate = `      allow update: if false; // EvidenceLink relations are immutable`;

content = content.replace(oldUpdate, newUpdate);
fs.writeFileSync('firestore.rules', content);
console.log('patched firestore.rules update to false');
