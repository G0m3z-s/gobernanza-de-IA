const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const oldLine = `const totalEv = Object.values(evCounts).reduce((a: any, b: any) => a + b, 0) || 1;`;
const newLine = `const totalEv: number = (Object.values(evCounts).reduce((a: any, b: any) => Number(a) + Number(b), 0) as number) || 1;`;

code = code.replace(oldLine, newLine);
fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', code);
