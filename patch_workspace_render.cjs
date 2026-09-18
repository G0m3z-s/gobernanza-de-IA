const fs = require('fs');
let content = fs.readFileSync('src/components/audit/AuditExecutionWorkspace.tsx', 'utf8');

const countStr = `    const itemFindings = (data?.nonConformities || []).filter(
      nc => nc.auditItemId === item.id && nc.organizationId === currentOrgId && nc.auditId === session?.id
    );
    const itemEvidenceCount = (data?.evidenceLinks || []).filter(`;

content = content.replace(
  /    const itemEvidenceCount = \(data\?\.evidenceLinks \|\| \[\]\)\.filter\(/,
  countStr
);

const evidenceCounterStr = `            {itemEvidenceCount > 0 && (
              <p className="text-xs text-slate-500 mt-1 inline-block mr-3">
                Evidencias: {itemEvidenceCount}
              </p>
            )}
            {itemFindings.length > 0 && (
              <p className="text-xs text-rose-500 mt-1 inline-block font-medium">
                Hallazgos: {itemFindings.length}
              </p>
            )}`;

content = content.replace(
  /            \{itemEvidenceCount > 0 && \(\n              <p className="text-xs text-slate-500 mt-1">\n                Evidencias: \{itemEvidenceCount\}\n              <\/p>\n            \)\}/,
  evidenceCounterStr
);

const findingsSectionStr = `              <div className="pt-4 border-t border-slate-200">
                <EvidenceLinksSection 
                  targetType="auditItem" 
                  targetId={item.id} 
                  isReadOnly={isReadOnly} 
                />
              </div>

              {itemFindings.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Hallazgos registrados</h4>
                  <div className="space-y-2">
                    {itemFindings.map(nc => (
                      <div key={nc.id} className="flex justify-between items-start p-3 bg-rose-50 border border-rose-100 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{nc.title}</p>
                          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                            {nc.findingType === 'NONCONFORMITY' ? 'No Conformidad' : nc.findingType === 'OBSERVATION' ? 'Observación' : nc.findingType === 'OPPORTUNITY_FOR_IMPROVEMENT' ? 'Oportunidad de Mejora' : nc.findingType} • {nc.severity}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-white border border-rose-200 text-rose-700 rounded-full">
                          {nc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isReadOnly && (`;

content = content.replace(
  /              <div className="pt-4 border-t border-slate-200">\n                <EvidenceLinksSection \n                  targetType="auditItem" \n                  targetId=\{item\.id\} \n                  isReadOnly=\{isReadOnly\} \n                \/>\n              <\/div>\n\n              \{!isReadOnly && \(/,
  findingsSectionStr
);


const buttonsStr = `                  <div className="flex space-x-2">
                    {item.status === 'COMPLETED' && !isReadOnly && session?.status === 'En Progreso' && (item.result === 'NONCONFORMING' || item.result === 'OBSERVATION' || item.result === 'OPPORTUNITY_FOR_IMPROVEMENT') && (
                      <button
                        onClick={() => setFindingFormItem(item)}
                        disabled={isSaving}
                        className="px-4 py-2 bg-rose-50 text-rose-700 text-sm font-medium rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-50"
                      >
                        Crear hallazgo
                      </button>
                    )}
                    <button
                      onClick={() => handleSave(item)}
                      disabled={isSaving}
                      className="flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >`;

content = content.replace(
  /                  <div className="flex space-x-2">\n                    <button\n                      onClick=\{\(\) => handleSave\(item\)\}\n                      disabled=\{isSaving\}\n                      className="flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"\n                    >/,
  buttonsStr
);

const modalStr = `      </div>

      {findingFormItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Registrar Hallazgo</h2>
                <p className="text-sm text-slate-500 mt-1">Criterio: {findingFormItem.code}</p>
              </div>
              <button onClick={() => setFindingFormItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <NonConformityForm
                onSuccess={() => setFindingFormItem(null)}
                onCancel={() => setFindingFormItem(null)}
                defaultSource="Auditoría"
                sourceType="audit"
                sourceId={findingFormItem.id}
                auditId={session?.id}
                auditItemId={findingFormItem.id}
                controlId={findingFormItem.itemType === 'control' ? findingFormItem.normativeId : undefined}
                requirementId={findingFormItem.itemType === 'requirement' ? findingFormItem.normativeId : undefined}
                defaultTitle={\`Hallazgo en \${findingFormItem.code}\`}
                defaultDescription={findingFormItem.auditorNotes || ''}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(
  /      <\/div>\n    <\/div>\n  \);\n\}/,
  modalStr
);

fs.writeFileSync('src/components/audit/AuditExecutionWorkspace.tsx', content);
console.log('patched AuditExecutionWorkspace render');
