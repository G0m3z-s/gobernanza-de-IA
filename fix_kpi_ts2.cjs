const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

const oldLine = `const evCounts = kpis?.evidenceCounts || { valid: 0, expiring: 0, expired: 0, pending: 0, rejected: 0, none: 0 };`;
const newLine = `const evCounts: any = kpis?.evidenceCounts || { valid: 0, expiring: 0, expired: 0, pending: 0, rejected: 0, none: 0 };`;

code = code.replace(oldLine, newLine);
fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', code);
