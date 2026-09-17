const fs = require('fs');
let content = fs.readFileSync('src/utils/calculations.ts', 'utf8');

const targetAudit = `  let auditReadiness = 0;
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
  }`;

const replacementAudit = `  let auditReadiness = 0;
  let hasAuditReadinessData = false;

  if (hasImplementationData && hasEvidenceData && hasEfficacyData && hasAuditData) {
    hasAuditReadinessData = true;
    // Ponderaciones estrictas, sin redistribución.
    auditReadiness = Math.round(
      (implementationScore * 0.30) + 
      (evidenceScore * 0.30) + 
      (efficacyScore * 0.25) + 
      (auditStatusScore * 0.15)
    );
  }`;

content = content.replace(targetAudit, replacementAudit);

const targetGlobal = `  let globalHealth = 0;
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
  }`;

const replacementGlobal = `  let globalHealth = 0;
  let hasGlobalHealthData = false;
  
  // Requiere todas las dimensiones esenciales evaluadas para calcular Global Health
  if (hasImplementationData && hasEvidenceData && hasEfficacyData && hasAuditReadinessData && hasRiskData) {
    hasGlobalHealthData = true;
    // Ponderaciones estrictas, sin redistribución.
    globalHealth = Math.round(
      (implementationScore * 0.30) +
      (evidenceScore * 0.20) +
      (efficacyScore * 0.20) +
      (auditReadiness * 0.15) +
      (riskHealth * 0.15)
    );
  }`;

content = content.replace(targetGlobal, replacementGlobal);

fs.writeFileSync('src/utils/calculations.ts', content);
console.log("Success patch audit and global calculations");
