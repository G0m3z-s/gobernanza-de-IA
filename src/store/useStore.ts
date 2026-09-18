import { create } from 'zustand';
import { DashboardData, Process, AISystem, Risk, Alert, RequirementAssessment, ControlAssessment, HealthSnapshot, ActivityLog, AuditItem, ImplementationAction, NormativeControl } from '../types';
import { collection, query, where, getDocs, doc, getDoc, orderBy, addDoc, updateDoc, serverTimestamp, setDoc, deleteDoc, runTransaction } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AppState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  selectedStandard: string;
  setSelectedStandard: (standard: string) => void;
  fetchData: (orgId: string) => Promise<void>;
  clearData: () => void;
  addEvidenceLink: (link: any) => Promise<void>;
  removeEvidenceLink: (linkId: string) => Promise<void>;
  addRiskControlLink: (link: any) => Promise<void>;
  removeRiskControlLink: (id: string) => Promise<void>;
  addControlEffectivenessTest: (test: any) => Promise<void>;
  updateControlEffectivenessTest: (id: string, updates: any) => Promise<void>;
  deleteControlEffectivenessTest: (id: string) => Promise<void>;
  addNonConformity: (nc: any) => Promise<void>;
  addRisk: (risk: any) => Promise<void>;
  addCapa: (capa: any) => Promise<void>;
  addObjective: (objective: any) => Promise<void>;
  addStakeholder: (stakeholder: any) => Promise<void>;
  addGovernanceRole: (role: any) => Promise<void>;
  addAISystem: (system: any) => Promise<void>;
  updateAISystem: (id: string, updates: any) => Promise<void>;
  addAIImpactAssessment: (assessment: any) => Promise<void>;
  updateAIImpactAssessment: (id: string, updates: any) => Promise<void>;
  addAILifecycleEvent: (event: any) => Promise<void>;
  addAIDataResource: (resource: any) => Promise<void>;
  addAIProvider: (provider: any) => Promise<void>;
  updateAIProvider: (id: string, updates: any) => Promise<void>;
  addAIMetric: (metric: any) => Promise<void>;
  addAIIncident: (incident: any) => Promise<void>;
  updateAIIncident: (id: string, updates: any) => Promise<void>;
  addAlert: (alert: any) => Promise<void>;
  updateAIDataResource: (id: string, updates: any) => Promise<void>;
  updateNormativeControl: (id: string, updates: Partial<NormativeControl>) => Promise<void>;
  updateControlAssessment: (id: string, updates: Partial<ControlAssessment>) => Promise<void>;
  addControlAssessment: (assessment: any) => Promise<string>;
  addAuditSession: (session: any) => Promise<void>;
  addAuditChecklistItem: (item: any) => Promise<void>;
  updateAuditChecklistItem: (id: string, updates: any) => Promise<void>;
  deleteAuditChecklistItem: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  selectedStandard: 'Integrado',
  setSelectedStandard: (standard: string) => set({ selectedStandard: standard }),
  addNonConformity: async (nc) => {
    try {
      const docRef = await addDoc(collection(db, 'nonConformities'), {
        ...nc,
        createdAt: serverTimestamp()
      });
      
      // Update local state to avoid full refetch
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            nonConformities: [...(currentData.nonConformities || []), { id: docRef.id, ...nc }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding NC:', error);
      throw error;
    }
  },
  addRisk: async (risk) => {
    try {
      const docRef = await addDoc(collection(db, 'risks'), {
        ...risk,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            risks: [...(currentData.risks || []), { id: docRef.id, ...risk }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding Risk:', error);
      throw error;
    }
  },
  addCapa: async (capa) => {
    try {
      const docRef = await addDoc(collection(db, 'capas'), {
        ...capa,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            capas: [...(currentData.capas || []), { id: docRef.id, ...capa }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding CAPA:', error);
      throw error;
    }
  },
  addObjective: async (objective) => {
    try {
      const docRef = await addDoc(collection(db, 'objectives'), {
        ...objective,
        createdAt: serverTimestamp(),
      });
      set((state) => ({
        data: {
          ...state.data,
          objectives: [...(state.data?.objectives || []), { id: docRef.id, ...objective }]
        }
      }));
    } catch (error) {
      console.error('Error adding Objective:', error);
      throw error;
    }
  },

  addStakeholder: async (stakeholder) => {
    try {
      const docRef = await addDoc(collection(db, 'stakeholders'), {
        ...stakeholder,
        createdAt: serverTimestamp(),
      });
      set((state) => ({
        data: {
          ...state.data,
          stakeholders: [...(state.data?.stakeholders || []), { id: docRef.id, ...stakeholder }]
        }
      }));
    } catch (error) {
      console.error('Error adding Stakeholder:', error);
      throw error;
    }
  },

  addGovernanceRole: async (role) => {
    try {
      const docRef = await addDoc(collection(db, 'governanceRoles'), {
        ...role,
        createdAt: serverTimestamp(),
      });
      set((state) => ({
        data: {
          ...state.data,
          governanceRoles: [...(state.data?.governanceRoles || []), { id: docRef.id, ...role }]
        }
      }));
    } catch (error) {
      console.error('Error adding Governance Role:', error);
      throw error;
    }
  },
  updateAISystem: async (id, updates) => {
    try {
      const docRef = doc(db, 'aiSystems', id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
      
      // Registrar cambio en activityLogs
      try {
        await addDoc(collection(db, 'activityLogs'), {
           organizationId: updates.organizationId,
           userId: 'system',
           action: 'UPDATE_AI_SYSTEM',
           details: 'Sistema IA editado/actualizado (360 View)',
           timestamp: new Date().toISOString(),
           targetId: id
        });
      } catch (e) {
        console.error('Error recording log', e);
      }
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
  addAIImpactAssessment: async (assessment) => {
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
  addAIMetric: async (metric) => {
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
  addAIProvider: async (provider) => {
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
  addAIDataResource: async (resource) => {
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
  addAILifecycleEvent: async (event) => {
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
  addAISystem: async (system) => {
    try {
      const docRef = await addDoc(collection(db, 'aiSystems'), {
        ...system,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            aiSystems: [...(currentData.aiSystems || []), { id: docRef.id, ...system }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding AI System:', error);
      throw error;
    }
  },
  addControlAssessment: async (assessment) => {
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

  updateNormativeControl: async (id, updates) => {
    try {
      const docRef = doc(db, 'normativeControls', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData && currentData.normativeControls) {
        set({
          data: {
            ...currentData,
            normativeControls: currentData.normativeControls.map(c => 
              c.id === id ? { ...c, ...updates } as NormativeControl : c
            )
          }
        });
      }
    } catch (error: any) {
      console.error('Error updating Normative Control:', error);
      throw error;
    }
  },
  addAuditSession: async (session) => {
    try {
      const docRef = await addDoc(collection(db, 'auditSessions'), {
        ...session,
        createdAt: serverTimestamp()
      });
      
      const currentData = get().data;
      if (currentData) {
        set({
          data: {
            ...currentData,
            auditSessions: [...(currentData.auditSessions || []), { id: docRef.id, ...session }]
          }
        });
      }
    } catch (error: any) {
      console.error('Error adding Audit Session:', error);
      throw error;
    }
  },
  addAuditChecklistItem: async (item) => {
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
  },
  clearData: () => set({ data: null, error: null }),
  
  
  
  addControlEffectivenessTest: async (test: any) => {
    try {
      if (test.id) {
        await setDoc(doc(db, 'controlEffectivenessTests', test.id), test);
      } else {
        await addDoc(collection(db, 'controlEffectivenessTests'), test);
      }
      set((state) => ({
        data: state.data ? {
          ...state.data,
          controlEffectivenessTests: [...(state.data.controlEffectivenessTests || []), test]
        } : null
      }));
    } catch (error) {
      console.error("Error adding control effectiveness test:", error);
      throw error;
    }
  },
  updateControlEffectivenessTest: async (id: string, updates: any) => {
    try {
      await updateDoc(doc(db, 'controlEffectivenessTests', id), updates);
      set((state) => ({
        data: state.data ? {
          ...state.data,
          controlEffectivenessTests: (state.data.controlEffectivenessTests || []).map((t: any) => t.id === id ? { ...t, ...updates } : t)
        } : null
      }));
    } catch (error) {
      console.error("Error updating control effectiveness test:", error);
      throw error;
    }
  },
  deleteControlEffectivenessTest: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'controlEffectivenessTests', id));
      set((state) => ({
        data: state.data ? {
          ...state.data,
          controlEffectivenessTests: (state.data.controlEffectivenessTests || []).filter((t: any) => t.id !== id)
        } : null
      }));
    } catch (error) {
      console.error("Error deleting control effectiveness test:", error);
      throw error;
    }
  },
  addRiskControlLink: async (link: any) => {
    try {
      if (link.id) {
        await setDoc(doc(db, 'riskControlLinks', link.id), link);
      } else {
        await addDoc(collection(db, 'riskControlLinks'), link);
      }
      set((state) => ({
        data: state.data ? {
          ...state.data,
          riskControlLinks: [...(state.data.riskControlLinks || []), link]
        } : null
      }));
    } catch (error) {
      console.error("Error adding risk control link:", error);
      throw error;
    }
  },
  removeRiskControlLink: async (linkId: string) => {
    try {
      await deleteDoc(doc(db, 'riskControlLinks', linkId));
      set((state) => ({
        data: state.data ? {
          ...state.data,
          riskControlLinks: (state.data.riskControlLinks || []).filter((l: any) => l.id !== linkId)
        } : null
      }));
    } catch (error) {
      console.error("Error removing risk control link:", error);
      throw error;
    }
  },
  addEvidenceLink: async (link: any) => {
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
  },
  removeEvidenceLink: async (linkId: string) => {
    try {
      await deleteDoc(doc(db, 'evidenceLinks', linkId));
      set((state) => ({
        data: state.data ? {
          ...state.data,
          evidenceLinks: (state.data.evidenceLinks || []).filter((l: any) => l.id !== linkId)
        } : null
      }));
    } catch (error) {
      console.error("Error removing evidence link:", error);
      throw error;
    }
  },

  fetchData: async (orgId: string) => {
    set({ loading: true, error: null });
    try {
      // Organization
      const orgDoc = await getDoc(doc(db, 'organizations', orgId));
      if (!orgDoc.exists()) throw new Error('Organización no encontrada');
      const organization = { id: orgDoc.id, ...orgDoc.data() } as any;

      const collectionsToFetch = [
        'processes', 'aiSystems', 'risks', 'alerts', 
        'requirementAssessments', 'controlAssessments', 
        'healthSnapshots', 'activityLogs', 'auditItems', 'implementationActions', 'assessmentHistory',
        'processInputs', 'processOutputs', 'processActivities', 'stakeholders', 'governanceRoles',
        'objectives', 'indicators', 'indicatorMeasurements', 'processDependencies', 'processHistory',
        'aiImpactAssessments', 'aiDataResources', 'aiLifecycleEvents', 'aiIncidents', 'aiProviders', 'aiHistory',
        'nonConformities', 'capas', 'normativeControls', 'auditSessions', 'aiMetrics', 'evidenceLinks', 'auditChecklistItems'
      ];

      const results = await Promise.all(collectionsToFetch.map(async (coll) => {
        try {
          const q = query(collection(db, coll), where('organizationId', '==', orgId));
          const snap = await getDocs(q);
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (e) {
          console.error("Error fetching collection:", coll, e);
          throw e; // rethrow to be caught by the outer catch
        }
      }));

      set({ 
        data: {
          organization,
          processes: results[0] as Process[],
          aiSystems: results[1] as AISystem[],
          risks: results[2] as Risk[],
          alerts: results[3] as Alert[],
          requirementAssessments: results[4] as RequirementAssessment[],
          controlAssessments: results[5] as ControlAssessment[],
          healthSnapshots: (results[6] as HealthSnapshot[]).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
          activityLogs: (results[7] as ActivityLog[]).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          auditItems: results[8] as AuditItem[],
          implementationActions: results[9] as ImplementationAction[],
          assessmentHistory: (results[10] as any[]).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          processInputs: results[11] as any[] || [],
          processOutputs: results[12] as any[] || [],
          processActivities: (results[13] as any[] || []).sort((a, b) => a.sequence - b.sequence),
          stakeholders: results[14] as any[] || [],
          governanceRoles: results[15] as any[] || [],
          objectives: results[16] as any[] || [],
          indicators: results[17] as any[] || [],
          indicatorMeasurements: (results[18] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          processDependencies: results[19] as any[] || [],
          processHistory: (results[20] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          aiImpactAssessments: results[21] as any[] || [],
          aiDataResources: results[22] as any[] || [],
          aiLifecycleEvents: (results[23] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          aiIncidents: results[24] as any[] || [],
          aiProviders: results[25] as any[] || [],
          aiHistory: (results[26] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          nonConformities: results[27] as any[] || [],
          capas: results[28] as any[] || [],
          normativeControls: results[29] as any[] || [],
          auditSessions: results[30] as any[] || [],
          aiMetrics: results[31] as any[] || [],
          evidenceLinks: results[32] as any[] || [],
          auditChecklistItems: results[33] as any[] || [],
          riskControlLinks: results[33] as any[] || [],
          controlEffectivenessTests: results[34] as any[] || [],
        }, 
        loading: false 
      });
    } catch (error: any) {
      set({ error: "Failed fetching data: " + error.message, loading: false });
    }
  }
}));
