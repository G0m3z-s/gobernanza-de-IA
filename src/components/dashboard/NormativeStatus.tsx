import React from 'react';
import { DashboardData } from '../../types';

export function NormativeStatus({ data, standard }: { data: DashboardData, standard: string }) {
  const clauses = ['4', '5', '6', '7', '8', '9', '10', 'Anexo A'];
  
  const getStatusColor = (clause: string, std: string) => {
    const reqs = data.requirementAssessments.filter(r => r.clause === clause && r.standard === std);
    if (reqs.length === 0) return 'bg-slate-200';
    
    // Simplistic mock logic for demo based on first requirement in clause
    const status = reqs[0].status;
    switch (status) {
      case 'verified':
      case 'implemented':
      case 'documented': return 'bg-teal-400';
      case 'planned': return 'bg-amber-400';
      case 'gap': return 'bg-rose-500';
      case 'not_evaluated': return 'bg-slate-300';
      default: return 'bg-slate-200';
    }
  };

  const standards = standard === 'Integrado' ? ['ISO/IEC 27001', 'ISO/IEC 42001'] : [standard];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Estado Normativo</h2>
      
      <div className="space-y-6">
        {standards.map(std => (
          <div key={std}>
            <h3 className="text-sm font-medium text-slate-600 mb-2">{std}</h3>
            <div className="flex space-x-1">
              {clauses.map(clause => (
                <div 
                  key={clause} 
                  className={`flex-1 h-8 ${getStatusColor(clause, std)} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group`}
                >
                  <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-slate-800 text-white text-xs px-2 py-1 rounded z-10">
                    Cláusula {clause}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-1 mt-1">
              {clauses.map(clause => (
                <div key={clause} className="flex-1 text-center text-[10px] text-slate-500 font-medium">
                  {clause}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-500">
        <div className="flex items-center"><div className="w-2 h-2 bg-emerald-500 rounded-sm mr-1"></div>Saludable</div>
        <div className="flex items-center"><div className="w-2 h-2 bg-teal-400 rounded-sm mr-1"></div>En progreso</div>
        <div className="flex items-center"><div className="w-2 h-2 bg-amber-400 rounded-sm mr-1"></div>Parcial</div>
        <div className="flex items-center"><div className="w-2 h-2 bg-rose-500 rounded-sm mr-1"></div>Brecha</div>
        <div className="flex items-center"><div className="w-2 h-2 bg-slate-300 rounded-sm mr-1"></div>No evaluado</div>
      </div>
    </div>
  );
}
