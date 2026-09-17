const fs = require('fs');

let store = fs.readFileSync('src/store/useStore.ts', 'utf8');

// Add aiMetrics to collectionsToFetch
const targetArr = `'nonConformities', 'capas', 'normativeControls', 'auditSessions'`;
const replacementArr = `'nonConformities', 'capas', 'normativeControls', 'auditSessions', 'aiMetrics'`;
store = store.replace(targetArr, replacementArr);

// Add aiMetrics to data object mapping
const targetMap = `auditSessions: results[30] as any[] || [],`;
const replacementMap = `auditSessions: results[30] as any[] || [],\n          aiMetrics: results[31] as any[] || [],`;
store = store.replace(targetMap, replacementMap);

fs.writeFileSync('src/store/useStore.ts', store);
