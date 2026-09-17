const fs = require('fs');

let kpi = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

kpi = kpi.replace(
  /\{kpis\?\.maturityCounts\?\.L4 \+ kpis\?\.maturityCounts\?\.L5 \|\| 0\}/g,
  '{((kpis?.maturityCounts?.L4 || 0) + (kpis?.maturityCounts?.L5 || 0))}'
);

kpi = kpi.replace(
  /\{kpis\?\.maturityCounts\?\.L2 \+ kpis\?\.maturityCounts\?\.L3 \|\| 0\}/g,
  '{((kpis?.maturityCounts?.L2 || 0) + (kpis?.maturityCounts?.L3 || 0))}'
);

kpi = kpi.replace(
  /\{kpis\?\.maturityCounts\?\.L0 \+ kpis\?\.maturityCounts\?\.L1 \|\| 0\}/g,
  '{((kpis?.maturityCounts?.L0 || 0) + (kpis?.maturityCounts?.L1 || 0))}'
);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', kpi);
