const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AI360View.tsx', 'utf8');

code = code.replace(
  `{ id: 'monitoring', name: 'MONITOREO' }`,
  `{ id: 'monitoring', name: 'MONITOREO' },
            { id: 'incidents', name: 'INCIDENTES' },
            { id: 'history', name: 'HISTORIAL' }`
);

fs.writeFileSync('src/components/ai/AI360View.tsx', code);
