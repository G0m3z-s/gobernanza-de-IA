const fs = require('fs');
let code = fs.readFileSync('src/pages/Login.tsx', 'utf8');

code = code.replace(
  /const handleMockLogin = async \(\) => \{[\s\S]*?catch \(err: any\) \{[\s\S]*?\}[\s\S]*?\};/m,
  `const handleMockLogin = async () => {
    try {
      // Create a random demo user with Email/Password (since Anonymous auth might be disabled)
      const randomId = Math.random().toString(36).substring(2, 8);
      const demoEmail = \`demo_\${randomId}@empresa.com\`;
      const demoPass = 'demo123456';
      
      const userCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
      const uid = userCred.user.uid;
      
      await updateProfile(userCred.user, { displayName: 'Usuario Demo' });
      
      // Auto-provision demo tenant
      const orgId = 'org-demo-' + randomId;
      
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
