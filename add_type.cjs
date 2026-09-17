const fs = require('fs');
let code = fs.readFileSync('src/types/index.ts', 'utf8');

if (!code.includes('interface AIDataResource')) {
  code = code + `
export interface AIDataResource {
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
  qualityStatus?: string;
  lineageStatus?: string;
  lastReview?: string;
  nextReview?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}
`;
  fs.writeFileSync('src/types/index.ts', code);
}
