import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { readFile } from 'fs/promises';

async function test() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const auth = getAuth(app);
  try {
    await createUserWithEmailAndPassword(auth, 'admin@admin.com', '123456');
    console.log('Created admin@admin.com');
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      console.log('User already exists');
    } else {
      console.error(err);
    }
  }
}
test();
