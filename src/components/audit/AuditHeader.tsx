import React from 'react';
import { DashboardData } from '../../types';
import { PageHeader } from '../ui/PageHeader';

export function AuditHeader({ data, filters, setFilters }: { data: DashboardData, filters: any, setFilters: any }) {
  const sessions = data.auditSessions || [];
  const nonConformities = data.nonConformities || [];
  
  const filteredSessions = sessions.filter(s => filters.standard === 'Integrado' || s.standard === filters.standard);
  const planned = filteredSessions.filter(s => s.status === 'Programada').length;
  const inProgress = filteredSessions.filter(s => s.status === 'En Progreso').length;
  const completed = filteredSessions.filter(s => s.status === 'Completada').length;

  const auditFindings = nonConformities.filter(nc => 
    nc.source === 'Auditoría' && 
    (filters.standard === 'Integrado' || nc.standardIds?.includes(filters.standard))
  );
  
  const openFindings = auditFindings.filter(nc => nc.status !== 'Cerrada').length;

  const standardSelector = (
    <select 
      className="bg-white border border-[var(--border)] text-[var(--text-primary)] rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] text-xs font-medium"
      value={filters.standard}
      onChange={(e) => setFilters({...filters, standard: e.target.value})}
    >
      <option value="Integrado">Integrado (27001 + 42001)</option>
      <option value="ISO/IEC 27001">ISO/IEC 27001:2022</option>
      <option value="ISO/IEC 42001">ISO/IEC 42001:2023</option>
    </select>
  );

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <PageHeader 
            title="Audit Workspace"
            description="Planificación, ejecución y seguimiento de auditorías del Sistema de Gestión de IA."
          />
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {standardSelector}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-1">
            Programadas
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{planned}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 mb-1">
            En Ejecución
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{inProgress}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 mb-1">
            Completadas
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{completed}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 mb-1">
            Hallazgos Abiertos
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{openFindings}</span>
        </div>
      </div>
    </div>
  );
}

