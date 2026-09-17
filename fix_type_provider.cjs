const fs = require('fs');
let code = fs.readFileSync('src/types/index.ts', 'utf8');

const newInterface = `export interface AIProvider {
  id: string;
  organizationId: string;
  name: string;
  type?: string;
  service?: string;
  country?: string;
  dataLocation?: string;
  contractOwner?: string;
  aiSystemIds?: string[];
  riskLevel?: string;
  evaluationStatus?: 'pending' | 'approved' | 'restricted' | 'rejected' | 'under_review';
  lastReview?: string;
  nextReview?: string;
  sla?: string;
  subprocessors?: string;
  notes?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}`;

// Find start and end of existing interface
const startIdx = code.indexOf('export interface AIProvider {');
const endIdx = code.indexOf('}', startIdx) + 1;

code = code.substring(0, startIdx) + newInterface + code.substring(endIdx);

fs.writeFileSync('src/types/index.ts', code);
