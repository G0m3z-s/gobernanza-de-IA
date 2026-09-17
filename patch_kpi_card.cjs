const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const regexValue = /<span className="text-3xl font-bold text-slate-800">\s*\{value \|\| 0\}%\s*<\/span>/;
const replacementValue = `<span className={\`font-bold text-slate-800 \${typeof value === 'string' ? 'text-xl' : 'text-3xl'}\`}>
              {typeof value === 'number' ? \`\${value}%\` : value || '0%'}
            </span>`;

if (regexValue.test(content)) {
  content = content.replace(regexValue, replacementValue);
  fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
  console.log("Success value patch");
} else {
  console.log("Failed value patch");
}
