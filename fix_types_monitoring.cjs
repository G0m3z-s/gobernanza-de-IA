const fs = require('fs');
let code = fs.readFileSync('src/types/index.ts', 'utf8');

// Update AIIncident
const newAIIncident = `export interface AIIncident {
  id: string;
  organizationId: string;
  aiSystemId: string;
  category: string;
  severity: string;
  description: string;
  date?: string;
  reportedBy?: string;
  affectedPeople?: string;
  impact?: string;
  responsible?: string;
  containment?: string;
  status: 'open' | 'investigating' | 'contained' | 'corrective_action' | 'closed';
  createdAt?: string;
  updatedAt?: string;
}`;
const startIncident = code.indexOf('export interface AIIncident {');
const endIncident = code.indexOf('}', startIncident) + 1;
code = code.substring(0, startIncident) + newAIIncident + code.substring(endIncident);

// Add AIMetric
const aiMetricDef = `
export interface AIMetric {
  id: string;
  organizationId: string;
  aiSystemId: string;
  name: string;
  type: 'accuracy' | 'error_rate' | 'hallucination_rate' | 'bias_metric' | 'latency' | 'availability' | 'human_override_rate' | 'complaints' | 'custom' | string;
  value: number;
  unit: string;
  threshold: number;
  date: string;
  source: string;
  responsible: string;
  breached?: boolean;
  createdAt?: string;
}
`;
code = code + aiMetricDef;

// Update DashboardData
code = code.replace(
  'aiIncidents?: AIIncident[];',
  'aiIncidents?: AIIncident[];\n  aiMetrics?: AIMetric[];'
);

fs.writeFileSync('src/types/index.ts', code);
