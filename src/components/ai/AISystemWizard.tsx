import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';

export function AISystemWizard({ onClose, initialData }: { onClose: () => void, initialData?: any, key?: any }) {
  const { addAISystem, updateAISystem } = useStore();
  const { currentOrgId } = useAuth();
  
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<any>(initialData || {
    name: '',
    code: '',
    type: 'AI_SYSTEM',
    description: '',
    process: '',
    ownerId: '',
    purpose: '',
    intendedUse: '',
    users: '',
    providerName: '',
    modelName: '',
    modelVersion: '',
    providerId: '', // API reference
    deploymentEnvironment: 'Cloud',
    internalExternal: 'internal', // Could be inferred
    personalData: false,
    sensitiveData: false,
    confidentialData: false,
    affectedGroups: '', // used for Datasets related or data types depending on naming
    autonomyLevel: 'ADVISORY',
    humanOversightLevel: '',
    humanOverrideAvailable: true,
    decisionImpact: '',
    impactLevel: 'medium', // Personas afectadas / consecuences
    riskLevel: 'medium',
    riskRating: '', // Observaciones
    classification: 'pending_classification',
    businessOwnerId: '', // Responsable de aprobación
    nextReviewDate: '',
  });

  const handleSave = async (status: 'draft' | 'pending_review') => {
    if (!currentOrgId) return;
    
    if (status === 'pending_review') {
      if (!formData.name) {
        setError('El Nombre del Sistema IA es obligatorio.');
        return;
      }
      if (!formData.process) {
        setError('El Proceso Principal es obligatorio.');
        return;
      }
    } else {
       if (!formData.name) {
          setError('El Nombre del Sistema IA es obligatorio incluso para el borrador.');
          return;
       }
    }

    setSaving(true);
    setError('');
    
    try {
      if (initialData && initialData.id) {
        await updateAISystem(initialData.id, {
          ...formData,
          approvalStatus: status
        });
      } else {
        await addAISystem({
          organizationId: currentOrgId,
          ...formData,
          lifecycleStage: 'EVALUATION',
          approvalStatus: status,
        });
      }
      onClose();
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const StepHeader = () => (
    <div className="flex border-b border-slate-200 mb-6 pb-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
        <div key={s} className="flex-1 flex flex-col items-center relative">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${step >= s ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            {s}
          </div>
          {s < 8 && <div className={`absolute top-3 left-1/2 w-full h-0.5 ${step > s ? 'bg-teal-600' : 'bg-slate-100'}`}></div>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl flex flex-col h-full">
      <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-4 text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-slate-800">Registrar Sistema IA</h2>
        </div>
        <button 
          onClick={() => handleSave('draft')}
          disabled={saving || !formData.name}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'GUARDAR BORRADOR'}
        </button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <StepHeader />
        
        {error && (
          <div className="max-w-3xl mx-auto mb-4 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-4 pb-8">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">1. Identificación</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nombre del Sistema IA *</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Código</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder="Ej. AI-001" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tipo</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="AI_ASSISTANT">Asistente IA (Copilot)</option>
                    <option value="AI_AGENT">Agente Autónomo</option>
                    <option value="AI_MODEL">Modelo ML/DL</option>
                    <option value="AI_APPLICATION">Aplicación Empaquetada con IA</option>
                    <option value="MLOPS_PIPELINE">Pipeline MLOps</option>
                    <option value="AI_SYSTEM">Sistema IA</option>
                    <option value="OTHER_AI_COMPONENT">Otro</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Descripción</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-20" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">2. Proceso y Finalidad</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Proceso Principal *</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.process} onChange={e => setFormData({...formData, process: e.target.value})} placeholder="Ej. Servicio al Cliente" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Responsable</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.ownerId} onChange={e => setFormData({...formData, ownerId: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Finalidad</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Uso Previsto</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.intendedUse} onChange={e => setFormData({...formData, intendedUse: e.target.value})}></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Usuarios</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.users} onChange={e => setFormData({...formData, users: e.target.value})} placeholder="Ej. Analistas de RRHH, Clientes externos" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">3. Proveedor y Tecnología</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Proveedor</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.providerName} onChange={e => setFormData({...formData, providerName: e.target.value})} placeholder="Ej. OpenAI, Microsoft, Interno" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Modelo</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.modelName} onChange={e => setFormData({...formData, modelName: e.target.value})} placeholder="Ej. GPT-4, Llama 3" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Versión</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.modelVersion} onChange={e => setFormData({...formData, modelVersion: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">API</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.providerId} onChange={e => setFormData({...formData, providerId: e.target.value})} placeholder="Endpoint o Nombre de API" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Infraestructura (Cloud / Local / Híbrido)</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.deploymentEnvironment} onChange={e => setFormData({...formData, deploymentEnvironment: e.target.value})}>
                    <option value="Cloud">Cloud</option>
                    <option value="On-Premise">Local (On-Premise)</option>
                    <option value="Hybrid">Híbrido</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">4. Datos</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tipos de datos</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.affectedGroups} onChange={e => setFormData({...formData, affectedGroups: e.target.value})} placeholder="Ej. Texto, Imágenes, Audio, Logs financieros" />
                </div>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center text-sm text-slate-700">
                    <input type="checkbox" className="mr-2" checked={formData.personalData} onChange={e => setFormData({...formData, personalData: e.target.checked})} />
                    Datos personales
                  </label>
                  <label className="flex items-center text-sm text-slate-700">
                    <input type="checkbox" className="mr-2" checked={formData.sensitiveData} onChange={e => setFormData({...formData, sensitiveData: e.target.checked})} />
                    Datos sensibles
                  </label>
                  <label className="flex items-center text-sm text-slate-700">
                    <input type="checkbox" className="mr-2" checked={formData.confidentialData} onChange={e => setFormData({...formData, confidentialData: e.target.checked})} />
                    Datos confidenciales
                  </label>
                </div>
                <div className="mt-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Datasets relacionados</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.prohibitedUses} onChange={e => setFormData({...formData, prohibitedUses: e.target.value})} placeholder="Ej. Base de datos de clientes CRM, Dataset de entrenamiento público..."></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">5. Autonomía</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nivel de autonomía</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.autonomyLevel} onChange={e => setFormData({...formData, autonomyLevel: e.target.value})}>
                    <option value="ADVISORY">Asesoramiento / Recomendación</option>
                    <option value="ASSISTED">Asistido</option>
                    <option value="SEMI_AUTONOMOUS">Semi-autónomo</option>
                    <option value="AUTONOMOUS">Totalmente Autónomo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Supervisión humana</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.humanOversightLevel} onChange={e => setFormData({...formData, humanOversightLevel: e.target.value})} placeholder="Ej. Un operador revisa los correos antes de enviarlos."></textarea>
                </div>
                <div>
                  <label className="flex items-center text-sm text-slate-700">
                    <input type="checkbox" className="mr-2" checked={formData.humanOverrideAvailable} onChange={e => setFormData({...formData, humanOverrideAvailable: e.target.checked})} />
                    Capacidad de anulación (Kill Switch / Override manual)
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">6. Impacto</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Personas afectadas</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.countryOfOperation} onChange={e => setFormData({...formData, countryOfOperation: e.target.value})} placeholder="Ej. Empleados, Clientes finales" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Decisiones afectadas</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.decisionImpact} onChange={e => setFormData({...formData, decisionImpact: e.target.value})} placeholder="Ej. Aprobación de créditos, Filtro de hojas de vida..."></textarea>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Consecuencias potenciales</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.criticality} onChange={e => setFormData({...formData, criticality: e.target.value})} placeholder="Ej. Sesgos en contratación, Pérdida financiera..."></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">7. Riesgo</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nivel preliminar</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.riskLevel} onChange={e => setFormData({...formData, riskLevel: e.target.value})}>
                    <option value="low">Bajo</option>
                    <option value="medium">Medio</option>
                    <option value="high">Alto</option>
                    <option value="critical">Crítico</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Observaciones</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-20" value={formData.riskRating} onChange={e => setFormData({...formData, riskRating: e.target.value})}></textarea>
                </div>
                <div className="col-span-2">
                  <label className="flex items-center text-sm text-slate-700">
                    <input type="checkbox" className="mr-2" checked={formData._requiresFormalAssessment} onChange={e => setFormData({...formData, _requiresFormalAssessment: e.target.checked})} />
                    Requiere evaluación formal
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">8. Revisión y Aprobación</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Clasificación</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.classification} onChange={e => setFormData({...formData, classification: e.target.value})}>
                    <option value="pending_classification">Pendiente de clasificación</option>
                    <option value="allowed">Permitido</option>
                    <option value="restricted">Restringido</option>
                    <option value="prohibited">Prohibido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Responsable de aprobación</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.businessOwnerId} onChange={e => setFormData({...formData, businessOwnerId: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Próxima fecha de revisión</label>
                  <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.nextReviewDate} onChange={e => setFormData({...formData, nextReviewDate: e.target.value})} />
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-4">
                <p className="text-sm text-slate-600 mb-2">Al enviar a evaluación, el estado del sistema cambiará a <strong>PENDING REVIEW</strong>.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
        <button 
          onClick={() => {
             setError('');
             setStep(prev => Math.max(1, prev - 1));
          }}
          disabled={step === 1}
          className="px-6 py-2 bg-white border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 disabled:opacity-50"
        >
          ANTERIOR
        </button>
        {step < 8 ? (
          <button 
            onClick={() => {
              if (step === 1 && !formData.name) {
                 setError('El Nombre del Sistema IA es obligatorio.');
                 return;
              }
              if (step === 2 && !formData.process) {
                 setError('El Proceso Principal es obligatorio.');
                 return;
              }
              setError('');
              setStep(prev => prev + 1);
            }}
            className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center"
          >
            CONTINUAR <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button 
            onClick={() => handleSave('pending_review')}
            disabled={saving || !formData.name || !formData.process}
            className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'ENVIAR A EVALUACIÓN'}
          </button>
        )}
      </div>
    </div>
  );
}
