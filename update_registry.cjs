const fs = require('fs');
let code = fs.readFileSync('src/pages/AIRegistry.tsx', 'utf8');

// Update AIRegistryTab
code = code.replace(
  'function AIRegistryTab({ aiSystems, setIsWizardOpen }: { aiSystems: any[], setIsWizardOpen: (val: boolean) => void }) {',
  'function AIRegistryTab({ aiSystems, setIsWizardOpen, setSelectedSystem }: { aiSystems: any[], setIsWizardOpen: (val: boolean) => void, setSelectedSystem: (sys: any) => void }) {'
);

code = code.replace(
  '<tr key={ai.id} className="hover:bg-slate-50 group transition-colors">',
  '<tr key={ai.id} className="hover:bg-slate-50 group transition-colors cursor-pointer" onClick={() => setSelectedSystem(ai)}>'
);

code = code.replace(
  '<button className="text-teal-600 hover:text-teal-900 font-medium text-sm transition-colors">\n                        Evaluar\n                      </button>',
  '<button onClick={(e) => { e.stopPropagation(); setSelectedSystem(ai); }} className="text-teal-600 hover:text-teal-900 font-medium text-sm transition-colors">\n                        Evaluar\n                      </button>'
);

// Update AIRegistry
code = code.replace(
  'const [isWizardOpen, setIsWizardOpen] = useState(false);',
  `const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<any>(null);
  const [systemToEdit, setSystemToEdit] = useState<any>(null);`
);

code = code.replace(
  "{activeTab === 'registry' && <AIRegistryTab aiSystems={data.aiSystems || []} setIsWizardOpen={setIsWizardOpen} />}",
  "{activeTab === 'registry' && <AIRegistryTab aiSystems={data.aiSystems || []} setIsWizardOpen={setIsWizardOpen} setSelectedSystem={setSelectedSystem} />}"
);

// Add AI360View import
if (!code.includes('import { AI360View }')) {
  code = code.replace(
    "import { AIHistoryTab } from '../components/ai/AIHistoryTab';",
    "import { AIHistoryTab } from '../components/ai/AIHistoryTab';\nimport { AI360View } from '../components/ai/AI360View';"
  );
}

// Intercept return
code = code.replace(
  'return (\n    <div className="space-y-6 pb-12">',
  `if (selectedSystem) {
    return (
      <div className="pb-12">
        <AI360View 
          system={selectedSystem} 
          data={data} 
          onClose={() => setSelectedSystem(null)}
          onEdit={() => {
            setSystemToEdit(selectedSystem);
            setIsWizardOpen(true);
          }}
          onEvaluateImpact={() => {
            setSelectedSystem(null);
            setActiveTab('impact');
          }}
        />
        <SlideOver
          isOpen={isWizardOpen}
          onClose={() => { setIsWizardOpen(false); setSystemToEdit(null); }}
          title={systemToEdit ? "Editar Sistema IA" : "Evaluación Inicial de IA (Screening)"}
          description="Completa el cuestionario para registrar y pre-clasificar un nuevo sistema de IA."
        >
          <div className="h-full">
            <AISystemWizard onClose={() => { setIsWizardOpen(false); setSystemToEdit(null); setSelectedSystem(null); }} initialData={systemToEdit} />
          </div>
        </SlideOver>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">`
);

// We must also pass initialData to AISystemWizard in the main return
code = code.replace(
  '<AISystemWizard onClose={() => setIsWizardOpen(false)} />',
  '<AISystemWizard onClose={() => { setIsWizardOpen(false); setSystemToEdit(null); }} initialData={systemToEdit} />'
);

code = code.replace(
  'title="Evaluación Inicial de IA (Screening)"',
  'title={systemToEdit ? "Editar Sistema IA" : "Evaluación Inicial de IA (Screening)"}'
);

fs.writeFileSync('src/pages/AIRegistry.tsx', code);
