const fs = require('fs');

let obj = fs.readFileSync('src/components/dashboard/ObjectivesStatus.tsx', 'utf8');
obj = obj.replace(
  /className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full"/,
  'className="bg-white rounded border border-[var(--border)] p-5 shadow-sm h-full flex flex-col"'
);
obj = obj.replace(
  /<div className="flex items-center justify-between mb-6">/,
  '<div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">'
);
obj = obj.replace(
  /<h2 className="text-lg font-semibold text-slate-800">Estado de los Objetivos<\/h2>/,
  '<h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Estado de los Objetivos</h2>'
);
obj = obj.replace(
  /<p className="text-sm text-slate-500">Métricas y cumplimiento<\/p>/,
  ''
);
obj = obj.replace(
  /<div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">\s*<Target className="w-5 h-5 text-indigo-600" \/>\s*<\/div>/,
  ''
);

// We replace the big colored rounded divs with simpler flat ones
obj = obj.replace(/bg-emerald-50 rounded-lg border border-emerald-100/g, 'bg-white rounded border border-slate-200');
obj = obj.replace(/text-emerald-800/g, 'text-slate-700');
obj = obj.replace(/text-emerald-700/g, 'text-emerald-600');

obj = obj.replace(/bg-amber-50 rounded-lg border border-amber-100/g, 'bg-white rounded border border-slate-200');
obj = obj.replace(/text-amber-800/g, 'text-slate-700');
obj = obj.replace(/text-amber-700/g, 'text-amber-600');

obj = obj.replace(/bg-rose-50 rounded-lg border border-rose-100/g, 'bg-white rounded border border-slate-200');
obj = obj.replace(/text-rose-800/g, 'text-slate-700');
obj = obj.replace(/text-rose-700/g, 'text-rose-600');

obj = obj.replace(/bg-slate-50 rounded-lg border border-slate-200/g, 'bg-white rounded border border-slate-200');

fs.writeFileSync('src/components/dashboard/ObjectivesStatus.tsx', obj);

let act = fs.readFileSync('src/components/dashboard/ActivityList.tsx', 'utf8');
act = act.replace(
  /className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col h-full"/,
  'className="bg-white rounded border border-[var(--border)] p-5 shadow-sm flex flex-col h-full"'
);
act = act.replace(
  /<div className="flex items-center justify-between mb-4">/,
  '<div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">'
);
act = act.replace(
  /<h2 className="text-lg font-semibold text-slate-800 flex items-center">/,
  '<h2 className="text-sm font-semibold text-[var(--text-primary)] flex items-center uppercase tracking-wider">'
);

// Mute button
act = act.replace(
  /className="w-full mt-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors border border-transparent hover:border-teal-100"/,
  'className="w-full mt-4 py-2 text-xs font-medium text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors opacity-50 cursor-not-allowed"'
);
act = act.replace(/onClick=\{.*?alert.*?\}/, 'disabled={true}');
act = act.replace(/VER HISTORIAL COMPLETO/, 'HISTORIAL COMPLETO (PRÓXIMAMENTE)');

fs.writeFileSync('src/components/dashboard/ActivityList.tsx', act);
console.log('patched Obj/Act');
