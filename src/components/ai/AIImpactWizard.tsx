import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export function AIImpactWizard({ 
  onClose, 
  initialData,
  systemId 
}: { 
  onClose: () => void, 
  initialData?: any,
  systemId?: string,
  key?: any 
}) {
  const { addAIImpactAssessment, updateAIImpactAssessment, data } = useStore();
  const { currentOrgId } = useAuth();
  
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const aiSystems = data?.aiSystems || [];
  
  const [formData, setFormData] = useState<any>(initialData || {
    aiSystemId: systemId || '',
    process: '',
    purpose: '',
    affectedIndividuals: '',
    
    // DECISIONES
    supportsDecisions: false,
    automatedDecisions: false,
    affectsEmployment: false,
    affectsServices: false,
    economicConsequences: false,
    
    // DIMENSIONES
    privacyImpact: 'low',
    fairnessImpact: 'low',
    discriminationImpact: 'low',
    autonomyImpact: 'low',
    safetyImpact: 'low',
    accessibilityImpact: 'low',
    rightsImpact: 'low',
    socialImpact: 'low',
    
    // PROBABILIDAD Y SEVERIDAD (1-5)
    probability: 1,
    severity: 1,
    inherentImpact: 1, // Calculated
    
    // SALVAGUARDAS
    safeguards: [],
    otherSafeguards: '',
    
    // IMPACTO RESIDUAL
    residualProbability: 1,
    residualSeverity: 1,
    residualImpact: 1, // Calculated
    
    // REVISIÓN
    assessorId: '',
    ownerId: '',
    assessmentDate: new Date().toISOString().split('T')[0],
    nextReviewDate: '',
    status: 'draft',
  });

  // Calculate Inherent Impact
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      inherentImpact: prev.probability * prev.severity
    }));
  }, [formData.probability, formData.severity]);

  // Calculate Residual Impact
  useEffect(() => {
    // Determinist rule: Residual impact is affected by safeguards count
    // This is a simple mock deterministic rule
    let mitigation = 0;
    if (formData.safeguards.length > 0) mitigation += 1;
    if (formData.safeguards.length > 3) mitigation += 1;
    
    let resProb = Math.max(1, formData.probability - mitigation);
    let resSev = formData.severity; // Safeguards usually reduce probability, sometimes severity. We'll reduce probability.
    
    setFormData((prev: any) => ({
      ...prev,
      residualProbability: resProb,
      residualSeverity: resSev,
      residualImpact: resProb * resSev
    }));
  }, [formData.probability, formData.severity, formData.safeguards]);

  const handleSave = async (status: 'draft' | 'pending_review') => {
    if (!currentOrgId) return;
    
    if (status === 'pending_review') {
      if (!formData.aiSystemId) {
        setError('Debe seleccionar un sistema IA.');
        return;
      }
      if (!formData.process || !formData.purpose) {
        setError('El proceso y la finalidad son obligatorios.');
        return;
      }
    } else {
       if (!formData.aiSystemId) {
          setError('Debe seleccionar un sistema IA incluso para guardar borrador.');
          return;
       }
    }

    setSaving(true);
    setError('');
    
    try {
      const assessmentData = {
        organizationId: currentOrgId,
        ...formData,
        status: status,
      };

      if (initialData && initialData.id) {
        await updateAIImpactAssessment(initialData.id, assessmentData);
      } else {
        await addAIImpactAssessment(assessmentData);
      }
      
      // Log History
      try {
        await addDoc(collection(db, 'activityLogs'), {
           organizationId: currentOrgId,
           userId: 'system',
           action: 'UPDATE_AI_IMPACT',
           details: 'Evaluación de impacto IA guardada',
           timestamp: new Date().toISOString(),
           targetId: initialData?.id || 'new'
        });
      } catch (e) {
        console.error('Error recording log', e);
      }
      
      onClose();
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const handleSafeguardToggle = (safeguard: string) => {
    setFormData((prev: any) => {
      const current = prev.safeguards || [];
      if (current.includes(safeguard)) {
        return { ...prev, safeguards: current.filter((s: string) => s !== safeguard) };
      } else {
        return { ...prev, safeguards: [...current, safeguard] };
      }
    });
  };

  const StepHeader = () => (
    <div className="flex border-b border-slate-200 mb-6 pb-4">
      {[1, 2, 3, 4, 5, 6, 7].map((s) => (
        <div key={s} className="flex-1 flex flex-col items-center relative">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${step >= s ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            {s}
          </div>
          {s < 7 && <div className={`absolute top-3 left-1/2 w-full h-0.5 ${step > s ? 'bg-teal-600' : 'bg-slate-100'}`}></div>}
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
          <h2 className="text-lg font-bold text-slate-800">Evaluación de Impacto IA</h2>
        </div>
        <button 
          onClick={() => handleSave('draft')}
          disabled={saving || !formData.aiSystemId}
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
              <h3 className="text-lg font-semibold text-slate-800 mb-4">1. Contexto</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Sistema IA *</label>
                  <select 
                    className="w-full border rounded-lg p-2 text-sm" 
                    value={formData.aiSystemId} 
                    onChange={e => setFormData({...formData, aiSystemId: e.target.value})}
                    disabled={!!systemId}
                  >
                    <option value="">Seleccione un Sistema IA</option>
                    {aiSystems.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Proceso</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.process} onChange={e => setFormData({...formData, process: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Finalidad</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-20" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}></textarea>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Personas/grupos afectados</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.affectedIndividuals} onChange={e => setFormData({...formData, affectedIndividuals: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">2. Decisiones</h3>
              <div className="space-y-3">
                <label className="flex items-center text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" className="mr-3" checked={formData.supportsDecisions} onChange={e => setFormData({...formData, supportsDecisions: e.target.checked})} />
                  ¿Apoya decisiones sobre personas?
                </label>
                <label className="flex items-center text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" className="mr-3" checked={formData.automatedDecisions} onChange={e => setFormData({...formData, automatedDecisions: e.target.checked})} />
                  ¿Toma decisiones automáticamente?
                </label>
                <label className="flex items-center text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" className="mr-3" checked={formData.affectsEmployment} onChange={e => setFormData({...formData, affectsEmployment: e.target.checked})} />
                  ¿Puede afectar el empleo de los usuarios?
                </label>
                <label className="flex items-center text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" className="mr-3" checked={formData.affectsServices} onChange={e => setFormData({...formData, affectsServices: e.target.checked})} />
                  ¿Puede afectar acceso a servicios (educación, financieros, etc.)?
                </label>
                <label className="flex items-center text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" className="mr-3" checked={formData.economicConsequences} onChange={e => setFormData({...formData, economicConsequences: e.target.checked})} />
                  ¿Puede producir consecuencias económicas adversas?
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">3. Dimensiones de Impacto</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'privacyImpact', label: 'Privacidad' },
                  { id: 'fairnessImpact', label: 'Equidad' },
                  { id: 'discriminationImpact', label: 'Discriminación' },
                  { id: 'autonomyImpact', label: 'Autonomía' },
                  { id: 'safetyImpact', label: 'Seguridad' },
                  { id: 'accessibilityImpact', label: 'Accesibilidad' },
                  { id: 'rightsImpact', label: 'Derechos Fundamentales' },
                  { id: 'socialImpact', label: 'Impacto Social' }
                ].map(dim => (
                  <div key={dim.id}>
                    <label className="block text-xs font-medium text-slate-600 mb-1">{dim.label}</label>
                    <select className="w-full border rounded-lg p-2 text-sm" value={formData[dim.id]} onChange={e => setFormData({...formData, [dim.id]: e.target.value})}>
                      <option value="low">Bajo</option>
                      <option value="medium">Medio</option>
                      <option value="high">Alto</option>
                      <option value="critical">Crítico</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">4. Probabilidad y Severidad</h3>
              <p className="text-sm text-slate-500 mb-4">Evalúe el impacto inherente en una escala de 1 a 5.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-slate-700">Probabilidad</label>
                    <span className="text-sm font-bold">{formData.probability}</span>
                  </div>
                  <input type="range" min="1" max="5" step="1" className="w-full" value={formData.probability} onChange={e => setFormData({...formData, probability: parseInt(e.target.value)})} />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1 (Muy improbable)</span>
                    <span>5 (Casi seguro)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-slate-700">Severidad</label>
                    <span className="text-sm font-bold">{formData.severity}</span>
                  </div>
                  <input type="range" min="1" max="5" step="1" className="w-full" value={formData.severity} onChange={e => setFormData({...formData, severity: parseInt(e.target.value)})} />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1 (Insignificante)</span>
                    <span>5 (Catastrófico)</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">Impacto Inherente (P x S)</p>
                  <p className={`text-2xl font-black ${
                    formData.inherentImpact >= 15 ? 'text-rose-600' : 
                    formData.inherentImpact >= 10 ? 'text-orange-600' :
                    formData.inherentImpact >= 5 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {formData.inherentImpact}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">5. Salvaguardas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Supervisión humana',
                  'Revisión manual',
                  'Transparencia',
                  'Pruebas exhaustivas',
                  'Controles de datos',
                  'Canal de reclamación'
                ].map(safeguard => (
                  <label key={safeguard} className="flex items-center text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mr-3" 
                      checked={formData.safeguards.includes(safeguard)} 
                      onChange={() => handleSafeguardToggle(safeguard)} 
                    />
                    {safeguard}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">Otras salvaguardas (describir)</label>
                <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.otherSafeguards} onChange={e => setFormData({...formData, otherSafeguards: e.target.value})}></textarea>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">6. Impacto Residual</h3>
              <p className="text-sm text-slate-500 mb-4">Cálculo determinista del impacto residual según las salvaguardas implementadas.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Impacto Inherente</p>
                  <p className="text-xl font-bold text-slate-800">{formData.inherentImpact}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <p className="text-sm text-emerald-700 mb-1">Impacto Residual</p>
                  <p className="text-xl font-bold text-emerald-800">{formData.residualImpact}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Probabilidad Residual:</span>
                  <span className="font-bold">{formData.residualProbability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Severidad Residual:</span>
                  <span className="font-bold">{formData.residualSeverity}</span>
                </div>
                <p className="text-xs text-slate-400 mt-4 mt-2">
                  * La probabilidad residual se reduce de forma automática y determinista (máximo en -2 puntos) en función de la cantidad de salvaguardas (ej. supervisión humana, controles de datos) seleccionadas en el paso anterior.
                </p>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">7. Revisión</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Evaluador</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.assessorId} onChange={e => setFormData({...formData, assessorId: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Responsable</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.ownerId} onChange={e => setFormData({...formData, ownerId: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Fecha de Evaluación</label>
                  <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.assessmentDate} onChange={e => setFormData({...formData, assessmentDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Próxima Revisión</label>
                  <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.nextReviewDate} onChange={e => setFormData({...formData, nextReviewDate: e.target.value})} />
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-4">
                <p className="text-sm text-slate-600 mb-2">Al enviar a revisión, el estado de la evaluación cambiará a <strong>PENDING REVIEW</strong>.</p>
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
        {step < 7 ? (
          <button 
            onClick={() => {
              if (step === 1 && !formData.aiSystemId) {
                 setError('El Sistema IA es obligatorio.');
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
            disabled={saving || !formData.aiSystemId || !formData.process || !formData.purpose}
            className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'ENVIAR A REVISIÓN'}
          </button>
        )}
      </div>
    </div>
  );
}
