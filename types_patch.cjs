const fs = require('fs');
let content = fs.readFileSync('src/types/index.ts', 'utf8');

const interfaces = `
export interface Evidence {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  owner?: string;
  process?: string;
  controls?: number;
  expires?: string;
  status: string; // 'Vigente' | 'Vencida' | 'En revisión'
}

export interface EvidenceLink {
  id: string;
  organizationId: string;
  evidenceId: string;
  targetType: 'control' | 'requirement' | 'risk' | 'auditFinding' | 'capa';
  targetId: string;
  relationType: 'supports';
  createdAt: string;
  createdBy: string;
}
`;

content = content + interfaces;
fs.writeFileSync('src/types/index.ts', content);

// Add evidenceLinks to DashboardData
content = fs.readFileSync('src/types/index.ts', 'utf8');
content = content.replace(/auditSessions\?: AuditSession\[\];/g, "auditSessions?: AuditSession[];\n  evidenceLinks?: EvidenceLink[];");
fs.writeFileSync('src/types/index.ts', content);

console.log('types/index.ts updated');
