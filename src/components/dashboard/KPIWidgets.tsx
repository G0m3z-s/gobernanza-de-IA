import React from "react";
import {
  ShieldCheck,
  Target,
  FileCheck,
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function KpiCard({
  title,
  value,
  previousValue,
  color,
  icon: Icon,
  tooltip,
  compare,
  inverseBad = false,
}: any) {
  const variation = (value || 0) - (previousValue || 0);
  const isPositive = inverseBad ? variation < 0 : variation > 0;
  const isNeutral = variation === 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative group">
      <div className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 cursor-help">
        <Info className="w-4 h-4" />
        <div className="absolute hidden group-hover:block w-48 bg-slate-800 text-white text-xs p-2 rounded right-0 top-6 z-10 shadow-lg">
          {tooltip}
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            {title}
          </h3>
          <div className="flex items-baseline mt-1">
            <span className="text-3xl font-bold text-slate-800">
              {value || 0}%
            </span>
            {compare && !isNeutral && (
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
            {compare && isNeutral && (
              <span className="ml-2 text-xs font-medium text-slate-400">
                Sin cambios
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {(value || 0) >= 80
            ? "Óptimo"
            : (value || 0) >= 60
              ? "Aceptable"
              : "En Atención"}
        </span>
        <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 uppercase">
          Ver Detalle
        </button>
      </div>
    </div>
  );
}

export function KPIWidgets({ kpis, compare }: { kpis: any; compare: boolean }) {
  const variation = kpis?.variation || {
    implementation: 0,
    evidence: 0,
    efficacy: 0,
    auditReadiness: 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <KpiCard
        title="Implementación"
        value={kpis?.implementation}
        previousValue={
          (kpis?.implementation || 0) - (variation.implementation || 0)
        }
        color="#0ea5e9"
        icon={Target}
        compare={compare}
        tooltip="Promedio de estado de requisitos y controles (Documentado = 40%, Implementado = 70%, etc.)"
      />
      <KpiCard
        title="Evidencia"
        value={kpis?.evidence}
        previousValue={(kpis?.evidence || 0) - (variation.evidence || 0)}
        color="#8b5cf6"
        icon={FileCheck}
        compare={compare}
        tooltip="Cobertura de controles con evidencia válida. Penaliza evidencias vencidas o rechazadas."
      />
      <KpiCard
        title="Eficacia"
        value={kpis?.efficacy}
        previousValue={(kpis?.efficacy || 0) - (variation.efficacy || 0)}
        color="#f59e0b"
        icon={CheckCircle2}
        compare={compare}
        tooltip={`Eficacia basada en pruebas. ${kpis?.notTestedCount || 0} controles aún sin probar.`}
      />
      <KpiCard
        title="Audit Readiness"
        value={kpis?.auditReadiness}
        previousValue={
          (kpis?.auditReadiness || 0) - (variation.auditReadiness || 0)
        }
        color="#10b981"
        icon={ShieldCheck}
        compare={compare}
        tooltip="Cálculo determinista: 30% Imp, 30% Ev, 25% Efi, 15% Acciones. Resta por riesgos críticos."
      />
      <KpiCard
        title="Risk Exposure"
        value={45}
        previousValue={50}
        color="#f43f5e"
        icon={ShieldAlert}
        compare={compare}
        inverseBad={true}
        tooltip="Nivel de exposición global basado en riesgos residuales fuera de tolerancia."
      />
    </div>
  );
}
