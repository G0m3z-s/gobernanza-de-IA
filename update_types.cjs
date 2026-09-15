const fs = require('fs');

let content = fs.readFileSync('src/types/index.ts', 'utf8');

content = content.replace(/export interface RequirementAssessment \{[\s\S]*?\}/, `export interface RequirementAssessment {
  id: string;
  organizationId: string;
  standard: string;
  clause: string;
  requirementId: string;
  processId?: string;
  ownerId?: string;
  applicability?: boolean;
  applicabilityJustification?: string;
  status: 'not_evaluated' | 'gap' | 'planned' | 'documented' | 'implemented' | 'implemented_maintained' | 'verified' | 'not_applicable';
  implementationScore?: number;
  evidenceStatus?: string;
  effectivenessStatus?: string;
  auditStatus?: string;
  gapDescription?: string;
  currentPractice?: string;
  priority?: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA';
  targetDate?: string;
  reviewDate?: string;
  reviewedBy?: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}`);

if (!content.includes('export interface AssessmentHistory')) {
  content += `

export interface AssessmentHistory {
  id: string;
  organizationId: string;
  requirementId: string;
  date: string;
  userId: string;
  userName?: string;
  field: string;
  oldValue: string;
  newValue: string;
  comment?: string;
}
`;
}

if(!content.includes('assessmentHistory: AssessmentHistory[];')) {
   content = content.replace(/implementationActions: ImplementationAction\[\];/, "implementationActions: ImplementationAction[];\n  assessmentHistory: AssessmentHistory[];");
}

fs.writeFileSync('src/types/index.ts', content);
