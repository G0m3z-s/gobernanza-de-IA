const fs = require('fs');
let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

content = content.replace(
  `updateNormativeControl: (id: string, updates: Partial<NormativeControl>) => Promise<void>;`,
  `updateNormativeControl: (id: string, updates: Partial<NormativeControl>) => Promise<void>;\n  updateControlAssessment: (id: string, updates: Partial<ControlAssessment>) => Promise<void>;\n  addControlAssessment: (assessment: any) => Promise<string>;`
);

const targetFn = `  updateNormativeControl: async (id, updates) => {`;
const replaceFn = `  addControlAssessment: async (assessment) => {
    try {
      const docRef = await addDoc(collection(db, 'controlAssessments'), {
        ...assessment,
        updatedAt: serverTimestamp()
      });
      set((state) => {
        if (!state.data) return state;
        return {
          ...state,
          data: {
            ...state.data,
            controlAssessments: [...(state.data.controlAssessments || []), { id: docRef.id, ...assessment } as ControlAssessment]
          }
        };
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding Control Assessment:', error);
      throw error;
    }
  },

  updateControlAssessment: async (id, updates) => {
    try {
      const docRef = doc(db, 'controlAssessments', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      set((state) => {
        if (!state.data) return state;
        return {
          ...state,
          data: {
            ...state.data,
            controlAssessments: (state.data.controlAssessments || []).map(c => 
              c.id === id ? { ...c, ...updates } as ControlAssessment : c
            )
          }
        };
      });
    } catch (error) {
      console.error('Error updating Control Assessment:', error);
      throw error;
    }
  },

  updateNormativeControl: async (id, updates) => {`;
content = content.replace(targetFn, replaceFn);

fs.writeFileSync('src/store/useStore.ts', content);
console.log("Patched useStore.ts");
