const fs = require('fs');
let code = fs.readFileSync('src/pages/AIRegistry.tsx', 'utf8');

if (!code.includes('impactSystemId')) {
  code = code.replace(
    'const [isWizardOpen, setIsWizardOpen] = useState(false);',
    'const [isWizardOpen, setIsWizardOpen] = useState(false);\n  const [impactSystemId, setImpactSystemId] = useState<string | undefined>(undefined);'
  );
  
  code = code.replace(
    `onEvaluateImpact={() => {
            setSelectedSystem(null);
            setActiveTab('impact');
          }}`,
    `onEvaluateImpact={() => {
            setImpactSystemId(selectedSystem.id);
            setSelectedSystem(null);
            setActiveTab('impact');
          }}`
  );
  
  code = code.replace(
    `{activeTab === 'impact' && <AIImpactTab data={data} />}`,
    `{activeTab === 'impact' && <AIImpactTab data={data} preselectedSystemId={impactSystemId} />}`
  );

  // We should also clear impactSystemId if we change tabs? Or just let it be. 
  // Let's clear it when we change tabs to avoid stuck state if they click "impact" manually.
  code = code.replace(
    `onClick={() => setActiveTab(tab.id)}`,
    `onClick={() => { setActiveTab(tab.id); if (tab.id !== 'impact') setImpactSystemId(undefined); }}`
  );

  fs.writeFileSync('src/pages/AIRegistry.tsx', code);
}
