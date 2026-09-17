import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function test() {
  try {
    await createUserWithEmailAndPassword(auth, "gomezgiraldogerson@gmail.com", "123456");
    console.log("SUCCESS");
  } catch (e) {
    console.log("ERROR:", e.code, e.message);
  }
  process.exit(0);
}
test();
