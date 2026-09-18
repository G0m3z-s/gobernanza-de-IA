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
  icon: Icon,
  tooltip,
  compare,
  inverseBad = false,
  onExplore,
  subtitle,
}: any) {
  const isStringValue = typeof value === 'string';
  const numValue = isStringValue ? 0 : (value || 0);
  const variation = numValue - (previousValue || 0);
  const isPositive = inverseBad ? variation < 0 : variation > 0;
  const isNeutral = variation === 0;

  let valueColor = "text-[var(--text-primary)]";
  if (!isStringValue) {
    if (inverseBad) {
      if (numValue > 60) valueColor = "text-rose-600";
      else if (numValue > 30) valueColor = "text-amber-500";
      else valueColor = "text-emerald-600";
    } else {
      if (numValue >= 85) valueColor = "text-emerald-600";
      else if (numValue >= 60) valueColor = "text-amber-500";
      else valueColor = "text-rose-600";
    }
  }

  return (
    <div className="bg-white rounded border border-[var(--border)] p-4 shadow-sm flex flex-col h-full relative group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
          <h3 className="text-sm font-medium text-[var(--text-secondary)]">
            {title}
          </h3>
        </div>
        <div className="text-slate-300 hover:text-slate-500 cursor-help relative">
          <Info className="w-4 h-4" />
          <div className="absolute hidden group-hover:block w-56 bg-slate-800 text-white text-xs p-2.5 rounded shadow-lg right-0 top-6 z-10 font-normal normal-case">
            {tooltip}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center my-2">
        <div className="flex items-baseline space-x-2">
          <span className={`font-semibold ${isStringValue ? 'text-lg text-[var(--text-muted)]' : `text-3xl ${valueColor}`}`}>
            {isStringValue ? value : `${value || 0}%`}
          </span>
          {compare && !isNeutral && !isStringValue && (
            <span
              className={`flex items-center text-xs font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {Math.abs(variation)}%
            </span>
          )}
        </div>
        {subtitle && (
          <div className="mt-1 text-xs">
            {subtitle}
          </div>
        )}
      </div>

      <div className="mt-2 pt-3 border-t border-[var(--border)] flex justify-end">
        <button 
          onClick={onExplore}
          className="text-xs font-medium text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors"
        >
          Ver detalle &rarr;
        </button>
      </div>
    </div>
  );
}

export function KPIWidgets({ kpis, compare }: any) {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);

  const getKpiDetails = () => {
    switch(selectedKpi) {
      case 'Implementación':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Mide el porcentaje de requisitos normativos aplicables que han sido documentados o implementados en el sistema de gestión.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Fórmula de cálculo</h4>
              <p className="text-sm font-mono text-slate-600">
                (Req. Implementados + Req. Documentados) / Total Req. Aplicables
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-2">Estado actual</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-600">Requisitos aplicables:</span>
                  <span className="font-bold">{kpis?.details?.totalApplicable || 0}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-600">Cumplimiento aceptable:</span>
                  <span className="font-bold">{kpis?.details?.acceptableStatus || 0}</span>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Evidencia':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Mide el porcentaje de requisitos implementados que cuentan con evidencia documental vigente y válida.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Fórmula de cálculo</h4>
              <p className="text-sm font-mono text-slate-600">
                Controles con Evidencia Válida / Total Controles Implementados
              </p>
            </div>
          </div>
        );
      case 'Eficacia':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Mide qué porcentaje de los controles implementados y probados demostraron ser efectivos para mitigar el riesgo asociado.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Fórmula de cálculo</h4>
              <p className="text-sm font-mono text-slate-600">
                (Efectivos + (Parcialmente * 0.5)) / Total Controles Probados
              </p>
            </div>
            {kpis?.effectivenessCoverage && (
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Cobertura de pruebas</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-600">Controles requeridos:</span>
                    <span className="font-bold">{kpis.effectivenessCoverage.applicable}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-600">Controles probados:</span>
                    <span className="font-bold">{kpis.effectivenessCoverage.evaluated}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      case 'Audit Readiness':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Índice compuesto que evalúa la madurez general del sistema y su preparación para enfrentar una auditoría de certificación.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Ponderación</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Implementación: 40%</li>
                <li>• Evidencia: 30%</li>
                <li>• Eficacia: 20%</li>
                <li>• Auditoría Interna: 10%</li>
              </ul>
            </div>
          </div>
        );
      case 'Risk Exposure':
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Mide el nivel de riesgo residual del sistema. Un valor más alto indica mayor exposición a riesgos no tratados.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">Rangos de exposición</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-emerald-600"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>0-30%: Aceptable</li>
                <li className="flex items-center text-amber-500"><div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>31-60%: Precaución</li>
                <li className="flex items-center text-rose-600"><div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>&gt;60%: Crítico</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isImplData = typeof kpis?.implementation === 'number';
  const isEvData = typeof kpis?.evidence === 'number';
  const isEffData = typeof kpis?.efficacy === 'number';
  const isAuditData = typeof kpis?.auditReadiness === 'number';
  const isRiskData = typeof kpis?.riskExposure === 'number';

  const variation = kpis?.variation || {};

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Implementación"
          value={isImplData ? kpis?.implementation : 'No evaluado'}
          previousValue={(kpis?.implementation || 0) - (variation.implementation || 0)}
          icon={Target}
          compare={compare && isImplData}
          tooltip="Promedio de estado de requisitos aplicables."
          onExplore={() => setSelectedKpi('Implementación')}
        />
        <KpiCard
          title="Evidencia"
          value={isEvData ? kpis?.evidence : 'Sin datos'}
          previousValue={(kpis?.evidence || 0) - (variation.evidence || 0)}
          icon={FileCheck}
          compare={compare && isEvData}
          tooltip="Cobertura de elementos normativos con evidencia válida."
          onExplore={() => setSelectedKpi('Evidencia')}
        />
        <KpiCard
          title="Eficacia"
          value={isEffData ? kpis?.efficacy : 'Sin evaluar'}
          subtitle={kpis?.effectivenessCoverage ? (
            kpis.effectivenessCoverage.evaluated < kpis.effectivenessCoverage.applicable
              ? <span className="text-slate-500 font-medium">Cobertura parcial: {kpis.effectivenessCoverage.evaluated} de {kpis.effectivenessCoverage.applicable} evaluados</span>
              : <span className="text-emerald-600 font-medium">Cobertura completa: {kpis.effectivenessCoverage.evaluated} de {kpis.effectivenessCoverage.applicable} evaluados</span>
          ) : undefined}
          previousValue={(kpis?.efficacy || 0) - (variation.efficacy || 0)}
          icon={CheckCircle2}
          compare={compare && isEffData}
          tooltip={`Eficacia basada en pruebas. ${kpis?.notTestedCount || 0} controles aún sin probar.`}
          onExplore={() => setSelectedKpi('Eficacia')}
        />
        <KpiCard
          title="Audit Readiness"
          value={isAuditData ? kpis?.auditReadiness : 'Datos insuficientes'}
          previousValue={(kpis?.auditReadiness || 0) - (variation.auditReadiness || 0)}
          icon={ShieldCheck}
          compare={compare && isAuditData}
          tooltip="Requiere Implementación, Evidencia, Eficacia y Auditoría para ser calculable."
          onExplore={() => setSelectedKpi('Audit Readiness')}
        />
        <KpiCard
          title="Risk Exposure"
          value={isRiskData ? (kpis?.riskExposure || 0) : 'Sin datos'}
          previousValue={kpis?.riskExposure || 0}
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
