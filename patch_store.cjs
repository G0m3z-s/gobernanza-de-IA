const fs = require('fs');
let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

// Add to interface
content = content.replace(
  /  addAuditSession: \(session: any\) => Promise<void>;/,
  `  addAuditSession: (session: any) => Promise<void>;
  addAuditChecklistItem: (item: any) => Promise<void>;
  updateAuditChecklistItem: (id: string, updates: any) => Promise<void>;
  deleteAuditChecklistItem: (id: string) => Promise<void>;`
);

// Add methods
const methods = `  addAuditChecklistItem: async (item) => {
    try {
      const docRef = await addDoc(collection(db, 'auditChecklistItems'), {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            auditChecklistItems: [...(currentData.auditChecklistItems || []), { id: docRef.id, ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
          }
        });
      }
    } catch (error) {
      console.error('Error adding Audit Checklist Item:', error);
      throw error;
    }
  },
  updateAuditChecklistItem: async (id, updates) => {
    try {
      const docRef = doc(db, 'auditChecklistItems', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            auditChecklistItems: (currentData.auditChecklistItems || []).map(i => 
              i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i
            )
          }
        });
      }
    } catch (error) {
      console.error('Error updating Audit Checklist Item:', error);
      throw error;
    }
  },
  deleteAuditChecklistItem: async (id) => {
    try {
      const docRef = doc(db, 'auditChecklistItems', id);
      await deleteDoc(docRef);
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            auditChecklistItems: (currentData.auditChecklistItems || []).filter(i => i.id !== id)
          }
        });
      }
    } catch (error) {
      console.error('Error deleting Audit Checklist Item:', error);
      throw error;
    }
  },`;

content = content.replace(
  /  clearData: \(\) => set\(\{ data: null, error: null \}\),/,
  methods + '\n  clearData: () => set({ data: null, error: null }),'
);

// Add to fetch collections
content = content.replace(
  /'nonConformities', 'capas', 'normativeControls', 'auditSessions', 'aiMetrics', 'evidenceLinks'/,
  `'nonConformities', 'capas', 'normativeControls', 'auditSessions', 'aiMetrics', 'evidenceLinks', 'auditChecklistItems'`
);

// Add to fetch results mapping
content = content.replace(
  /evidenceLinks: results\[32\] as any\[\] \|\| \[\]/,
  `evidenceLinks: results[32] as any[] || [],
          auditChecklistItems: results[33] as any[] || []`
);

fs.writeFileSync('src/store/useStore.ts', content);
console.log('patched useStore');
