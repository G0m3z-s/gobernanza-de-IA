import fs from 'fs';

let content = fs.readFileSync('src/store/useStore.ts', 'utf8');

const collectionsToFetchOriginal = `const collectionsToFetch = [
        'processes', 'aiSystems', 'risks', 'alerts', 
        'requirementAssessments', 'controlAssessments', 
        'healthSnapshots', 'activityLogs', 'auditItems', 'implementationActions', 'assessmentHistory',
        'processInputs', 'processOutputs', 'processActivities', 'stakeholders', 'governanceRoles',
        'objectives', 'indicators', 'indicatorMeasurements', 'processDependencies', 'processHistory'
      ];`;

const collectionsToFetchNew = `const collectionsToFetch = [
        'processes', 'aiSystems', 'risks', 'alerts', 
        'requirementAssessments', 'controlAssessments', 
        'healthSnapshots', 'activityLogs', 'auditItems', 'implementationActions', 'assessmentHistory',
        'processInputs', 'processOutputs', 'processActivities', 'stakeholders', 'governanceRoles',
        'objectives', 'indicators', 'indicatorMeasurements', 'processDependencies', 'processHistory',
        'aiImpactAssessments', 'aiDataResources', 'aiLifecycleEvents', 'aiIncidents', 'aiProviders', 'aiHistory'
      ];`;

content = content.replace(collectionsToFetchOriginal, collectionsToFetchNew);

const resultsOriginal = `          processHistory: (results[20] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        }, 
        loading: false 
      });`;

const resultsNew = `          processHistory: (results[20] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          aiImpactAssessments: results[21] as any[] || [],
          aiDataResources: results[22] as any[] || [],
          aiLifecycleEvents: (results[23] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          aiIncidents: results[24] as any[] || [],
          aiProviders: results[25] as any[] || [],
          aiHistory: (results[26] as any[] || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        }, 
        loading: false 
      });`;

content = content.replace(resultsOriginal, resultsNew);

fs.writeFileSync('src/store/useStore.ts', content);
console.log('Store updated');
