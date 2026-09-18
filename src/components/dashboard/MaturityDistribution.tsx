import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function MaturityDistribution({ kpis }: { kpis: any }) {
  const data = [
    { name: 'L0 (Inexistente)', count: kpis?.maturityCounts?.L0 || 0, color: '#e11d48' },
    { name: 'L1 (Inicial)', count: kpis?.maturityCounts?.L1 || 0, color: '#f59e0b' },
    { name: 'L2 (Gestionado)', count: kpis?.maturityCounts?.L2 || 0, color: '#eab308' },
    { name: 'L3 (Definido)', count: kpis?.maturityCounts?.L3 || 0, color: '#10b981' },
    { name: 'L4 (Controlado)', count: kpis?.maturityCounts?.L4 || 0, color: '#3b82f6' },
    { name: 'L5 (Optimizado)', count: kpis?.maturityCounts?.L5 || 0, color: '#0ea5e9' },
  ];

  return (
    <div className="bg-white rounded border border-[var(--border)] p-5 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-[var(--border)] pb-3">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Distribución de Madurez</h2>
          
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-[var(--text-primary)]">{kpis?.totalApplicableControls || 0}</p>
          <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Ctrls. Aplicables</p>
        </div>
      </div>
      <div className="flex-1 min-h-[200px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
