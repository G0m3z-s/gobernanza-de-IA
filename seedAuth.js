import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFile } from 'fs/promises';

async function seed() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  initializeApp({ projectId: config.projectId });
  const auth = getAuth();
  try {
    await auth.createUser({
      uid: 'user-1',
      email: 'amartinez@novalogistica.com',
      password: 'password123',
      displayName: 'Ana Martínez'
    });
    console.log('User created');
  } catch (err) {
    if (err.code === 'auth/uid-already-exists' || err.code === 'auth/email-already-exists') {
      console.log('User already exists');
    } else {
      console.error(err);
    }
  }
}
seed();
