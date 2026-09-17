const fs = require('fs');
let content = fs.readFileSync('src/components/controls/SoaTab.tsx', 'utf8');

const targetImport = `import { ControlForm } from '../forms/ControlForm';`;
const replaceImport = `import { ControlForm } from '../forms/ControlForm';\nimport { SoaTab42001 } from './SoaTab42001';`;
content = content.replace(targetImport, replaceImport);

const targetReturn = `export function SoaTab({ data, standard }: { data: DashboardData, standard?: string }) {`;
const replaceReturn = `export function SoaTab({ data, standard }: { data: DashboardData, standard?: string }) {
  if (standard === 'ISO/IEC 42001') {
    return <SoaTab42001 data={data} />;
  }`;
content = content.replace(targetReturn, replaceReturn);

fs.writeFileSync('src/components/controls/SoaTab.tsx', content);
console.log("Patched SoaTab.tsx");
