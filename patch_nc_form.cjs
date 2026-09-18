const fs = require('fs');
let content = fs.readFileSync('src/components/forms/NonConformityForm.tsx', 'utf8');

content = content.replace(
  /import \{ NonConformity, NonConformityStatus \} from '\.\.\/\.\.\/types';/,
  "import { NonConformity, NonConformityStatus } from '../../types';\nimport { EvidenceLinksSection } from './EvidenceLinksSection';"
);

content = content.replace(
  /interface NonConformityFormProps \{/,
  `interface NonConformityFormProps {
  auditId?: string;
  auditItemId?: string;
  requirementId?: string;`
);

content = content.replace(
  /  sourceId,\n  controlId,\n  defaultTitle = '',\n  defaultDescription = ''\n\}: NonConformityFormProps\) \{/,
  `  sourceId,
  controlId,
  auditId,
  auditItemId,
  requirementId,
  defaultTitle = '',
  defaultDescription = ''
}: NonConformityFormProps) {`
);

content = content.replace(
  /        sourceId,\n        controlId,\n        identifiedDate: new Date\(\)\.toISOString\(\),/,
  `        sourceId,
        controlId,
        requirementId,
        auditId,
        auditItemId,
        identifiedDate: new Date().toISOString(),`
);

content = content.replace(
  /      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">/,
  `      {auditItemId && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
          <EvidenceLinksSection targetType="auditItem" targetId={auditItemId} isReadOnly={true} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">`
);

fs.writeFileSync('src/components/forms/NonConformityForm.tsx', content);
console.log('patched NonConformityForm');
