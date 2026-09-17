const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AI360View.tsx', 'utf8');

if (!code.includes('<AIDataTab')) {
  code = code.replace(
    "import { AILifecycle360Tab } from './AILifecycle360Tab';",
    "import { AILifecycle360Tab } from './AILifecycle360Tab';\nimport { AIDataTab } from './AIDataTab';"
  );
  
  code = code.replace(
    `{activeTab === 'lifecycle' && <AILifecycle360Tab system={system} data={data} />}`,
    `{activeTab === 'lifecycle' && <AILifecycle360Tab system={system} data={data} />}\n        {activeTab === 'data' && <AIDataTab data={data} preselectedSystemId={system.id} />}`
  );
  
  code = code.replace(
    `activeTab !== 'lifecycle' &&`,
    `activeTab !== 'lifecycle' && activeTab !== 'data' &&`
  );

  fs.writeFileSync('src/components/ai/AI360View.tsx', code);
}
