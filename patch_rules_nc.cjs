const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

const oldCreate = `      allow create: if isSignedIn() 
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

const newCreate = `      allow create: if isSignedIn() 
        && request.resource.data.organizationId != null 
        && isAdmin(request.resource.data.organizationId)
        && request.resource.data.createdBy == request.auth.uid
        && (
          !("sourceType" in request.resource.data) 
          || request.resource.data.sourceType == 'manual'
          || request.resource.data.sourceType == 'other'
          || (
            request.resource.data.sourceType == 'control_effectiveness_test' 
            && exists(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId))
            && get(/databases/$(database)/documents/controlEffectivenessTests/$(request.resource.data.sourceId)).data.organizationId == request.resource.data.organizationId
          )
          || (
            request.resource.data.sourceType == 'audit'
            && request.resource.data.sourceId == request.resource.data.auditItemId
            && exists(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId))
            && get(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId)).data.organizationId == request.resource.data.organizationId
            && get(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId)).data.status == 'En Progreso'
            && exists(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId))
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.organizationId == request.resource.data.organizationId
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.auditId == request.resource.data.auditId
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.status == 'COMPLETED'
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.result in ['NONCONFORMING', 'OBSERVATION', 'OPPORTUNITY_FOR_IMPROVEMENT']
            && (
              (get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.itemType == 'control' && request.resource.data.controlId == get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.normativeId && !("requirementId" in request.resource.data))
              ||
              (get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.itemType == 'requirement' && request.resource.data.requirementId == get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.normativeId && !("controlId" in request.resource.data))
            )
          )
        )
        && (
          !("auditId" in request.resource.data) || request.resource.data.sourceType == 'audit'
          || (
            exists(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId))
            && get(/databases/$(database)/documents/auditSessions/$(request.resource.data.auditId)).data.organizationId == request.resource.data.organizationId
          )
        )
        && (
          !("auditItemId" in request.resource.data) || request.resource.data.sourceType == 'audit'
          || (
            exists(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId))
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.organizationId == request.resource.data.organizationId
            && get(/databases/$(database)/documents/auditChecklistItems/$(request.resource.data.auditItemId)).data.auditId == request.resource.data.auditId
          )
        );`;

content = content.replace(oldCreate, newCreate);

const oldUpdate = `      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && (!("createdBy" in resource.data) || request.resource.data.createdBy == resource.data.createdBy)
        && (!("sourceType" in resource.data) || request.resource.data.sourceType == resource.data.sourceType)
        && (!("sourceId" in resource.data) || request.resource.data.sourceId == resource.data.sourceId)
        && (!("controlId" in resource.data) || request.resource.data.controlId == resource.data.controlId)
        && (!("auditId" in resource.data) || request.resource.data.auditId == resource.data.auditId)
        && (!("auditItemId" in resource.data) || request.resource.data.auditItemId == resource.data.auditItemId);`;

const newUpdate = `      allow update: if isSignedIn() 
        && resource.data.organizationId != null 
        && isAdmin(resource.data.organizationId) 
        && request.resource.data.organizationId == resource.data.organizationId
        && (!("createdBy" in resource.data) || request.resource.data.createdBy == resource.data.createdBy)
        && (!("sourceType" in resource.data) || request.resource.data.sourceType == resource.data.sourceType)
        && (!("sourceId" in resource.data) || request.resource.data.sourceId == resource.data.sourceId)
        && (!("controlId" in resource.data) || request.resource.data.controlId == resource.data.controlId)
        && (!("requirementId" in resource.data) || request.resource.data.requirementId == resource.data.requirementId)
        && (!("auditId" in resource.data) || request.resource.data.auditId == resource.data.auditId)
        && (!("auditItemId" in resource.data) || request.resource.data.auditItemId == resource.data.auditItemId);`;

content = content.replace(oldUpdate, newUpdate);

fs.writeFileSync('firestore.rules', content);
console.log('patched firestore.rules for nonConformities');
