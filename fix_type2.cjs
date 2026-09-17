const fs = require('fs');
let code = fs.readFileSync('src/types/index.ts', 'utf8');

const newInterface = `export interface AIDataResource {
  id: string;
  organizationId: string;
  aiSystemId: string;
  name: string;
  type?: string;
  source?: string;
  provider?: string;
  purpose?: string;
  license?: string;
  personalData?: boolean;
  sensitiveData?: boolean;
  trainingData?: boolean;
  validationData?: boolean;
  testData?: boolean;
  operationalData?: boolean;
  storageLocation?: string;
  owner?: string;
  ownerId?: string;
  qualityStatus?: string;
  lineageStatus?: string;
  lastReview?: string;
  nextReview?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}`;

// Find start and end of existing interface
const startIdx = code.indexOf('export interface AIDataResource {');
const endIdx = code.indexOf('}', startIdx) + 1;

code = code.substring(0, startIdx) + newInterface + code.substring(endIdx);

fs.writeFileSync('src/types/index.ts', code);
