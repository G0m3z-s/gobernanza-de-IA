const fs = require('fs');
let content = fs.readFileSync('src/utils/calculations.ts', 'utf8');

const targetOld = `  let effectivenessCoverage = { evaluated: 0, applicable: 0 };

  if (standard === 'Integrado' || standard === 'ISO/IEC 42001') {
    // ONLY 38 Controls for Efficacy
    const ctrls42001 = getISO42001AdaptedControls();
    ctrls42001.forEach(catCtrl => {
      const a = resolveAssessment(catCtrl, data.controlAssessments || [], true);
      const applicability = getControlApplicability(a);

      if (applicability === 'applicable') {
        effectivenessCoverage.applicable++;
        totalEfficacyItems++; // maintain compatibility with legacy denominator logic

        const evaluation = evaluateControlEffectiveness(catCtrl.id, data.controlEffectivenessTests || [], a);

        if (evaluation.hasData && evaluation.result !== 'NOT_TESTED') {
          effectivenessCoverage.evaluated++;
          evaluatedEfficacyItems++;
          totalEfficacyScore += getEfficacyScore(evaluation.result.toLowerCase());
        } else {
          notTestedCount++;
        }
      }
    });
  }

  const hasEfficacyData = evaluatedEfficacyItems > 0;
  let efficacyScore = 0;
  if (totalEfficacyItems > 0) {
    efficacyScore = Math.round(totalEfficacyScore / totalEfficacyItems);
  }`;

const targetNew = `  let effectivenessCoverage = { 
    evaluated: 0, 
    applicable: 0,
    realTestCount: 0,
    legacyCount: 0,
    effectiveCount: 0,
    partialCount: 0,
    ineffectiveCount: 0,
    notTestedCount: 0
  };

  if (standard === 'Integrado' || standard === 'ISO/IEC 42001') {
    // ONLY 38 Controls for Efficacy
    const ctrls42001 = getISO42001AdaptedControls();
    ctrls42001.forEach(catCtrl => {
      const a = resolveAssessment(catCtrl, data.controlAssessments || [], true);
      const applicability = getControlApplicability(a);

      if (applicability === 'applicable') {
        effectivenessCoverage.applicable++;
        totalEfficacyItems++; // maintain compatibility with legacy denominator logic

        const evaluation = evaluateControlEffectiveness(catCtrl.id, data.controlEffectivenessTests || [], a);

        if (evaluation.hasData && evaluation.result !== 'NOT_TESTED') {
          effectivenessCoverage.evaluated++;
          evaluatedEfficacyItems++;
          totalEfficacyScore += getEfficacyScore(evaluation.result.toLowerCase());
          
          if (evaluation.source === 'real_test') effectivenessCoverage.realTestCount++;
          if (evaluation.source === 'legacy') effectivenessCoverage.legacyCount++;
          
          if (evaluation.result === 'EFFECTIVE') effectivenessCoverage.effectiveCount++;
          else if (evaluation.result === 'PARTIALLY_EFFECTIVE') effectivenessCoverage.partialCount++;
          else if (evaluation.result === 'INEFFECTIVE') effectivenessCoverage.ineffectiveCount++;
        } else {
          notTestedCount++;
          effectivenessCoverage.notTestedCount++;
        }
      }
    });
  }

  const hasEfficacyData = evaluatedEfficacyItems > 0;
  let efficacyScore = 0;
  if (evaluatedEfficacyItems > 0) {
    efficacyScore = Math.round(totalEfficacyScore / evaluatedEfficacyItems);
  }`;

content = content.replace(targetOld, targetNew);

// Now patch Audit Readiness and Global Health flags
const auditReadinessTarget = `  const auditStatusScore = auditItemsCount > 0 ? Math.round(auditItemsScore / auditItemsCount) : 0;
  let hasAuditReadinessData = false;
  let auditReadiness = 0;
  
  if (hasImplementationData && hasEvidenceData && hasEfficacyData && auditItemsCount > 0) {
    hasAuditReadinessData = true;`;

const auditReadinessNew = `  const auditStatusScore = auditItemsCount > 0 ? Math.round(auditItemsScore / auditItemsCount) : 0;
  let hasAuditReadinessData = false;
  let auditReadiness = 0;
  
  // Require FULL EFFICACY COVERAGE to enable Audit Readiness
  const isEfficacyCoverageComplete = effectivenessCoverage.applicable > 0 ? effectivenessCoverage.evaluated === effectivenessCoverage.applicable : false;
  
  if (hasImplementationData && hasEvidenceData && hasEfficacyData && auditItemsCount > 0 && isEfficacyCoverageComplete) {
    hasAuditReadinessData = true;`;

content = content.replace(auditReadinessTarget, auditReadinessNew);

const globalHealthTarget = `  let hasGlobalHealthData = false;
  let globalHealth = 0;
  if (hasImplementationData && hasEvidenceData && hasEfficacyData && hasAuditReadinessData && activeRisks.length > 0) {
    hasGlobalHealthData = true;`;

const globalHealthNew = `  let hasGlobalHealthData = false;
  let globalHealth = 0;
  if (hasImplementationData && hasEvidenceData && hasEfficacyData && hasAuditReadinessData && activeRisks.length > 0 && isEfficacyCoverageComplete) {
    hasGlobalHealthData = true;`;

content = content.replace(globalHealthTarget, globalHealthNew);

fs.writeFileSync('src/utils/calculations.ts', content);
console.log('patched calculations.ts with new metrics');
