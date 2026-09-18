import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import { ControlEffectivenessTest } from '../../types';
import { FileCheck, Plus, X, Activity, Edit2, AlertCircle, AlertTriangle, Eye } from 'lucide-react';
import { SlideOver } from '../ui/SlideOver';
import { NonConformityForm } from './NonConformityForm';
import { getControlApplicability, getControlImplementationStatus } from '../../data/normativeCatalogAdapter';
import { StatusBadge } from '../ui/StatusBadge';

export function ControlEffectivenessSection({ controlId }: { controlId: string }) {
  const { currentOrgId, user } = useAuth();
  const { data, addControlEffectivenessTest, updateControlEffectivenessTest, deleteControlEffectivenessTest } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState<ControlEffectivenessTest | null>(null);
  const [findingTest, setFindingTest] = useState<ControlEffectivenessTest | null>(null);

  const [formData, setFormData] = useState<Partial<ControlEffectivenessTest>>({
    title: '',
    objective: '',
    testMethod: 'DOCUMENT_REVIEW',
    procedure: '',
    sampleDescription: '',
    periodStart: '',
    periodEnd: '',
    performedAt: new Date().toISOString().split('T')[0],
    status: 'DRAFT',
    result: 'NOT_EVALUATED',
    observations: ''
  });

  if (!currentOrgId || !user) return null;

  const assessments = data?.controlAssessments || [];
  const assessment = assessments.find(a => a.control === controlId && a.standard === 'ISO/IEC 42001');
  const applicability = getControlApplicability(assessment);
  const implementation = getControlImplementationStatus(assessment);

  const isNotApplicable = applicability === 'not_applicable';
  const isNotEvaluated = applicability === 'not_evaluated';
  const isNotFullyImplemented = !['implemented', 'evidenced', 'verified'].includes(implementation);

  const allTests = (data?.controlEffectivenessTests || []) as ControlEffectivenessTest[];
  const myTests = allTests.filter(t => t.controlId === controlId)
    .sort((a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime());

  const handleOpenForm = (test?: ControlEffectivenessTest) => {
    if (test) {
      setEditingTest(test);
      setFormData({
        title: test.title,
        objective: test.objective || '',
        testMethod: test.testMethod,
        procedure: test.procedure || '',
        sampleDescription: test.sampleDescription || '',
        periodStart: test.periodStart || '',
        periodEnd: test.periodEnd || '',
        performedAt: test.performedAt.split('T')[0],
        status: test.status,
        result: test.result,
        observations: test.observations || ''
      });
    } else {
      setEditingTest(null);
      setFormData({
        title: '',
        objective: '',
        testMethod: 'DOCUMENT_REVIEW',
        procedure: '',
        sampleDescription: '',
        periodStart: '',
        periodEnd: '',
        performedAt: new Date().toISOString().split('T')[0],
        status: 'DRAFT',
        result: 'NOT_EVALUATED',
        observations: ''
      });
    }
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNotApplicable) return;

    try {
      if (editingTest) {
        await updateControlEffectivenessTest(editingTest.id, {
          ...formData,
          // performedAt expects ISO string in model, we have YYYY-MM-DD from input
          performedAt: new Date(formData.performedAt as string).toISOString()
        });
      } else {
        const newTest: ControlEffectivenessTest = {
          id: `${currentOrgId}_${controlId}_${Date.now()}`,
          organizationId: currentOrgId,
          controlId,
          title: formData.title as string,
          objective: formData.objective,
          testMethod: formData.testMethod as any,
          procedure: formData.procedure,
          sampleDescription: formData.sampleDescription,
          periodStart: formData.periodStart || undefined,
          periodEnd: formData.periodEnd || undefined,
          performedAt: new Date(formData.performedAt as string).toISOString(),
          performedBy: user.uid,
          status: formData.status as any,
          result: formData.result as any,
          observations: formData.observations,
          createdAt: new Date().toISOString(),
          createdBy: user.uid
        };
        await addControlEffectivenessTest(newTest);
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error saving test:", error);
    }
  };

  const handleDelete = async (test: ControlEffectivenessTest) => {
    if (test.status !== 'DRAFT') {
      alert("Solo se pueden eliminar pruebas en estado DRAFT.");
      return;
    }
    if (window.confirm('¿Está seguro de eliminar esta prueba en borrador?')) {
      await deleteControlEffectivenessTest(test.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end mb-2">
        <button
          type="button"
          onClick={() => handleOpenForm()}
          disabled={isNotApplicable}
          className={`text-xs font-medium flex items-center px-2 py-1 rounded ${isNotApplicable ? 'text-[var(--text-muted)] cursor-not-allowed' : 'text-[var(--brand-accent)] hover:bg-slate-50'}`}
        >
          <Plus className="w-3 h-3 mr-1" /> Nueva prueba
        </button>
      </div>

      {isNotApplicable && (
        <div className="p-3 bg-rose-50/50 border border-rose-200/50 rounded flex items-start">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 mr-2 shrink-0" />
          <p className="text-[10px] text-rose-700">El control está declarado No Aplicable. No se pueden crear pruebas de eficacia.</p>
        </div>
      )}
      
      {!isNotApplicable && isNotFullyImplemented && (
        <div className="p-3 bg-amber-50/50 border border-amber-200/50 rounded flex items-start">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 mr-2 shrink-0" />
          <p className="text-[10px] text-amber-700">El control aún no figura como completamente implementado ({implementation}). Verifique si tiene sentido realizar una prueba ahora.</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSave} className="p-4 bg-slate-50/50 border border-[var(--border)] rounded">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-sm font-semibold text-[var(--text-primary)]">{editingTest ? 'Editar Prueba' : 'Nueva Prueba'}</h5>
            <button type="button" onClick={() => setShowForm(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Título de la prueba *</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" placeholder="Ej. Revisión anual de logs de acceso" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Objetivo (Opcional)</label>
              <textarea value={formData.objective} onChange={e => setFormData({...formData, objective: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" rows={2} />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Método de prueba *</label>
              <select required value={formData.testMethod} onChange={e => setFormData({...formData, testMethod: e.target.value as any})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]">
                <option value="DOCUMENT_REVIEW">Revisión Documental</option>
                <option value="INTERVIEW">Entrevista</option>
                <option value="OBSERVATION">Observación</option>
                <option value="SAMPLE_REVIEW">Revisión de Muestra</option>
                <option value="REPERFORMANCE">Re-ejecución</option>
                <option value="TECHNICAL_TEST">Prueba Técnica</option>
                <option value="METRIC_REVIEW">Revisión de Métricas</option>
                <option value="OTHER">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Fecha de ejecución *</label>
              <input required type="date" value={formData.performedAt as string} onChange={e => setFormData({...formData, performedAt: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Procedimiento ejecutado (Opcional)</label>
              <textarea value={formData.procedure} onChange={e => setFormData({...formData, procedure: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" rows={2} />
            </div>

            {formData.testMethod === 'SAMPLE_REVIEW' && (
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Descripción de la muestra *</label>
                <input required type="text" value={formData.sampleDescription} onChange={e => setFormData({...formData, sampleDescription: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" placeholder="Ej. 10 altas de usuarios en el mes de enero" />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Período evaluado: Inicio (Opcional)</label>
              <input type="date" value={formData.periodStart || ''} onChange={e => setFormData({...formData, periodStart: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Período evaluado: Fin (Opcional)</label>
              <input type="date" value={formData.periodEnd || ''} onChange={e => setFormData({...formData, periodEnd: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Resultado de la prueba *</label>
              <select required value={formData.result} onChange={e => setFormData({...formData, result: e.target.value as any})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]">
                <option value="NOT_EVALUATED">No Evaluado</option>
                <option value="EFFECTIVE">Eficaz</option>
                <option value="PARTIALLY_EFFECTIVE">Parcialmente Eficaz</option>
                <option value="INEFFECTIVE">Ineficaz</option>
                <option value="INCONCLUSIVE">No Concluyente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Estado del registro *</label>
              <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]">
                <option value="DRAFT">Borrador</option>
                <option value="COMPLETED">Completado</option>
                <option value="REVIEWED">Revisado</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Observaciones / Hallazgos (Opcional)</label>
              <textarea value={formData.observations} onChange={e => setFormData({...formData, observations: e.target.value})} className="w-full text-sm px-3 py-1.5 border border-[var(--border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]" rows={2} />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[var(--border)]">
            <button type="submit" className="px-4 py-1.5 bg-[var(--brand-navy)] text-white text-xs font-medium rounded hover:bg-[var(--brand-navy)]/90">
              Guardar Prueba
            </button>
          </div>
        </form>
      )}

      {myTests.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)] italic">No hay pruebas de eficacia registradas para este control.</p>
      ) : (
        <div className="space-y-3">
          {myTests.map(test => {
            const isIneffectiveOrPartial = (test.result === 'INEFFECTIVE' || test.result === 'PARTIALLY_EFFECTIVE') && test.status !== 'DRAFT';
            const existingFinding = (data?.nonConformities || []).find((nc: any) => nc.sourceId === test.id && nc.sourceType === 'control_effectiveness_test' && nc.organizationId === currentOrgId);
            return (

            <div key={test.id} className="p-3 bg-white border border-[var(--border)] rounded flex flex-col sm:flex-row justify-between sm:items-start group">
              <div className="flex-1">
                <div className="flex items-center mb-1 gap-2">
                  <h5 className="text-sm font-semibold text-[var(--text-primary)]">{test.title}</h5>
                  <StatusBadge status={test.status === 'COMPLETED' ? 'info' : test.status === 'DRAFT' ? 'neutral' : 'success'} dot>
                    {test.status}
                  </StatusBadge>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-[10px] uppercase bg-slate-50 border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-secondary)] font-medium">{test.testMethod}</span>
                  <span className="text-[10px] uppercase bg-slate-50 border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-secondary)] font-medium">{test.performedAt.split('T')[0]}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[10px] uppercase font-semibold text-[var(--text-secondary)] mr-2">Resultado:</span>
                  <StatusBadge status={test.result === 'EFFECTIVE' ? 'success' : test.result === 'PARTIALLY_EFFECTIVE' ? 'warning' : test.result === 'INEFFECTIVE' ? 'danger' : 'neutral'}>
                    {test.result.replace('_', ' ')}
                  </StatusBadge>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 mt-2 sm:mt-0">
                <div className="flex items-center">
                {isIneffectiveOrPartial && !existingFinding && (
                  <button type="button" onClick={() => setFindingTest(test)} className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-medium rounded border border-amber-200 hover:bg-amber-100 flex items-center transition-colors">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Crear Hallazgo
                  </button>
                )}
                {existingFinding && (
                  <div className="px-2 py-1 bg-slate-50 text-[var(--text-secondary)] text-[10px] font-medium rounded border border-[var(--border)] flex items-center" title={existingFinding.title}>
                    <Eye className="w-3 h-3 mr-1" /> Ver Hallazgo
                  </div>
                )}
                </div>
                <div className="flex items-center space-x-1">
                <button type="button" onClick={() => handleOpenForm(test)} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--brand-accent)] transition-colors" title="Editar">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                {test.status === 'DRAFT' && (
                  <button type="button" onClick={() => handleDelete(test)} className="p-1.5 text-[var(--text-muted)] hover:text-red-600 transition-colors" title="Eliminar">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              </div>
            </div>
          )
          })}
        </div>
      )}

      <SlideOver
        isOpen={!!findingTest}
        onClose={() => setFindingTest(null)}
        title="Crear Hallazgo"
        description="El resultado de la prueba requiere evaluar un posible hallazgo."
      >
        {findingTest && (
          <div className="p-6">
            <div className="mb-4 p-3 bg-amber-50/50 border border-amber-200/50 rounded">
              <p className="text-[10px] text-amber-800 font-semibold uppercase tracking-wider mb-2">Contexto de la prueba:</p>
              <ul className="text-xs text-amber-900/80 list-disc pl-4 space-y-1">
                <li><strong className="font-semibold text-amber-900">Control:</strong> {findingTest.controlId}</li>
                <li><strong className="font-semibold text-amber-900">Prueba:</strong> {findingTest.title}</li>
                <li><strong className="font-semibold text-amber-900">Resultado:</strong> {findingTest.result}</li>
                <li><strong className="font-semibold text-amber-900">Método:</strong> {findingTest.testMethod}</li>
              </ul>
            </div>
            <NonConformityForm 
              onSuccess={() => setFindingTest(null)} 
              onCancel={() => setFindingTest(null)} 
              sourceType="control_effectiveness_test"
              sourceId={findingTest.id}
              controlId={findingTest.controlId}
              defaultTitle={`Hallazgo: ${findingTest.title}`}
              defaultDescription={`Hallazgo derivado de prueba de eficacia.\nResultado: ${findingTest.result}\nMétodo: ${findingTest.testMethod}\nFecha de prueba: ${findingTest.performedAt.split('T')[0]}\n\nObservaciones de la prueba:\n${findingTest.observations || 'Sin observaciones'}`}
            />
          </div>
        )}
      </SlideOver>
    </div>
  );
}

