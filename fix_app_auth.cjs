const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import { OrganizationSelector }')) {
  code = code.replace(
    "import { AuthProvider, useAuth } from './context/AuthContext';",
    "import { AuthProvider, useAuth } from './context/AuthContext';\nimport { OrganizationSelector } from './pages/OrganizationSelector';"
  );
}

code = code.replace(
  /function ProtectedRoute\(\{ children \}: \{ children: React.ReactNode \}\) \{[\s\S]*?return <Layout>\{children\}<\/Layout>;\n\}/m,
  `function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, currentOrgId } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated but hasn't selected an org yet
  // we check if they are in the mock mode which forces currentOrgId to 'org-nova'
  if (!currentOrgId) {
    return <OrganizationSelector />;
  }
  
  return <Layout>{children}</Layout>;
}`
);

fs.writeFileSync('src/App.tsx', code);
