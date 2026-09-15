import { create } from 'zustand';
import { DashboardData, Process, AISystem, Risk, Alert, RequirementAssessment, ControlAssessment, HealthSnapshot, ActivityLog, AuditItem, ImplementationAction } from '../types';
import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AppState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchData: (orgId: string) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  data: null,
  loading: false,
  error: null,
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
        'aiImpactAssessments', 'aiDataResources', 'aiLifecycleEvents', 'aiIncidents', 'aiProviders', 'aiHistory'
      ];

      const results = await Promise.all(collectionsToFetch.map(async (coll) => {
        const q = query(collection(db, coll), where('organizationId', '==', orgId));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
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
        }, 
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));
