import React from 'react';
import { DashboardData } from '../../types';
import { PageHeader } from '../ui/PageHeader';

export function ControlHeader({ data, filters, setFilters }: { data: DashboardData, filters: any, setFilters: any }) {
  const controls = data.normativeControls || [];
  
  const filteredControls = controls.filter(c => filters.standard === 'Integrado' || c.standard === filters.standard);
  
  const totalControls = filteredControls.length;
  const applicableControls = filteredControls.filter(c => c.applicable).length;
  const implementedControls = filteredControls.filter(c => c.applicable && c.implementationStatus === 'Implementado').length;
  const inProgressControls = filteredControls.filter(c => c.applicable && c.implementationStatus === 'En Proceso').length;

  const implementationPercentage = applicableControls > 0 
    ? Math.round((implementedControls / applicableControls) * 100) 
    : 0;

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
            title="Control Center"
            description="Gestión de aplicabilidad, implementación, evidencia y eficacia de controles ISO/IEC 42001."
          />
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {standardSelector}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-1">
            Total Controles
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{totalControls}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 mb-1">
            Controles Aplicables
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{applicableControls}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 mb-1">
            Implementados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[var(--text-primary)]">{implementedControls}</span>
            <span className="text-xs text-[var(--text-secondary)]">({implementationPercentage}%)</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 mb-1">
            En Proceso
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{inProgressControls}</span>
        </div>
      </div>
    </div>
  );
}
