const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const oldLine = `          subtitle={kpis?.effectivenessCoverage ? \`\${kpis.effectivenessCoverage.evaluated} de \${kpis.effectivenessCoverage.applicable} controles aplicables evaluados\` : undefined}`;
const newLine = `          subtitle={kpis?.effectivenessCoverage ? (
            kpis.effectivenessCoverage.evaluated < kpis.effectivenessCoverage.applicable
              ? <span className="text-slate-500 font-medium">Cobertura parcial: {kpis.effectivenessCoverage.evaluated} de {kpis.effectivenessCoverage.applicable} evaluados</span>
              : <span className="text-emerald-600 font-medium">Cobertura completa: {kpis.effectivenessCoverage.evaluated} de {kpis.effectivenessCoverage.applicable} evaluados</span>
          ) : undefined}`;

content = content.replace(oldLine, newLine);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
console.log('patched KPIWidgets coverage display');
