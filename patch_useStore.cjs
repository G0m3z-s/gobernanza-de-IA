const fs = require('fs');
let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

const oldAdd = `  addEvidenceLink: async (link: any) => {
    try {
      // It's assumed the caller generates a deterministic ID for the link (or lets Firestore generate, but caller sets id)
      if (link.id) {
        await setDoc(doc(db, 'evidenceLinks', 'riskControlLinks', 'controlEffectivenessTests', link.id), link);
      } else {
        await addDoc(collection(db, 'evidenceLinks'), link);
      }
      // Re-fetch data or manually update state. Fetching is easier if we just call get().fetchData(link.organizationId) or update locally.
      set((state) => ({
        data: state.data ? {
          ...state.data,
          evidenceLinks: [...(state.data.evidenceLinks || []), link]
        } : null
      }));
    } catch (error) {
      console.error("Error adding evidence link:", error);
      throw error;
    }
  },`;

const newAdd = `  addEvidenceLink: async (link: any) => {
    try {
      if (link.id) {
        const linkRef = doc(db, 'evidenceLinks', link.id);
        const didCreate = await runTransaction(db, async (transaction) => {
          const docSnap = await transaction.get(linkRef);
          if (docSnap.exists()) {
            return false; // NO-OP: the deterministic link already exists
          }
          transaction.set(linkRef, link);
          return true;
        });
        
        if (didCreate) {
          set((state) => {
            if (!state.data) return state;
            // Prevent duplicate in local state just in case
            if ((state.data.evidenceLinks || []).some((l: any) => l.id === link.id)) return state;
            
            return {
              data: {
                ...state.data,
                evidenceLinks: [...(state.data.evidenceLinks || []), link]
              }
            };
          });
        }
      } else {
        const docRef = await addDoc(collection(db, 'evidenceLinks'), link);
        set((state) => ({
          data: state.data ? {
            ...state.data,
            evidenceLinks: [...(state.data.evidenceLinks || []), { ...link, id: docRef.id }]
          } : null
        }));
      }
    } catch (error) {
      console.error("Error adding evidence link:", error);
      throw error;
    }
  },`;

content = content.replace(oldAdd, newAdd);
fs.writeFileSync('src/store/useStore.ts', content);
console.log('patched useStore.ts addEvidenceLink');
