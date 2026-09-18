const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const oldKpiCardDef = `function KpiCard({
  title,
  value,
  previousValue,
  color,
  icon: Icon,
  tooltip,
  compare,
  inverseBad = false,
  onExplore,
}: any) {`;

const newKpiCardDef = `function KpiCard({
  title,
  value,
  previousValue,
  color,
  icon: Icon,
  tooltip,
  compare,
  inverseBad = false,
  onExplore,
  subtitle,
}: any) {`;

content = content.replace(oldKpiCardDef, newKpiCardDef);

const oldKpiCardBody = `          <div className="flex items-baseline mt-1">
            <span className={\`font-bold text-slate-800 \${isStringValue ? 'text-xl' : 'text-3xl'}\`}>
              {isStringValue ? value : \`\${value || 0}%\`}
            </span>
            {compare && !isNeutral && !isStringValue && (
              <span className={\`ml-2 text-sm font-medium flex items-center \${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }\`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {Math.abs(variation)}%
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-100">`;

const newKpiCardBody = `          <div className="flex items-baseline mt-1">
            <span className={\`font-bold text-slate-800 \${isStringValue ? 'text-xl' : 'text-3xl'}\`}>
              {isStringValue ? value : \`\${value || 0}%\`}
            </span>
            {compare && !isNeutral && !isStringValue && (
              <span className={\`ml-2 text-sm font-medium flex items-center \${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }\`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {Math.abs(variation)}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-100">`;

content = content.replace(oldKpiCardBody, newKpiCardBody);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
console.log('patched KpiCard');
