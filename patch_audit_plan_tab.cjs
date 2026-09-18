const fs = require('fs');
let content = fs.readFileSync('src/components/audit/AuditPlanTab.tsx', 'utf8');

const importStr = `import { AuditForm } from '../forms/AuditForm';
import { AuditScopePlanner } from './AuditScopePlanner';
import { AuditSession } from '../../types';`;

content = content.replace(/import { AuditForm } from '\.\.\/forms\/AuditForm';/, importStr);

const stateStr = `  const [searchTerm, setSearchTerm] = useState('');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [plannerSession, setPlannerSession] = useState<AuditSession | null>(null);`;

content = content.replace(/  const \[searchTerm, setSearchTerm\] = useState\(''\);\n  const \[isSlideOverOpen, setIsSlideOverOpen\] = useState\(false\);/, stateStr);

const tableHeaderStr = `                <th className="px-6 py-3 font-medium">Fecha Programada</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium text-right">Acciones</th>
              </tr>`;

content = content.replace(/                <th className="px-6 py-3 font-medium">Fecha Programada<\/th>\n                <th className="px-6 py-3 font-medium">Estado<\/th>\n              <\/tr>/, tableHeaderStr);

const rowActionStr = `                  </td>
                  <td className="px-6 py-4">
                     <span className={\`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium \${
                      session.status === 'Completada' ? 'bg-emerald-100 text-emerald-700' :
                      session.status === 'En Progreso' ? 'bg-amber-100 text-amber-700' :
                      session.status === 'Cancelada' ? 'bg-slate-200 text-slate-700' :
                      'bg-blue-100 text-blue-700'
                    }\`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {session.standard === 'ISO/IEC 42001' && (
                      <button
                        onClick={() => setPlannerSession(session)}
                        className="text-teal-600 hover:text-teal-900 text-sm font-medium"
                      >
                        {session.status === 'Programada' ? 'Definir alcance' : 'Ver alcance'}
                      </button>
                    )}
                  </td>
                </tr>`;

content = content.replace(/                  <\/td>\n                  <td className="px-6 py-4">\n                     <span className=\{`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium \$\{\n                      session\.status === 'Completada' \? 'bg-emerald-100 text-emerald-700' :\n                      session\.status === 'En Progreso' \? 'bg-amber-100 text-amber-700' :\n                      session\.status === 'Cancelada' \? 'bg-slate-200 text-slate-700' :\n                      'bg-blue-100 text-blue-700'\n                    \}`\}>\n                      \{session\.status\}\n                    <\/span>\n                  <\/td>\n                <\/tr>/, rowActionStr);

const plannerComponentStr = `      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title="Programar Auditoría"
        description="Planifica una nueva sesión de auditoría interna, externa o revisión por la dirección."
      >
        <AuditForm 
          onSuccess={() => setIsSlideOverOpen(false)}
          onCancel={() => setIsSlideOverOpen(false)}
        />
      </SlideOver>

      <AuditScopePlanner 
        isOpen={!!plannerSession}
        onClose={() => setPlannerSession(null)}
        session={plannerSession}
      />
    </div>`;

content = content.replace(/      <SlideOver\n        isOpen=\{isSlideOverOpen\}\n        onClose=\{\(\) => setIsSlideOverOpen\(false\)\}\n        title="Programar Auditoría"\n        description="Planifica una nueva sesión de auditoría interna, externa o revisión por la dirección\."\n      >\n        <AuditForm \n          onSuccess=\{\(\) => setIsSlideOverOpen\(false\)\}\n          onCancel=\{\(\) => setIsSlideOverOpen\(false\)\}\n        \/>\n      <\/SlideOver>\n    <\/div>/, plannerComponentStr);

fs.writeFileSync('src/components/audit/AuditPlanTab.tsx', content);
console.log('patched AuditPlanTab');
