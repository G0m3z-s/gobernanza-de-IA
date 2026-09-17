import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import { AlertCircle, History } from 'lucide-react';

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
  const { currentOrgId, user } = useAuth();
  const { addControlAssessment, updateControlAssessment, data } = useStore();
  
  const [formData, setFormData] = useState({
    applicability: assessment?.applicability || 'not_evaluated',
    justification: assessment?.justification || '',
    status: assessment?.status || 'not_evaluated',
    testResult: assessment?.testResult || 'not_tested',
    ownerId: assessment?.ownerId || '',
    evidenceStatus: assessment?.evidenceStatus || 'pending_review',
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
      const updates = {
        organizationId: currentOrgId,
        standard: 'ISO/IEC 42001',
        control: control.id,
        applicability: formData.applicability,
        justification: formData.applicability === 'not_applicable' ? formData.justification : null,
        status: formData.applicability === 'applicable' ? formData.status : 'not_evaluated',
        testResult: formData.applicability === 'applicable' ? formData.testResult : 'not_tested',
        ownerId: formData.applicable === 'applicable' ? formData.ownerId : '',
        evidenceStatus: formData.evidenceStatus,
        notes: formData.notes,
        nextReviewDate: formData.nextReviewDate,
        updatedAt: new Date().toISOString()
      };

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
        <h3 className="text-sm font-bold text-slate-800 mb-1">{control.code}: {control.title}</h3>
        <p className="text-sm text-slate-600 mb-2">{control.description}</p>
        {control.implementationGuidance && (
          <div className="mt-2 text-xs text-slate-500 border-t border-slate-200 pt-2">
            <span className="font-semibold text-slate-700">Guía:</span> {control.implementationGuidance}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Aplicabilidad</label>
          <select
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={formData.applicability}
            onChange={(e) => setFormData({...formData, applicability: e.target.value})}
          >
            <option value="not_evaluated">No Evaluado</option>
            <option value="applicable">Aplicable</option>
            <option value="not_applicable">No Aplica</option>
          </select>
        </div>

        {formData.applicability === 'not_applicable' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Justificación de Exclusión <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={formData.justification}
              onChange={(e) => setFormData({...formData, justification: e.target.value})}
              placeholder="Explique por qué este control no aplica a la organización..."
            />
          </div>
        )}
        
        {formData.applicability === 'applicable' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Estado de Implementación</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Eficacia</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.testResult}
                  onChange={(e) => setFormData({...formData, testResult: e.target.value})}
                >
                  <option value="not_tested">Sin Evaluar</option>
                  <option value="effective">Eficaz</option>
                  <option value="partially_effective">Parcialmente Eficaz</option>
                  <option value="ineffective">Ineficaz</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Responsable</label>
              <select
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.ownerId}
                onChange={(e) => setFormData({...formData, ownerId: e.target.value})}
              >
                <option value="">Seleccione un responsable...</option>
                {(data?.stakeholders || []).map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.category})</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Próxima Revisión</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.nextReviewDate}
                  onChange={(e) => setFormData({...formData, nextReviewDate: e.target.value})}
                />
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Observaciones / Notas</label>
          <textarea
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Notas adicionales..."
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <div className="flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-70 flex items-center"
          >
            {loading ? 'Guardando...' : 'Guardar Evaluación'}
          </button>
        </div>
      </div>
    </form>
  );
}
