export type StandardType = 'management_system' | string;
export type StandardStatus = 'active' | 'superseded' | 'draft' | string;

export interface Standard {
  id: string;
  code: string;
  name: string;
  version: string;
  year: number;
  type: StandardType;
  status: StandardStatus;
}

export interface NormativeClause {
  id: string;
  standardId: string;
  code: string;
  title: string;
  parentCode: string | null;
  order: number;
  level: number;
  category: 'clause' | 'subclause';
}

export interface NormativeRequirement {
  id: string;
  standardId: string;
  clauseId: string;
  code: string;
  title: string;
  summary: string;
  implementationQuestion: string;
  evidenceGuidance: string;
  auditQuestion: string;
  applicability: 'mandatory' | 'conditional' | 'informative';
  order: number;
}

export interface NormativeAnnex {
  id: string;
  standardId: string;
  code: string;
  title: string;
  type: 'normative' | 'informative';
  order: number;
}

export interface NormativeControl {
  id: string;
  standardId: string;
  annexId: string;
  code: string;
  title: string;
  summary: string;
  objective: string;
  implementationGuidance: string;
  evidenceGuidance: string;
  auditQuestion: string;
  controlGroup: string;
  order: number;
}

export interface NormativeMapping {
  id: string;
  sourceStandardId: string;
  sourceItemId: string;
  targetStandardId: string;
  targetItemId: string;
  relationshipType: 'equivalent' | 'related' | 'supports' | 'overlaps';
  notes?: string;
}
