const fs = require('fs');
const rules = fs.readFileSync('firestore.rules', 'utf8');

const collections = [
  'processes', 'aiSystems', 'risks', 'alerts', 
  'requirementAssessments', 'controlAssessments', 
  'healthSnapshots', 'activityLogs', 'auditItems', 'implementationActions', 'assessmentHistory',
  'processInputs', 'processOutputs', 'processActivities', 'stakeholders', 'governanceRoles',
  'objectives', 'indicators', 'indicatorMeasurements', 'processDependencies', 'processHistory',
  'aiImpactAssessments', 'aiDataResources', 'aiLifecycleEvents', 'aiIncidents', 'aiProviders', 'aiHistory',
  'nonConformities', 'capas', 'normativeControls', 'auditSessions', 'aiMetrics', 'evidenceLinks'
];

collections.forEach(c => {
  if (!rules.includes(`match /${c}/{docId}`)) {
    console.log("Missing rule for:", c);
  }
});
