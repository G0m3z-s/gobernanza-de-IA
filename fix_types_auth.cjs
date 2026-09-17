const fs = require('fs');
let code = fs.readFileSync('src/types/index.ts', 'utf8');

const authInterfaces = `
export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt?: string;
}

export interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  role: 'super_admin' | 'consultant' | 'organization_admin' | 'sgia_leader' | 'sgsi_leader' | 'process_owner' | 'risk_owner' | 'auditor' | 'approver' | 'collaborator';
  status: 'active' | 'inactive' | 'pending';
  createdAt?: string;
}
`;

if (!code.includes('export interface Membership')) {
  code = authInterfaces + code;
  fs.writeFileSync('src/types/index.ts', code);
}
