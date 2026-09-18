const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

const oldCreateRule = `      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && isAdmin(request.resource.data.organizationId)
        && (
          !("sourceType" in request.resource.data) 
          || request.resource.data.sourceType != 'control_effectiveness_test' 
          || (
            exists(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId))
            && get(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId)).data.organizationId == request.resource.data.organizationId
          )
        );`;

const newCreateRule = `      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && isAdmin(request.resource.data.organizationId)
        && (
          !("sourceType" in request.resource.data) 
          || request.resource.data.sourceType != 'control_effectiveness_test' 
          || (
            exists(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId))
            && get(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId)).data.organizationId == request.resource.data.organizationId
          )
        )
        && (
          !("auditId" in request.resource.data)
          || (
            exists(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId))
            && get(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId)).data.organizationId == request.resource.data.organizationId
          )
        )
        && (
          !("auditItemId" in request.resource.data)
          || (
            exists(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId))
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.organizationId == request.resource.data.organizationId
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.auditId == request.resource.data.auditId
          )
        );`;

content = content.replace(oldCreateRule, newCreateRule);

const oldUpdateRule = `      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && (!("createdBy" in resource.data) || request.resource.data.createdBy == resource.data.createdBy)
        && (!("sourceType" in resource.data) || request.resource.data.sourceType == resource.data.sourceType)
        && (!("sourceId" in resource.data) || request.resource.data.sourceId == resource.data.sourceId)
        && (!("controlId" in resource.data) || request.resource.data.controlId == resource.data.controlId);`;

const newUpdateRule = `      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && (!("createdBy" in resource.data) || request.resource.data.createdBy == resource.data.createdBy)
        && (!("sourceType" in resource.data) || request.resource.data.sourceType == resource.data.sourceType)
        && (!("sourceId" in resource.data) || request.resource.data.sourceId == resource.data.sourceId)
        && (!("controlId" in resource.data) || request.resource.data.controlId == resource.data.controlId)
        && (!("auditId" in resource.data) || request.resource.data.auditId == resource.data.auditId)
        && (!("auditItemId" in resource.data) || request.resource.data.auditItemId == resource.data.auditItemId);`;

content = content.replace(oldUpdateRule, newUpdateRule);

fs.writeFileSync('firestore.rules', content);
console.log('patched NonConformity rules');
