import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function test() {
  try {
    const userCred = await signInWithEmailAndPassword(auth, "gomezgiraldogerson@gmail.com", "123456");
    
    // CASO A: User is logged in, query their org
    const orgId = "org-nova"; // Replace with actual org if we can find it
    console.log("Logged in:", userCred.user.uid);
    const q1 = query(collection(db, 'memberships'), where('userId', '==', userCred.user.uid));
    const qs1 = await getDocs(q1);
    const realOrg = qs1.docs.length > 0 ? qs1.docs[0].data().organizationId : 'none';
    
    console.log("User org:", realOrg);
    
    const qDoc = query(collection(db, 'documents'), where('organizationId', '==', realOrg));
    await getDocs(qDoc);
    console.log("CASO A (Read valid org): SUCCESS");
    
    // CASO B: Query different org
    try {
      const qBad = query(collection(db, 'documents'), where('organizationId', '==', 'fake-org'));
      await getDocs(qBad);
      console.log("CASO B: FAIL (Should have been denied)");
    } catch(e) {
      console.log("CASO B (Read invalid org): DENIED (SUCCESS)", e.code);
    }
    
    // CASO C: Create with different org
    try {
      await setDoc(doc(db, 'documents', 'test-doc'), {
        organizationId: 'fake-org',
        name: 'test'
      });
      console.log("CASO C: FAIL (Should have been denied)");
    } catch (e) {
      console.log("CASO C (Create invalid org): DENIED (SUCCESS)", e.code);
    }

  } catch (e) {
    console.log("ERROR:", e);
  }
  process.exit(0);
}
test();
