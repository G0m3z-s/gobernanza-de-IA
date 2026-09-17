const fs = require('fs');
let content = fs.readFileSync('src/components/implementation/RequirementDrawer.tsx', 'utf8');

const target = `      const assessmentRef = requirement.assessmentId 
         ? doc(db, 'requirementAssessments', requirement.assessmentId)
        : doc(collection(db, 'requirementAssessments'));
            
      const newData = {
        organizationId: currentOrgId,
        standard: requirement.standard,
        clause: requirement.clause,
        requirementId: requirement.requirement,
        status,
        ownerId,
        updatedAt: new Date().toISOString()
      };
      await setDoc(assessmentRef, newData, { merge: true });`;

const replacement = `      const isControl = requirement.type === 'control';
      const collectionName = isControl ? 'controlAssessments' : 'requirementAssessments';

      const assessmentRef = requirement.assessmentId 
         ? doc(db, collectionName, requirement.assessmentId)
        : doc(collection(db, collectionName));
            
      const newData = isControl
        ? {
            organizationId: currentOrgId,
            standard: requirement.standard,
            clause: requirement.clause,
            control: requirement.requirement,
            status,
            ownerId,
            justification: status === 'not_applicable' ? justification : null,
            updatedAt: new Date().toISOString()
          }
        : {
            organizationId: currentOrgId,
            standard: requirement.standard,
            clause: requirement.clause,
            requirementId: requirement.requirement,
            status,
            ownerId,
            justification: status === 'not_applicable' ? justification : null,
            updatedAt: new Date().toISOString()
          };
      await setDoc(assessmentRef, newData, { merge: true });`;

if (content.includes(target)) {
  fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content.replace(target, replacement));
  console.log("Success exact");
} else {
  // Regex approach
  const regex = /const assessmentRef = requirement\.assessmentId[\s\S]*?await setDoc\(assessmentRef, newData, \{ merge: true \}\);/;
  if (regex.test(content)) {
    fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content.replace(regex, replacement));
    console.log("Success regex");
  } else {
    console.log("Failed");
  }
}
