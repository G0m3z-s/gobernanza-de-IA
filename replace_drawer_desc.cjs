const fs = require('fs');
let content = fs.readFileSync('src/components/implementation/RequirementDrawer.tsx', 'utf8');

const regex = /<h3 className="text-sm font-semibold text-slate-800 mb-2">¿QUÉ SIGNIFICA\?<\/h3>[\s\S]*?<p className="text-sm text-slate-600 leading-relaxed">\{requirement\.description \|\| requirement\.title\}<\/p>/;

const replacement = `<h3 className="text-sm font-semibold text-slate-800 mb-2">¿QUÉ SIGNIFICA?</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{requirement.summary || requirement.description || requirement.title}</p>
              </div>
              {requirement.objective && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Objetivo</h4>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{requirement.objective}</p>
                </div>
              )}
              {requirement.implementationGuidance && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Guía de Implementación</h4>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{requirement.implementationGuidance}</p>
                </div>
              )}
              {requirement.evidenceGuidance && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Evidencia Sugerida</h4>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{requirement.evidenceGuidance}</p>
                </div>
              )}
              {requirement.auditQuestion && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pregunta de Auditoría</h4>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{requirement.auditQuestion}</p>
                </div>
              )}
            </div>`;

if (regex.test(content)) {
  fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content.replace(regex, replacement));
  console.log("Success regex");
} else {
  console.log("Failed");
}
