const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIMetricWizard.tsx', 'utf8');

code = code.replace(
  "message: \\`Métrica \\${formData.name} superó umbral (\\${formData.value}\\${formData.unit}).\\`,",
  "message: `Métrica ${formData.name} superó umbral (${formData.value}${formData.unit}).`, "
);
code = code.replace(/\\\$/g, "$");

fs.writeFileSync('src/components/ai/AIMetricWizard.tsx', code);
