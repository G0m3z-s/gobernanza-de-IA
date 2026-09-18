import React, { useState } from 'react';
import { DashboardData, AuditSession } from '../../types';
import { Plus, Search, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { SlideOver } from '../ui/SlideOver';
import { AuditForm } from '../forms/AuditForm';
import { AuditScopePlanner } from './AuditScopePlanner';
import { DataTableShell } from '../ui/DataTableShell';
import { StatusBadge } from '../ui/StatusBadge';

export function AuditPlanTab({ data, standard }: { data: DashboardData, standard?: string }) {
  const sessions = data.auditSessions || [];
  const filteredSessions = sessions.filter(s => standard === 'Integrado' || s.standard === standard);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [plannerSession, setPlannerSession] = useState<AuditSession | null>(null);

  const displaySessions = filteredSessions.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.leadAuditor.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(a.plannedDate).getTime() - new Date(b.plannedDate).getTime());

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar auditoría..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsSlideOverOpen(true)}
          className="flex items-center space-x-2 bg-[var(--brand-navy)] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[var(--brand-navy)]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Auditoría</span>
        </button>
      </div>

      <DataTableShell
        title="Plan de Auditorías"
        icon={CalendarDays}
        headerActions={
          <div className="text-sm text-[var(--text-secondary)]">
            Total: <span className="font-medium text-[var(--text-primary)]">{displaySessions.length}</span>
          </div>
        }
      >
        {displaySessions.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 border-b border-[var(--border)] text-[var(--text-secondary)]">
              <tr>
                <th className="px-6 py-3 font-medium">Auditoría</th>
                <th className="px-6 py-3 font-medium">Norma</th>
                <th className="px-6 py-3 font-medium">Auditor Líder</th>
                <th className="px-6 py-3 font-medium">Fecha Programada</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-white">
              {displaySessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50/50 transition-colors h-[48px]">
                  <td className="px-6 py-2">
                    <p className="font-semibold text-[var(--text-primary)]">{session.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{session.type}</p>
                  </td>
                  <td className="px-6 py-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-50 border border-[var(--border)] text-[var(--text-secondary)] text-[10px] font-semibold uppercase tracking-wider">
                      {session.standard}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-slate-100 border border-[var(--border)] text-[var(--text-secondary)] flex items-center justify-center text-xs font-semibold">
                        {session.leadAuditor.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[var(--text-secondary)]">{session.leadAuditor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-[var(--text-secondary)]">
                    {format(new Date(session.plannedDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-2">
                    <StatusBadge 
                      status={
                        session.status === 'Completada' ? 'success' :
                        session.status === 'En Progreso' ? 'warning' :
                        session.status === 'Cancelada' ? 'neutral' :
                        'info'
                      }
                      dot
                    >
                      {session.status}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-2 text-right">
                    {session.standard === 'ISO/IEC 42001' && (
                      <button
                        onClick={() => setPlannerSession(session)}
                        className="text-[var(--brand-accent)] hover:text-[var(--brand-navy)] text-xs font-medium px-3 py-1.5 rounded hover:bg-slate-50 transition-colors"
                      >
                        {session.status === 'Programada' ? 'Definir alcance' : 'Ver alcance'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-[var(--border)]">
              <CalendarDays className="w-6 h-6 text-[var(--text-muted)]" />
            </div>
            <p className="text-[var(--text-primary)] font-medium">No hay auditorías programadas</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Programa tu primera revisión anual o auditoría interna.</p>
          </div>
        )}
      </DataTableShell>

      <SlideOver
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
    </div>
  );
}
