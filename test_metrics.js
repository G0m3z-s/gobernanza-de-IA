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
    const uid = userCred.user.uid;
    console.log("Logged in:", uid);
    
    // Org test
    const orgId = "org-metric-test";
    
    // Simulate add metric (Test 1)
    await setDoc(doc(db, 'aiMetrics', 'metric-123'), {
      organizationId: orgId,
      aiSystemId: 'system-abc',
      name: 'Tasa de error',
      value: 4.2,
      unit: '%',
      threshold: 5,
      breached: false,
      date: new Date().toISOString()
    });
    console.log("TEST 1 (Crear métrica -> Firestore): PERMITIDO");
    
    // Simulate reload / fetchData (Test 2)
    const q1 = query(collection(db, 'aiMetrics'), where('organizationId', '==', orgId));
    const snap1 = await getDocs(q1);
    const loadedMetrics = snap1.docs.map(d => ({id: d.id, ...d.data()}));
    console.log("TEST 2 (Recargar navegador):", loadedMetrics.length > 0 ? "RECUPERADA" : "FALLÓ");
    
    // Simulate UI filter (Test 3 & 4)
    const systemMetrics = loadedMetrics.filter(m => m.aiSystemId === 'system-abc');
    const otherSystemMetrics = loadedMetrics.filter(m => m.aiSystemId === 'system-xyz');
    
    console.log("TEST 3 (Filtrar por sistema correcto):", systemMetrics.length > 0 ? "VISIBLE" : "FALLÓ");
    console.log("TEST 4 (Filtrar por otro sistema):", otherSystemMetrics.length === 0 ? "OCULTA (CORRECTO)" : "FALLÓ");
    
    // Simulate another org (Test 5)
    const q2 = query(collection(db, 'aiMetrics'), where('organizationId', '==', 'org-another'));
    const snap2 = await getDocs(q2);
    const anotherOrgMetrics = snap2.docs.map(d => ({id: d.id, ...d.data()}));
    console.log("TEST 5 (Cambiar a otra organización):", anotherOrgMetrics.length === 0 ? "NO MUESTRA LA ANTERIOR (CORRECTO)" : "FALLÓ");

  } catch (e) {
    console.log("ERROR GLOBAL:", e);
  }
  process.exit(0);
}
test();
