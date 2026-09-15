import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function seed() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  const orgId = 'org-nova';

  // Requirement Assessments
  const requirements = [
    { id: 'req-1', clause: '4', standard: 'ISO/IEC 27001', status: 'verified' },
    { id: 'req-2', clause: '5', standard: 'ISO/IEC 27001', status: 'evidenced' },
    { id: 'req-3', clause: '6', standard: 'ISO/IEC 27001', status: 'implemented' },
    { id: 'req-4', clause: '7', standard: 'ISO/IEC 27001', status: 'documented' },
    { id: 'req-5', clause: '8', standard: 'ISO/IEC 27001', status: 'planned' },
    { id: 'req-6', clause: '9', standard: 'ISO/IEC 27001', status: 'gap' },
    { id: 'req-7', clause: '10', standard: 'ISO/IEC 27001', status: 'not_evaluated' },
    { id: 'req-8', clause: '4', standard: 'ISO/IEC 42001', status: 'evidenced' },
    { id: 'req-9', clause: '5', standard: 'ISO/IEC 42001', status: 'implemented' },
    { id: 'req-10', clause: '6', standard: 'ISO/IEC 42001', status: 'documented' },
    { id: 'req-11', clause: 'Anexo A', standard: 'ISO/IEC 27001', status: 'implemented' },
    { id: 'req-12', clause: 'Anexo A', standard: 'ISO/IEC 42001', status: 'planned' },
  ];

  for (const req of requirements) {
    await setDoc(doc(db, 'requirementAssessments', req.id), { ...req, organizationId: orgId });
  }

  // Control Assessments
  const controls = [
    { id: 'ctrl-1', control: 'A.5.1', standard: 'ISO/IEC 27001', status: 'implemented', evidenceStatus: 'valid', testResult: 'effective', process: 'TI' },
    { id: 'ctrl-2', control: 'A.5.2', standard: 'ISO/IEC 27001', status: 'evidenced', evidenceStatus: 'expiring', testResult: 'partially_effective', process: 'TI' },
    { id: 'ctrl-3', control: 'A.5.3', standard: 'ISO/IEC 27001', status: 'documented', evidenceStatus: 'pending_review', testResult: 'not_tested', process: 'Gerencia' },
    { id: 'ctrl-4', control: 'A.5.4', standard: 'ISO/IEC 27001', status: 'gap', evidenceStatus: 'expired', testResult: 'ineffective', process: 'TI' },
    { id: 'ctrl-5', control: 'A.6.1', standard: 'ISO/IEC 42001', status: 'verified', evidenceStatus: 'valid', testResult: 'effective', process: 'TI' },
    { id: 'ctrl-6', control: 'A.6.2', standard: 'ISO/IEC 42001', status: 'not_evaluated', evidenceStatus: 'rejected', testResult: 'not_tested', process: 'Gerencia' },
  ];

  for (const ctrl of controls) {
    await setDoc(doc(db, 'controlAssessments', ctrl.id), { ...ctrl, organizationId: orgId });
  }

  // Health Snapshots (last 6 months)
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    await setDoc(doc(db, 'healthSnapshots', `snap-${i}`), {
      organizationId: orgId,
      date: date.toISOString(),
      standard: 'Integrado',
      scope: 'Global',
      implementation: 40 + (5 * (5 - i)),
      evidence: 30 + (6 * (5 - i)),
      effectiveness: 20 + (8 * (5 - i)),
      auditReadiness: 25 + (7 * (5 - i)),
      globalHealth: 35 + (6 * (5 - i))
    });
  }

  // Activity Logs
  const activities = [
    { id: 'act-1', user: 'Ana Martínez', action: 'Aprobó', entity: 'Política de IA', date: new Date().toISOString() },
    { id: 'act-2', user: 'Carlos Ruiz', action: 'Actualizó', entity: 'Riesgo R-004', date: new Date(Date.now() - 3600000).toISOString() },
    { id: 'act-3', user: 'Luis Gómez', action: 'Subió evidencia', entity: 'Reporte Pentest', date: new Date(Date.now() - 7200000).toISOString() },
    { id: 'act-4', user: 'Ana Martínez', action: 'Comentó', entity: 'Hallazgo H-02', date: new Date(Date.now() - 86400000).toISOString() },
  ];

  for (const act of activities) {
    await setDoc(doc(db, 'activityLogs', act.id), { ...act, organizationId: orgId });
  }
  
  // Audits & CAPA (Findings / Actions)
  const auditData = [
    { id: 'find-1', type: 'finding', category: 'no_conformity', status: 'open', dueDate: new Date(Date.now() - 86400000).toISOString() }, // expired
    { id: 'find-2', type: 'finding', category: 'observation', status: 'open', dueDate: new Date(Date.now() + 86400000 * 5).toISOString() },
    { id: 'act-1', type: 'action', status: 'pending_effectiveness', dueDate: new Date(Date.now() - 86400000 * 2).toISOString() }, // expired action
  ];
  for (const aud of auditData) {
     await setDoc(doc(db, 'auditItems', aud.id), { ...aud, organizationId: orgId });
  }

  console.log('Seeded additional data for CommandCenter');
  process.exit(0);
}
seed();
