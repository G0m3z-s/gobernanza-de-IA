const fs = require('fs');
let content = fs.readFileSync('src/components/audit/AuditExecutionTab.tsx', 'utf8');

const importStr = `import React, { useState } from 'react';
import { DashboardData, AuditSession } from '../../types';
import { ClipboardCheck, PlayCircle, FileText, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { AuditExecutionWorkspace } from './AuditExecutionWorkspace';`;

content = content.replace(/import React from 'react';\nimport \{ DashboardData \} from '\.\.\/\.\.\/types';\nimport \{ ClipboardCheck, PlayCircle, FileText \} from 'lucide-react';\nimport \{ format \} from 'date-fns';/, importStr);

const stateStr = `export function AuditExecutionTab({ data, standard }: { data: DashboardData, standard?: string }) {
  const [selectedSession, setSelectedSession] = useState<AuditSession | null>(null);
  
  const sessions = data.auditSessions || [];
  
  // Show audits that are programmed, in progress or completed
  const activeSessions = sessions.filter(s => 
    (standard === 'Integrado' || s.standard === standard) && 
    (s.status === 'Programada' || s.status === 'En Progreso' || s.status === 'Completada')
  ).sort((a, b) => {
    // Priority: En Progreso -> Programada -> Completada
    const rank = { 'En Progreso': 1, 'Programada': 2, 'Completada': 3 };
    const rA = rank[a.status as keyof typeof rank] || 4;
    const rB = rank[b.status as keyof typeof rank] || 4;
    if (rA !== rB) return rA - rB;
    return new Date(b.plannedDate).getTime() - new Date(a.plannedDate).getTime();
  });`;

content = content.replace(/export function AuditExecutionTab\(\{ data, standard \}: \{ data: DashboardData, standard\?: string \}\) \{\n  const sessions = data\.auditSessions \|\| \[\];\n    \/\/ Show audits that are programmed or in progress\n  const activeSessions = sessions\.filter\(s => \n     \(standard === 'Integrado' \|\| s\.standard === standard\) && \n     \(s\.status === 'Programada' \|\| s\.status === 'En Progreso'\)\n  \)\.sort\(\(a, b\) => new Date\(a\.plannedDate\)\.getTime\(\) - new Date\(b\.plannedDate\)\.getTime\(\)\);/, stateStr);

const buttonStr = `              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
                {session.status === 'Programada' ? (
                  <div className="w-full flex items-center justify-center space-x-2 bg-slate-50 text-slate-500 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200">
                    <Lock className="w-4 h-4" />
                    <span>Pendiente de inicio</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSelectedSession(session)}
                    className={\`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors \${
                      session.status === 'En Progreso' 
                        ? 'bg-teal-50 text-teal-700 hover:bg-teal-100' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }\`}
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{session.status === 'En Progreso' ? 'Abrir ejecución' : 'Ver ejecución (Solo lectura)'}</span>
                  </button>
                )}
              </div>`;

content = content.replace(/              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">\n                <button className="w-full flex items-center justify-center space-x-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">\n                  <PlayCircle className="w-4 h-4" \/>\n                  <span>\{session\.status === 'En Progreso' \? 'Continuar Evaluación' : 'Iniciar Checklists'\}<\/span>\n                <\/button>\n                <button className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">\n                  <FileText className="w-4 h-4" \/>\n                  <span>Ver Informe Preliminar<\/span>\n                <\/button>\n              <\/div>/, buttonStr);

const wrapperStr = `      )}

      {selectedSession && (
        <AuditExecutionWorkspace
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}`;

content = content.replace(/      \)\}\n    <\/div>\n  \);\n\}/, wrapperStr);

fs.writeFileSync('src/components/audit/AuditExecutionTab.tsx', content);
console.log('patched AuditExecutionTab');
