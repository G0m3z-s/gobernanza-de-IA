import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function test() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  try {
    const orgs = await getDocs(collection(db, 'organizations'));
    console.log('Docs found:', orgs.docs.length);
    orgs.docs.forEach(d => console.log(d.id, d.data()));
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
test();
