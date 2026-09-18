const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/NormativeStatus.tsx', 'utf8');

content = content.replace(
  /className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"/,
  'className="bg-white rounded border border-[var(--border)] p-5 shadow-sm h-full flex flex-col"'
);

content = content.replace(
  /<h2 className="text-lg font-semibold text-slate-800 mb-4">Estado Normativo<\/h2>/,
  `<div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Estado Normativo</h2>
        </div>`
);

// We need to keep the bar rendering, but make it look more corporate
content = content.replace(
  /className={`flex-1 h-8 \$\{info\.color\} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group`}/g,
  'className={`flex-1 h-6 ${info.color} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group border border-white/20`}'
);

// We will change the colors to semantic variants using standard tailwind classes or our vars
// Let's modify the getClauseImplementation
const colorReplace = `let color = '';
    let text = percent + '%';
    if (percent < 40) color = 'bg-rose-500';
    else if (percent < 70) color = 'bg-amber-400';
    else if (percent < 90) color = 'bg-teal-400';
    else color = 'bg-emerald-500';`;

const newColorReplace = `let color = '';
    let text = percent + '%';
    if (percent < 40) color = 'bg-rose-500';
    else if (percent < 70) color = 'bg-amber-500';
    else if (percent < 90) color = 'bg-teal-500';
    else color = 'bg-emerald-600';`;

content = content.replace(colorReplace, newColorReplace);

// Remove big gap between standards
content = content.replace(
  /className="space-y-6"/,
  'className="space-y-4 flex-1"'
);

content = content.replace(
  /className="text-sm font-medium text-slate-600 mb-2"/g,
  'className="text-xs font-semibold text-[var(--text-secondary)] mb-2"'
);

// Legend 
content = content.replace(
  /className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-slate-100 text-\[10px\] text-slate-500 flex-wrap gap-y-2"/,
  'className="flex items-center justify-center space-x-4 mt-auto pt-4 text-[10px] text-slate-500 flex-wrap gap-y-2 border-t border-[var(--border)]"'
);

content = content.replace(/bg-teal-400/g, 'bg-teal-500');
content = content.replace(/bg-emerald-500/g, 'bg-emerald-600');
content = content.replace(/bg-amber-400/g, 'bg-amber-500');

// Slight fixes to SlideOver contents
content = content.replace(/bg-slate-50 rounded-lg p-3 border border-slate-200/g, 'bg-white rounded p-4 border border-[var(--border)]');
content = content.replace(/text-slate-800 mb-3 border-b border-slate-200 pb-2/g, 'text-[var(--text-primary)] mb-3 border-b border-[var(--border)] pb-2');

fs.writeFileSync('src/components/dashboard/NormativeStatus.tsx', content);
console.log('patched NormativeStatus.tsx');
