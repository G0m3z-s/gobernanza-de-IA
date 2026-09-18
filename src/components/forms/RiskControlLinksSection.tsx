import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import { ShieldCheck, Plus, X, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { RiskControlLink, ControlAssessment } from '../../types';
import { getISO42001AdaptedControls, getControlApplicability, getControlImplementationStatus, getControlTestResult } from '../../data/normativeCatalogAdapter';
import { StatusBadge } from '../ui/StatusBadge';

export function RiskControlLinksSection({ riskId }: { riskId: string }) {
  const { currentOrgId, user } = useAuth();
  const { data, addRiskControlLink, removeRiskControlLink } = useStore();
  const [showSelector, setShowSelector] = useState(false);

  if (!currentOrgId || !user) return null;

  const allLinks = (data?.riskControlLinks || []) as RiskControlLink[];
  const myLinks = allLinks.filter(l => l.riskId === riskId && l.relationType === 'treats');
  const myLinkedControlIds = myLinks.map(l => l.controlId);
  const assessments = data?.controlAssessments || [];

  const allControls = getISO42001AdaptedControls();
  const availableControls = allControls.filter(c => !myLinkedControlIds.includes(c.id));

  const handleLink = async (controlId: string, applicability: string) => {
    if (applicability === 'not_applicable') return; // Bloqueo extra por seguridad
    
    // Front-end Referential Integrity check against Risk
    const risk = data?.risks?.find(r => r.id === riskId);
    if (!risk) return;
    
    if (risk.organizationId && risk.organizationId !== currentOrgId) {
      console.error("Integridad Referencial Fallida: El riesgo no pertenece a la organización actual.");
      return;
    }

    const link: RiskControlLink = {
      id: `${currentOrgId}_${riskId}_${controlId}`,
      organizationId: currentOrgId,
      riskId,
      controlId,
      relationType: 'treats',
      createdAt: new Date().toISOString(),
      createdBy: user.uid
    };
    
    try {
      await addRiskControlLink(link);
      setShowSelector(false);
    } catch (e) {
      console.error("Error al crear RiskControlLink:", e);
    }
  };

  const handleUnlink = async (linkId: string) => {
    await removeRiskControlLink(linkId);
  };

  return (
    <div className="border border-[var(--border)] rounded p-4 bg-white mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider flex items-center">
          <LinkIcon className="w-3.5 h-3.5 mr-2 text-[var(--text-secondary)]" /> Controles de Tratamiento (ISO/IEC 42001)
        </h4>
        <button
          type="button"
          onClick={() => setShowSelector(!showSelector)}
          className="text-xs font-medium text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors flex items-center"
        >
          <Plus className="w-3 h-3 mr-1" /> Vincular control
        </button>
      </div>

      {showSelector && (
        <div className="mb-4 p-3 bg-slate-50/50 border border-[var(--border)] rounded">
          <p className="text-[10px] text-[var(--text-secondary)] font-semibold mb-2 uppercase tracking-wider">Seleccionar control</p>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {availableControls.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)]">No hay controles disponibles para vincular.</p>
            ) : (
              availableControls.map(ctrl => {
                const assessment = assessments.find(a => a.control === ctrl.id && a.standard === 'ISO/IEC 42001');
                const applicability = getControlApplicability(assessment);
                const isNotApplicable = applicability === 'not_applicable';
                const isNotEvaluated = applicability === 'not_evaluated';

                return (
                  <div key={ctrl.id} className={`flex items-center justify-between p-2 bg-white border rounded text-xs transition-colors ${isNotApplicable ? 'border-rose-100 bg-rose-50/50 opacity-60' : 'border-[var(--border)] hover:border-[var(--brand-accent)]'}`}>
                    <div className="flex flex-col flex-1 mr-4">
                      <span className="font-medium text-[var(--text-primary)]">{ctrl.code} - {ctrl.title}</span>
                      <div className="flex items-center mt-1 space-x-2">
                         {isNotApplicable && (
                           <span className="text-[10px] uppercase font-bold text-rose-500 flex items-center">
                             <AlertCircle className="w-3 h-3 mr-1"/> No Aplicable en SoA
                           </span>
                         )}
                         {isNotEvaluated && (
                           <span className="text-[10px] uppercase font-bold text-amber-500 flex items-center">
                             <AlertCircle className="w-3 h-3 mr-1"/> Pendiente de Evaluación
                           </span>
                         )}
                         {!isNotApplicable && !isNotEvaluated && (
                            <span className="text-[10px] uppercase font-bold text-emerald-500">
                              Aplicable
                            </span>
                         )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLink(ctrl.id, applicability)}
                      disabled={isNotApplicable}
                      className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded transition-colors whitespace-nowrap ${isNotApplicable ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                    >
                      {isNotApplicable ? 'Bloqueado' : 'Vincular'}
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {myLinks.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)] italic py-2">Sin controles de tratamiento vinculados.</p>
      ) : (
        <div className="space-y-2">
          {myLinks.map(link => {
            const ctrl = allControls.find(c => c.id === link.controlId);
            const assessment = ctrl ? assessments.find(a => a.control === ctrl.id && a.standard === 'ISO/IEC 42001') : undefined;
            const implementation = getControlImplementationStatus(assessment);
            const testResult = getControlTestResult(assessment);

            return (
              <div key={link.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white border border-[var(--border)] rounded group hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start">
                  <ShieldCheck className="w-4 h-4 text-[var(--brand-accent)] mt-0.5 mr-2 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)] leading-tight">
                      {ctrl ? `${ctrl.code} - ${ctrl.title}` : 'Control desconocido'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <StatusBadge status="neutral" className="text-[10px]">
                        Impl: {implementation}
                      </StatusBadge>
                      <StatusBadge status="neutral" className="text-[10px]">
                        Ef: {testResult}
                      </StatusBadge>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleUnlink(link.id)}
                  className="mt-2 sm:mt-0 self-end sm:self-auto text-[var(--text-muted)] hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  title="Desvincular"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
