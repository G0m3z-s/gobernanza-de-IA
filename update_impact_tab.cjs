const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIImpactTab.tsx', 'utf8');

if (!code.includes('AIImpactWizard')) {
  // Add imports
  code = code.replace(
    "import { ShieldAlert, Plus } from 'lucide-react';",
    "import { ShieldAlert, Plus } from 'lucide-react';\nimport { SlideOver } from '../ui/SlideOver';\nimport { AIImpactWizard } from './AIImpactWizard';"
  );
  
  // Add state for wizard
  code = code.replace(
    'export function AIImpactTab({ data }: { data: DashboardData }) {',
    `export function AIImpactTab({ data, preselectedSystemId }: { data: DashboardData, preselectedSystemId?: string }) {
  const [isWizardOpen, setIsWizardOpen] = useState(!!preselectedSystemId);
  const [assessmentToEdit, setAssessmentToEdit] = useState<any>(null);`
  );
  
  // Update buttons
  code = code.replace(
    '<button className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">',
    '<button onClick={() => { setAssessmentToEdit(null); setIsWizardOpen(true); }} className="flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">'
  );
  
  code = code.replace(
    '<button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg">INICIAR EVALUACIÓN</button>',
    '<button onClick={() => { setAssessmentToEdit(null); setIsWizardOpen(true); }} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">INICIAR EVALUACIÓN</button>'
  );
  
  // Add onClick to card
  code = code.replace(
    '<div key={imp.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-teal-300 transition-colors cursor-pointer">',
    '<div key={imp.id} onClick={() => { setAssessmentToEdit(imp); setIsWizardOpen(true); }} className="border border-slate-200 rounded-xl p-4 bg-slate-50 hover:border-teal-300 transition-colors cursor-pointer">'
  );
  
  // Add SlideOver to return statement
  code = code.replace(
    '      </div>\n    </div>\n  );\n}',
    `      </div>
      <SlideOver
        isOpen={isWizardOpen}
        onClose={() => { setIsWizardOpen(false); setAssessmentToEdit(null); }}
        title={assessmentToEdit ? "Editar Evaluación de Impacto" : "Nueva Evaluación de Impacto (AIA)"}
        description="Completa las dimensiones, salvaguardas y probabilidades de impacto."
      >
        <div className="h-full">
          <AIImpactWizard 
            key={assessmentToEdit ? assessmentToEdit.id : 'new'} 
            onClose={() => { setIsWizardOpen(false); setAssessmentToEdit(null); }} 
            initialData={assessmentToEdit} 
            systemId={preselectedSystemId}
          />
        </div>
      </SlideOver>
    </div>
  );
}`
  );

  fs.writeFileSync('src/components/ai/AIImpactTab.tsx', code);
}
