const fs = require('fs');
let content = fs.readFileSync('src/components/forms/EvidenceLinksSection.tsx', 'utf8');

// Change props definition
content = content.replace(
  /export function EvidenceLinksSection\(\{ targetType, targetId \}: \{ targetType: 'control', targetId: string \}\) \{/,
  `export function EvidenceLinksSection({ targetType, targetId, isReadOnly = false }: { targetType: 'control' | 'auditItem', targetId: string, isReadOnly?: boolean }) {`
);

// Determine relationType
const relTypeStr = `    const relationType = targetType === 'auditItem' ? 'reviewed' : 'supports';
    
    const link: EvidenceLink = {
      id: \`\${currentOrgId}_\${evidenceId}_\${targetType}_\${targetId}\`,
      organizationId: currentOrgId,
      evidenceId,
      targetType,
      targetId,
      relationType,
      createdAt: new Date().toISOString(),
      createdBy: user.uid
    };`;

content = content.replace(
  /    const link: EvidenceLink = \{[\s\S]*?createdBy: user\.uid\n    \};/,
  relTypeStr
);

// Update Add button rendering
const btnStr = `      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-800 flex items-center">
          <LinkIcon className="w-4 h-4 mr-2 text-slate-500" /> Evidencias {targetType === 'auditItem' ? 'revisadas' : 'vinculadas'}
        </h4>
        {!isReadOnly && (
          <button
            type="button"
            onClick={() => setShowSelector(!showSelector)}
            className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center"
          >
            <Plus className="w-3 h-3 mr-1" /> Vincular evidencia
          </button>
        )}
      </div>`;

content = content.replace(
  /      <div className="flex items-center justify-between mb-3">\n        <h4 className="text-sm font-semibold text-slate-800 flex items-center">\n          <LinkIcon className="w-4 h-4 mr-2 text-slate-500" \/> Evidencias vinculadas\n        <\/h4>\n        <button\n          type="button"\n          onClick=\{\(\) => setShowSelector\(!showSelector\)\}\n          className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center"\n        >\n          <Plus className="w-3 h-3 mr-1" \/> Vincular evidencia\n        <\/button>\n      <\/div>/,
  btnStr
);

// Add isReadOnly block around delete button
const deleteBtnStr = `                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={() => handleUnlink(link.id)}
                    className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Desvincular"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}`;
content = content.replace(
  /                <button\n                  type="button"\n                  onClick=\{\(\) => handleUnlink\(link\.id\)\}\n                  className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"\n                  title="Desvincular"\n                >\n                  <X className="w-4 h-4" \/>\n                <\/button>/,
  deleteBtnStr
);

fs.writeFileSync('src/components/forms/EvidenceLinksSection.tsx', content);
console.log('patched EvidenceLinksSection');
