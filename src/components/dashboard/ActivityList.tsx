import React from 'react';
import { DashboardData } from '../../types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { History } from 'lucide-react';

export function ActivityList({ data }: { data: DashboardData }) {
  const activities = data.activityLogs.slice(0, 8);

  return (
    <div className="bg-white rounded border border-[var(--border)] p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] flex items-center uppercase tracking-wider">
          <History className="w-5 h-5 mr-2 text-slate-400" />
          Actividad Reciente
        </h2>
      </div>

      {activities.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Sin actividad reciente</div>
      ) : (
        <div className="space-y-4 flex-1">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-medium text-xs shrink-0 mr-3 mt-0.5 border border-slate-200">
                {act.user.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-slate-800">
                  <span className="font-medium">{act.user}</span> {act.action} <span className="font-medium">{act.entity}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {formatDistanceToNow(parseISO(act.date), { addSuffix: true, locale: es })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button disabled={true} className="w-full mt-4 py-2 text-xs font-medium text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors opacity-50 cursor-not-allowed">
        HISTORIAL COMPLETO (PRÓXIMAMENTE)
      </button>
    </div>
  );
}
