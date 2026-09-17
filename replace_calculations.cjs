const fs = require('fs');

const content = `import { DashboardData } from "../types";
import { getISO42001AdaptedCatalog, getISO42001AdaptedControls, resolveAssessment } from "../data/normativeCatalogAdapter";

export const calculateDashboardKPIs = (data: DashboardData, filters?: any) => {
  const standard = filters?.standard || 'Integrado';
  
  // ---------------------------------------------------------
  // 1. IMPLEMENTATION SCORE (32 Requirements + Legacy Controls)
  // ---------------------------------------------------------
  let implementationScore = 0;
  let totalImplementationScore = 0;
  let totalImplementationItems = 0;
  let evaluatedImplementationItems = 0;
  
  let implCounts = { implemented: 0, partial: 0, none: 0, notApplicable: 0, notEvaluated: 0 };
  const maturityCounts = { L0: 0, L1: 0, L2: 0, L3: 0, L4: 0, L5: 0 }; // Legacy

  // ISO 27001 Legacy Implementation
  if (standard === 'Integrado' || standard === 'ISO/IEC 27001') {
    const legacyControls = (data.normativeControls || []).filter(c => c.applicable && (c.standard === 'ISO/IEC 27001'));
    legacyControls.forEach(c => {
      totalImplementationItems++;
      evaluatedImplementationItems++; // Legacy assumes evaluated if applicable
      
      if (c.implementationStatus === 'Implementado') {
        totalImplementationScore += 100;
        implCounts.implemented++;
      } else if (c.implementationStatus === 'En Proceso') {
        totalImplementationScore += 50;
        implCounts.partial++;
      } else {
        implCounts.none++;
      }
      
      const level = c.maturityLevel || 0;
      maturityCounts[\`L\${level}\` as keyof typeof maturityCounts]++;
    });
  }

  // ISO 42001 New Implementation (32 Requirements)
  if (standard === 'Integrado' || standard === 'ISO/IEC 42001') {
    const reqs42001 = getISO42001AdaptedCatalog();
    const resolvedReqs = reqs42001.map(catReq => {
      const assessment = resolveAssessment(catReq, data.requirementAssessments || [], false);
      return { ...catReq, status: assessment?.status || 'not_evaluated' };
    });
    
    resolvedReqs.forEach(r => {
      if (r.status === 'not_applicable') {
        implCounts.notApplicable++;
        return; // Exclude from denominator
      }
      
      totalImplementationItems++;
      if (r.status !== 'not_evaluated') {
        evaluatedImplementationItems++;
      } else {
        implCounts.notEvaluated++;
      }
      
      switch(r.status) {
        case 'verified': 
        case 'implemented_maintained': 
        case 'implemented': 
          totalImplementationScore += (r.status === 'verified' ? 100 : r.status === 'implemented_maintained' ? 90 : 70); 
          implCounts.implemented++;
          maturityCounts.L5++; // Map to legacy for UI backwards compatibility if needed
          break;
        case 'documented': 
        case 'planned': 
          totalImplementationScore += (r.status === 'documented' ? 40 : 20); 
          implCounts.partial++;
          maturityCounts.L3++;
          break;
        case 'gap': 
        case 'not_evaluated': 
          totalImplementationScore += 0; 
          implCounts.none++;
          maturityCounts.L0++;
          break;
        default: 
          totalImplementationScore += 0;
          implCounts.none++;
      }
    });
  }

  const hasImplementationData = evaluatedImplementationItems > 0;
  if (totalImplementationItems > 0) {
    implementationScore = Math.round(totalImplementationScore / totalImplementationItems);
  }

  // ---------------------------------------------------------
  // 2. EVIDENCE SCORE (Coverage of elements requiring evidence)
  // ---------------------------------------------------------
  let totalEvidenceItems = 0;
  let totalEvidenceScore = 0;
  let evCounts = { valid: 0, expiring: 0, expired: 0, pending: 0, rejected: 0, none: 0 };
  
  const getEvidenceScore = (status?: string) => {
    switch(status) {
      case 'valid': evCounts.valid++; return 100;
      case 'expiring': evCounts.expiring++; return 75;
      case 'pending_review': evCounts.pending++; return 50;
      case 'expired': evCounts.expired++; return 0;
      case 'rejected': evCounts.rejected++; return 0;
      default: evCounts.none++; return 0;
    }
  };

  const reqsEvidence = (data.requirementAssessments || []).filter(r => r.status !== 'not_applicable' && (standard === 'Integrado' || r.standard === standard));
  const ctrlAssessmentsEvidence = (data.controlAssessments || []).filter(c => c.status !== 'not_applicable' && (standard === 'Integrado' || c.standard === standard));
  
  // Legacy Evidence
  if (standard === 'Integrado' || standard === 'ISO/IEC 27001') {
    const reqAssessments27001 = reqsEvidence.filter(r => r.standard === 'ISO/IEC 27001');
    reqAssessments27001.forEach(r => {
      totalEvidenceItems++;
      totalEvidenceScore += getEvidenceScore(r.evidenceStatus);
    });
    const ctrlAssessments27001 = ctrlAssessmentsEvidence.filter(c => c.standard === 'ISO/IEC 27001');
    ctrlAssessments27001.forEach(c => {
      totalEvidenceItems++;
      totalEvidenceScore += getEvidenceScore(c.evidenceStatus);
    });
  }

  // ISO 42001 Evidence Universe (Both 32 Reqs and 38 Controls)
  if (standard === 'Integrado' || standard === 'ISO/IEC 42001') {
    const reqs42001 = getISO42001AdaptedCatalog();
    reqs42001.forEach(catReq => {
      const a = resolveAssessment(catReq, data.requirementAssessments || [], false);
      if (a?.status !== 'not_applicable') {
        totalEvidenceItems++;
        totalEvidenceScore += getEvidenceScore(a?.evidenceStatus);
      }
    });

    const ctrls42001 = getISO42001AdaptedControls();
    ctrls42001.forEach(catCtrl => {
      const a = resolveAssessment(catCtrl, data.controlAssessments || [], true);
      if (a?.status !== 'not_applicable') {
        totalEvidenceItems++;
        totalEvidenceScore += getEvidenceScore(a?.evidenceStatus);
      }
    });
  }

  const evidenceScore = totalEvidenceItems > 0 ? Math.round(totalEvidenceScore / totalEvidenceItems) : 0;
  const hasEvidenceData = (evCounts.valid + evCounts.expiring + evCounts.pending + evCounts.expired + evCounts.rejected) > 0;

  // ---------------------------------------------------------
  // 3. EFFICACY SCORE (Control Health)
  // ---------------------------------------------------------
  let totalEfficacyItems = 0;
  let totalEfficacyScore = 0;
  let notTestedCount = 0;
  let evaluatedEfficacyItems = 0;

  const getEfficacyScore = (status?: string) => {
    switch(status) {
      case 'effective': return 100;
      case 'partially_effective': return 50;
      case 'ineffective': return 0;
      case 'not_tested': return 0;
      default: return 0;
    }
  };

  if (standard === 'Integrado' || standard === 'ISO/IEC 27001') {
    const legacyReqs = (data.requirementAssessments || []).filter(r => r.standard === 'ISO/IEC 27001' && r.status !== 'not_applicable');
    const legacyCtrls = (data.controlAssessments || []).filter(c => c.standard === 'ISO/IEC 27001' && c.status !== 'not_applicable');
    
    legacyReqs.forEach(r => {
      totalEfficacyItems++;
      if (r.effectivenessStatus === 'not_tested' || !r.effectivenessStatus) {
        notTestedCount++;
      } else {
        evaluatedEfficacyItems++;
      }
      totalEfficacyScore += getEfficacyScore(r.effectivenessStatus);
    });
    
    legacyCtrls.forEach(c => {
      totalEfficacyItems++;
      if (c.testResult === 'not_tested' || !c.testResult) {
        notTestedCount++;
      } else {
        evaluatedEfficacyItems++;
      }
      totalEfficacyScore += getEfficacyScore(c.testResult);
    });
  }

  if (standard === 'Integrado' || standard === 'ISO/IEC 42001') {
    // ONLY 38 Controls for Efficacy
    const ctrls42001 = getISO42001AdaptedControls();
    ctrls42001.forEach(catCtrl => {
      const a = resolveAssessment(catCtrl, data.controlAssessments || [], true);
      if (a?.status !== 'not_applicable') {
        totalEfficacyItems++;
        if (a?.testResult === 'not_tested' || !a?.testResult) {
          notTestedCount++;
        } else {
          evaluatedEfficacyItems++;
        }
        totalEfficacyScore += getEfficacyScore(a?.testResult);
      }
    });
  }

  const hasEfficacyData = evaluatedEfficacyItems > 0;
  let efficacyScore = 0;
  if (totalEfficacyItems > 0) {
    // Only calculate score for evaluated items to avoid false negative precision, 
    // or calculate over total items? The prompt says "Si no existe un campo de eficacia... retornar null o estado Sin evaluar"
    // So if no data, we handle it via flags. But what if 1 is evaluated and 37 not_tested?
    // Usually not_tested counts as 0 in efficacy, so denominator should be total items.
    efficacyScore = Math.round(totalEfficacyScore / totalEfficacyItems);
  }

  // ---------------------------------------------------------
  // 4. AUDIT READINESS
  // ---------------------------------------------------------
  let auditItemsCount = 0;
  let auditItemsScore = 0;
  
  const audits = data.auditItems || [];
  audits.forEach(a => {
    auditItemsCount++;
    if (a.status === 'closed') auditItemsScore += 100;
    else if (a.status === 'pending_effectiveness') auditItemsScore += 50;
  });
  
  const actions = data.implementationActions || [];
  actions.forEach(a => {
    auditItemsCount++;
    if (a.status === 'COMPLETADA') auditItemsScore += 100;
    else if (a.status === 'EN PROGRESO' || a.status === 'EN REVISIÓN') auditItemsScore += 50;
  });
  
  const auditStatusScore = auditItemsCount > 0 ? (auditItemsScore / auditItemsCount) : 0;
  const hasAuditData = auditItemsCount > 0;
  
  let auditReadiness = 0;
  let hasAuditReadinessData = false;

  if (hasImplementationData || hasEvidenceData || hasEfficacyData || hasAuditData) {
    hasAuditReadinessData = true;
    let weightSum = 0;
    let weightedScore = 0;

    if (hasImplementationData) { weightSum += 30; weightedScore += implementationScore * 0.30; }
    if (hasEvidenceData) { weightSum += 30; weightedScore += evidenceScore * 0.30; }
    if (hasEfficacyData) { weightSum += 25; weightedScore += efficacyScore * 0.25; }
    if (hasAuditData) { weightSum += 15; weightedScore += auditStatusScore * 0.15; }

    auditReadiness = weightSum > 0 ? Math.round((weightedScore / weightSum) * 100) : 0;
  }

  // ---------------------------------------------------------
  // 5. RISK EXPOSURE
  // ---------------------------------------------------------
  const activeRisks = (data.risks || []).filter(r => r.status === 'Identificado' || r.status === 'En Tratamiento');
  let riskTotalScore = 0;
  activeRisks.forEach(r => {
    switch(r.level) {
      case 'Crítico': riskTotalScore += 100; break;
      case 'Alto': riskTotalScore += 75; break;
      case 'Medio': riskTotalScore += 50; break;
      case 'Bajo': riskTotalScore += 25; break;
      default: riskTotalScore += 0;
    }
  });
  const riskExposure = activeRisks.length > 0 ? Math.round(riskTotalScore / activeRisks.length) : 0;
  const riskHealth = Math.max(0, Math.min(100, 100 - riskExposure));
  const hasRiskData = activeRisks.length > 0;

  // ---------------------------------------------------------
  // 6. GLOBAL HEALTH
  // ---------------------------------------------------------
  let globalHealth = 0;
  let hasGlobalHealthData = false;
  
  if (hasImplementationData || hasEvidenceData || hasEfficacyData || hasAuditReadinessData || hasRiskData) {
    hasGlobalHealthData = true;
    let weightSum = 0;
    let weightedScore = 0;

    if (hasImplementationData) { weightSum += 30; weightedScore += implementationScore * 0.30; }
    if (hasEvidenceData) { weightSum += 20; weightedScore += evidenceScore * 0.20; }
    if (hasEfficacyData) { weightSum += 20; weightedScore += efficacyScore * 0.20; }
    if (hasAuditReadinessData) { weightSum += 15; weightedScore += auditReadiness * 0.15; }
    if (hasRiskData) { weightSum += 15; weightedScore += riskHealth * 0.15; }

    globalHealth = weightSum > 0 ? Math.round((weightedScore / weightSum) * 100) : 0;
  }

  return {
    implementation: implementationScore,
    evidence: evidenceScore,
    efficacy: efficacyScore,
    auditReadiness: auditReadiness,
    globalHealth,
    riskExposure,
    riskHealth,
    evidenceCounts: evCounts,
    maturityCounts,
    implCounts,
    totalApplicableControls: totalImplementationItems,
    variation: {
      implementation: 0,
      evidence: 0,
      efficacy: 0,
      auditReadiness: 0,
    },
    notTestedCount,
    hasImplementationData,
    hasEvidenceData,
    hasEfficacyData,
    hasAuditReadinessData,
    hasGlobalHealthData,
    hasRiskData,
    totalImplementationItems,
    evaluatedImplementationItems,
    totalEfficacyItems,
    evaluatedEfficacyItems
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
`;

fs.writeFileSync('src/utils/calculations.ts', content);
console.log("Success");
