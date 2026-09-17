const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIProviderWizard.tsx', 'utf8');

code = code.replace(
  "details: \\`Proveedor '\\${formData.name}' \\${initialData ? 'actualizado' : 'registrado'}\\`,",
  "details: `Proveedor '${formData.name}' ${initialData ? 'actualizado' : 'registrado'}`, "
);
code = code.replace(/\\\$/g, "$");
code = code.replace(/className=\{\\`(.*?)\\`\}/g, "className={`$1`}");

fs.writeFileSync('src/components/ai/AIProviderWizard.tsx', code);
