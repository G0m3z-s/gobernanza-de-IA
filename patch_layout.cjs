const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// Copilot Button
content = content.replace(
  /<button className="flex items-center px-3 py-1\.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-sm hover:opacity-90 transition-opacity">/,
  '<button className="flex items-center px-3 py-1.5 border border-[var(--brand-accent)] text-[var(--brand-accent)] text-sm font-medium rounded hover:bg-[var(--brand-accent)] hover:text-white transition-colors">'
);

// Topbar background and borders
content = content.replace(
  /<div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">/,
  '<div className="h-16 bg-white border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0">'
);

// Search style
content = content.replace(
  /className="pl-9 pr-4 py-1\.5 rounded-full bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500\/20 focus:border-teal-500 transition-all w-64"/,
  'className="pl-9 pr-4 py-1.5 rounded bg-slate-50 border border-[var(--border)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)] focus:border-[var(--brand-accent)] transition-all w-64"'
);

// Badges inside topbar
content = content.replace(
  /<span key=\{s\} className="ml-1 px-2 py-0\.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200">/g,
  '<span key={s} className="ml-2 px-2 py-0.5 rounded bg-slate-50 text-[11px] font-medium text-slate-500 border border-[var(--border)] uppercase tracking-wider">'
);

// Layout wrapper
content = content.replace(
  /<div className="flex h-screen bg-slate-50 overflow-hidden font-sans">/,
  '<div className="flex h-screen bg-[var(--app-bg)] overflow-hidden font-sans">'
);

// Main content
content = content.replace(
  /<main className="flex-1 overflow-y-auto p-6">\s*<div className="max-w-7xl mx-auto">\s*\{children\}\s*<\/div>\s*<\/main>/,
  `<main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="w-full">
            {children}
          </div>
        </main>`
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('patched Layout.tsx');
