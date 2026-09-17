const fs = require('fs');

let calc = fs.readFileSync('src/utils/calculations.ts', 'utf8');

// Replace the evidence counting to track types
const oldEvScoreStart = `  let totalEvidenceItems = 0;
  let totalEvidenceScore = 0;`;
const oldEvScoreEnd = `const evidenceScore = totalEvidenceItems > 0 ? Math.round(totalEvidenceScore / totalEvidenceItems) : 0;`;

// I will just use regex to replace the block.
let newEvScore = `  let totalEvidenceItems = 0;
  let totalEvidenceScore = 0;
  let evCounts = { valid: 0, expiring: 0, expired: 0, pending: 0, rejected: 0, none: 0 };
  
  const getEvidenceScore = (status?: string) => {
    switch(status) {
      case 'valid': evCounts.valid++; return 100;
      case 'expiring': evCounts.expiring++; return 75;
      case 'pending_review': evCounts.pending++; return 50;
      case 'expired': evCounts.expired++; return 0;
      case 'rejected': evCounts.rejected++; return 0;
      default: evCounts.none++; return 0; // Si no existe evidencia
    }
  };

  reqs.forEach(r => {
    totalEvidenceItems++;
    totalEvidenceScore += getEvidenceScore(r.evidenceStatus);
  });
  ctrlAssesments.forEach(c => {
    totalEvidenceItems++;
    totalEvidenceScore += getEvidenceScore(c.evidenceStatus);
  });
  
  const evidenceScore = totalEvidenceItems > 0 ? Math.round(totalEvidenceScore / totalEvidenceItems) : 0;`;

calc = calc.replace(/let totalEvidenceItems = 0;[\s\S]*?const evidenceScore = totalEvidenceItems > 0 \? Math\.round\(totalEvidenceScore \/ totalEvidenceItems\) : 0;/, newEvScore);

// Now for Risk Exposure and Global Health
const oldReturnStart = `  return {`;
const newReturnStart = `  // RISK EXPOSURE
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

  // GLOBAL HEALTH
  const globalHealth = Math.round(
    (implementationScore * 0.30) +
    (evidenceScore * 0.20) +
    (efficacyScore * 0.20) +
    (auditReadiness * 0.15) +
    (riskHealth * 0.15)
  );

  return {`;

calc = calc.replace(oldReturnStart, newReturnStart);

// Replace globalHealth assignment inside return
calc = calc.replace(`globalHealth: implementationScore,`, `globalHealth,\n    riskExposure,\n    riskHealth,\n    evidenceCounts,`);

fs.writeFileSync('src/utils/calculations.ts', calc);
