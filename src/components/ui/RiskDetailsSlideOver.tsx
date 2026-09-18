import React from 'react';
import { SlideOver } from './SlideOver';
import { RiskControlLinksSection } from '../forms/RiskControlLinksSection';
import { ShieldAlert, Target } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function RiskDetailsSlideOver({ isOpen, onClose, risk }: { isOpen: boolean, onClose: () => void, risk: any }) {
  if (!risk) return null;

  return (
    <SlideOver
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Riesgo"
      description={`ID: ${risk.id.toUpperCase()} | ${risk.type}`}
    >
      <div className="mt-4 space-y-6">
        <div className="p-4 rounded border border-[var(--border)] bg-slate-50/50">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">{risk.name}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-1.5">Nivel Inherente</span>
              <StatusBadge 
                status={
                  risk.level === 'Crítico' ? 'danger' :
                  risk.level === 'Alto' ? 'warning' :
                  risk.level === 'Medio' ? 'info' : 'success'
                }
              >
                {risk.level}
              </StatusBadge>
            </div>
            
            <div>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-1.5">Estado</span>
              <StatusBadge 
                status={
                  risk.status === 'Tratado' ? 'success' :
                  risk.status === 'Aceptado' ? 'warning' : 'danger'
                }
                dot
              >
                {risk.status}
              </StatusBadge>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border)]">Plan de Tratamiento</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="shrink-0 mt-0.5">
                <Target className="w-4 h-4 text-[var(--text-muted)] mr-2" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">No hay plan de tratamiento registrado para este riesgo todavía.</p>
              </div>
            </div>
          </div>
        </div>

        <RiskControlLinksSection riskId={risk.id} />
      </div>
    </SlideOver>
  );
}
