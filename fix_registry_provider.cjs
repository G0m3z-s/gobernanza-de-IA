const fs = require('fs');
let code = fs.readFileSync('src/pages/AIRegistry.tsx', 'utf8');

if (!code.includes('providerSystemId')) {
  code = code.replace(
    'const [dataSystemId, setDataSystemId] = useState<string | undefined>(undefined);',
    'const [dataSystemId, setDataSystemId] = useState<string | undefined>(undefined);\n  const [providerSystemId, setProviderSystemId] = useState<string | undefined>(undefined);'
  );
  
  code = code.replace(
    `{activeTab === 'providers' && <AIProvidersTab data={data} />}`,
    `{activeTab === 'providers' && <AIProvidersTab data={data} preselectedSystemId={providerSystemId} />}`
  );
  
  code = code.replace(
    `if (tab.id !== 'data') setDataSystemId(undefined);`,
    `if (tab.id !== 'data') setDataSystemId(undefined); if (tab.id !== 'providers') setProviderSystemId(undefined);`
  );

  fs.writeFileSync('src/pages/AIRegistry.tsx', code);
}
