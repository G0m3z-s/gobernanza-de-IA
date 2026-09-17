import React, { useState } from 'react';
import { AISystem, DashboardData, AIIncident } from '../../types';
import { AlertTriangle, Plus, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SlideOver } from '../ui/SlideOver';
import { AIIncidentWizard } from './AIIncidentWizard';
import { useStore } from '../../store/useStore';

export function AIIncidents360Tab({ system, data }: { system: AISystem, data: DashboardData }) {
  const { updateAIIncident } = useStore();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  const incidents = (data.aiIncidents || []).filter(i => i.aiSystemId === system.id)
    .sort((a, b) => {
      // open/investigating first, then contained, then corrective, then closed
      const wA = a.status === 'open' || a.status === 'investigating' ? 0 : a.status === 'contained' ? 1 : a.status === 'corrective_action' ? 2 : 3;
      const wB = b.status === 'open' || b.status === 'investigating' ? 0 : b.status === 'contained' ? 1 : b.status === 'corrective_action' ? 2 : 3;
      if (wA !== wB) return wA - wB;
      return new Date(b.date || b.createdAt || '').getTime() - new Date(a.date || a.createdAt || '').getTime();
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'investigating': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'contained': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'corrective_action': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'closed': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Abierto';
      case 'investigating': return 'En Investigación';
      case 'contained': return 'Contenido';
      case 'corrective_action': return 'Acción Correctiva';
      case 'closed': return 'Cerrado';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px]">
      <div className="flex justify-between items-center p-6 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center">
            <ShieldAlert className="w-5 h-5 mr-2 text-rose-600" /> Registro de Incidentes
          </h2>
          <p className="text-sm text-slate-500 mt-1">Gestión de fallos, fugas, alucinaciones o incidentes de seguridad.</p>
        </div>
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          REGISTRAR INCIDENTE
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        {incidents.length === 0 ? (
          <div className="text-center py-12">
            <ShieldAlert className="w-8 h-8 text-slate-300 mx-auto mb-4" />
            <p className="text-sm text-slate-500 mb-4">No hay incidentes registrados para este sistema.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {incidents.map(inc => (
              <div key={inc.id} className={`bg-white p-5 rounded-xl border shadow-sm ${inc.status === 'closed' ? 'opacity-70 border-slate-200' : 'border-rose-200'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(inc.status)}`}>
                      {getStatusLabel(inc.status)}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      inc.severity === 'critical' ? 'bg-rose-600 text-white border-rose-700' :
                      inc.severity === 'high' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                      inc.severity === 'medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {inc.severity}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                      {inc.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">ID: {inc.id.substring(0,6).toUpperCase()}</span>
                </div>
                
                <p className="text-sm text-slate-800 font-medium mb-4">{inc.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4 p-3 bg-slate-50 rounded-lg">
                  <div>
                    <span className="block text-slate-400 mb-0.5">Fecha Detección</span>
                    <span className="font-semibold text-slate-700">{inc.date ? new Date(inc.date).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 mb-0.5">Reportado Por</span>
                    <span className="font-semibold text-slate-700">{inc.reportedBy || 'Anónimo'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 mb-0.5">Responsable</span>
                    <span className="font-semibold text-slate-700">{inc.responsible || 'No asignado'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 mb-0.5">Personas Afectadas</span>
                    <span className="font-semibold text-slate-700">{inc.affectedPeople || 'N/A'}</span>
                  </div>
                </div>

                {inc.impact && (
                  <div className="mb-3 text-xs">
                    <span className="font-bold text-slate-600">Impacto Material: </span>
                    <span className="text-slate-600">{inc.impact}</span>
                  </div>
                )}

                {inc.containment && (
                  <div className="mb-3 text-xs">
                    <span className="font-bold text-slate-600">Contención: </span>
                    <span className="text-slate-600">{inc.containment}</span>
                  </div>
                )}
                
                {inc.status !== 'closed' && (
                  <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-end space-x-2">
                    <select 
                      className="text-xs p-1.5 border border-slate-300 rounded"
                      value={inc.status}
                      onChange={(e) => updateAIIncident(inc.id, { status: e.target.value })}
                    >
                      <option value="open">Abierto</option>
                      <option value="investigating">En Investigación</option>
                      <option value="contained">Contenido</option>
                      <option value="corrective_action">Acción Correctiva</option>
                      <option value="closed">Cerrado</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <SlideOver
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        title="Registrar Incidente IA"
        description="Reporte un comportamiento anómalo, sesgo o fallo del sistema."
      >
        <div className="h-full">
          <AIIncidentWizard onClose={() => setIsWizardOpen(false)} systemId={system.id} />
        </div>
      </SlideOver>
    </div>
  );
}
