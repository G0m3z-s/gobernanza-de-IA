const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

if (!code.includes('addAIImpactAssessment')) {
  code = code.replace(
    'updateAISystem: (id: string, updates: any) => Promise<void>;',
    'updateAISystem: (id: string, updates: any) => Promise<void>;\n  addAIImpactAssessment: (assessment: any) => Promise<void>;\n  updateAIImpactAssessment: (id: string, updates: any) => Promise<void>;'
  );

  code = code.replace(
    'addAISystem: async (system) => {',
    `addAIImpactAssessment: async (assessment) => {
    try {
      const docRef = await addDoc(collection(db, 'aiImpactAssessments'), {
        ...assessment,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            aiImpactAssessments: [...(currentData.aiImpactAssessments || []), { id: docRef.id, ...assessment }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding AI Impact Assessment:', error);
      throw error;
    }
  },
  updateAIImpactAssessment: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiImpactAssessments', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      set(state => {
        if (!state.data) return state;
        const currentImpacts = state.data.aiImpactAssessments || [];
        return {
          ...state,
          data: {
            ...state.data,
            aiImpactAssessments: currentImpacts.map(i => i.id === id ? { ...i, ...updates } : i)
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
