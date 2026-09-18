const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const targetSlideOver = `                 <ul className="space-y-2 text-sm text-slate-600 mb-4">
                   <li className="flex justify-between"><span>Controles aplicables:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.applicable}</span></li>
                   <li className="flex justify-between"><span>Controles evaluados:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.evaluated}</span></li>
                   <li className="flex justify-between"><span>Sin evaluar:</span> <span className="font-medium text-slate-900">{kpis.notTestedCount || 0}</span></li>
                 </ul>`;

const newSlideOver = `                 <ul className="space-y-2 text-sm text-slate-600 mb-4">
                   <li className="flex justify-between font-semibold border-b pb-1"><span>Universo:</span></li>
                   <li className="flex justify-between"><span>Controles aplicables:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.applicable}</span></li>
                   <li className="flex justify-between"><span>Controles evaluados:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.evaluated}</span></li>
                   <li className="flex justify-between"><span>Sin evaluar:</span> <span className="font-medium text-amber-600">{kpis.effectivenessCoverage.notTestedCount || kpis.notTestedCount || 0}</span></li>
                   
                   <li className="flex justify-between font-semibold border-b pb-1 mt-4"><span>Resultados:</span></li>
                   <li className="flex justify-between"><span>Efectivos:</span> <span className="font-medium text-emerald-600">{kpis.effectivenessCoverage.effectiveCount || 0}</span></li>
                   <li className="flex justify-between"><span>Parcialmente efectivos:</span> <span className="font-medium text-amber-600">{kpis.effectivenessCoverage.partialCount || 0}</span></li>
                   <li className="flex justify-between"><span>Ineficaces:</span> <span className="font-medium text-rose-600">{kpis.effectivenessCoverage.ineffectiveCount || 0}</span></li>
                   
                   <li className="flex justify-between font-semibold border-b pb-1 mt-4"><span>Fuente de Datos:</span></li>
                   <li className="flex justify-between"><span>Pruebas reales:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.realTestCount || 0}</span></li>
                   <li className="flex justify-between"><span>Fallback legacy:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.legacyCount || 0}</span></li>
                 </ul>`;

content = content.replace(targetSlideOver, newSlideOver);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
console.log('patched KPIWidgets detailed breakdown');
