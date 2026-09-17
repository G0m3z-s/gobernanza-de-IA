const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

if (!code.includes('addAILifecycleEvent')) {
  code = code.replace(
    'updateAIImpactAssessment: (id: string, updates: any) => Promise<void>;',
    'updateAIImpactAssessment: (id: string, updates: any) => Promise<void>;\n  addAILifecycleEvent: (event: any) => Promise<void>;'
  );

  code = code.replace(
    'updateAIImpactAssessment: async (id, updates) => {',
    `addAILifecycleEvent: async (event) => {
    try {
      const docRef = await addDoc(collection(db, 'aiLifecycleEvents'), {
        ...event,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            aiLifecycleEvents: [...(currentData.aiLifecycleEvents || []), { id: docRef.id, ...event }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding AI Lifecycle Event:', error);
      throw error;
    }
  },
  updateAIImpactAssessment: async (id, updates) => {`
  );

  fs.writeFileSync('src/store/useStore.ts', code);
}
