import React from 'react';
import { DashboardData } from '../../types';

export function GovernanceHeader({ data }: { data: DashboardData }) {
  const processes = data.processes || [];
  const strategic = processes.filter(p => p.category === 'strategic').length;
  const mission = processes.filter(p => p.category === 'mission').length;
  const support = processes.filter(p => p.category === 'support').length;
  const control = processes.filter(p => p.category === 'control').length;
  
  const withoutOwner = processes.filter(p => !p.ownerId).length;
  // Approximation for risk and AI
  const aiSystemsProcessCount = Array.from(new Set((data.aiSystems || []).map(a => a.process))).length;
  const highRiskProcessCount = processes.filter(p => p.criticality === 'critical' || p.criticality === 'high').length;
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gobernanza / Process Center</h1>
          <p className="text-sm text-slate-500 mt-1">Mapa operativo real de la organización, roles, objetivos e integración del sistema.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-slate-100">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase">Total Procesos</p>
          <p className="text-xl font-bold text-slate-800">{processes.length}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase">Estratégicos / Misionales</p>
          <p className="text-xl font-bold text-slate-800">{strategic} / {mission}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase">Apoyo / Control</p>
          <p className="text-xl font-bold text-slate-800">{support} / {control}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase">Sin Responsable</p>
          <p className={`text-xl font-bold ${withoutOwner > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{withoutOwner}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase">Procesos con IA</p>
          <p className="text-xl font-bold text-teal-600">{aiSystemsProcessCount}</p>
        </div>
      </div>
    </div>
  );
}
