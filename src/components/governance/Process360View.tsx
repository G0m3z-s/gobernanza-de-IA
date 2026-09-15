import React, { useState } from 'react';
import { DashboardData, Process } from '../../types';
import { ArrowLeft, Target, Activity, ShieldAlert, FileText, CheckCircle2, ChevronRight, Edit } from 'lucide-react';

export function Process360View({ process, data, onClose }: { process: Process, data: DashboardData, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('resumen');
  const [viewMode, setViewMode] = useState<'ejecutiva' | 'experta'>('ejecutiva');

  const translateCategory = (cat?: string) => {
    switch(cat) {
      case 'strategic': return 'Estratégico';
      case 'mission': return 'Misional';
      case 'support': return 'Apoyo';
      case 'control': return 'Control';
      default: return 'No definido';
    }
  };

  const getHealthStatus = () => {
    const score = process.criticality === 'critical' ? 82 : process.criticality === 'high' ? 75 : 95;
    if (score >= 80) return { label: 'Saludable', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', score };
    if (score >= 60) return { label: 'Aceptable', color: 'text-teal-600 bg-teal-50 border-teal-200', score };
    if (score >= 40) return { label: 'En Atención', color: 'text-amber-600 bg-amber-50 border-amber-200', score };
    return { label: 'Crítico', color: 'text-rose-600 bg-rose-50 border-rose-200', score };
  };

  const health = getHealthStatus();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px] overflow-hidden animate-in fade-in">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start">
            <button onClick={onClose} className="mr-4 text-slate-500 hover:text-slate-800 mt-1">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">{process.code || 'S/N'}</span>
                <span className="text-xs font-medium text-slate-500">{translateCategory(process.category)}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{process.name}</h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">{process.objective || 'Sin objetivo definido.'}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className={`px-3 py-1.5 rounded-lg border ${health.color} flex flex-col items-center min-w-[100px]`}>
              <span className="text-xs font-bold uppercase">{health.label}</span>
              <span className="text-xl font-black">{health.score}%</span>
            </div>
            <button className="mt-2 text-xs font-semibold text-teal-600 flex items-center hover:text-teal-700">
              <Edit className="w-3 h-3 mr-1" /> EDITAR PROCESO
            </button>
          </div>
        </div>
        
        <div className="flex bg-slate-200/50 p-1 rounded-lg w-max self-end mt-2">
          <button 
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'ejecutiva' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
            onClick={() => setViewMode('ejecutiva')}
          >
            VISTA EJECUTIVA
          </button>
          <button 
            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'experta' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
            onClick={() => setViewMode('experta')}
          >
            VISTA EXPERTA
          </button>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="border-b border-slate-200 px-6">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {[
            { id: 'resumen', name: 'RESUMEN 360' },
            { id: 'caracterizacion', name: 'CARACTERIZACIÓN' },
            { id: 'actividades', name: 'ACTIVIDADES' },
            { id: 'relaciones', name: 'RELACIONES' },
            { id: 'ai', name: 'SISTEMAS IA' },
            { id: 'iso', name: 'REQUISITOS ISO' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-xs tracking-wider transition-colors ${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        {activeTab === 'resumen' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center"><Target className="w-3.5 h-3.5 mr-1" /> OBJETIVOS FUERA DE META</p>
                <p className="text-2xl font-bold text-slate-800">0</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center"><ShieldAlert className="w-3.5 h-3.5 mr-1" /> RIESGOS CRÍTICOS</p>
                <p className="text-2xl font-bold text-rose-600">1</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> IMPLEMENTACIÓN ISO</p>
                <p className="text-2xl font-bold text-slate-800">76%</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center"><FileText className="w-3.5 h-3.5 mr-1" /> ACCIONES ABIERTAS</p>
                <p className="text-2xl font-bold text-amber-600">3</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Top Prioridades del Proceso</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 mr-3 shrink-0"></span>
                  <span className="text-slate-600">Riesgo <strong className="text-slate-800">R-023 (Fuga de datos)</strong> necesita tratamiento inmediato.</span>
                  <button className="ml-auto text-xs font-medium text-teal-600 hover:underline">Ver Riesgo</button>
                </li>
                <li className="flex items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-3 shrink-0"></span>
                  <span className="text-slate-600">Indicador <strong className="text-slate-800">IND-004</strong> está bajo meta en la última medición.</span>
                  <button className="ml-auto text-xs font-medium text-teal-600 hover:underline">Ver Medición</button>
                </li>
                <li className="flex items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-3 shrink-0"></span>
                  <span className="text-slate-600">Documento <strong className="text-slate-800">DOC-008</strong> requiere revisión anual.</span>
                  <button className="ml-auto text-xs font-medium text-teal-600 hover:underline">Ir a Documentos</button>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'caracterizacion' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-h-[300px] text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Caracterización Digital</h3>
            <p className="text-sm text-slate-500 max-w-md mb-4">La ficha técnica completa del proceso con sus entradas, salidas, proveedores y clientes.</p>
            <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg">EDITAR CARACTERIZACIÓN</button>
          </div>
        )}
        
        {activeTab !== 'resumen' && activeTab !== 'caracterizacion' && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-4">🚧</span>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Sección en Construcción</h3>
            <p className="text-sm text-slate-500 max-w-sm">Los submódulos de {tabName(activeTab)} estarán disponibles al finalizar el roadmap del módulo de Gobernanza.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function tabName(id: string) {
  switch(id) {
    case 'actividades': return 'Actividades de Proceso';
    case 'relaciones': return 'Relaciones';
    case 'iso': return 'Requisitos ISO vinculados';
    case 'ai': return 'Sistemas IA';
    default: return id;
  }
}
