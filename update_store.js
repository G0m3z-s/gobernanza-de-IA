import fs from 'fs';

let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

// The collections list
const collectionsToFetchOriginal = `const collectionsToFetch = [
        'processes', 'aiSystems', 'risks', 'alerts', 
        'requirementAssessments', 'controlAssessments', 
        'healthSnapshots', 'activityLogs', 'auditItems', 'implementationActions', 'assessmentHistory'
      ];`;

const collectionsToFetchNew = `const collectionsToFetch = [
        'processes', 'aiSystems', 'risks', 'alerts', 
        'requirementAssessments', 'controlAssessments', 
        'healthSnapshots', 'activityLogs', 'auditItems', 'implementationActions', 'assessmentHistory',
        'processInputs', 'processOutputs', 'processActivities', 'stakeholders', 'governanceRoles',
        'objectives', 'indicators', 'indicatorMeasurements', 'processDependencies', 'processHistory'
      ];`;

content = content.replace(collectionsToFetchOriginal, collectionsToFetchNew);

const resultsOriginal = `          assessmentHistory: (results[10] as any[]).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        }, 
        loading: false 
      });`;

const resultsNew = `          assessmentHistory: (results[10] as any[]).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
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
        }, 
        loading: false 
      });`;

content = content.replace(resultsOriginal, resultsNew);

fs.writeFileSync('src/store/useStore.ts', content);
console.log('Store updated');
