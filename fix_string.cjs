const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIDataWizard.tsx', 'utf8');

code = code.replace(
  "details: \\`Recurso de datos '\\${formData.name}' \\${initialData ? 'actualizado' : 'creado'}\\`,",
  "details: `Recurso de datos '${formData.name}' ${initialData ? 'actualizado' : 'creado'}`, "
);

fs.writeFileSync('src/components/ai/AIDataWizard.tsx', code);
