import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export function AIDataWizard({ 
  onClose, 
  initialData,
  systemId 
}: { 
  onClose: () => void, 
  initialData?: any,
  systemId?: string,
  key?: any 
}) {
  const { addAIDataResource, updateAIDataResource, data } = useStore();
  const { currentOrgId } = useAuth();
  
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const aiSystems = data?.aiSystems || [];
  
  const [formData, setFormData] = useState<any>(initialData || {
    aiSystemId: systemId || '',
    name: '',
    type: 'Dataset',
    source: '',
    provider: '',
    purpose: '',
    license: '',
    storageLocation: '',
    owner: '',
    qualityStatus: 'pending',
    lineageStatus: 'pending',
    lastReview: '',
    nextReview: '',
    personalData: false,
    sensitiveData: false,
    trainingData: false,
    validationData: false,
    testData: false,
    operationalData: false,
    status: 'active'
  });

  const handleSave = async () => {
    if (!currentOrgId) return;
    
    if (!formData.name) {
      setError('El nombre del dataset es obligatorio.');
      return;
    }
    
    if (!formData.aiSystemId) {
      setError('Debe vincular el dataset a un sistema IA.');
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      const resourceData = {
        organizationId: currentOrgId,
        ...formData,
      };

      if (initialData && initialData.id) {
        await updateAIDataResource(initialData.id, resourceData);
      } else {
        await addAIDataResource(resourceData);
      }
      
      // Log History
      try {
        await addDoc(collection(db, 'activityLogs'), {
           organizationId: currentOrgId,
           userId: 'system',
           action: 'UPDATE_AI_DATA',
           details: `Recurso de datos '${formData.name}' ${initialData ? 'actualizado' : 'creado'}`, 
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
          <h2 className="text-lg font-bold text-slate-800">{initialData ? 'Editar Recurso de Datos' : 'Registrar Recurso de Datos'}</h2>
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
                  <label className="block text-xs font-medium text-slate-600 mb-1">Sistema IA Vinculado *</label>
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
                  <label className="block text-xs font-medium text-slate-600 mb-1">Nombre del Dataset/Recurso *</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tipo</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="Dataset">Dataset (Conjunto de datos)</option>
                    <option value="DataStream">Flujo de datos (Stream)</option>
                    <option value="KnowledgeBase">Base de conocimiento</option>
                    <option value="ModelWeights">Pesos del Modelo</option>
                    <option value="VectorDB">Base de datos vectorial</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Propósito / Finalidad</label>
                  <textarea className="w-full border rounded-lg p-2 text-sm h-16" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">2. Procedencia y Calidad</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Fuente / Origen</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} placeholder="Ej. CRM, Kaggle, Scrapeo interno" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Proveedor / Licencia</label>
                  <div className="flex gap-2">
                    <input type="text" className="w-1/2 border rounded-lg p-2 text-sm" value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} placeholder="Proveedor" />
                    <input type="text" className="w-1/2 border rounded-lg p-2 text-sm" value={formData.license} onChange={e => setFormData({...formData, license: e.target.value})} placeholder="Licencia" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Estado de Calidad</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.qualityStatus} onChange={e => setFormData({...formData, qualityStatus: e.target.value})}>
                    <option value="pending">Pendiente de evaluar</option>
                    <option value="good">Buena (Limpiado y verificado)</option>
                    <option value="needs_improvement">Requiere mejoras</option>
                    <option value="poor">Deficiente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Estado de Trazabilidad (Linaje)</label>
                  <select className="w-full border rounded-lg p-2 text-sm" value={formData.lineageStatus} onChange={e => setFormData({...formData, lineageStatus: e.target.value})}>
                    <option value="pending">Sin documentar</option>
                    <option value="partial">Parcialmente documentado</option>
                    <option value="complete">Completamente trazable</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">3. Tipología y Uso</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Clasificación del Dato</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" checked={formData.personalData} onChange={e => setFormData({...formData, personalData: e.target.checked})} />
                      Contiene Datos Personales
                    </label>
                    <label className="flex items-center text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" checked={formData.sensitiveData} onChange={e => setFormData({...formData, sensitiveData: e.target.checked})} />
                      Contiene Datos Sensibles
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Fase de Uso</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" checked={formData.trainingData} onChange={e => setFormData({...formData, trainingData: e.target.checked})} />
                      Entrenamiento (Training)
                    </label>
                    <label className="flex items-center text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" checked={formData.validationData} onChange={e => setFormData({...formData, validationData: e.target.checked})} />
                      Validación (Validation)
                    </label>
                    <label className="flex items-center text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" checked={formData.testData} onChange={e => setFormData({...formData, testData: e.target.checked})} />
                      Pruebas (Testing)
                    </label>
                    <label className="flex items-center text-sm text-slate-700">
                      <input type="checkbox" className="mr-2" checked={formData.operationalData} onChange={e => setFormData({...formData, operationalData: e.target.checked})} />
                      Operacional (Inferencia/Producción)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">4. Gobierno y Ubicación</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Propietario / Data Steward</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} placeholder="Nombre, email o ID" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Ubicación de almacenamiento (URL / Ruta)</label>
                  <input type="text" className="w-full border rounded-lg p-2 text-sm" value={formData.storageLocation} onChange={e => setFormData({...formData, storageLocation: e.target.value})} placeholder="Ej. s3://bucket/datasets/..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Última Revisión</label>
                  <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.lastReview} onChange={e => setFormData({...formData, lastReview: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Próxima Revisión</label>
                  <input type="date" className="w-full border rounded-lg p-2 text-sm" value={formData.nextReview} onChange={e => setFormData({...formData, nextReview: e.target.value})} />
                </div>
                <div className="col-span-2 mt-4 pt-4 border-t border-slate-200">
                  <label className="flex items-center text-sm font-bold text-slate-700">
                    <input type="checkbox" className="mr-2" checked={formData.status === 'active'} onChange={e => setFormData({...formData, status: e.target.checked ? 'active' : 'inactive'})} />
                    Recurso Activo
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
              if (step === 1 && (!formData.name || !formData.aiSystemId)) {
                 setError('Debe indicar nombre y sistema IA vinculado.');
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
            disabled={saving || !formData.name || !formData.aiSystemId}
            className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'GUARDAR RECURSO'}
          </button>
        )}
      </div>
    </div>
  );
}
