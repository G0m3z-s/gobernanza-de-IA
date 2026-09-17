import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { Activity, Clock } from 'lucide-react';

const STAGES = [
  'IDEA', 'EVALUACIÓN', 'DISEÑO', 'DESARROLLO', 'VALIDACIÓN', 
  'APROBACIÓN', 'DESPLIEGUE', 'OPERACIÓN', 'MONITOREO', 
  'CAMBIO', 'SUSPENSIÓN', 'RETIRADA'
];

export function AILifecycleTab({ data }: { data: DashboardData }) {
  const aiSystems = data.aiSystems || [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px] overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800">Ciclo de Vida de Sistemas IA</h2>
        <p className="text-sm text-slate-500 mt-1">Tablero de control de estados para todos los sistemas registrados.</p>
      </div>
      
      <div className="flex-1 overflow-x-auto p-6 bg-slate-50/50">
        <div className="flex space-x-4 min-w-max h-full pb-4">
          {STAGES.map(stage => {
            // Some systems might have lowercase or unaccented stages, we normalize them for grouping
            const systemsInStage = aiSystems.filter(s => {
               const sysStage = s.lifecycleStage || 'EVALUACIÓN'; // defaults to EVALUATION/EVALUACIÓN
               // To avoid match issues, we check uppercase, handling English equivalents if any
               const normalized = sysStage.toUpperCase() === 'EVALUATION' ? 'EVALUACIÓN' :
                                  sysStage.toUpperCase() === 'DESIGN' ? 'DISEÑO' :
                                  sysStage.toUpperCase() === 'DEVELOPMENT' ? 'DESARROLLO' :
                                  sysStage.toUpperCase() === 'DEPLOYMENT' ? 'DESPLIEGUE' :
                                  sysStage.toUpperCase() === 'OPERATION' ? 'OPERACIÓN' :
                                  sysStage.toUpperCase() === 'MONITORING' ? 'MONITOREO' :
                                  sysStage.toUpperCase() === 'RETIREMENT' ? 'RETIRADA' :
                                  sysStage.toUpperCase() === 'DECOMMISSIONING' ? 'RETIRADA' :
                                  sysStage.toUpperCase() === 'APPROVAL' ? 'APROBACIÓN' :
                                  sysStage.toUpperCase() === 'CHANGE' ? 'CAMBIO' :
                                  sysStage.toUpperCase() === 'SUSPENSION' ? 'SUSPENSIÓN' :
                                  sysStage.toUpperCase();
               return normalized === stage;
            });
            
            return (
              <div key={stage} className="w-80 flex flex-col h-full bg-slate-100/50 rounded-xl border border-slate-200">
                <div className="p-3 border-b border-slate-200 bg-slate-100 rounded-t-xl flex justify-between items-center">
                  <h3 className="font-bold text-slate-700 text-sm tracking-wide">{stage}</h3>
                  <span className="bg-white text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full border border-slate-200">
                    {systemsInStage.length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {systemsInStage.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs italic">
                      Sin sistemas en esta etapa
                    </div>
                  ) : (
                    systemsInStage.map(sys => (
                      <div key={sys.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:border-teal-300 hover:shadow transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{sys.code || sys.id.substring(0,6)}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                            sys.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            sys.approvalStatus === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {sys.approvalStatus === 'approved' ? 'APROBADO' : sys.approvalStatus === 'rejected' ? 'RECHAZADO' : 'PENDIENTE'}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">{sys.name}</h4>
                        <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
                          <span className="truncate max-w-[120px]">{sys.ownerId || 'Sin asignar'}</span>
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {sys.updatedAt ? new Date(sys.updatedAt).toLocaleDateString() : 'Reciente'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
