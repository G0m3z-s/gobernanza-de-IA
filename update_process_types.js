import fs from 'fs';

let content = fs.readFileSync('src/types/index.ts', 'utf8');

// Replace the existing Process interface
content = content.replace(/export interface Process \{[\s\S]*?\}/, `export interface Process {
  id: string;
  organizationId?: string;
  code?: string;
  name: string;
  description?: string;
  objective?: string;
  scope?: string;
  category?: 'strategic' | 'mission' | 'support' | 'control';
  status?: 'draft' | 'active' | 'under_review' | 'inactive' | 'obsolete';
  siteId?: string;
  ownerId?: string;
  backupOwnerId?: string;
  criticality?: 'low' | 'medium' | 'high' | 'critical';
  reviewFrequency?: string;
  lastReviewDate?: string;
  nextReviewDate?: string;
  currentVersion?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  leader?: string; // keeping for backward compatibility if used
}`);

// Add new interfaces if they don't exist
const newInterfaces = `
export interface ProcessInput {
  id: string;
  organizationId: string;
  processId: string;
  supplierType: 'internal_process' | 'external_supplier' | 'customer' | 'regulator' | 'other';
  supplierId?: string;
  supplierName: string;
  description: string;
  requirement?: string;
  sourceProcessId?: string;
  critical: boolean;
  createdAt?: string;
}

export interface ProcessOutput {
  id: string;
  organizationId: string;
  processId: string;
  description: string;
  customerType: 'internal_process' | 'external_customer' | 'regulator' | 'other';
  customerId?: string;
  customerName: string;
  destinationProcessId?: string;
  critical: boolean;
  createdAt?: string;
}

export interface ProcessActivity {
  id: string;
  organizationId: string;
  processId: string;
  sequence: number;
  name: string;
  description?: string;
  ownerRoleId?: string;
  ownerUserId?: string;
  tool?: string;
  usesAI: boolean;
  aiSystemId?: string;
  inputDescription?: string;
  outputDescription?: string;
  frequency?: string;
  critical: boolean;
  controlIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Stakeholder {
  id: string;
  organizationId: string;
  name: string;
  type?: string;
  category: 'Alta Dirección' | 'Empleados' | 'Clientes' | 'Usuarios' | 'Proveedores' | 'Proveedores IA' | 'Socios' | 'Autoridades' | 'Reguladores' | 'Comunidad' | 'Sociedad' | 'Otros';
  internalExternal: 'Internal' | 'External';
  description?: string;
  needs?: string;
  expectations?: string;
  requirements?: string;
  legalRequirements?: string;
  contractualRequirements?: string;
  affectedProcessIds?: string[];
  standardIds?: string[];
  ownerId?: string;
  communicationMethod?: string;
  reviewFrequency?: string;
  lastReviewDate?: string;
  nextReviewDate?: string;
  status: 'active' | 'inactive';
}

export interface GovernanceRole {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  userId?: string;
  processIds?: string[];
  responsibilities?: string;
  authority?: string;
  standardIds?: string[];
  assignmentDate?: string;
  reviewDate?: string;
  status: 'active' | 'inactive';
  evidenceId?: string;
}

export interface Objective {
  id: string;
  organizationId: string;
  processId?: string;
  standardIds?: string[];
  code: string;
  name: string;
  description?: string;
  expectedOutcome?: string;
  ownerId?: string;
  baseline?: number;
  target?: number;
  currentValue?: number;
  unit?: string;
  startDate?: string;
  dueDate?: string;
  measurementFrequency?: string;
  measurementMethod?: string;
  status: 'draft' | 'active' | 'on_track' | 'at_risk' | 'off_track' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface Indicator {
  id: string;
  organizationId: string;
  processId?: string;
  objectiveId?: string;
  code: string;
  name: string;
  description?: string;
  formula?: string;
  unit?: string;
  target?: number;
  greenThreshold?: number;
  yellowThreshold?: number;
  redThreshold?: number;
  frequency?: string;
  ownerId?: string;
  dataSource?: string;
  currentValue?: number;
  measurementDate?: string;
  status: 'active' | 'inactive';
}

export interface IndicatorMeasurement {
  id: string;
  indicatorId: string;
  organizationId: string;
  date: string;
  value: number;
  comment?: string;
  evidenceId?: string;
  createdBy?: string;
  createdAt?: string;
}

export interface ProcessDependency {
  id: string;
  organizationId: string;
  sourceProcessId: string;
  targetProcessId: string;
  dependencyType: 'information' | 'service' | 'technology' | 'approval' | 'supplier' | 'data' | 'people' | 'other';
  description?: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
}

export interface ProcessHistory {
  id: string;
  organizationId: string;
  entityType: 'process' | 'activity' | 'input' | 'output' | 'stakeholder' | 'objective' | 'indicator' | 'role';
  entityId: string;
  userId: string;
  userName?: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'version_change';
  date: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  comment?: string;
}
`;

if (!content.includes('export interface Stakeholder')) {
  content += newInterfaces;
}

// Ensure the new arrays are added to DashboardData
if (!content.includes('processInputs: ProcessInput[];')) {
  content = content.replace(
    /assessmentHistory: AssessmentHistory\[\];/,
    `assessmentHistory: AssessmentHistory[];
  processInputs?: ProcessInput[];
  processOutputs?: ProcessOutput[];
  processActivities?: ProcessActivity[];
  stakeholders?: Stakeholder[];
  governanceRoles?: GovernanceRole[];
  objectives?: Objective[];
  indicators?: Indicator[];
  indicatorMeasurements?: IndicatorMeasurement[];
  processDependencies?: ProcessDependency[];
  processHistory?: ProcessHistory[];`
  );
}

fs.writeFileSync('src/types/index.ts', content);
console.log('Types updated');
