const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AIMonitoring360Tab.tsx', 'utf8');

code = code.replace(/className=\{\\`(.*?)\\`\}/g, "className={`$1`}");
code = code.replace(/\\\$/g, "$");
code = code.replace(/\\`/g, "`");

fs.writeFileSync('src/components/ai/AIMonitoring360Tab.tsx', code);
