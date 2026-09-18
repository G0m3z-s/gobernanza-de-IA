import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { EvidenceLinksSection } from './EvidenceLinksSection';
import { ControlEffectivenessSection } from './ControlEffectivenessSection';
import { FormSection } from '../ui/FormSection';

export function ControlForm42001({ 
  control, 
  assessment, 
  onSuccess, 
  onCancel 
}: { 
  control: any, 
  assessment: any, 
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const { currentOrgId } = useAuth();
  const { addControlAssessment, updateControlAssessment, data } = useStore();
  
  const [formData, setFormData] = useState({
    applicability: assessment?.applicability || (assessment?.status === 'not_applicable' ? 'not_applicable' : 'not_evaluated'),
    justification: assessment?.justification || '',
    status: (assessment?.status && assessment?.status !== 'not_applicable') ? assessment.status : 'not_evaluated',
    testResult: assessment?.testResult || 'not_tested',
    ownerId: assessment?.ownerId || '',
    evidenceStatus: assessment?.evidenceStatus || '',
    notes: assessment?.notes || '',
    nextReviewDate: assessment?.nextReviewDate || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (formData.applicability === 'not_applicable' && !formData.justification.trim()) {
      setError('Debes proporcionar una justificación para excluir el control.');
      setLoading(false);
      return;
    }

    try {
      const updates: any = {
        organizationId: currentOrgId,
        standard: 'ISO/IEC 42001',
        control: control.id,
        applicability: formData.applicability,
        justification: formData.applicability === 'not_applicable' ? formData.justification : null,
        status: formData.status,
        testResult: formData.testResult,
        ownerId: formData.ownerId,
        notes: formData.notes,
        nextReviewDate: formData.nextReviewDate,
        updatedAt: new Date().toISOString()
      };
      
      if (formData.evidenceStatus) {
        updates.evidenceStatus = formData.evidenceStatus;
      }
      
      if (assessment?.id) {
        await updateControlAssessment(assessment.id, updates);
      } else {
        await addControlAssessment({
          ...updates,
          createdAt: new Date().toISOString()
        });
      }
      
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el control');
      setLoading(false);
    }
  };

  const treatsRisks = data?.riskControlLinks?.filter(l => l.controlId === control.id && l.relationType === 'treats') || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium">{error}</p>
        </div>
      )}

      <FormSection title="Información del Control">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-[var(--text-primary)]">{control.code}: {control.title}</span>
          <span className="text-xs text-[var(--text-secondary)]">{control.description}</span>
          {control.implementationGuidance && (
            <div className="mt-2 text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-2 italic">
              <span className="font-semibold not-italic">Guía:</span> {control.implementationGuidance}
            </div>
          )}
        </div>
      </FormSection>

      <FormSection title="Aplicabilidad e Implementación">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Aplicabilidad</label>
            <select
              className="w-full px-3 py-1.5 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
              value={formData.applicability}
              onChange={(e) => setFormData({...formData, applicability: e.target.value})}
            >
              <option value="not_evaluated">No Evaluado</option>
              <option value="applicable">Aplicable</option>
              <option value="not_applicable">No Aplica</option>
            </select>
          </div>
          
          {formData.applicability === 'applicable' && (
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Responsable</label>
              <select
                className="w-full px-3 py-1.5 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                value={formData.ownerId}
                onChange={(e) => setFormData({...formData, ownerId: e.target.value})}
              >
                <option value="">Seleccione un responsable...</option>
                {(data?.stakeholders || []).map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {formData.applicability === 'not_applicable' && (
          <div className="mt-4 p-3 bg-amber-50/50 border border-amber-200/60 rounded">
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
              Justificación de Exclusión <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              className="w-full px-3 py-1.5 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
              value={formData.justification}
              onChange={(e) => setFormData({...formData, justification: e.target.value})}
              placeholder="Explique por qué este control no aplica..."
            />
          </div>
        )}

        {formData.applicability === 'applicable' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Estado de Implementación</label>
              <select
                className="w-full px-3 py-1.5 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="not_evaluated">No Evaluado</option>
                <option value="gap">Brecha / No Implementado</option>
                <option value="planned">Planificado</option>
                <option value="documented">Documentado</option>
                <option value="implemented">Implementado</option>
                <option value="evidenced">Con Evidencia</option>
                <option value="verified">Verificado</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Eficacia (General)</label>
              <select
                className="w-full px-3 py-1.5 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                value={formData.testResult}
                onChange={(e) => setFormData({...formData, testResult: e.target.value})}
              >
                <option value="not_tested">Sin Evaluar</option>
                <option value="effective">Eficaz</option>
                <option value="partially_effective">Parcialmente Eficaz</option>
                <option value="ineffective">Ineficaz</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Próxima Revisión</label>
              <input
                type="date"
                className="w-full px-3 py-1.5 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                value={formData.nextReviewDate}
                onChange={(e) => setFormData({...formData, nextReviewDate: e.target.value})}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Observaciones / Notas</label>
              <textarea
                rows={2}
                className="w-full px-3 py-1.5 bg-white border border-[var(--border)] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Notas adicionales..."
              />
            </div>
          </div>
        )}
      </FormSection>

      <FormSection title="Evidencias">
        <EvidenceLinksSection targetType="control" targetId={control.id} hideTitle={true} />
      </FormSection>

      <FormSection title="Riesgos Vinculados">
        {treatsRisks.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)]">No vinculado a ningún riesgo registrado.</p>
        ) : (
          <div className="space-y-2">
            {treatsRisks.map(link => {
              const r = data?.risks?.find(risk => risk.id === link.riskId);
              return (
                <div key={link.id} className="flex flex-col p-2.5 bg-slate-50 border border-[var(--border)] rounded">
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {r ? r.name : 'Riesgo no disponible'}
                  </span>
                  {r && (
                    <span className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                      Nivel: {r.level}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </FormSection>

      <FormSection title="Pruebas de Eficacia">
        <ControlEffectivenessSection controlId={control.id} />
      </FormSection>

      <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-3">
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-4 py-1.5 text-[var(--text-secondary)] text-sm font-medium hover:bg-slate-100 rounded transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-1.5 bg-[var(--brand-navy)] text-white text-sm font-medium rounded hover:bg-[var(--brand-navy)]/90 transition-colors disabled:opacity-70 flex items-center"
        >
          {loading ? 'Guardando...' : 'Guardar Evaluación'}
        </button>
      </div>
    </form>
  );
}
