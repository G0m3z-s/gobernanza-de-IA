const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIDataTab.tsx', 'utf8');

code = `import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { Database, Plus, AlertTriangle, Edit, Trash, Activity } from 'lucide-react';
import { SlideOver } from '../ui/SlideOver';
import { AIDataWizard } from './AIDataWizard';
import { useStore } from '../../store/useStore';

export function AIDataTab({ data, preselectedSystemId }: { data: DashboardData, preselectedSystemId?: string }) {
  const { updateAIDataResource } = useStore();
  const [isWizardOpen, setIsWizardOpen] = useState(!!preselectedSystemId);
  const [resourceToEdit, setResourceToEdit] = useState<any>(null);
  
  const resources = data.aiDataResources || [];
  const aiSystems = data.aiSystems || [];

  const handleInactivate = async (id: string, currentStatus: string) => {
    try {
      await updateAIDataResource(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
      <div className="flex justify-between items-center p-6 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Data & Resource Center</h2>
          <p className="text-sm text-slate-500">Gobernanza de datasets, linaje y procedencia.</p>
        </div>
        <button 
          onClick={() => { setResourceToEdit(null); setIsWizardOpen(true); }} 
          className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          NUEVO DATASET
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <Database className="w-8 h-8 text-slate-300 mx-auto mb-4" />
            <p className="text-sm text-slate-500 mb-4">No hay recursos de datos registrados.</p>
            <button 
              onClick={() => { setResourceToEdit(null); setIsWizardOpen(true); }} 
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800"
            >
              CREAR DATASET
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {resources.map(res => {
              const sys = aiSystems.find(s => s.id === res.aiSystemId);
              
              // Alertas solicitadas: sin propietario, sin fuente, sin revisión, sin procedencia
              const alerts = [];
              if (!res.owner) alerts.push("Sin propietario asignado");
              if (!res.source) alerts.push("Falta fuente u origen");
              if (!res.lastReview && !res.nextReview) alerts.push("Sin ciclo de revisión definido");
              if (!res.lineageStatus || res.lineageStatus === 'pending') alerts.push("Falta información de procedencia (linaje)");

              return (
                <div key={res.id} className={\`bg-white border rounded-xl p-5 shadow-sm transition-all \${res.status === 'inactive' ? 'opacity-60 grayscale border-slate-200' : 'border-slate-200 hover:border-teal-300'}\`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase border border-slate-200">
                          {res.type || 'Dataset'}
                        </span>
                        {res.status === 'inactive' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase">
                            INACTIVO
                          </span>
                        )}
                        {alerts.length > 0 && res.status !== 'inactive' && (
                          <span className="flex items-center text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3 mr-1" /> {alerts.length} ALERTAS
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{res.name}</h3>
                      <p className="text-sm text-slate-500 mb-3">Vinculado a: <span className="font-semibold">{sys?.name || 'Sistema desconocido'}</span></p>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 mb-4">
                        <div><span className="font-semibold text-slate-400">Fuente:</span> {res.source || 'No definida'}</div>
                        <div><span className="font-semibold text-slate-400">Propietario:</span> {res.owner || 'No asignado'}</div>
                        <div>
                          <span className="font-semibold text-slate-400">Calidad:</span> {
                            res.qualityStatus === 'good' ? 'Buena' : 
                            res.qualityStatus === 'needs_improvement' ? 'Requiere mejoras' : 
                            res.qualityStatus === 'poor' ? 'Deficiente' : 'Pendiente'
                          }
                        </div>
                        <div>
                          <span className="font-semibold text-slate-400">Procedencia:</span> {
                            res.lineageStatus === 'complete' ? 'Completa' : 
                            res.lineageStatus === 'partial' ? 'Parcial' : 'Sin documentar'
                          }
                        </div>
                        <div><span className="font-semibold text-slate-400">Próxima Revisión:</span> {res.nextReview || 'No programada'}</div>
                      </div>
                      
                      {/* Uses badges */}
                      <div className="flex gap-2 mb-2">
                        {res.trainingData && <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">Training</span>}
                        {res.validationData && <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">Validation</span>}
                        {res.testData && <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-50 text-cyan-700 border border-cyan-100">Testing</span>}
                        {res.operationalData && <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-100">Operacional</span>}
                      </div>

                      {alerts.length > 0 && res.status !== 'inactive' && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-xs font-bold text-amber-800 mb-1">Requiere atención:</p>
                          <ul className="list-disc pl-4 text-xs text-amber-700 space-y-0.5">
                            {alerts.map((a, i) => <li key={i}>{a}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <button 
                        onClick={() => { setResourceToEdit(res); setIsWizardOpen(true); }}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors border border-transparent hover:border-teal-200"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleInactivate(res.id, res.status || 'active')}
                        className={\`p-2 rounded-lg transition-colors border \${res.status === 'inactive' ? 'text-emerald-600 hover:bg-emerald-50 border-emerald-200' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-transparent hover:border-rose-200'}\`}
                        title={res.status === 'inactive' ? 'Activar' : 'Inactivar'}
                      >
                        {res.status === 'inactive' ? <Activity className="w-4 h-4" /> : <Trash className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <SlideOver
        isOpen={isWizardOpen}
        onClose={() => { setIsWizardOpen(false); setResourceToEdit(null); }}
        title={resourceToEdit ? "Editar Recurso de Datos" : "Registrar Recurso de Datos"}
        description="Gestione los datasets y fuentes de datos vinculados a sus sistemas IA."
      >
        <div className="h-full">
          <AIDataWizard 
            key={resourceToEdit ? resourceToEdit.id : 'new'} 
            onClose={() => { setIsWizardOpen(false); setResourceToEdit(null); }} 
            initialData={resourceToEdit} 
            systemId={preselectedSystemId}
          />
        </div>
      </SlideOver>
    </div>
  );
}
`;
fs.writeFileSync('src/components/ai/AIDataTab.tsx', code);
