const fs = require('fs');
let content = fs.readFileSync('src/utils/auditHelpers.ts', 'utf8');

const idHelper = `
export const buildAuditChecklistItemId = (organizationId: string, auditId: string, itemType: string, normativeId: string): string => {
  return \`\${organizationId}_\${auditId}_\${itemType}_\${normativeId}\`;
};
`;

content = content.replace(
  /export function buildAuditItemsFromNormativeSelection\(/,
  idHelper + '\nexport function buildAuditItemsFromNormativeSelection('
);

content = content.replace(
  /        code: req.clause,\n        title: req.title,/,
  `        id: buildAuditChecklistItemId(organizationId, auditId, 'requirement', req.id),
        code: req.clause,
        title: req.title,`
);

content = content.replace(
  /        code: ctrl.code,\n        title: ctrl.title,/,
  `        id: buildAuditChecklistItemId(organizationId, auditId, 'control', ctrl.id),
        code: ctrl.code,
        title: ctrl.title,`
);

fs.writeFileSync('src/utils/auditHelpers.ts', content);
console.log('patched auditHelpers');
