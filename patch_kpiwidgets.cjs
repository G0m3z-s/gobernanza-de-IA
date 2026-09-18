const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const targetSlideOver = `      case 'Eficacia':
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Mide qué tan efectivos están siendo los controles en la práctica, basado en los resultados de las últimas pruebas y auditorías de controles (Anexo A).</p>
             <div className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200 text-sm">
               Existen {kpis?.notTestedCount || 0} controles aplicables que aún no han sido probados formalmente. Realizar pruebas de diseño y operación aumentará este indicador.
             </div>
          </div>
        );`;

const newSlideOver = `      case 'Eficacia':
        return (
          <div className="space-y-4">
             <p className="text-sm text-slate-600">Mide qué tan efectivos están siendo los controles en la práctica, basado en los resultados de las últimas pruebas de controles reales.</p>
             {kpis?.effectivenessCoverage ? (
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                 <h4 className="font-semibold text-slate-800 mb-2">Cobertura de Evaluación</h4>
                 <ul className="space-y-2 text-sm text-slate-600 mb-4">
                   <li className="flex justify-between"><span>Controles aplicables:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.applicable}</span></li>
                   <li className="flex justify-between"><span>Controles evaluados:</span> <span className="font-medium text-slate-900">{kpis.effectivenessCoverage.evaluated}</span></li>
                   <li className="flex justify-between"><span>Sin evaluar:</span> <span className="font-medium text-slate-900">{kpis.notTestedCount || 0}</span></li>
                 </ul>
                 <p className="text-xs text-slate-500 italic">Los resultados se basan prioritariamente en pruebas de eficacia concluyentes (COMPLETED o REVIEWED). Si no existen, utilizan la evaluación manual anterior (legacy) si está disponible.</p>
               </div>
             ) : (
               <div className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200 text-sm">
                 Existen {kpis?.notTestedCount || 0} controles aplicables que aún no han sido probados formalmente.
               </div>
             )}
          </div>
        );`;

content = content.replace(targetSlideOver, newSlideOver);

const targetCard = `        <KpiCard
          title="Eficacia"
          value={isEffData ? kpis?.efficacy : 'Sin evaluar'}
          previousValue={(kpis?.efficacy || 0) - (variation.efficacy || 0)}
          color="#f59e0b"
          icon={CheckCircle2}
          compare={compare && isEffData}
          tooltip={\`Eficacia basada en pruebas. \${kpis?.notTestedCount || 0} controles aún sin probar.\`}
          onExplore={() => setSelectedKpi('Eficacia')}
        />`;

const newCard = `        <KpiCard
          title="Eficacia"
          value={isEffData ? kpis?.efficacy : 'Sin evaluar'}
          subtitle={kpis?.effectivenessCoverage ? \`\${kpis.effectivenessCoverage.evaluated} de \${kpis.effectivenessCoverage.applicable} controles aplicables evaluados\` : undefined}
          previousValue={(kpis?.efficacy || 0) - (variation.efficacy || 0)}
          color="#f59e0b"
          icon={CheckCircle2}
          compare={compare && isEffData}
          tooltip={\`Eficacia basada en pruebas. \${kpis?.notTestedCount || 0} controles aún sin probar.\`}
          onExplore={() => setSelectedKpi('Eficacia')}
        />`;

content = content.replace(targetCard, newCard);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
console.log('patched KPIWidgets Eficacia');
