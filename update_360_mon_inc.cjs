const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AI360View.tsx', 'utf8');

if (!code.includes('import { AIMonitoring360Tab }')) {
  code = code.replace(
    "import { AIProvidersTab } from './AIProvidersTab';",
    "import { AIProvidersTab } from './AIProvidersTab';\nimport { AIMonitoring360Tab } from './AIMonitoring360Tab';\nimport { AIIncidents360Tab } from './AIIncidents360Tab';"
  );
}

code = code.replace(
  "{activeTab === 'providers' && <AIProvidersTab data={data} preselectedSystemId={system.id} />}",
  "{activeTab === 'providers' && <AIProvidersTab data={data} preselectedSystemId={system.id} />}\n        {activeTab === 'monitoring' && <AIMonitoring360Tab system={system} data={data} />}\n        {activeTab === 'incidents' && <AIIncidents360Tab system={system} data={data} />}"
);

code = code.replace(
  "activeTab !== 'providers' && (",
  "activeTab !== 'providers' && activeTab !== 'monitoring' && activeTab !== 'incidents' && ("
);

fs.writeFileSync('src/components/ai/AI360View.tsx', code);
