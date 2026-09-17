import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function test() {
  try {
    const userCred = await signInWithEmailAndPassword(auth, "gomezgiraldogerson@gmail.com", "123456");
    console.log("Logged in:", userCred.user.uid);
    const q = query(collection(db, 'memberships'), where('userId', '==', userCred.user.uid), where('status', '==', 'active'));
    const querySnapshot = await getDocs(q);
    console.log("Docs:", querySnapshot.docs.length);
  } catch (e) {
    console.log("ERROR:", e);
  }
  process.exit(0);
}
test();
