const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

const oldRules = `    match /evidenceLinks/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && hasActiveMembership(request.resource.data.organizationId)
        && request.resource.data.targetType == 'control'
        && request.resource.data.relationType == 'supports'
        && request.resource.data.createdBy == request.auth.uid
        && exists(/databases/$(database)/documents/evidences/$(request.resource.data.evidenceId))
        && get(/databases/$(database)/documents/evidences/$(request.resource.data.evidenceId)).data.organizationId == request.resource.data.organizationId;
        
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && request.resource.data.evidenceId == resource.data.evidenceId
        && request.resource.data.targetType == resource.data.targetType
        && request.resource.data.targetId == resource.data.targetId
        && request.resource.data.relationType == resource.data.relationType
        && request.resource.data.createdBy == resource.data.createdBy;
        
      allow delete: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
    }`;

const newRules = `    match /evidenceLinks/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && hasActiveMembership(request.resource.data.organizationId)
        && request.resource.data.createdBy == request.auth.uid
        && exists(/databases/$(database)/documents/evidences/$(request.resource.data.evidenceId))
        && get(/databases/$(database)/documents/evidences/$(request.resource.data.evidenceId)).data.organizationId == request.resource.data.organizationId
        && (
          (request.resource.data.targetType == 'control' && request.resource.data.relationType == 'supports')
          ||
          (request.resource.data.targetType == 'auditItem' && request.resource.data.relationType == 'reviewed'
           && exists(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.targetId))
           && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.targetId)).data.organizationId == request.resource.data.organizationId
           && get(/databases/$(database)/documents/auditSessions/$(get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.targetId)).data.auditId)).data.status == 'En Progreso')
        );
        
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && request.resource.data.evidenceId == resource.data.evidenceId
        && request.resource.data.targetType == resource.data.targetType
        && request.resource.data.targetId == resource.data.targetId
        && request.resource.data.relationType == resource.data.relationType
        && request.resource.data.createdBy == resource.data.createdBy;
        
      allow delete: if isSignedIn() 
        && resource.data.organizationId != null 
        && hasActiveMembership(resource.data.organizationId)
        && (
          resource.data.targetType != 'auditItem'
          ||
          get(/databases/$(database)/documents/auditSessions/$(get(/databases/$(database)/documents/auditChecklistItems/$(resource.data.targetId)).data.auditId)).data.status == 'En Progreso'
        );
    }`;

content = content.replace(oldRules, newRules);

fs.writeFileSync('firestore.rules', content);
console.log('patched firestore.rules for evidenceLinks');
