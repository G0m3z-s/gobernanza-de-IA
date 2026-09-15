import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function seed() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  const orgId = 'org-nova';

  const batch = writeBatch(db);

  // Processes
  const processes = [
    { id: 'proc-1', code: 'GER-01', name: 'Gerencia', category: 'strategic', status: 'active', ownerId: 'Carlos Ruiz', criticality: 'high' },
    { id: 'proc-2', code: 'COM-01', name: 'Comercial', category: 'mission', status: 'active', ownerId: 'Ana Martínez', criticality: 'high' },
    { id: 'proc-3', code: 'OPE-01', name: 'Operaciones', category: 'mission', status: 'active', ownerId: 'Luis Gómez', criticality: 'critical' },
    { id: 'proc-4', code: 'TEC-01', name: 'Tecnología', category: 'support', status: 'active', ownerId: 'Laura Rojas', criticality: 'critical' },
    { id: 'proc-5', code: 'TH-01', name: 'Talento Humano', category: 'support', status: 'active', ownerId: 'Sofía Castro', criticality: 'medium' },
    { id: 'proc-6', code: 'SAC-01', name: 'Servicio al Cliente', category: 'mission', status: 'active', ownerId: 'Diego Torres', criticality: 'high' },
    { id: 'proc-7', code: 'AUD-01', name: 'Auditoría / Control', category: 'control', status: 'active', ownerId: 'Elena Silva', criticality: 'high' },
  ];

  for (const proc of processes) {
    const pRef = doc(db, 'processes', proc.id);
    batch.set(pRef, { ...proc, organizationId: orgId, createdAt: new Date().toISOString() }, { merge: true });
  }

  // Objectives
  const objectives = [
    { id: 'obj-1', processId: 'proc-3', code: 'OBJ-OPE-01', name: 'Optimizar Tiempos de Entrega', status: 'on_track', ownerId: 'Luis Gómez' },
    { id: 'obj-2', processId: 'proc-4', code: 'OBJ-TEC-01', name: 'Garantizar Uptime de IA', status: 'on_track', ownerId: 'Laura Rojas' },
    { id: 'obj-3', processId: 'proc-1', code: 'OBJ-GER-01', name: 'Cumplimiento Normativo 27001/42001', status: 'at_risk', ownerId: 'Carlos Ruiz' }
  ];

  for (const obj of objectives) {
    const ref = doc(db, 'objectives', obj.id);
    batch.set(ref, { ...obj, organizationId: orgId, createdAt: new Date().toISOString() });
  }

  // Stakeholders
  const stakeholders = [
    { id: 'stk-1', name: 'Clientes Corporativos', category: 'Clientes', internalExternal: 'External', status: 'active' },
    { id: 'stk-2', name: 'OpenAI (Proveedor LLM)', category: 'Proveedores IA', internalExternal: 'External', status: 'active' },
    { id: 'stk-3', name: 'Empleados', category: 'Empleados', internalExternal: 'Internal', status: 'active' },
    { id: 'stk-4', name: 'Junta Directiva', category: 'Alta Dirección', internalExternal: 'Internal', status: 'active' }
  ];

  for (const stk of stakeholders) {
    const ref = doc(db, 'stakeholders', stk.id);
    batch.set(ref, { ...stk, organizationId: orgId, createdAt: new Date().toISOString() });
  }

  // Indicators
  const indicators = [
    { id: 'ind-1', processId: 'proc-3', objectiveId: 'obj-1', code: 'IND-OPE-01', name: 'Tiempo Promedio de Entrega', unit: 'horas', target: 24, currentValue: 22, status: 'active' },
    { id: 'ind-2', processId: 'proc-4', objectiveId: 'obj-2', code: 'IND-TEC-01', name: 'Uptime', unit: '%', target: 99.9, currentValue: 99.95, status: 'active' }
  ];

  for (const ind of indicators) {
    const ref = doc(db, 'indicators', ind.id);
    batch.set(ref, { ...ind, organizationId: orgId, createdAt: new Date().toISOString() });
  }

  // AI Systems
  const aiSystems = [
    { id: 'sys-ai-1', name: 'Copilot Logístico', process: 'Operaciones', type: 'Predictive', riskRating: 'High', approvalStatus: 'Approved' },
    { id: 'sys-ai-2', name: 'Bot de Soporte', process: 'Servicio al Cliente', type: 'Generative', riskRating: 'Medium', approvalStatus: 'Pending' }
  ];

  for (const ai of aiSystems) {
    const ref = doc(db, 'aiSystems', ai.id);
    batch.set(ref, { ...ai, organizationId: orgId, createdAt: new Date().toISOString() }, { merge: true });
  }

  await batch.commit();
  console.log('Governance data seeded successfully.');
  process.exit(0);
}

seed();
