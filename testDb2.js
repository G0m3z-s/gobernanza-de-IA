import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function test() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId); // using custom database id
  try {
    const docRef = doc(db, 'organizations', 'org-nova');
    const docSnap = await getDoc(docRef);
    console.log('Exists?', docSnap.exists());
    if (docSnap.exists()) {
        console.log(docSnap.data());
    }
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
test();
