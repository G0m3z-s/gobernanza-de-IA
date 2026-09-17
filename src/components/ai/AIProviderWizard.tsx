import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export function AIProviderWizard({ 
  onClose, 
  initialData,
  systemId 
}: { 
  onClose: () => void, 
  initialData?: any,
  systemId?: string,
  key?: any 
}) {
  const { addAIProvider, updateAIProvider, data } = useStore();
  const { currentOrgId } = useAuth();
  
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const aiSystems = data?.aiSystems || [];
  
  const [formData, setFormData] = useState<any>(initialData || {
    name: '',
    type: 'Cloud',
    service: '',
    country: '',
    dataLocation: '',
    contractOwner: '',
    aiSystemIds: systemId ? [systemId] : [],
    riskLevel: 'low',
    evaluationStatus: 'pending',
    lastReview: '',
    nextReview: '',
    sla: '',
    subprocessors: '',
    notes: '',
    status: 'active'
  });

  const toggleSystem = (id: string) => {
    setFormData((prev: any) => {
      const current = prev.aiSystemIds || [];
      if (current.includes(id)) {
        return { ...prev, aiSystemIds: current.filter((sId: string) => sId !== id) };
      } else {
        return { ...prev, aiSystemIds: [...current, id] };
      }
    });
  };

  const handleSave = async () => {
    if (!currentOrgId) return;
    
    if (!formData.name) {
      setError('El nombre del proveedor es obligatorio.');
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      const providerData = {
        organizationId: currentOrgId,
        ...formData,
      };

      if (initialData && initialData.id) {
        await updateAIProvider(initialData.id, providerData);
      } else {
        await addAIProvider(providerData);
      }
      
      // Log History
      try {
        await addDoc(collection(db, 'activityLogs'), {
           organizationId: currentOrgId,
           userId: 'system',
           action: 'UPDATE_AI_PROVIDER',
           details: `Proveedor '${formData.name}' ${initialData ? 'actualizado' : 'registrado'}`, 
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

  const StepHeader = () => (
    <div className="flex border-b border-slate-200 mb-6 pb-4">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex-1 flex flex-col items-center relative">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${step >= s ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            {s}
          </div>
          {s < 4 && <div className={`absolute top-3 left-1/2 w-full h-0.5 ${step > s ? 'bg-teal-600' : 'bg-slate-100'}`}></div>}
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
          <h2 className="text-lg font-bold text-slate-800">{initialData ? 'Editar Proveedor IA' : 'Registrar Proveedor IA'}</h2>
        </div>
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
              <h3 className="text-lg font-semibold text-slate-800 mb-4">1. Información General</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nombre del Proveedor / Tercero *</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ej. OpenAI, Microsoft, AWS..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tipo de Proveedor</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="Cloud">Infraestructura Cloud</option>
                    <option value="ModelAPI">API de Modelos Fundacionales</option>
                    <option value="SaaS">SaaS con IA Integrada</option>
                    <option value="Consulting">Consultora / Integrador</option>
                    <option value="DataBroker">Proveedor de Datos</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Servicio que provee</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} placeholder="Ej. GPT-4 API, Azure OpenAI" />
                </div>
                
                <div className="col-span-2 mt-4">
                  <label className="block text-xs font-medium text-slate-600 mb-2">Vincular a Sistemas IA (Opcional)</label>
                  <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto">
                    {aiSystems.length === 0 ? (
                       <div className="p-4 text-center text-sm text-slate-500">No hay sistemas IA registrados.</div>
                    ) : (
                      aiSystems.map(sys => (
                        <div 
                          key={sys.id} 
                          className={`flex items-center justify-between p-3 border-b border-slate-100 last:border-b-0 cursor-pointer hover:bg-slate-50 ${(formData.aiSystemIds || []).includes(sys.id) ? 'bg-teal-50' : ''}`}
                          onClick={() => toggleSystem(sys.id)}
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-800">{sys.name}</p>
                            <p className="text-xs text-slate-500">{sys.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${(formData.aiSystemIds || []).includes(sys.id) ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'}`}>
                            {(formData.aiSystemIds || []).includes(sys.id) && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">2. Ubicación y Responsabilidad</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">País Sede</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="Ej. Estados Unidos, Europa" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Ubicación de Procesamiento de Datos</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.dataLocation} onChange={e => setFormData({...formData, dataLocation: e.target.value})} placeholder="Ej. US-East, EU-West-1" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Subprocesadores Clave</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.subprocessors} onChange={e => setFormData({...formData, subprocessors: e.target.value})} placeholder="¿El proveedor usa a otros proveedores para operar?"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Responsable Contractual Interno</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.contractOwner} onChange={e => setFormData({...formData, contractOwner: e.target.value})} placeholder="Nombre, email o departamento interno" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">3. Evaluación y Riesgos</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nivel de Riesgo del Proveedor</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.riskLevel} onChange={e => setFormData({...formData, riskLevel: e.target.value})}>
                    <option value="low">Bajo</option>
                    <option value="medium">Medio</option>
                    <option value="high">Alto</option>
                    <option value="critical">Crítico</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Estado de la Evaluación</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.evaluationStatus} onChange={e => setFormData({...formData, evaluationStatus: e.target.value})}>
                    <option value="pending">Pendiente</option>
                    <option value="under_review">En Revisión</option>
                    <option value="approved">Aprobado</option>
                    <option value="restricted">Restringido (Aprobado con condiciones)</option>
                    <option value="rejected">Rechazado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Última Revisión</label>
                  <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.lastReview} onChange={e => setFormData({...formData, lastReview: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Próxima Revisión</label>
                  <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.nextReview} onChange={e => setFormData({...formData, nextReview: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Garantías / Acuerdos de Nivel de Servicio (SLA)</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.sla} onChange={e => setFormData({...formData, sla: e.target.value})} placeholder="Ej. 99.9% Uptime, Cero retención de datos" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">4. Observaciones y Estado</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Observaciones</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-32" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Notas adicionales..."></textarea>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <label className="flex items-center text-sm font-bold text-slate-700">
                    <input type="checkbox" className="mr-2" checked={formData.status === 'active'} onChange={e => setFormData({...formData, status: e.target.checked ? 'active' : 'inactive'})} />
                    Proveedor Activo
                  </label>
                </div>
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
        {step < 4 ? (
          <button 
            onClick={() => {
              if (step === 1 && (!formData.name)) {
                 setError('Debe indicar el nombre del proveedor.');
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
            onClick={handleSave}
            disabled={saving || !formData.name}
            className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'GUARDAR PROVEEDOR'}
          </button>
        )}
      </div>
    </div>
  );
}
