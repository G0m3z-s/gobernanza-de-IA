const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AI360View.tsx', 'utf8');

if (!code.includes('AILifecycle360Tab')) {
  code = code.replace(
    "import { ArrowLeft, Edit, ShieldAlert, CheckCircle2, Activity, Database, AlertTriangle } from 'lucide-react';",
    "import { ArrowLeft, Edit, ShieldAlert, CheckCircle2, Activity, Database, AlertTriangle } from 'lucide-react';\nimport { AILifecycle360Tab } from './AILifecycle360Tab';"
  );
  
  code = code.replace(
    `{activeTab !== 'overview' && activeTab !== 'impact' && (`,
    `{activeTab === 'lifecycle' && <AILifecycle360Tab system={system} data={data} />}
        
        {activeTab !== 'overview' && activeTab !== 'impact' && activeTab !== 'lifecycle' && (`
  );

  fs.writeFileSync('src/components/ai/AI360View.tsx', code);
}
