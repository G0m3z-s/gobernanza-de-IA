const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

if (!code.includes('addAIMetric')) {
  code = code.replace(
    'updateAIProvider: (id: string, updates: any) => Promise<void>;',
    `updateAIProvider: (id: string, updates: any) => Promise<void>;
  addAIMetric: (metric: any) => Promise<void>;
  addAIIncident: (incident: any) => Promise<void>;
  updateAIIncident: (id: string, updates: any) => Promise<void>;
  addAlert: (alert: any) => Promise<void>;`
  );

  code = code.replace(
    'addAIProvider: async (provider) => {',
    `addAIMetric: async (metric) => {
    try {
      const docRef = await addDoc(collection(db, 'aiMetrics'), {
        ...metric,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            aiMetrics: [...(currentData.aiMetrics || []), { id: docRef.id, ...metric }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding AI Metric:', error);
      throw error;
    }
  },
  addAIIncident: async (incident) => {
    try {
      const docRef = await addDoc(collection(db, 'aiIncidents'), {
        ...incident,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            aiIncidents: [...(currentData.aiIncidents || []), { id: docRef.id, ...incident }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding AI Incident:', error);
      throw error;
    }
  },
  updateAIIncident: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiIncidents', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      set(state => {
        if (!state.data) return state;
        const current = state.data.aiIncidents || [];
        return {
          ...state,
          data: {
            ...state.data,
            aiIncidents: current.map(i => i.id === id ? { ...i, ...updates } : i)
          }
        };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  addAlert: async (alert) => {
    try {
      // In a real app we might write to Firestore, but if Alerts are local/mocked or we just update state
      // We will write to 'alerts' collection just in case
      const docRef = await addDoc(collection(db, 'alerts'), alert);
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            alerts: [...(currentData.alerts || []), { id: docRef.id, ...alert }]
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  addAIProvider: async (provider) => {`
  );

  fs.writeFileSync('src/store/useStore.ts', code);
}
