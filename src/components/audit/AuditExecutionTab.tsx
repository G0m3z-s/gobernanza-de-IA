import React, { useState } from 'react';
import { DashboardData, AuditSession } from '../../types';
import { ClipboardCheck, PlayCircle, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { AuditExecutionWorkspace } from './AuditExecutionWorkspace';
import { StatusBadge } from '../ui/StatusBadge';

export function AuditExecutionTab({ data, standard }: { data: DashboardData, standard?: string }) {
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
  });

  return (
    <div className="space-y-6">
      {activeSessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSessions.map(session => (
            <div key={session.id} className="bg-white rounded border border-[var(--border)] shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">{session.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 uppercase tracking-wider font-semibold">{session.standard} • {session.type}</p>
                </div>
                <StatusBadge 
                  status={
                    session.status === 'En Progreso' ? 'warning' : 
                    session.status === 'Completada' ? 'success' :
                    'info'
                  }
                  dot
                >
                  {session.status}
                </StatusBadge>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Auditor Líder:</span>
                  <span className="font-medium text-[var(--text-primary)]">{session.leadAuditor}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Fecha Planificada:</span>
                  <span className="font-medium text-[var(--text-primary)]">{format(new Date(session.plannedDate), 'MMM d, yyyy')}</span>
                </div>
                {session.scope && (
                  <div>
                    <span className="text-[var(--text-secondary)] text-xs block mb-1">Alcance:</span>
                    <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2" title={session.scope}>{session.scope}</p>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-[var(--border)] flex flex-col space-y-2">
                {session.status === 'Programada' ? (
                  <div className="w-full flex items-center justify-center space-x-2 bg-slate-50 text-[var(--text-muted)] px-4 py-2 rounded text-sm font-medium border border-[var(--border)]">
                    <Lock className="w-4 h-4" />
                    <span>Pendiente de inicio</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSelectedSession(session)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                      session.status === 'En Progreso' 
                        ? 'bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent)]/90' 
                        : 'bg-slate-100 text-[var(--text-primary)] hover:bg-slate-200'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{session.status === 'En Progreso' ? 'Abrir ejecución' : 'Ver ejecución (Solo lectura)'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded border border-[var(--border)] shadow-sm p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--border)]">
            <ClipboardCheck className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">No hay auditorías activas</h3>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm">
            Actualmente no tienes auditorías programadas o en progreso para la norma seleccionada.
          </p>
        </div>
      )}

      {selectedSession && (
        <AuditExecutionWorkspace
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}
