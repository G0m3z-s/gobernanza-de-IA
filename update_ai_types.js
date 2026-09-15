import fs from 'fs';

let content = fs.readFileSync('src/types/index.ts', 'utf8');

// Replace the existing AISystem interface
content = content.replace(/export interface AISystem \{[\s\S]*?\}/, `export interface AISystem {
  id: string;
  organizationId: string;
  code?: string;
  name: string;
  description?: string;
  type?: 'AI_SYSTEM' | 'AI_APPLICATION' | 'AI_MODEL' | 'AI_AGENT' | 'AI_ASSISTANT' | 'AI_API' | 'DATASET' | 'PROMPT' | 'MODEL_REGISTRY' | 'MLOPS_PIPELINE' | 'AI_PROVIDER' | 'OTHER_AI_COMPONENT';
  processId?: string;
  process?: string;
  ownerId?: string;
  businessOwnerId?: string;
  technicalOwnerId?: string;
  providerId?: string;
  providerName?: string;
  modelName?: string;
  modelVersion?: string;
  purpose?: string;
  intendedUse?: string;
  prohibitedUses?: string;
  users?: string;
  affectedGroups?: string;
  developmentType?: string;
  internalExternal?: 'internal' | 'external';
  deploymentEnvironment?: string;
  autonomyLevel?: 'ADVISORY' | 'ASSISTED' | 'SEMI_AUTONOMOUS' | 'AUTONOMOUS';
  humanOversightLevel?: string;
  humanOverrideAvailable?: boolean;
  personalData?: boolean;
  sensitiveData?: boolean;
  confidentialData?: boolean;
  decisionImpact?: string;
  impactLevel?: 'low' | 'medium' | 'high' | 'critical';
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  riskRating?: string;
  classification?: 'allowed' | 'restricted' | 'prohibited' | 'pending_classification';
  approvalStatus?: 'draft' | 'pending_review' | 'approved' | 'conditionally_approved' | 'rejected' | 'suspended' | 'retired';
  lifecycleStage?: 'IDEA' | 'EVALUATION' | 'DESIGN' | 'DEVELOPMENT' | 'VALIDATION' | 'APPROVAL' | 'DEPLOYMENT' | 'OPERATION' | 'MONITORING' | 'CHANGE' | 'SUSPENSION' | 'RETIREMENT' | 'DECOMMISSIONING';
  firstUseDate?: string;
  lastReviewDate?: string;
  nextReviewDate?: string;
  criticality?: string;
  countryOfOperation?: string;
  jurisdictions?: string[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}`);

const newInterfaces = `
export interface AIImpactAssessment {
  id: string;
  organizationId: string;
  aiSystemId: string;
  version?: string;
  assessmentDate?: string;
  purpose?: string;
  affectedIndividuals?: string;
  affectedGroups?: string;
  privacyImpact?: string;
  fairnessImpact?: string;
  discriminationImpact?: string;
  autonomyImpact?: string;
  safetyImpact?: string;
  economicImpact?: string;
  rightsImpact?: string;
  accessibilityImpact?: string;
  socialImpact?: string;
  environmentalImpact?: string;
  probability?: number;
  severity?: number;
  inherentImpact?: number;
  safeguards?: string;
  residualProbability?: number;
  residualSeverity?: number;
  residualImpact?: number;
  assessorId?: string;
  ownerId?: string;
  approverId?: string;
  status?: string;
  approvalDecision?: string;
  nextReviewDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AIDataResource {
  id: string;
  organizationId: string;
  aiSystemId: string;
  name: string;
  type?: string;
  purpose?: string;
  source?: string;
  sourceOwner?: string;
  license?: string;
  trainingData?: boolean;
  validationData?: boolean;
  testData?: boolean;
  operationalData?: boolean;
  personalData?: boolean;
  sensitiveData?: boolean;
  location?: string;
  storageSystem?: string;
  qualityStatus?: string;
  lineageStatus?: string;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AILifecycleEvent {
  id: string;
  aiSystemId: string;
  stage: string;
  eventType?: string;
  description?: string;
  decision?: string;
  responsibleId?: string;
  date: string;
  evidenceIds?: string[];
  documentIds?: string[];
  riskIds?: string[];
  version?: string;
  createdAt?: string;
}

export interface AIIncident {
  id: string;
  organizationId: string;
  aiSystemId: string;
  category: 'incorrect_output' | 'bias' | 'privacy' | 'security' | 'availability' | 'misuse' | 'provider' | 'data' | 'human_oversight' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt?: string;
  reportedBy?: string;
  affectedUsers?: string;
  impact?: string;
  containment?: string;
  ownerId?: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  rootCause?: string;
  correctiveActionId?: string;
  closedAt?: string;
  createdAt?: string;
}

export interface AIProvider {
  id: string;
  organizationId: string;
  name: string;
  type?: string;
  service?: string;
  systemsAffected?: string[];
  contractOwner?: string;
  country?: string;
  dataLocation?: string;
  subprocessors?: string;
  riskRating?: string;
  assessmentStatus?: string;
  lastReview?: string;
  nextReview?: string;
  status?: string;
}

export interface AIHistory {
  id: string;
  organizationId: string;
  aiSystemId: string;
  userId: string;
  userName?: string;
  action: string;
  date: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  comment?: string;
}
`;

if (!content.includes('export interface AIImpactAssessment')) {
  content += newInterfaces;
}

if (!content.includes('aiImpactAssessments?: AIImpactAssessment[];')) {
  content = content.replace(
    /processHistory\?: ProcessHistory\[\];/,
    `processHistory?: ProcessHistory[];
  aiImpactAssessments?: AIImpactAssessment[];
  aiDataResources?: AIDataResource[];
  aiLifecycleEvents?: AILifecycleEvent[];
  aiIncidents?: AIIncident[];
  aiProviders?: AIProvider[];
  aiHistory?: AIHistory[];`
  );
}

fs.writeFileSync('src/types/index.ts', content);
console.log('Types updated');
