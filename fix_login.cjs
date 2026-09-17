const fs = require('fs');
let code = fs.readFileSync('src/pages/Login.tsx', 'utf8');

code = code.replace(
  "import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';",
  "import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInAnonymously } from 'firebase/auth';\nimport { doc, setDoc } from 'firebase/firestore';\nimport { db } from '../lib/firebase';"
);

code = code.replace(
  "const handleMockLogin = () => {\n    mockLogin();\n    navigate('/');\n  };",
  `const handleMockLogin = async () => {
    try {
      const userCred = await signInAnonymously(auth);
      const uid = userCred.user.uid;
      
      // Auto-provision demo tenant for the anonymous user
      const orgId = 'org-demo-' + uid.substring(0, 5);
      
      await setDoc(doc(db, 'organizations', orgId), {
        name: 'Empresa Demo (Autogenerada)',
        sector: 'Tecnología',
        status: 'active'
      });
      
      await setDoc(doc(db, 'memberships', \`\${uid}_\${orgId}\`), {
        userId: uid,
        organizationId: orgId,
        role: 'organization_admin',
        status: 'active'
      });
      
      navigate('/');
    } catch (err: any) {
      setError('Error creando entorno de prueba: ' + err.message);
    }
  };`
);

fs.writeFileSync('src/pages/Login.tsx', code);
