const fs = require('fs');
let code = fs.readFileSync('src/pages/AIRegistry.tsx', 'utf8');

code = code.replace(
  '<AISystemWizard onClose={() => { setIsWizardOpen(false); setSystemToEdit(null); setSelectedSystem(null); }} initialData={systemToEdit} />',
  '<AISystemWizard key={systemToEdit ? systemToEdit.id : \'new\'} onClose={() => { setIsWizardOpen(false); setSystemToEdit(null); setSelectedSystem(null); }} initialData={systemToEdit} />'
);

code = code.replace(
  '<AISystemWizard onClose={() => { setIsWizardOpen(false); setSystemToEdit(null); }} initialData={systemToEdit} />',
  '<AISystemWizard key={systemToEdit ? systemToEdit.id : \'new\'} onClose={() => { setIsWizardOpen(false); setSystemToEdit(null); }} initialData={systemToEdit} />'
);

fs.writeFileSync('src/pages/AIRegistry.tsx', code);
