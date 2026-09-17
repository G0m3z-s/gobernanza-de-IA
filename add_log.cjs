const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

code = code.replace(
  `updateAISystem: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiSystems', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });`,
  `updateAISystem: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiSystems', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      
      // Registrar cambio en activityLogs
      try {
        await addDoc(collection(db, 'activityLogs'), {
           organizationId: updates.organizationId,
           userId: 'system',
           action: 'UPDATE_AI_SYSTEM',
           details: 'Sistema IA editado/actualizado (360 View)',
           timestamp: new Date().toISOString(),
           targetId: id
        });
      } catch (e) {
        console.error('Error recording log', e);
      }`
);

fs.writeFileSync('src/store/useStore.ts', code);
