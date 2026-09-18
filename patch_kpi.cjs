const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const kpiCardStr = `function KpiCard({
  title,
  value,
  previousValue,
  icon: Icon,
  tooltip,
  compare,
  inverseBad = false,
  onExplore,
  subtitle,
}: any) {
  const isStringValue = typeof value === 'string';
  const numValue = isStringValue ? 0 : (value || 0);
  const variation = numValue - (previousValue || 0);
  const isPositive = inverseBad ? variation < 0 : variation > 0;
  const isNeutral = variation === 0;

  // Semantic color for actual value
  let valueColor = "text-[var(--text-primary)]";
  if (!isStringValue) {
    if (inverseBad) {
      if (numValue > 60) valueColor = "text-rose-600";
      else if (numValue > 30) valueColor = "text-amber-500";
      else valueColor = "text-emerald-600";
    } else {
      if (numValue >= 85) valueColor = "text-emerald-600";
      else if (numValue >= 60) valueColor = "text-amber-500";
      else valueColor = "text-rose-600";
    }
  }

  return (
    <div className="bg-white rounded border border-[var(--border)] p-4 shadow-sm flex flex-col h-full relative group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
          <h3 className="text-sm font-medium text-[var(--text-secondary)]">
            {title}
          </h3>
        </div>
        <div className="text-slate-300 hover:text-slate-500 cursor-help relative">
          <Info className="w-4 h-4" />
          <div className="absolute hidden group-hover:block w-56 bg-slate-800 text-white text-xs p-2.5 rounded shadow-lg right-0 top-6 z-10 font-normal normal-case">
            {tooltip}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center my-2">
        <div className="flex items-baseline space-x-2">
          <span className={\`font-semibold \${isStringValue ? 'text-lg text-[var(--text-muted)]' : \`text-3xl \${valueColor}\`}\`}>
            {isStringValue ? value : \`\${value || 0}%\`}
          </span>
          {compare && !isNeutral && !isStringValue && (
            <span
              className={\`flex items-center text-xs font-medium \${isPositive ? "text-emerald-600" : "text-rose-600"}\`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {Math.abs(variation)}%
            </span>
          )}
        </div>
        {subtitle && (
          <div className="mt-1 text-xs">
            {subtitle}
          </div>
        )}
      </div>

      <div className="mt-2 pt-3 border-t border-[var(--border)] flex justify-end">
        <button 
          onClick={onExplore}
          className="text-xs font-medium text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] transition-colors"
        >
          Ver detalle &rarr;
        </button>
      </div>
    </div>
  );
}`;

content = content.replace(
  /function KpiCard\(\{[\s\S]*?<\/\n        <\/button>\n      <\/div>\n    <\/div>\n  \);\n\}/,
  kpiCardStr
);

// We need to re-replace since regex might have failed due to unexpected spaces
// Let's do a more robust replacement for KpiCard function body.

const oldKpiCardPattern = /function KpiCard\(\{[\s\S]*?return \([\s\S]*?<\/\n        <\/button>\n      <\/div>\n    <\/div>\n  \);\n\}/;

let newContent = content;

// Since KpiCard is a named function, let's just split and replace
const parts = content.split('function KpiCard({');
if(parts.length > 1) {
  // find the end of KpiCard
  const endMarker = 'export function KPIWidgets({ kpis, compare }: any) {';
  const subparts = parts[1].split(endMarker);
  
  newContent = parts[0] + kpiCardStr + '\n\n' + endMarker + subparts[1];
}

// Ensure color prop is removed from usage since it's not used in new KpiCard
newContent = newContent.replace(/color=".*?"\n/g, '');


fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', newContent);
console.log('patched KPIWidgets.tsx');
