const fs = require('fs');
let content = fs.readFileSync('src/components/audit/AuditExecutionWorkspace.tsx', 'utf8');

content = content.replace(
  /import \{ EvidenceLink \} from '\.\.\/\.\.\/types';/,
  "import { EvidenceLink, NonConformity } from '../../types';\nimport { NonConformityForm } from '../forms/NonConformityForm';"
);

content = content.replace(
  /  const \[saveSuccess, setSaveSuccess\] = useState\(false\);/,
  `  const [saveSuccess, setSaveSuccess] = useState(false);\n  const [findingFormItem, setFindingFormItem] = useState<AuditChecklistItem | null>(null);`
);

fs.writeFileSync('src/components/audit/AuditExecutionWorkspace.tsx', content);
console.log('patched AuditExecutionWorkspace imports');
