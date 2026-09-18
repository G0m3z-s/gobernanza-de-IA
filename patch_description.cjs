const fs = require('fs');
let content = fs.readFileSync('src/components/forms/ControlEffectivenessSection.tsx', 'utf8');

content = content.replace(
  /defaultDescription=\{`Hallazgo derivado de prueba de eficacia con resultado \$\{findingTest.result\}\.\\n\\nObservaciones de la prueba:\\n\$\{findingTest.observations \|\| 'Sin observaciones'\}`\}/,
  `defaultDescription={\`Hallazgo derivado de prueba de eficacia.\\nResultado: \${findingTest.result}\\nMétodo: \${findingTest.testMethod}\\nFecha de prueba: \${findingTest.performedAt.split('T')[0]}\\n\\nObservaciones de la prueba:\\n\${findingTest.observations || 'Sin observaciones'}\`}`
);

fs.writeFileSync('src/components/forms/ControlEffectivenessSection.tsx', content);
console.log('patched description');
