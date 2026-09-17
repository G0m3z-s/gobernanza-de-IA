const fs = require('fs');

let rules = fs.readFileSync('firestore.rules', 'utf8');

// Replace getMembership
rules = rules.replace(/function getMembership\(orgId\) \{\n      return get\(\/databases\/\$\(database\)\/documents\/memberships\/\$\(request\.auth\.uid \+ '_' \+ orgId\)\)\.data;\n    \}/, `function getMembership(orgId) {\n      let docPath = /databases/$(database)/documents/memberships/$(request.auth.uid + '_' + orgId);\n      return exists(docPath) ? get(docPath).data : null;\n    }`);

// Replace organizations match
const oldOrgMatch = `    match /organizations/{orgId} {
      allow read: if isSignedIn() && hasActiveMembership(orgId);
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() && isAdmin(orgId);
    }`;

const newOrgMatch = `    match /organizations/{orgId} {
      allow read: if isSignedIn() && hasActiveMembership(orgId);
      allow create: if isSignedIn() && request.resource.data.createdBy == request.auth.uid;
      allow update: if isSignedIn() && isAdmin(orgId) && request.resource.data.createdBy == resource.data.createdBy;
      allow delete: if isSignedIn() && isAdmin(orgId);
    }`;
rules = rules.replace(oldOrgMatch, newOrgMatch);

// Replace memberships match
const oldMemMatch = `    match /memberships/{membershipId} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && 
                   ((resource == null && (isAdmin(request.resource.data.organizationId) || request.resource.data.userId == request.auth.uid)) || 
                    (resource != null && isAdmin(resource.data.organizationId) && isAdmin(request.resource.data.organizationId)));
    }`;

const newMemMatch = `    match /memberships/{membershipId} {
      allow read: if isSignedIn() && (
        resource.data.userId == request.auth.uid ||
        isAdmin(resource.data.organizationId)
      );
      
      allow create: if isSignedIn() && (
        // Bootstrap: Creator of the org creates their first membership as admin
        (
          request.resource.data.userId == request.auth.uid &&
          request.resource.data.role == 'organization_admin' &&
          request.resource.data.status == 'active' &&
          membershipId == request.auth.uid + '_' + request.resource.data.organizationId &&
          exists(/databases/$(database)/documents/organizations/$(request.resource.data.organizationId)) &&
          get(/databases/$(database)/documents/organizations/$(request.resource.data.organizationId)).data.createdBy == request.auth.uid
        ) ||
        // Admin creates membership for others
        (
          isAdmin(request.resource.data.organizationId) &&
          membershipId == request.resource.data.userId + '_' + request.resource.data.organizationId
        )
      );
      
      allow update: if isSignedIn() && 
                    isAdmin(resource.data.organizationId) && 
                    request.resource.data.organizationId == resource.data.organizationId &&
                    request.resource.data.userId == resource.data.userId &&
                    resource.data.userId != request.auth.uid; // Can't change own membership
                    
      allow delete: if isSignedIn() && 
                    isAdmin(resource.data.organizationId) && 
                    resource.data.userId != request.auth.uid; // Can't delete own membership
    }`;
rules = rules.replace(oldMemMatch, newMemMatch);

fs.writeFileSync('firestore.rules', rules);
