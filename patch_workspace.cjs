const fs = require('fs');
let content = fs.readFileSync('src/components/audit/AuditExecutionWorkspace.tsx', 'utf8');

const importStr = `import { format } from 'date-fns';
import { EvidenceLinksSection } from '../forms/EvidenceLinksSection';
import { EvidenceLink } from '../../types';`;

content = content.replace(/import \{ format \} from 'date-fns';/, importStr);

// Get evidence link count for items
const renderItemRowPatch = `
  const renderItemRow = (item: AuditChecklistItem) => {
    const isExpanded = expandedItemId === item.id;
    const itemEvidenceCount = (data?.evidenceLinks || []).filter(
      l => l.targetId === item.id && l.targetType === 'auditItem'
    ).length;
    
    return (
      <div key={item.id} className="border border-slate-200 rounded-lg bg-white overflow-hidden mb-3">
`;
content = content.replace(/  const renderItemRow = \(item: AuditChecklistItem\) => \{\n    const isExpanded = expandedItemId === item\.id;\n    return \(\n      <div key=\{item\.id\} className="border border-slate-200 rounded-lg bg-white overflow-hidden mb-3">/, renderItemRowPatch);

const evidenceCounterStr = `            <p className="text-sm text-slate-600 truncate">{item.title}</p>
            {itemEvidenceCount > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                Evidencias: {itemEvidenceCount}
              </p>
            )}
          </div>`;

content = content.replace(/            <p className="text-sm text-slate-600 truncate">\{item\.title\}<\/p>\n          <\/div>/, evidenceCounterStr);


const evidenceSectionStr = `              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <EvidenceLinksSection 
                  targetType="auditItem" 
                  targetId={item.id} 
                  isReadOnly={isReadOnly} 
                />
              </div>

              {!isReadOnly && (`;

content = content.replace(/              <\/div>\n\n              \{!isReadOnly && \(/, evidenceSectionStr);

fs.writeFileSync('src/components/audit/AuditExecutionWorkspace.tsx', content);
console.log('patched AuditExecutionWorkspace');
