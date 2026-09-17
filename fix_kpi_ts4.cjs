const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

code = code.replace(
  /const validPct = Math\.round\(\(evCounts\.valid \/ totalEv\) \* 100\);/g,
  `const validPct = Math.round((Number(evCounts.valid) / totalEv) * 100);`
);
code = code.replace(
  /const expiredPct = Math\.round\(\(evCounts\.expired \/ totalEv\) \* 100\);/g,
  `const expiredPct = Math.round((Number(evCounts.expired) / totalEv) * 100);`
);
code = code.replace(
  /const nonePct = Math\.round\(\(evCounts\.none \/ totalEv\) \* 100\);/g,
  `const nonePct = Math.round((Number(evCounts.none) / totalEv) * 100);`
);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', code);
