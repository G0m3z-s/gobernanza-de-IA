const fs = require('fs');

let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

// Change "Sin cambios" to "Sin histórico"
content = content.replace(/>\s*Sin cambios\s*<\/span>/, '>Sin histórico</span>');

// Replace evidence hardcoded values
const getKpiDetailsOld = `      case 'Evidencia':
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Representa la cobertura de controles con evidencia válida adjunta, penalizando aquellas evidencias que se encuentran vencidas o han sido rechazadas en revisiones.</p>
             <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h4 className="font-semibold text-slate-800 mb-2">Estado de Evidencias</h4>
               <ul className="space-y-2 text-sm text-slate-600">
                 <li className="flex justify-between"><span>Evidencias Vigentes:</span> <span className="font-medium text-emerald-600">45%</span></li>
                 <li className="flex justify-between"><span>Evidencias Vencidas:</span> <span className="font-medium text-rose-600">12%</span></li>
                 <li className="flex justify-between"><span>Sin Evidencia:</span> <span className="font-medium text-slate-900">43%</span></li>
               </ul>
             </div>
          </div>
        );`;

const evCode = `      case 'Evidencia': {
        const evCounts = kpis?.evidenceCounts || { valid: 0, expiring: 0, expired: 0, pending: 0, rejected: 0, none: 0 };
        const totalEv = Object.values(evCounts).reduce((a, b) => (a) + (b), 0) || 1;
        const validPct = Math.round((evCounts.valid / totalEv) * 100);
        const expiredPct = Math.round((evCounts.expired / totalEv) * 100);
        const nonePct = Math.round((evCounts.none / totalEv) * 100);
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Representa la cobertura de controles con evidencia válida adjunta, penalizando aquellas evidencias que se encuentran vencidas o han sido rechazadas en revisiones.</p>
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
      }`;
content = content.replace(getKpiDetailsOld, evCode);

// Replace Risk Exposure hardcoded values
const riskExpOld = `        <KpiCard
          title="Risk Exposure"
          value={45}
          previousValue={50}
          color="#f43f5e"
          icon={ShieldAlert}
          compare={compare}
          inverseBad={true}
          tooltip="Nivel de exposición global basado en riesgos residuales fuera de tolerancia."
          onExplore={() => setSelectedKpi('Risk Exposure')}
        />`;

const riskExpNew = `        <KpiCard
          title="Risk Exposure"
          value={kpis?.riskExposure || 0}
          previousValue={kpis?.riskExposure || 0}
          color="#f43f5e"
          icon={ShieldAlert}
          compare={compare}
          inverseBad={true}
          tooltip="Nivel de exposición global basado en riesgos residuales fuera de tolerancia."
          onExplore={() => setSelectedKpi('Risk Exposure')}
        />`;

content = content.replace(riskExpOld, riskExpNew);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
