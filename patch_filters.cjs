const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/Filters.tsx', 'utf8');

content = content.replace(
  /className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center gap-4 text-sm"/,
  'className="bg-white px-4 py-3 rounded border border-[var(--border)] flex flex-wrap items-center gap-4 text-sm"'
);

content = content.replace(
  /className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1\.5 focus:outline-none focus:ring-2 focus:ring-teal-500"/g,
  'className="bg-white border border-[var(--border)] text-[var(--text-secondary)] rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)]"'
);

content = content.replace(
  /className="mr-2 rounded text-teal-600 focus:ring-teal-500 border-slate-300"/,
  'className="mr-2 rounded text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] border-[var(--border)]"'
);

fs.writeFileSync('src/components/dashboard/Filters.tsx', content);
console.log('patched Filters.tsx');
