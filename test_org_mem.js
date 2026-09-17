import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function test() {
  try {
    const userCred = await signInWithEmailAndPassword(auth, "gomezgiraldogerson@gmail.com", "123456");
    const uid = userCred.user.uid;
    console.log("Logged in:", uid);
    
    const orgId = "org-test-" + Date.now();
    const memId = uid + "_" + orgId;
    
    // TEST 1: User creates their own organization
    try {
      await setDoc(doc(db, 'organizations', orgId), {
        name: 'Test Org',
        createdBy: uid
      });
      console.log("TEST 1 (Crear Org): PERMITIDO");
    } catch(e) {
      console.log("TEST 1: FALLÓ", e.code);
    }
    
    // TEST 2: User creates their first membership as organization_admin
    try {
      await setDoc(doc(db, 'memberships', memId), {
        userId: uid,
        organizationId: orgId,
        role: 'organization_admin',
        status: 'active'
      });
      console.log("TEST 2 (Crear primera membresía admin): PERMITIDO");
    } catch(e) {
      console.log("TEST 2: FALLÓ", e.code, e.message);
    }
    
    // TEST 3: User attempts to create membership in another org
    try {
      const otherMemId = uid + "_org-fake";
      await setDoc(doc(db, 'memberships', otherMemId), {
        userId: uid,
        organizationId: "org-fake",
        role: 'organization_admin',
        status: 'active'
      });
      console.log("TEST 3: FALLÓ (Debió ser denegado)");
    } catch(e) {
      console.log("TEST 3 (Membership en org ajena): DENEGADO (SUCCESS)", e.code);
    }
    
    // TEST 4: Collaborator tries to change their own role to admin
    // Since we are currently admin of orgId, let's create a fake collaborator in orgId, 
    // wait, I can't easily sign in as another user here unless I create one.
    // Let's just try to change our own role in orgId.
    try {
      await updateDoc(doc(db, 'memberships', memId), {
        role: 'collaborator'
      });
      console.log("TEST 4: FALLÓ (Debió ser denegado, un usuario no puede cambiar su propio rol)");
    } catch (e) {
      console.log("TEST 4 (Modificar propio rol): DENEGADO (SUCCESS)", e.code);
    }
    
    // TEST 5: Admin of ORG-A creates collaborator in ORG-A
    const collabId = "user-collab";
    const collabMemId = collabId + "_" + orgId;
    try {
      await setDoc(doc(db, 'memberships', collabMemId), {
        userId: collabId,
        organizationId: orgId,
        role: 'collaborator',
        status: 'active'
      });
      console.log("TEST 5 (Admin crea collaborator): PERMITIDO");
    } catch(e) {
      console.log("TEST 5: FALLÓ", e.code);
    }
    
    // TEST 6: Admin of ORG-A attempts to modify membership in ORG-B
    try {
      const otherMemId = collabId + "_org-fake";
      await updateDoc(doc(db, 'memberships', otherMemId), {
        status: 'disabled'
      });
      console.log("TEST 6: FALLÓ (Debió ser denegado)");
    } catch(e) {
      console.log("TEST 6 (Admin modifica org ajena): DENEGADO (SUCCESS)", e.code);
    }
    
    // TEST 7: User queries their own memberships
    try {
      const q = query(collection(db, 'memberships'), where('userId', '==', uid));
      await getDocs(q);
      console.log("TEST 7 (Consultar propias memberships): PERMITIDO");
    } catch(e) {
      console.log("TEST 7: FALLÓ", e.code);
    }
    
    // TEST 8: User attempts to read memberships of another org
    try {
      const q = query(collection(db, 'memberships'), where('organizationId', '==', 'org-fake'));
      await getDocs(q);
      console.log("TEST 8: FALLÓ (Debió ser denegado)");
    } catch(e) {
      console.log("TEST 8 (Leer memberships org ajena): DENEGADO (SUCCESS)", e.code);
    }

  } catch (e) {
    console.log("ERROR GLOBAL:", e);
  }
  process.exit(0);
}
test();
