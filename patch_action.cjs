const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/ActionCenter.tsx', 'utf8');

content = content.replace(
  /className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col h-full"/,
  'className="bg-white rounded border border-[var(--border)] p-5 shadow-sm flex flex-col h-full"'
);

content = content.replace(
  /<h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">\s*<AlertTriangle className="w-5 h-5 mr-2 text-rose-500" \/>\s*Action Center\s*<\/h2>/,
  `<div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] flex items-center uppercase tracking-wider">
          Prioridades Operativas
        </h2>
      </div>`
);

content = content.replace(
  /className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors group"/g,
  'className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer group transition-colors px-2 -mx-2 rounded"'
);

content = content.replace(
  /<div className={`w-10 h-10 rounded-lg \$\{p\.bg\} \$\{p\.color\} flex items-center justify-center mr-3 shrink-0`}>/,
  '<div className={`w-8 h-8 rounded ${p.bg} ${p.color} flex items-center justify-center mr-3 shrink-0`}>'
);

content = content.replace(
  /<span className={`text-\[10px\] font-bold px-1\.5 py-0\.5 rounded uppercase tracking-wider \$\{p\.bg\} \$\{p\.color\} mr-2`}>/g,
  '<span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-[var(--border)] text-slate-600 mr-2`}>'
);


fs.writeFileSync('src/components/dashboard/ActionCenter.tsx', content);
console.log('patched ActionCenter.tsx');
