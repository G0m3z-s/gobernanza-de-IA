const groups = {
  ai: {
    collections: ['aiSystems', 'aiImpactAssessments', 'aiLifecycleEvents', 'aiDataResources', 'aiProviders', 'aiMetrics', 'aiIncidents', 'aiHistory'],
    writeCheck: 'canWriteAI'
  },
  audit: {
    collections: ['auditSessions', 'auditItems'],
    writeCheck: 'canWriteAudit'
  },
  core: {
    collections: ['processes', 'risks', 'alerts', 'objectives', 'indicators', 'indicatorMeasurements', 'nonConformities', 'capas', 'normativeControls', 'governanceRoles', 'stakeholders'],
    writeCheck: 'isAdmin'
  },
  operational: {
    collections: ['activityLogs', 'healthSnapshots', 'processInputs', 'processOutputs', 'processActivities', 'processDependencies', 'processHistory', 'assessmentHistory', 'implementationActions', 'requirementAssessments', 'controlAssessments'],
    writeCheck: 'canWriteOperational'
  }
};

let output = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ==========================================
    // 1. FUNCIONES AUXILIARES Y MULTI-EMPRESA
    // ==========================================
    
    function isSignedIn() {
      return request.auth != null;
    }

    // Para que esta regla funcione, el ID del documento en \`memberships\` 
    // DEBE ser el formato: {userId}_{organizationId}
    function getMembership(orgId) {
      return get(/databases/$(database)/documents/memberships/$(request.auth.uid + '_' + orgId)).data;
    }

    function hasActiveMembership(orgId) {
      let mem = getMembership(orgId);
      return mem != null && mem.status == 'active';
    }

    function getUserRole(orgId) {
      let mem = getMembership(orgId);
      return mem != null ? mem.role : 'none';
    }

    // ==========================================
    // 2. DEFINICIÓN DE PERMISOS POR ROL
    // ==========================================
    
    function isAdmin(orgId) {
      let role = getUserRole(orgId);
      return role == 'super_admin' || role == 'organization_admin';
    }

    function isSgiaLeader(orgId) {
      return getUserRole(orgId) == 'sgia_leader';
    }

    function isAuditor(orgId) {
      return getUserRole(orgId) == 'auditor';
    }
    
    function canWriteAI(orgId) {
      return isAdmin(orgId) || isSgiaLeader(orgId);
    }

    function canWriteAudit(orgId) {
      return isAdmin(orgId) || isAuditor(orgId);
    }

    function canWriteOperational(orgId) {
      return hasActiveMembership(orgId);
    }

    // ==========================================
    // 3. REGLAS BASE
    // ==========================================
    
    match /{document=**} {
      allow read, write: if false; 
    }

    match /organizations/{orgId} {
      allow read: if isSignedIn() && hasActiveMembership(orgId);
      allow write: if isSignedIn() && isAdmin(orgId);
    }

    match /memberships/{membershipId} {
      allow read: if isSignedIn() && (resource.data.userId == request.auth.uid || isAdmin(resource.data.organizationId));
      allow write: if isSignedIn() && 
                   ((resource == null && isAdmin(request.resource.data.organizationId)) || 
                    (resource != null && isAdmin(resource.data.organizationId) && isAdmin(request.resource.data.organizationId)));
    }

    // ==========================================
    // 4. MÓDULOS DE APLICACIÓN
    // ==========================================
`;

for (const [groupName, groupData] of Object.entries(groups)) {
  output += `\n    // Grupo: ${groupName.toUpperCase()}\n`;
  for (const coll of groupData.collections) {
    output += `    match /${coll}/{docId} {\n`;
    output += `      allow read: if isSignedIn() && resource.data.organizationId != null && hasActiveMembership(resource.data.organizationId);\n`;
    output += `      allow create: if isSignedIn() && request.resource.data.organizationId != null && ${groupData.writeCheck}(request.resource.data.organizationId);\n`;
    output += `      allow update, delete: if isSignedIn() && resource.data.organizationId != null && ${groupData.writeCheck}(resource.data.organizationId);\n`;
    output += `    }\n`;
  }
}

output += `  }\n}\n`;

const fs = require('fs');
fs.writeFileSync('firestore.rules', output);
