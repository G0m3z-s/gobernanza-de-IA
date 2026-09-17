const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

if (!code.includes('addAIDataResource')) {
  code = code.replace(
    'addAILifecycleEvent: (event: any) => Promise<void>;',
    'addAILifecycleEvent: (event: any) => Promise<void>;\n  addAIDataResource: (resource: any) => Promise<void>;\n  updateAIDataResource: (id: string, updates: any) => Promise<void>;'
  );

  code = code.replace(
    'addAILifecycleEvent: async (event) => {',
    `addAIDataResource: async (resource) => {
    try {
      const docRef = await addDoc(collection(db, 'aiDataResources'), {
        ...resource,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            aiDataResources: [...(currentData.aiDataResources || []), { id: docRef.id, ...resource }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding AI Data Resource:', error);
      throw error;
    }
  },
  updateAIDataResource: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiDataResources', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      set(state => {
        if (!state.data) return state;
        const currentDataResources = state.data.aiDataResources || [];
        return {
          ...state,
          data: {
            ...state.data,
            aiDataResources: currentDataResources.map(r => r.id === id ? { ...r, ...updates } : r)
          }
        };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  addAILifecycleEvent: async (event) => {`
  );

  fs.writeFileSync('src/store/useStore.ts', code);
}
