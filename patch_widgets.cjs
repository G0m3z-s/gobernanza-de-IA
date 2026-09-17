const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const targetAuditDetail = `<h4 className="font-semibold text-slate-800 mb-2">Fórmula de Preparación (Ponderación Dinámica)</h4>`;
const replaceAuditDetail = `<h4 className="font-semibold text-slate-800 mb-2">Fórmula de Preparación (Requiere todas las dimensiones)</h4>`;
content = content.replace(targetAuditDetail, replaceAuditDetail);

const targetAuditReadinessTooltip = `tooltip="Cálculo dinámico basado en dimensiones con datos (Imp, Ev, Efi, Acciones)."`;
const replaceAuditReadinessTooltip = `tooltip="Requiere Implementación, Evidencia, Eficacia y Auditoría para ser calculable."`;
content = content.replace(targetAuditReadinessTooltip, replaceAuditReadinessTooltip);

const targetIsAuditData = `value={isAuditData ? kpis?.auditReadiness : 'Insuficiente'}`;
const replaceIsAuditData = `value={isAuditData ? kpis?.auditReadiness : 'Datos insuficientes'}`;
content = content.replace(targetIsAuditData, replaceIsAuditData);

const targetIsRiskData = `const isAuditData = kpis?.hasAuditReadinessData ?? true;`;
const replaceIsRiskData = `const isAuditData = kpis?.hasAuditReadinessData ?? true;
  const isRiskData = kpis?.hasRiskData ?? true;`;
content = content.replace(targetIsRiskData, replaceIsRiskData);

const targetRiskValue = `value={kpis?.riskExposure || 0}
          previousValue={kpis?.riskExposure || 0}`;
const replaceRiskValue = `value={isRiskData ? (kpis?.riskExposure || 0) : 'Sin datos'}
          previousValue={kpis?.riskExposure || 0}`;
content = content.replace(targetRiskValue, replaceRiskValue);

const targetRiskCompare = `compare={compare}
          inverseBad={true}`;
const replaceRiskCompare = `compare={compare && isRiskData}
          inverseBad={true}`;
content = content.replace(targetRiskCompare, replaceRiskCompare);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
console.log("Success patch widgets");
