import React, { useState } from "react";
import {
  Target,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import { SlideOver } from "../ui/SlideOver";

function KpiCard({
  title,
  value,
  previousValue,
  color,
  icon: Icon,
  tooltip,
  compare,
  inverseBad = false,
  onExplore,
}: any) {
  const isStringValue = typeof value === 'string';
  const numValue = isStringValue ? 0 : (value || 0);
  const variation = numValue - (previousValue || 0);
  const isPositive = inverseBad ? variation < 0 : variation > 0;
  const isNeutral = variation === 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col h-full">
      <div className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 cursor-help">
        <Info className="w-4 h-4" />
        <div className="absolute hidden group-hover:block w-48 bg-slate-800 text-white text-xs p-2 rounded right-0 top-6 z-10 shadow-lg">
          {tooltip}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            {title}
          </h3>
          <div className="flex items-baseline mt-1">
            <span className={`font-bold text-slate-800 ${isStringValue ? 'text-xl' : 'text-3xl'}`}>
              {isStringValue ? value : `${value || 0}%`}
            </span>
            {compare && !isNeutral && !isStringValue && (
              <span
                className={`ml-2 flex items-center text-xs font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {Math.abs(variation)}%
              </span>
            )}
            {compare && isNeutral && !isStringValue && (
              <span className="ml-2 text-xs font-medium text-slate-400">Sin histórico</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200 transition-colors"
          style={{ backgroundColor: `${color}10`, color }}
          onClick={onExplore}
        >
          Ver detalles
        </span>
      </div>
    </div>
  );
}

export function KPIWidgets({ kpis, compare }: { kpis: any; compare: boolean }) {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);

  const variation = kpis?.variation || {
    implementation: 0,
    evidence: 0,
    efficacy: 0,
    auditReadiness: 0,
  };

  const getKpiDetails = () => {
    switch (selectedKpi) {
      case 'Implementación':
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Este indicador mide el porcentaje de requisitos normativos que han sido formalmente implementados y documentados en la organización.</p>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h4 className="font-semibold text-slate-800 mb-2">Desglose de Puntuación</h4>
               {kpis?.implCounts ? (
                 <ul className="space-y-2 text-sm text-slate-600">
                   <li className="flex justify-between"><span>Implementados / Verificados:</span> <span className="font-medium text-slate-900">{kpis.implCounts.implemented}</span></li>
                   <li className="flex justify-between"><span>En Proceso / Planeado:</span> <span className="font-medium text-slate-900">{kpis.implCounts.partial}</span></li>
                   <li className="flex justify-between"><span>No Implementados (Brecha):</span> <span className="font-medium text-slate-900">{kpis.implCounts.none}</span></li>
                   <li className="flex justify-between text-slate-400"><span>No Evaluados (Sin calificar):</span> <span className="font-medium">{kpis.implCounts.notEvaluated}</span></li>
                   <li className="flex justify-between text-slate-400"><span>No Aplica (Excluidos):</span> <span className="font-medium">{kpis.implCounts.notApplicable}</span></li>
                 </ul>
               ) : (
                 <ul className="space-y-2 text-sm text-slate-600">
                   <li className="flex justify-between"><span>Controles Implementados (100%):</span> <span className="font-medium text-slate-900">{((kpis?.maturityCounts?.L4 || 0) + (kpis?.maturityCounts?.L5 || 0))}</span></li>
                   <li className="flex justify-between"><span>Controles en Proceso (50%):</span> <span className="font-medium text-slate-900">{((kpis?.maturityCounts?.L2 || 0) + (kpis?.maturityCounts?.L3 || 0))}</span></li>
                   <li className="flex justify-between"><span>Controles No Implementados (0%):</span> <span className="font-medium text-slate-900">{((kpis?.maturityCounts?.L0 || 0) + (kpis?.maturityCounts?.L1 || 0))}</span></li>
                 </ul>
               )}
             </div>
             <p className="text-xs text-slate-500 mt-4">Para mejorar este indicador, dirígete a la pestaña de Gap Assessment y actualiza el estado de las brechas identificadas.</p>
          </div>
        );
      case 'Evidencia': {
        const evCounts: any = kpis?.evidenceCounts || { valid: 0, expiring: 0, expired: 0, pending: 0, rejected: 0, none: 0 };
        const totalEv: number = (Object.values(evCounts).reduce((a: any, b: any) => Number(a) + Number(b), 0) as number) || 1;
        const validPct = Math.round((Number(evCounts.valid) / totalEv) * 100);
        const expiredPct = Math.round((Number(evCounts.expired) / totalEv) * 100);
        const nonePct = Math.round((Number(evCounts.none) / totalEv) * 100);

        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Representa la cobertura de elementos normativos con evidencia válida adjunta, penalizando aquellas evidencias que se encuentran vencidas o han sido rechazadas en revisiones.</p>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h4 className="font-semibold text-slate-800 mb-2">Estado de Evidencias</h4>
               <ul className="space-y-2 text-sm text-slate-600">
                 <li className="flex justify-between"><span>Evidencias Vigentes:</span> <span className="font-medium text-emerald-600">{validPct}%</span></li>
                 <li className="flex justify-between"><span>Evidencias Vencidas:</span> <span className="font-medium text-rose-600">{expiredPct}%</span></li>
                 <li className="flex justify-between"><span>Sin Evidencia:</span> <span className="font-medium text-slate-900">{nonePct}%</span></li>
               </ul>
             </div>
          </div>
        );
      }
      case 'Eficacia':
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Mide qué tan efectivos están siendo los controles en la práctica, basado en los resultados de las últimas pruebas y auditorías de controles (Anexo A).</p>
             <div className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200 text-sm">
               Existen {kpis?.notTestedCount || 0} controles aplicables que aún no han sido probados formalmente. Realizar pruebas de diseño y operación aumentará este indicador.
             </div>
          </div>
        );
      case 'Audit Readiness':
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Un cálculo integral que determina qué tan preparada está la organización para afrontar una auditoría de certificación formal de manera exitosa.</p>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h4 className="font-semibold text-slate-800 mb-2">Fórmula de Preparación (Requiere todas las dimensiones)</h4>
               <ul className="space-y-2 text-sm text-slate-600">
                 <li className="flex justify-between"><span>Implementación (30% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasImplementationData ?? true) ? (kpis?.implementation || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Evidencia (30% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasEvidenceData ?? true) ? (kpis?.evidence || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Eficacia de Controles (25% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasEfficacyData ?? true) ? (kpis?.efficacy || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Acciones y Riesgos (15% peso):</span> <span className="font-medium text-slate-900">Validado</span></li>
               </ul>
             </div>
          </div>
        );
      case 'Risk Exposure':
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">El nivel de exposición global de la organización basado en los riesgos residuales que se encuentran actualmente fuera del apetito o tolerancia definidos.</p>
             <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
               <h4 className="font-semibold text-rose-800 mb-2">Factores Críticos a Mitigar</h4>
               <ul className="space-y-2 text-sm text-rose-700">
                 <li className="flex items-center"><ShieldAlert className="w-4 h-4 mr-2" /> Riesgos Críticos sin plan de tratamiento</li>
                 <li className="flex items-center"><ShieldAlert className="w-4 h-4 mr-2" /> Planes de acción de riesgos vencidos</li>
               </ul>
             </div>
          </div>
        );
      default:
        return <p className="text-sm text-slate-600">No hay detalles adicionales disponibles.</p>;
    }
  };

  const isImplData = kpis?.hasImplementationData ?? true;
  const isEvData = kpis?.hasEvidenceData ?? true;
  const isEffData = kpis?.hasEfficacyData ?? true;
  const isAuditData = kpis?.hasAuditReadinessData ?? true;
  const isRiskData = kpis?.hasRiskData ?? true;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Implementación"
          value={isImplData ? kpis?.implementation : 'No evaluado'}
          previousValue={(kpis?.implementation || 0) - (variation.implementation || 0)}
          color="#0ea5e9"
          icon={Target}
          compare={compare && isImplData}
          tooltip="Promedio de estado de requisitos aplicables."
          onExplore={() => setSelectedKpi('Implementación')}
        />
        <KpiCard
          title="Evidencia"
          value={isEvData ? kpis?.evidence : 'Sin datos'}
          previousValue={(kpis?.evidence || 0) - (variation.evidence || 0)}
          color="#8b5cf6"
          icon={FileCheck}
          compare={compare && isEvData}
          tooltip="Cobertura de elementos normativos con evidencia válida."
          onExplore={() => setSelectedKpi('Evidencia')}
        />
        <KpiCard
          title="Eficacia"
          value={isEffData ? kpis?.efficacy : 'Sin evaluar'}
          previousValue={(kpis?.efficacy || 0) - (variation.efficacy || 0)}
          color="#f59e0b"
          icon={CheckCircle2}
          compare={compare && isEffData}
          tooltip={`Eficacia basada en pruebas. ${kpis?.notTestedCount || 0} controles aún sin probar.`}
          onExplore={() => setSelectedKpi('Eficacia')}
        />
        <KpiCard
          title="Audit Readiness"
          value={isAuditData ? kpis?.auditReadiness : 'Datos insuficientes'}
          previousValue={(kpis?.auditReadiness || 0) - (variation.auditReadiness || 0)}
          color="#10b981"
          icon={ShieldCheck}
          compare={compare && isAuditData}
          tooltip="Requiere Implementación, Evidencia, Eficacia y Auditoría para ser calculable."
          onExplore={() => setSelectedKpi('Audit Readiness')}
        />
        <KpiCard
          title="Risk Exposure"
          value={isRiskData ? (kpis?.riskExposure || 0) : 'Sin datos'}
          previousValue={kpis?.riskExposure || 0}
          color="#f43f5e"
          icon={ShieldAlert}
          compare={compare && isRiskData}
          inverseBad={true}
          tooltip="Nivel de exposición global basado en riesgos residuales."
          onExplore={() => setSelectedKpi('Risk Exposure')}
        />
      </div>

      <SlideOver
        isOpen={!!selectedKpi}
        onClose={() => setSelectedKpi(null)}
        title={`Detalle de KPI: ${selectedKpi}`}
        description="Análisis detallado de los componentes que forman este indicador."
      >
        <div className="mt-4">
          {getKpiDetails()}
        </div>
      </SlideOver>
    </>
  );
}
