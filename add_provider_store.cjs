const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

if (!code.includes('addAIProvider')) {
  code = code.replace(
    'addAIDataResource: (resource: any) => Promise<void>;',
    'addAIDataResource: (resource: any) => Promise<void>;\n  addAIProvider: (provider: any) => Promise<void>;\n  updateAIProvider: (id: string, updates: any) => Promise<void>;'
  );

  code = code.replace(
    'addAIDataResource: async (resource) => {',
    `addAIProvider: async (provider) => {
    try {
      const docRef = await addDoc(collection(db, 'aiProviders'), {
        ...provider,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            aiProviders: [...(currentData.aiProviders || []), { id: docRef.id, ...provider }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding AI Provider:', error);
      throw error;
    }
  },
  updateAIProvider: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiProviders', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      set(state => {
        if (!state.data) return state;
        const currentProviders = state.data.aiProviders || [];
        return {
          ...state,
          data: {
            ...state.data,
            aiProviders: currentProviders.map(p => p.id === id ? { ...p, ...updates } : p)
          }
        };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  addAIDataResource: async (resource) => {`
  );

  fs.writeFileSync('src/store/useStore.ts', code);
}
