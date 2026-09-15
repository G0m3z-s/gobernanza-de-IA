import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { Plus, Search, Filter } from 'lucide-react';

export function StakeholdersTab({ data }: { data: DashboardData }) {
  const stakeholders = data.stakeholders || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = stakeholders.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.category && s.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
      <div className="flex justify-between items-center p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Partes Interesadas</h2>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar stakeholder..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            AGREGAR PARTE INTERESADA
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-500 mb-4">No existen partes interesadas registradas.</p>
            <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg">AGREGAR PARTE INTERESADA</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(s => (
              <div key={s.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-teal-300 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${s.internalExternal === 'Internal' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {s.internalExternal === 'Internal' ? 'Interno' : 'Externo'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-700 uppercase">
                    {s.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">{s.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{s.category}</p>
                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                  <button className="text-xs font-semibold text-teal-600">VER DETALLES</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
