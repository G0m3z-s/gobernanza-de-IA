import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function seed() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  const orgId = 'org-nova';

  const actions = [
    { id: 'act-imp-1', title: 'Definir matriz de partes interesadas', description: 'Crear el documento oficial para mapear expectativas de ISO 27001 e ISO 42001.', priority: 'ALTA', ownerId: 'Ana Martínez', status: 'PENDIENTE', dueDate: new Date(Date.now() + 86400000 * 7).toISOString() },
    { id: 'act-imp-2', title: 'Aprobar política SGIA', description: 'Revisión final con gerencia.', priority: 'CRÍTICA', ownerId: 'Carlos Ruiz', status: 'EN PROGRESO', dueDate: new Date(Date.now() + 86400000 * 3).toISOString() },
    { id: 'act-imp-3', title: 'Capacitación a desarrolladores sobre sesgos', description: 'Curso obligatorio.', priority: 'MEDIA', ownerId: 'Luis Gómez', status: 'VENCIDA', dueDate: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 'act-imp-4', title: 'Actualizar inventario de activos', description: 'Incluir modelos LLM externos.', priority: 'BAJA', ownerId: 'Luis Gómez', status: 'COMPLETADA', dueDate: new Date(Date.now() - 86400000 * 10).toISOString(), completedDate: new Date(Date.now() - 86400000 * 12).toISOString() }
  ];

  for (const act of actions) {
    await setDoc(doc(db, 'implementationActions', act.id), { ...act, organizationId: orgId });
  }

  console.log('Seeded implementation actions');
  process.exit(0);
}
seed();
