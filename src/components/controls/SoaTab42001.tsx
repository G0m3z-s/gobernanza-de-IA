import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { Search, ShieldAlert, ShieldCheck, Check, X, FileText, AlertTriangle , Activity, Filter } from 'lucide-react';
import { SlideOver } from '../ui/SlideOver';
import { ControlForm42001 } from '../forms/ControlForm42001';
import { getISO42001AdaptedControls, resolveAssessment, getControlApplicability, getControlImplementationStatus, getCurrentControlEffectiveness, getControlTestResult } from '../../data/normativeCatalogAdapter';
import { StatusBadge } from '../ui/StatusBadge';
import { DataTableShell } from '../ui/DataTableShell';

export function SoaTab42001({ data }: { data: DashboardData }) {
  const allControls = getISO42001AdaptedControls();
  
  const mappedControls = allControls.map(c => {
    const assessment = resolveAssessment(c, data.controlAssessments, true) || {};
    return {
      ...c,
      groupCode: c.code.substring(0, 3), // e.g. A.2, A.3
      assessment,
      applicability: getControlApplicability(assessment.id ? assessment : null),
      status: getControlImplementationStatus(assessment.id ? assessment : null),
      testResult: getCurrentControlEffectiveness(c.id, data.controlEffectivenessTests || [], assessment.id ? assessment : null),
      testCount: (data.controlEffectivenessTests || []).filter(t => t.controlId === c.id).length,
      ownerId: assessment.ownerId || '',
      justification: assessment.justification || '',
      evidenceCount: (data.evidenceLinks || []).filter(l => l.targetType === 'control' && l.targetId === c.id).length,
      riskCount: (data.riskControlLinks || []).filter(l => l.controlId === c.id && l.relationType === 'treats').length,
      ncCount: (data.nonConformities || []).filter(nc => nc.controlId === c.id && nc.status !== 'Cerrada').length,
      capaCount: (data.capas || []).filter(capa => capa.controlId === c.id && capa.status !== 'Cerrada').length
    };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  
  const [selectedControl, setSelectedControl] = useState<any>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const groups = Array.from(new Set(mappedControls.map(c => c.groupCode))).sort();

  const displayControls = mappedControls.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'All' || c.groupCode === domainFilter;
    return matchesSearch && matchesDomain;
  });

  const applicableControls = mappedControls.filter(c => c.applicability === 'applicable');
  const totalApplicable = applicableControls.length;
  const implementedCount = applicableControls.filter(c => ['implemented', 'evidenced', 'verified'].includes(c.status)).length;
  const notApplicableCount = mappedControls.filter(c => c.applicability === 'not_applicable').length;
  const notEvaluatedCount = mappedControls.filter(c => c.applicability === 'not_evaluated').length;

  const getStatusBadge = (status: string) => {
    const config: Record<string, { statusType: any, label: string }> = {
      not_evaluated: { statusType: 'neutral', label: 'No Evaluado' },
      gap: { statusType: 'danger', label: 'Brecha' },
      planned: { statusType: 'warning', label: 'Planificado' },
      documented: { statusType: 'info', label: 'Documentado' },
      implemented: { statusType: 'success', label: 'Implementado' },
      evidenced: { statusType: 'success', label: 'Con Evidencia' },
      verified: { statusType: 'success', label: 'Verificado' }
    };
    const conf = config[status] || config.not_evaluated;
    return <StatusBadge status={conf.statusType}>{conf.label}</StatusBadge>;
  };

  const getOwnerName = (id: string) => {
    const stakeholder = data.stakeholders?.find(s => s.id === id);
    return stakeholder ? stakeholder.name : id;
  };

  const getEfficacyBadge = (result: string) => {
    const config: Record<string, { statusType: any, label: string }> = {
      not_tested: { statusType: 'neutral', label: 'Sin Evaluar' },
      ineffective: { statusType: 'danger', label: 'Ineficaz' },
      partially_effective: { statusType: 'warning', label: 'Parcialmente' },
      effective: { statusType: 'success', label: 'Eficaz' }
    };
    const conf = config[result] || config.not_tested;
    return <StatusBadge status={conf.statusType}>{conf.label}</StatusBadge>;
  };

  const toolbarActions = (
    <div className="flex items-center gap-2">
      <div className="relative w-48 sm:w-64">
        <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Buscar código o nombre..."
          className="w-full pl-8 pr-3 py-1.5 bg-white border border-[var(--border)] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <select
        className="px-3 py-1.5 bg-white border border-[var(--border)] rounded text-xs text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
        value={domainFilter}
        onChange={(e) => setDomainFilter(e.target.value)}
      >
        <option value="All">Todos los grupos</option>
        {groups.map(d => (
          <option key={d} value={d}>Grupo {d}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Context Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-1">
            Controles Totales
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{mappedControls.length}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-600 mb-1">
            Aplicables
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{totalApplicable}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
            No Aplicables
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{notApplicableCount}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 mb-1">
            No Evaluados
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">{notEvaluatedCount}</span>
        </div>
        {totalApplicable > 0 && (
          <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--brand-accent)] mb-1">
              Cobertura Impl.
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[var(--text-primary)]">
                {Math.round((implementedCount / totalApplicable) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>

      <DataTableShell
        title="Statement of Applicability (SoA) - ISO/IEC 42001"
        icon={FileText}
        headerActions={toolbarActions}
      >
        <table className="min-w-full text-sm text-left">
          <thead className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider bg-slate-50/50 border-b border-[var(--border)]">
            <tr>
              <th className="px-4 py-3 font-semibold">Control</th>
              <th className="px-4 py-3 font-semibold text-center">Aplica</th>
              <th className="px-4 py-3 font-semibold">Implementación</th>
              <th className="px-4 py-3 font-semibold">Eficacia</th>
              <th className="px-4 py-3 font-semibold">Evidencias</th>
              <th className="px-4 py-3 font-semibold">Responsable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {displayControls.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[var(--text-secondary)] text-sm">
                  No se encontraron controles con los filtros actuales
                </td>
              </tr>
            ) : displayControls.map((control) => (
              <tr 
                key={control.id} 
                className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedControl(control);
                  setIsSlideOverOpen(true);
                }}
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[var(--text-primary)]">{control.code}</span>
                    <span className="text-xs text-[var(--brand-accent)] line-clamp-1 mt-0.5">{control.title}</span>
                  </div>
                  {control.applicability === 'not_applicable' && control.justification && (
                    <p className="text-[10px] text-[var(--text-muted)] mt-1 line-clamp-1 italic">
                      Exclusión: {control.justification}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {control.applicability === 'applicable' ? (
                    <StatusBadge status="info">Aplicable</StatusBadge>
                  ) : control.applicability === 'not_applicable' ? (
                    <StatusBadge status="neutral">No Aplica</StatusBadge>
                  ) : (
                    <StatusBadge status="warning">S/E</StatusBadge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {control.applicability === 'applicable' ? (
                    getStatusBadge(control.status)
                  ) : (
                    <span className="text-[var(--text-muted)] text-[10px] uppercase">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {control.applicability === 'applicable' ? (
                    getEfficacyBadge(control.testResult)
                  ) : (
                    <span className="text-[var(--text-muted)] text-[10px] uppercase">N/A</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {control.applicability === 'applicable' ? (
                    <div className="flex flex-col gap-1">
                      {control.evidenceCount > 0 && (
                        <span className="text-[10px] text-[var(--text-secondary)] font-medium">Evidencias: {control.evidenceCount}</span>
                      )}
                      {control.riskCount > 0 && (
                        <span className="text-[10px] text-[var(--text-secondary)] font-medium">Riesgos: {control.riskCount}</span>
                      )}
                      {control.evidenceCount === 0 && control.riskCount === 0 && (
                        <span className="text-[var(--text-muted)] text-[10px]">-</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[var(--text-muted)] text-[10px] uppercase">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {control.applicability === 'applicable' ? (
                    control.ownerId ? (
                      <span className="text-xs text-[var(--text-primary)] truncate max-w-[120px] block" title={getOwnerName(control.ownerId)}>
                        {getOwnerName(control.ownerId)}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)] text-[10px] uppercase">Sin asignar</span>
                    )
                  ) : (
                    <span className="text-[var(--text-muted)] text-[10px] uppercase">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title="Evaluación de Control"
        description="Evalúa la aplicabilidad, estado y madurez de este control normativo."
      >
        {selectedControl && (
          <ControlForm42001 
            control={selectedControl}
            assessment={selectedControl.assessment}
            onSuccess={() => setIsSlideOverOpen(false)}
            onCancel={() => setIsSlideOverOpen(false)}
          />
        )}
      </SlideOver>
    </div>
  );
}
