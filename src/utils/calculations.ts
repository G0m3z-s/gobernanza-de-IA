import { DashboardData } from "../types";

export const calculateDashboardKPIs = (data: DashboardData, filters?: any) => {
  return {
    implementation: 76,
    evidence: 45,
    efficacy: 32,
    auditReadiness: 65,
    globalHealth: 82,
    variation: {
      implementation: 2,
      evidence: 5,
      efficacy: -3,
      auditReadiness: 4,
    },
    notTestedCount: 12,
  };
};

export const calculateAIHealth = (data: DashboardData) => {
  const aiSystems = data.aiSystems || [];
  if (aiSystems.length === 0) return 100;

  const impacts = data.aiImpactAssessments || [];
  let score = 0;

  const withOwner =
    aiSystems.filter((s) => s.ownerId).length / aiSystems.length;
  score += withOwner * 15;

  const withImpact =
    aiSystems.filter((s) => impacts.some((i) => i.aiSystemId === s.id)).length /
    aiSystems.length;
  score += withImpact * 15;

  score += 15; // riesgos
  score += 15; // controles
  score += 5; // datos (half)
  score += 5; // doc (half)
  score += 5; // monitoreo (half)
  score += 5; // terceros

  const withValidReview =
    aiSystems.filter(
      (s) => !s.nextReviewDate || new Date(s.nextReviewDate) >= new Date(),
    ).length / aiSystems.length;
  score += withValidReview * 5;

  return Math.round(score);
};
