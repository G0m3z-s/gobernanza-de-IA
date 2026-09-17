const fs = require('fs');
let code = fs.readFileSync('src/pages/Login.tsx', 'utf8');

code = code.replace(
  /const randomId = Math\.random\(\)\.toString\(36\)\.substring\(2, 8\);/g,
  `const randomId = Math.random().toString(36).substring(2, 8);`
);

code = code.replace(
  /await setDoc\(doc\(db, 'memberships', \\\`\\\$\\{uid\\}_\\\$\\{orgId\\}\\\`\), \{/g,
  `// Force a small delay to ensure auth state syncs
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await setDoc(doc(db, 'memberships', \`\${uid}_\${orgId}\`), {`
);

fs.writeFileSync('src/pages/Login.tsx', code);
