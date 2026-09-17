import React, { useState } from 'react';
import { AISystem, DashboardData } from '../../types';
import { Activity, Plus, AlertTriangle, TrendingDown, TrendingUp, Bell } from 'lucide-react';
import { SlideOver } from '../ui/SlideOver';
import { AIMetricWizard } from './AIMetricWizard';

export function AIMonitoring360Tab({ system, data }: { system: AISystem, data: DashboardData }) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  
  const metrics = (data.aiMetrics || []).filter(m => m.aiSystemId === system.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px]">
      <div className="flex justify-between items-center p-6 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-teal-600" /> Monitoreo y Métricas
          </h2>
          <p className="text-sm text-slate-500 mt-1">Indicadores de rendimiento, precisión, latencia y sesgo del sistema.</p>
        </div>
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          REGISTRAR MÉTRICA
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        {metrics.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-8 h-8 text-slate-300 mx-auto mb-4" />
            <p className="text-sm text-slate-500 mb-4">No hay métricas registradas para este sistema.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map(metric => (
              <div key={metric.id} className={`bg-white p-4 rounded-xl border shadow-sm ${metric.breached ? 'border-rose-300' : 'border-slate-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase border border-slate-200">
                      {metric.type}
                    </span>
                    {metric.breached && (
                      <span className="flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase">
                        <Bell className="w-3 h-3 mr-1" /> ALERTA
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{new Date(metric.date).toLocaleDateString()}</span>
                </div>
                
                <h3 className="font-bold text-slate-800 text-lg">{metric.name}</h3>
                
                <div className="flex items-end mt-4 mb-2">
                  <span className={`text-3xl font-black ${metric.breached ? 'text-rose-600' : 'text-slate-800'}`}>
                    {metric.value}
                  </span>
                  <span className="text-sm text-slate-500 ml-1 mb-1 font-bold">{metric.unit}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-100 mt-2">
                  <span className="text-slate-500">Umbral: <span className="font-bold">{metric.threshold}{metric.unit}</span></span>
                  <span className="text-slate-500">Fuente: <span className="font-medium">{metric.source || 'Manual'}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SlideOver
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        title="Registrar Métrica IA"
        description="Agregue una nueva medición para el sistema."
      >
        <div className="h-full">
          <AIMetricWizard onClose={() => setIsWizardOpen(false)} systemId={system.id} />
        </div>
      </SlideOver>
    </div>
  );
}
