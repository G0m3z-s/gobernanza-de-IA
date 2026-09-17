const fs = require('fs');
let code = fs.readFileSync('src/pages/AIRegistry.tsx', 'utf8');

if (!code.includes('dataSystemId')) {
  code = code.replace(
    'const [impactSystemId, setImpactSystemId] = useState<string | undefined>(undefined);',
    'const [impactSystemId, setImpactSystemId] = useState<string | undefined>(undefined);\n  const [dataSystemId, setDataSystemId] = useState<string | undefined>(undefined);'
  );
  
  // Update AIDataTab call in AIRegistry.tsx
  code = code.replace(
    `{activeTab === 'data' && <AIDataTab data={data} />}`,
    `{activeTab === 'data' && <AIDataTab data={data} preselectedSystemId={dataSystemId} />}`
  );
  
  // Allow clearing dataSystemId
  code = code.replace(
    `if (tab.id !== 'impact') setImpactSystemId(undefined);`,
    `if (tab.id !== 'impact') setImpactSystemId(undefined); if (tab.id !== 'data') setDataSystemId(undefined);`
  );

  fs.writeFileSync('src/pages/AIRegistry.tsx', code);
}
