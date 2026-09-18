import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, Plus, Filter, Target } from "lucide-react";
import { SlideOver } from "../components/ui/SlideOver";
import { RiskForm } from "../components/forms/RiskForm";
import { RiskDetailsSlideOver } from "../components/ui/RiskDetailsSlideOver";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import { DataTableShell } from "../components/ui/DataTableShell";

export function RiskHub() {
  const { data, fetchData, loading , clearData} = useStore();
  const { currentOrgId } = useAuth();
  
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<any>(null);

  useEffect(() => {
    if (currentOrgId) {
      if (!data || data.organization?.id !== currentOrgId) {
        fetchData(currentOrgId);
      }
    } else {
      clearData();
    }
  }, [fetchData, currentOrgId, data, clearData]);

  if (loading || !data)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-[var(--brand-accent)] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-[var(--text-secondary)] font-medium">
            Cargando Risk Hub...
          </p>
        </div>
      </div>
    );

  return (
    <div className="space-y-4 max-w-[1920px] mx-auto w-full pb-12">
      <PageHeader 
        title="Registro de Riesgos"
        description="Identificación, evaluación y tratamiento de riesgos del Sistema de Gestión de IA."
        primaryAction={{
          label: "Identificar Riesgo",
          icon: Plus,
          onClick: () => setIsSlideOverOpen(true)
        }}
        secondaryAction={{
          label: "Risk Radar",
          icon: Target,
          onClick: () => {}
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-1">
            Total Riesgos Activos
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">
            {data.risks.length}
          </span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-600 mb-1">
            Riesgos Críticos
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">
            {data.risks.filter((r) => r.level === "Crítico").length}
          </span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 mb-1">
            Riesgos Altos
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">
            {data.risks.filter((r) => r.level === "Alto").length}
          </span>
        </div>
        <div className="bg-white p-4 rounded border border-[var(--border)] shadow-sm flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] mb-1">
            Con Tratamiento
          </span>
          <span className="text-xl font-bold text-[var(--text-primary)]">
            {data.risks.filter((r) => r.status === "Tratado").length}
          </span>
        </div>
      </div>

      <DataTableShell
        title="Inventario de Riesgos"
        icon={ShieldAlert}
        headerActions={
          <button className="inline-flex items-center px-3 py-1.5 bg-white border border-[var(--border)] text-[var(--text-secondary)] text-xs font-medium rounded hover:bg-slate-50 transition-colors">
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            Filtros
          </button>
        }
      >
        <table className="min-w-full text-sm text-left">
          <thead className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider bg-slate-50/50 border-b border-[var(--border)]">
            <tr>
              <th className="px-4 py-3 font-semibold">
                Descripción del Riesgo
              </th>
              <th className="px-4 py-3 font-semibold">
                Categoría
              </th>
              <th className="px-4 py-3 font-semibold">
                Nivel (Inherente)
              </th>
              <th className="px-4 py-3 font-semibold">
                Estado de Tratamiento
              </th>
              <th className="px-4 py-3 text-right font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {data.risks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[var(--text-secondary)] text-sm">
                  No hay riesgos registrados.
                </td>
              </tr>
            ) : data.risks.map((risk) => (
              <tr
                key={risk.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-[var(--text-primary)]">{risk.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wider">
                    ID: {risk.id}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-[var(--text-secondary)]">
                    {risk.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge 
                    status={
                      risk.level === "Crítico" ? "danger" :
                      risk.level === "Alto" ? "warning" :
                      risk.level === "Medio" ? "info" : "success"
                    }
                  >
                    {risk.level}
                  </StatusBadge>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge 
                    status={
                      risk.status === "Tratado" ? "success" :
                      risk.status === "Aceptado" ? "warning" : "danger"
                    }
                    dot
                  >
                    {risk.status}
                  </StatusBadge>
                </td>
                <td className="px-4 py-3 text-right">
                  <button 
                    className="text-xs font-medium text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors"
                    onClick={() => setSelectedRisk(risk)}
                  >
                    Detalle &rarr;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableShell>
      
      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title="Registrar Nuevo Riesgo"
        description="Añade un nuevo riesgo a la matriz. Se evaluará automáticamente contra los controles."
      >
        <RiskForm 
          onSuccess={() => setIsSlideOverOpen(false)}
          onCancel={() => setIsSlideOverOpen(false)}
        />
      </SlideOver>

      <RiskDetailsSlideOver
        isOpen={!!selectedRisk}
        onClose={() => setSelectedRisk(null)}
        risk={selectedRisk}
      />
    </div>
  );
}
