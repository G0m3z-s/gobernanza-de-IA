const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIDataTab.tsx', 'utf8');
code = code.replace(/\\\$/g, "$");
// Also remove \` that were escaped
code = code.replace(/\\`/g, "`");
fs.writeFileSync('src/components/ai/AIDataTab.tsx', code);
