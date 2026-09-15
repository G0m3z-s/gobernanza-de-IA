import fs from 'fs';

let content = fs.readFileSync('src/components/implementation/RequirementDrawer.tsx', 'utf8');

// We need to add logic to check AI Impact Assessments if standard is ISO 42001 and clause includes 8.2 or similar
const imports = `import { useStore } from '../../store/useStore';
import { AlertTriangle } from 'lucide-react';`;

content = content.replace("import { ChevronRight, X, FileText, Bot, History } from 'lucide-react';", "import { ChevronRight, X, FileText, Bot, History, AlertTriangle } from 'lucide-react';\nimport { useStore } from '../../store/useStore';");

const stateBlock = `  const [saving, setSaving] = useState(false);
  const { currentOrgId, user } = useAuth();
  const { data } = useStore();
  
  // Basic AI Check for ISO 42001 AI Impact Assessment
  const isAIAssessmentReq = requirement.standard === 'ISO 42001' && (requirement.clause.startsWith('8.2') || requirement.title.toLowerCase().includes('impacto'));
  const aiSystems = data?.aiSystems || [];
  const impacts = data?.aiImpactAssessments || [];
  const systemsWithoutImpact = aiSystems.filter(sys => !impacts.some(imp => imp.aiSystemId === sys.id));
  const showAIWarning = isAIAssessmentReq && systemsWithoutImpact.length > 0;
`;

content = content.replace(/  const \[saving, setSaving\] = useState\(false\);\n  const \{ currentOrgId, user \} = useAuth\(\);/, stateBlock);

const aiWarningHTML = `
          {showAIWarning && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-800">Evaluaciones de Impacto Faltantes</h4>
                <p className="text-xs text-amber-700 mt-1">
                  Existen <strong>{systemsWithoutImpact.length} sistemas IA</strong> en el inventario sin una evaluación de impacto registrada. 
                  Este requisito no debería considerarse completamente implementado hasta evaluarlos.
                </p>
                <div className="mt-2 text-xs font-semibold text-amber-800">Sistemas pendientes:</div>
                <ul className="list-disc list-inside text-xs text-amber-700 mt-1">
                  {systemsWithoutImpact.slice(0, 3).map(s => <li key={s.id}>{s.name}</li>)}
                  {systemsWithoutImpact.length > 3 && <li>...y {systemsWithoutImpact.length - 3} más</li>}
                </ul>
              </div>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">ESTADO ACTUAL</h3>`;

content = content.replace("          <div>\n            <h3 className=\"text-sm font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2\">ESTADO ACTUAL</h3>", aiWarningHTML);

fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content);
console.log('RequirementDrawer updated for AI connections');
