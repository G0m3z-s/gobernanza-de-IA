const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AISystemWizard.tsx', 'utf8');

code = code.replace(
  'export function AISystemWizard({ onClose }: { onClose: () => void }) {',
  'export function AISystemWizard({ onClose, initialData }: { onClose: () => void, initialData?: any }) {'
);

code = code.replace(
  'const { addAISystem } = useStore();',
  'const { addAISystem, updateAISystem } = useStore();'
);

code = code.replace(
  `const [formData, setFormData] = useState<any>({
    name: '',
    code: '',`,
  `const [formData, setFormData] = useState<any>(initialData || {
    name: '',
    code: '',`
);

code = code.replace(
  `await addAISystem({
        organizationId: currentOrgId,
        ...formData,
        lifecycleStage: 'EVALUATION',
        approvalStatus: status,
      });`,
  `if (initialData && initialData.id) {
        await updateAISystem(initialData.id, {
          ...formData,
          approvalStatus: status
        });
      } else {
        await addAISystem({
          organizationId: currentOrgId,
          ...formData,
          lifecycleStage: 'EVALUATION',
          approvalStatus: status,
        });
      }`
);

fs.writeFileSync('src/components/ai/AISystemWizard.tsx', code);
