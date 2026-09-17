const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AI360View.tsx', 'utf8');

code = code.replace(
  "{ id: 'data', name: 'DATOS' },",
  "{ id: 'data', name: 'DATOS' },\n            { id: 'providers', name: 'PROVEEDORES' },"
);

if (!code.includes("import { AIProvidersTab }")) {
  code = code.replace(
    "import { AIDataTab } from './AIDataTab';",
    "import { AIDataTab } from './AIDataTab';\nimport { AIProvidersTab } from './AIProvidersTab';"
  );
}

code = code.replace(
  "{activeTab === 'data' && <AIDataTab data={data} preselectedSystemId={system.id} />}",
  "{activeTab === 'data' && <AIDataTab data={data} preselectedSystemId={system.id} />}\n        {activeTab === 'providers' && <AIProvidersTab data={data} preselectedSystemId={system.id} />}"
);

code = code.replace(
  "activeTab !== 'lifecycle' && activeTab !== 'data' && (",
  "activeTab !== 'lifecycle' && activeTab !== 'data' && activeTab !== 'providers' && ("
);

fs.writeFileSync('src/components/ai/AI360View.tsx', code);
