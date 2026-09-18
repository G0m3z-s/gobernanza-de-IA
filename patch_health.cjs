const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/HealthWidgets.tsx', 'utf8');

content = content.replace(
  /className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-teal-200 cursor-pointer group"/g,
  'className="bg-white rounded border border-[var(--border)] p-4 shadow-sm hover:border-[var(--brand-accent)] cursor-pointer group flex flex-col justify-between"'
);

// We need to change text-slate-700 to var(--text-secondary)
content = content.replace(
  /text-sm font-semibold text-slate-700/g,
  'text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider'
);

// We need to tone down the bold numbers
content = content.replace(
  /text-2xl font-bold text-slate-800/g,
  'text-2xl font-bold text-[var(--text-primary)]'
);

// Re-write icons to be a bit smaller if needed, they are w-4 h-4 which is fine.
// Reduce padding slightly to feel more compact and less airy.

fs.writeFileSync('src/components/dashboard/HealthWidgets.tsx', content);
console.log('patched HealthWidgets.tsx');
