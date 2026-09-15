import React from 'react';
import { DashboardData } from '../../types';
import { Map } from 'lucide-react';

export function GovernanceMapTab({ data }: { data: DashboardData }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center h-[600px] text-center p-6">
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
        <Map className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Governance Map Visual</h3>
      <p className="text-slate-500 max-w-md mb-6">
        Un grafo interactivo que conectará sus procesos con las partes interesadas, activos, riesgos e IA en un lienzo 360°.
      </p>
      <button className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg">Módulo en Desarrollo</button>
    </div>
  );
}
