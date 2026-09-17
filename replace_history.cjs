const fs = require('fs');
let content = fs.readFileSync('src/components/implementation/RequirementDrawer.tsx', 'utf8');

const regex = /\/\/ Record history[\s\S]*?if \(requirement\.status !== status \|\| requirement\.ownerId !== ownerId\) \{[\s\S]*?await addDoc\(collection\(db, 'assessmentHistory'\), \{[\s\S]*?organizationId: currentOrgId,[\s\S]*?requirementId: requirement\.requirement,[\s\S]*?date: new Date\(\)\.toISOString\(\),[\s\S]*?userId: user\?\.uid \|\| 'unknown',[\s\S]*?userName: user\?\.displayName \|\| user\?\.email \|\| 'Unknown User',[\s\S]*?field: requirement\.status !== status \? 'status' : 'ownerId',[\s\S]*?oldValue: requirement\.status !== status \? requirement\.status : requirement\.ownerId,[\s\S]*?newValue: requirement\.status !== status \? status : ownerId,[\s\S]*?\}\);[\s\S]*?\}/;

const replacement = `// Record history
      if (requirement.status !== status || requirement.ownerId !== ownerId || requirement.justification !== justification) {
        await addDoc(collection(db, 'assessmentHistory'), {
          organizationId: currentOrgId,
          requirementId: requirement.requirement,
          date: new Date().toISOString(),
          userId: user?.uid || 'unknown',
          userName: user?.displayName || user?.email || 'Unknown User',
          field: requirement.status !== status ? 'status' : (requirement.ownerId !== ownerId ? 'ownerId' : 'justification'),
          oldValue: requirement.status !== status ? requirement.status : (requirement.ownerId !== ownerId ? requirement.ownerId : requirement.justification),
          newValue: requirement.status !== status ? status : (requirement.ownerId !== ownerId ? ownerId : justification),
          type: requirement.type || 'requirement'
        });
      }`;

if (regex.test(content)) {
  fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content.replace(regex, replacement));
  console.log("Success regex");
} else {
  console.log("Failed");
}
