import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function seed() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  const blueprint = JSON.parse(await readFile('./firebase-blueprint.json', 'utf8'));
  
  for (const collection of blueprint.collections) {
    for (const document of collection.documents) {
      await setDoc(doc(db, collection.name, document.id), document.data);
      console.log(`Seeded ${collection.name}/${document.id}`);
    }
  }
  process.exit(0);
}
seed();
