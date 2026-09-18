const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const targetSlideOver = `               <h4 className="font-semibold text-slate-800 mb-2">Fórmula de Preparación (Requiere todas las dimensiones)</h4>
               <ul className="space-y-2 text-sm text-slate-600">
                 <li className="flex justify-between"><span>Implementación (30% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasImplementationData ?? true) ? (kpis?.implementation || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Evidencia (30% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasEvidenceData ?? true) ? (kpis?.evidence || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Eficacia de Controles (25% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasEfficacyData ?? true) ? (kpis?.efficacy || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Acciones y Riesgos (15% peso):</span> <span className="font-medium text-slate-900">Validado</span></li>
               </ul>`;

const newSlideOver = `               <h4 className="font-semibold text-slate-800 mb-2">Fórmula de Preparación</h4>
               <ul className="space-y-2 text-sm text-slate-600 mb-4">
                 <li className="flex justify-between"><span>Implementación (30% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasImplementationData ?? true) ? (kpis?.implementation || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Evidencia (30% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasEvidenceData ?? true) ? (kpis?.evidence || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Eficacia de Controles (25% peso):</span> <span className="font-medium text-slate-900">{(kpis?.hasEfficacyData ?? true) ? (kpis?.efficacy || 0) + '%' : 'Sin datos'}</span></li>
                 <li className="flex justify-between"><span>Acciones y Riesgos (15% peso):</span> <span className="font-medium text-slate-900">Validado</span></li>
               </ul>
               {(!kpis?.hasAuditReadinessData) && (
                 <p className="text-xs text-amber-700 italic border-t border-amber-200 pt-2 mt-2">
                   Faltan datos o la cobertura de eficacia no es del 100%. El Audit Readiness no puede presentarse como un resultado plenamente respaldado.
                 </p>
               )}`;

content = content.replace(targetSlideOver, newSlideOver);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
console.log('patched KPIWidgets audit readiness slideover');
