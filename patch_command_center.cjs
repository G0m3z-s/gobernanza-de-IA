const fs = require('fs');
let content = fs.readFileSync('src/pages/CommandCenter.tsx', 'utf8');

// Title changes
content = content.replace(
  /<h1 className="text-2xl font-bold text-slate-900 tracking-tight">Command Center<\/h1>/,
  '<h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Command Center</h1>'
);
content = content.replace(
  /<p className="text-sm text-slate-500 mt-1">\s*Índice interno de salud y preparación del sistema\.\s*<\/p>/,
  '<p className="text-sm text-[var(--text-secondary)] mt-1">Visión ejecutiva del Sistema de Gestión de IA</p>'
);

// Grid modifications
const oldGrid = `      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ActionCenter data={data} />
        </div>
        <div className="lg:col-span-2">
          <NormativeStatus data={data} standard={filters.standard} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MaturityDistribution kpis={kpis} />
        </div>
        <div className="lg:col-span-2">
          <EvolutionChart snapshots={data.healthSnapshots} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ObjectivesStatus data={data} />
        <ActivityList data={data} />
      </div>`;

const newGrid = `      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <NormativeStatus data={data} standard={filters.standard} />
          <EvolutionChart snapshots={data.healthSnapshots} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <ActionCenter data={data} />
          <MaturityDistribution kpis={kpis} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ObjectivesStatus data={data} />
        <ActivityList data={data} />
      </div>`;

content = content.replace(oldGrid, newGrid);

// Change root padding
content = content.replace(
  /<div className="space-y-6 pb-12">/,
  '<div className="space-y-4 pb-12">'
);

fs.writeFileSync('src/pages/CommandCenter.tsx', content);
console.log('patched CommandCenter.tsx');
