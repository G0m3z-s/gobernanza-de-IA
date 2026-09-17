const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

if (!code.includes('updateAISystem')) {
  code = code.replace(
    'addAISystem: (system: any) => Promise<void>;',
    'addAISystem: (system: any) => Promise<void>;\n  updateAISystem: (id: string, updates: any) => Promise<void>;'
  );

  code = code.replace(
    'addAISystem: async (system) => {',
    `updateAISystem: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiSystems', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      set(state => {
        if (!state.data) return state;
        const currentSystems = state.data.aiSystems || [];
        return {
          ...state,
          data: {
            ...state.data,
            aiSystems: currentSystems.map(s => s.id === id ? { ...s, ...updates } : s)
          }
        };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  addAISystem: async (system) => {`
  );
  
  fs.writeFileSync('src/store/useStore.ts', code);
}
