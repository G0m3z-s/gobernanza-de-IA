import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { Users, Plus, Edit, Trash, Activity, Server } from 'lucide-react';
import { SlideOver } from '../ui/SlideOver';
import { AIProviderWizard } from './AIProviderWizard';
import { useStore } from '../../store/useStore';

export function AIProvidersTab({ data, preselectedSystemId }: { data: DashboardData, preselectedSystemId?: string }) {
  const { updateAIProvider } = useStore();
  const [isWizardOpen, setIsWizardOpen] = useState(!!preselectedSystemId);
  const [providerToEdit, setProviderToEdit] = useState<any>(null);
  
  const providers = data.aiProviders || [];
  const aiSystems = data.aiSystems || [];

  const handleInactivate = async (id: string, currentStatus: string) => {
    try {
      await updateAIProvider(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
      <div className="flex justify-between items-center p-6 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Proveedores y Terceros IA</h2>
          <p className="text-sm text-slate-500">Gestión de nubes, APIs de modelos de lenguaje y servicios relacionados.</p>
        </div>
        
        <button 
          onClick={() => { setProviderToEdit(null); setIsWizardOpen(true); }}
          className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          REGISTRAR PROVEEDOR
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
        {providers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-4" />
            <p className="text-sm text-slate-500 mb-4">No hay proveedores registrados.</p>
            <button 
              onClick={() => { setProviderToEdit(null); setIsWizardOpen(true); }}
              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg"
            >
              CREAR PROVEEDOR
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map(prov => {
              const systemsUsing = aiSystems.filter(s => (prov.aiSystemIds || []).includes(s.id));
              
              return (
                <div key={prov.id} className={`border rounded-xl p-5 bg-white shadow-sm transition-colors ${prov.status === 'inactive' ? 'opacity-60 grayscale border-slate-200' : 'border-slate-200 hover:border-teal-300'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        prov.evaluationStatus === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                        prov.evaluationStatus === 'restricted' ? 'bg-amber-100 text-amber-700' :
                        prov.evaluationStatus === 'rejected' ? 'bg-rose-100 text-rose-700' :
                        prov.evaluationStatus === 'under_review' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {prov.evaluationStatus === 'approved' ? 'Aprobado' :
                         prov.evaluationStatus === 'restricted' ? 'Restringido' :
                         prov.evaluationStatus === 'rejected' ? 'Rechazado' :
                         prov.evaluationStatus === 'under_review' ? 'En Revisión' : 'Pendiente'}
                      </span>
                      {prov.status === 'inactive' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase">
                          INACTIVO
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => { setProviderToEdit(prov); setIsWizardOpen(true); }}
                        className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleInactivate(prov.id, prov.status || 'active')}
                        className={`p-1.5 rounded transition-colors ${prov.status === 'inactive' ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'}`}
                        title={prov.status === 'inactive' ? 'Activar' : 'Inactivar'}
                      >
                        {prov.status === 'inactive' ? <Activity className="w-3.5 h-3.5" /> : <Trash className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{prov.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{prov.type} {prov.service ? `- ${prov.service}` : ''}</p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Riesgo:</span>
                      <span className={`font-semibold ${
                        prov.riskLevel === 'high' || prov.riskLevel === 'critical' ? 'text-rose-600' :
                        prov.riskLevel === 'medium' ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {prov.riskLevel === 'critical' ? 'Crítico' : 
                         prov.riskLevel === 'high' ? 'Alto' : 
                         prov.riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Datos en:</span>
                      <span className="text-slate-700 font-medium">{prov.dataLocation || 'No especificado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Responsable:</span>
                      <span className="text-slate-700 font-medium truncate max-w-[120px]">{prov.contractOwner || 'No asignado'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-500 font-semibold">Sistemas Vinculados ({systemsUsing.length})</span>
                      <Server className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    {systemsUsing.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {systemsUsing.slice(0, 3).map(s => (
                          <span key={s.id} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] border border-slate-200">
                            {s.name}
                          </span>
                        ))}
                        {systemsUsing.length > 3 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] border border-slate-200">
                            +{systemsUsing.length - 3} más
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-400 italic">No hay sistemas vinculados</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <SlideOver
        isOpen={isWizardOpen}
        onClose={() => { setIsWizardOpen(false); setProviderToEdit(null); }}
        title={providerToEdit ? "Editar Proveedor IA" : "Registrar Proveedor IA"}
        description="Gestione la información, nivel de riesgo y sistemas asociados al proveedor."
      >
        <div className="h-full">
          <AIProviderWizard 
            key={providerToEdit ? providerToEdit.id : 'new'} 
            onClose={() => { setIsWizardOpen(false); setProviderToEdit(null); }} 
            initialData={providerToEdit} 
            systemId={preselectedSystemId}
          />
        </div>
      </SlideOver>
    </div>
  );
}
