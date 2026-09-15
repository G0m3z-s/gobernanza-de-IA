import React from 'react';
import { DashboardData } from '../../types';
import { Shield } from 'lucide-react';

export function RolesTab({ data }: { data: DashboardData }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center h-[600px] text-center p-6">
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
        <Shield className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Role & Responsibility Center</h3>
      <p className="text-slate-500 max-w-md mb-6">
        Aquí podrá gestionar las matrices RACI y las responsabilidades del personal respecto a los procesos, riesgos y sistemas IA.
      </p>
      <button className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg">Configurar Roles Próximamente</button>
    </div>
  );
}
