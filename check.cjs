const fs = require('fs');
const rules = fs.readFileSync('rules_collections.txt', 'utf8').split('\n').filter(Boolean);
const collectionsToFetch = [
        'processes', 'aiSystems', 'risks', 'alerts', 
        'requirementAssessments', 'controlAssessments', 
        'healthSnapshots', 'activityLogs', 'auditItems', 'implementationActions', 'assessmentHistory',
        'processInputs', 'processOutputs', 'processActivities', 'stakeholders', 'governanceRoles',
        'objectives', 'indicators', 'indicatorMeasurements', 'processDependencies', 'processHistory',
        'aiImpactAssessments', 'aiDataResources', 'aiLifecycleEvents', 'aiIncidents', 'aiProviders', 'aiHistory',
        'nonConformities', 'capas', 'normativeControls', 'auditSessions', 'aiMetrics', 'evidenceLinks'
      ];
collectionsToFetch.forEach(c => {
  if (!rules.includes(c)) {
    console.log("MISSING IN RULES:", c);
  }
});
