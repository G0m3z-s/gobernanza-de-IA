import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { Search, AlertTriangle, ArrowRight, Plus, Target } from 'lucide-react';
import { format } from 'date-fns';
import { SlideOver } from '../ui/SlideOver';
import { NonConformityForm } from '../forms/NonConformityForm';
import { DataTableShell } from '../ui/DataTableShell';
import { StatusBadge } from '../ui/StatusBadge';

export function FindingsTab({ data, standard }: { data: DashboardData, standard?: string }) {
  const nonConformities = data.nonConformities || [];
  
  // Filter for Non-Conformities strictly from 'Auditoría' source
  const auditFindings = nonConformities.filter(nc => 
    nc.source === 'Auditoría' && 
    (standard === 'Integrado' || nc.standardIds?.includes(standard!))
  ).sort((a, b) => new Date(b.identifiedDate).getTime() - new Date(a.identifiedDate).getTime());

  const [searchTerm, setSearchTerm] = useState('');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  const displayFindings = auditFindings.filter(nc => 
    nc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar hallazgos..."
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
          <span>Registrar Hallazgo</span>
        </button>
      </div>

      <DataTableShell
        title="Hallazgos de Auditoría"
        icon={Target}
        headerActions={
          <div className="text-sm text-[var(--text-secondary)]">
            Total: <span className="font-medium text-[var(--text-primary)]">{displayFindings.length}</span>
          </div>
        }
      >
        {displayFindings.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-[var(--border)] text-[var(--text-secondary)]">
              <tr>
                <th className="px-6 py-3 font-medium">Hallazgo</th>
                <th className="px-6 py-3 font-medium">Severidad</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium">Fecha</th>
                <th className="px-6 py-3 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayFindings.map((finding) => (
                <tr key={finding.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[var(--text-primary)]">{finding.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 truncate max-w-xs" title={finding.description}>{finding.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge 
                      status={
                        finding.severity === 'Crítica' ? 'danger' :
                        finding.severity === 'Alta' ? 'warning' :
                        finding.severity === 'Media' ? 'info' :
                        'success'
                      }
                    >
                      {finding.severity}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge 
                      status={finding.status === 'Cerrada' ? 'success' : 'warning'}
                      dot
                    >
                      {finding.status}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">
                    {format(new Date(finding.identifiedDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <a href="/performance" className="inline-flex items-center text-[var(--brand-accent)] hover:text-[var(--brand-navy)] text-xs font-bold transition-colors">
                      Ver en CAPA <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-50 border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-[var(--text-muted)]" />
            </div>
            <p className="text-[var(--text-primary)] font-medium">No se encontraron hallazgos de auditoría</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Los hallazgos negativos generados durante la evaluación aparecerán aquí y se enviarán automáticamente a CAPA.</p>
          </div>
        )}
      </DataTableShell>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title="Registrar Nuevo Hallazgo"
        description="El hallazgo se enviará automáticamente al módulo CAPA para su tratamiento."
      >
        <NonConformityForm 
          defaultSource="Auditoría" 
          onSuccess={() => setIsSlideOverOpen(false)}
          onCancel={() => setIsSlideOverOpen(false)}
        />
      </SlideOver>
    </div>
  );
}
