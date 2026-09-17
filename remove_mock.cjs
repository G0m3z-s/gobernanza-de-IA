const fs = require('fs');
let code = fs.readFileSync('src/context/AuthContext.tsx', 'utf8');

code = code.replace(
  `    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
      setCurrentOrgId('org-nova');
      setLoading(false);
      return;
    }`,
  `    localStorage.removeItem('mockUser');`
);

fs.writeFileSync('src/context/AuthContext.tsx', code);
