const fs = require('fs');

// Patch EvolutionChart
let evo = fs.readFileSync('src/components/dashboard/EvolutionChart.tsx', 'utf8');

evo = evo.replace(
  /className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-\[320px\] flex flex-col"/,
  'className="bg-white rounded border border-[var(--border)] p-5 shadow-sm h-[320px] flex flex-col"'
);
evo = evo.replace(
  /<h2 className="text-lg font-semibold text-slate-800 mb-4">/g,
  '<h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">'
);
evo = evo.replace(
  /className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"/,
  'className="bg-white rounded border border-[var(--border)] p-5 shadow-sm h-full flex flex-col"'
);
evo = evo.replace(
  /<div className="h-64">/,
  '<div className="flex-1 min-h-[250px]">'
);
evo = evo.replace(
  /stroke="#0ea5e9"/,
  'stroke="#0ea5e9"' // implementation
);
evo = evo.replace(
  /stroke="#8b5cf6"/,
  'stroke="#8b5cf6"' // evidence
);
evo = evo.replace(
  /stroke="#f59e0b"/,
  'stroke="#f59e0b"' // efficacy
);
evo = evo.replace(
  /stroke="#10b981"/,
  'stroke="#0f766e"' // global health teal
);

fs.writeFileSync('src/components/dashboard/EvolutionChart.tsx', evo);


// Patch MaturityDistribution
let mat = fs.readFileSync('src/components/dashboard/MaturityDistribution.tsx', 'utf8');

mat = mat.replace(
  /className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"/,
  'className="bg-white rounded border border-[var(--border)] p-5 shadow-sm h-full flex flex-col"'
);
mat = mat.replace(
  /<div className="flex justify-between items-center mb-6">/,
  '<div className="flex justify-between items-center mb-4 border-b border-[var(--border)] pb-3">'
);
mat = mat.replace(
  /<h2 className="text-lg font-semibold text-slate-800">Distribución de Madurez<\/h2>/,
  '<h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Distribución de Madurez</h2>'
);
mat = mat.replace(
  /<p className="text-sm text-slate-500">Controles por nivel de madurez<\/p>/,
  ''
);
mat = mat.replace(
  /<div className="h-64">/,
  '<div className="flex-1 min-h-[200px] mt-2">'
);
mat = mat.replace(
  /<p className="text-2xl font-bold text-slate-800">/,
  '<p className="text-xl font-bold text-[var(--text-primary)]">'
);
mat = mat.replace(
  /<p className="text-xs text-slate-500 uppercase font-semibold">Controles Aplicables<\/p>/,
  '<p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Ctrls. Aplicables</p>'
);

// Mute the colors slightly for corporate feel
mat = mat.replace(
  /color: '#f43f5e'/,
  "color: '#e11d48'" // rose-600
);
mat = mat.replace(
  /color: '#fb923c'/,
  "color: '#f59e0b'" // amber-500
);
mat = mat.replace(
  /color: '#facc15'/,
  "color: '#eab308'" // yellow-500
);
mat = mat.replace(
  /color: '#4ade80'/,
  "color: '#10b981'" // emerald-500
);
mat = mat.replace(
  /color: '#2dd4bf'/,
  "color: '#0ea5e9'" // sky-500
);
mat = mat.replace(
  /color: '#0ea5e9'/,
  "color: '#3b82f6'" // blue-500
);

fs.writeFileSync('src/components/dashboard/MaturityDistribution.tsx', mat);
console.log('patched Charts');
