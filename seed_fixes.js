import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function seed() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  const orgId = 'org-nova';

  const batch = writeBatch(db);

  // Fix AI Systems status
  const aiSystems = [
    { id: 'sys-ai-1', name: 'Copilot Logístico', process: 'Operaciones', type: 'Predictive', riskRating: 'Alto', approvalStatus: 'approved' },
    { id: 'sys-ai-2', name: 'Bot de Soporte', process: 'Servicio al Cliente', type: 'Generative', riskRating: 'Medio', approvalStatus: 'pending_review' }
  ];

  for (const ai of aiSystems) {
    const ref = doc(db, 'aiSystems', ai.id);
    batch.set(ref, { ...ai, organizationId: orgId, createdAt: new Date().toISOString() }, { merge: true });
  }

  await batch.commit();
  console.log('AI Systems status fixed.');
  process.exit(0);
}

seed();
