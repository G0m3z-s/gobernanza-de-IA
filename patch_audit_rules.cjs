const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

const targetStr = `    match /auditChecklistItems/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && hasActiveMembership(request.resource.data.organizationId)
        && request.resource.data.createdBy == request.auth.uid
        && exists(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId))
        && get(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId)).data.organizationId == request.resource.data.organizationId;
        
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId)
        && request.resource.data.organizationId == resource.data.organizationId
        && request.resource.data.auditId == resource.data.auditId
        && request.resource.data.standardId == resource.data.standardId
        && request.resource.data.itemType == resource.data.itemType
        && request.resource.data.normativeId == resource.data.normativeId
        && request.resource.data.createdBy == resource.data.createdBy
        && get(/databases/$(database)/documents/auditSessions/$(resource.data.auditId)).data.status != 'Completada';
        
      allow delete: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId)
        && get(/databases/$(database)/documents/auditSessions/$(resource.data.auditId)).data.status == 'Programada';
    }`;

const newRules = `    match /auditChecklistItems/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && hasActiveMembership(request.resource.data.organizationId)
        && request.resource.data.createdBy == request.auth.uid
        && exists(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId))
        && get(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId)).data.organizationId == request.resource.data.organizationId
        && get(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId)).data.status == 'Programada';
        
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId)
        && request.resource.data.organizationId == resource.data.organizationId
        && request.resource.data.auditId == resource.data.auditId
        && request.resource.data.standardId == resource.data.standardId
        && request.resource.data.itemType == resource.data.itemType
        && request.resource.data.normativeId == resource.data.normativeId
        && request.resource.data.createdBy == resource.data.createdBy
        && (!("code" in request.resource.data) || request.resource.data.code == resource.data.code)
        && (!("title" in request.resource.data) || request.resource.data.title == resource.data.title)
        && (get(/databases/$(database)/documents/auditSessions/$(resource.data.auditId)).data.status == 'Programada' || get(/databases/$(database)/documents/auditSessions/$(resource.data.auditId)).data.status == 'En Progreso');
        
      allow delete: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId)
        && get(/databases/$(database)/documents/auditSessions/$(resource.data.auditId)).data.status == 'Programada';
    }`;

content = content.replace(targetStr, newRules);

fs.writeFileSync('firestore.rules', content);
console.log('patched firestore.rules for auditChecklistItems');
