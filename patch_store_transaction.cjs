const fs = require('fs');
let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

const targetStr = `  addAuditChecklistItem: async (item) => {
    try {
      if (!item.id) {
        throw new Error('addAuditChecklistItem requires item.id (deterministic ID)');
      }
      const docRef = doc(db, 'auditChecklistItems', item.id);
      const existing = await getDoc(docRef);
      
      if (existing.exists()) {
        const data = existing.data();
        if (data.status !== 'NOT_STARTED' || data.result !== 'NOT_EVALUATED') {
          console.log('Skipping existing AuditChecklistItem due to progress:', item.id);
          return;
        }
        // If it exists but no progress, just return (no-op as per requirements)
        return;
      }

      await setDoc(docRef, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            auditChecklistItems: [...(currentData.auditChecklistItems || []).filter(i => i.id !== item.id), { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
          }
        });
      }
    } catch (error) {
      console.error('Error adding Audit Checklist Item:', error);
      throw error;
    }
  },`;

const replacement = `  addAuditChecklistItem: async (item) => {
    try {
      if (!item.id) {
        throw new Error('addAuditChecklistItem requires item.id (deterministic ID)');
      }
      const docRef = doc(db, 'auditChecklistItems', item.id);
      
      const transactionResult = await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(docRef);
        
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.status !== 'NOT_STARTED' || data.result !== 'NOT_EVALUATED') {
            console.log('Skipping existing AuditChecklistItem due to progress:', item.id);
            return { action: 'no-op', reason: 'progress' };
          }
          return { action: 'no-op', reason: 'exists' };
        }

        const itemToSave = {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        transaction.set(docRef, itemToSave);
        return { action: 'created', item: itemToSave };
      });
      
      if (transactionResult.action === 'created') {
        const currentData = get().data;
        if (currentData) {
          // Avoid duplicates by filtering first
          set({
            data: {
              ...currentData,
              auditChecklistItems: [
                ...(currentData.auditChecklistItems || []).filter(i => i.id !== item.id), 
                { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
              ]
            }
          });
        }
      }
    } catch (error) {
      console.error('Error adding Audit Checklist Item:', error);
      throw error;
    }
  },`;

content = content.replace(targetStr, replacement);
fs.writeFileSync('src/store/useStore.ts', content);
console.log('patched store transaction');
