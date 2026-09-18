const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

const ncOld = `    match /nonConformities/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && isAdmin(request.resource.data.organizationId)
        && (
          !("sourceType" in request.resource.data) 
          || request.resource.data.sourceType != 'control_effectiveness_test' 
          || (
            exists(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId))
            && get(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId)).data.organizationId == request.resource.data.organizationId
          )
        );
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId;
      allow delete: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId)
        && resource.data.status == 'Abierta';
    }`;

const capaOld = `    match /capas/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && isAdmin(request.resource.data.organizationId)
        && (
          !("nonConformityId" in request.resource.data) 
          || request.resource.data.nonConformityId == '' 
          || request.resource.data.nonConformityId == null
          || (
            exists(/databases/$(database)/documents/nonConformities/$(request.resource.data.nonConformityId))
            && get(/databases/$(database)/documents/nonConformities/$(request.resource.data.nonConformityId)).data.organizationId == request.resource.data.organizationId
          )
        );
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId;
      allow delete: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId)
        && resource.data.status != 'Cerrada';
    }`;

const ncNew = `    match /nonConformities/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && isAdmin(request.resource.data.organizationId)
        && (
          !("sourceType" in request.resource.data) 
          || request.resource.data.sourceType != 'control_effectiveness_test' 
          || (
            exists(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId))
            && get(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId)).data.organizationId == request.resource.data.organizationId
          )
        );
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && (!("createdBy" in resource.data) || request.resource.data.createdBy == resource.data.createdBy)
        && (!("sourceType" in resource.data) || request.resource.data.sourceType == resource.data.sourceType)
        && (!("sourceId" in resource.data) || request.resource.data.sourceId == resource.data.sourceId)
        && (!("controlId" in resource.data) || request.resource.data.controlId == resource.data.controlId);
      allow delete: if false;
    }`;

const capaNew = `    match /capas/{docId} {
      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);
      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && isAdmin(request.resource.data.organizationId)
        && (
          !("nonConformityId" in request.resource.data) 
          || request.resource.data.nonConformityId == '' 
          || request.resource.data.nonConformityId == null
          || (
            exists(/databases/$(database)/documents/nonConformities/$(request.resource.data.nonConformityId))
            && get(/databases/$(database)/documents/nonConformities/$(request.resource.data.nonConformityId)).data.organizationId == request.resource.data.organizationId
          )
        );
      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && (!("createdBy" in resource.data) || request.resource.data.createdBy == resource.data.createdBy)
        && (!("nonConformityId" in resource.data) || request.resource.data.nonConformityId == resource.data.nonConformityId)
        && (!("controlId" in resource.data) || request.resource.data.controlId == resource.data.controlId)
        && (!("effectivenessTestId" in resource.data) || request.resource.data.effectivenessTestId == resource.data.effectivenessTestId);
      allow delete: if false;
    }`;

content = content.replace(ncOld, ncNew);
content = content.replace(capaOld, capaNew);

fs.writeFileSync('firestore.rules', content);
console.log('firestore.rules updated immutability and deletes');
