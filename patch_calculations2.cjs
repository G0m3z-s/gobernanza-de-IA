const fs = require('fs');
let content = fs.readFileSync('src/utils/calculations.ts', 'utf8');

const targetOld = `  if (standard === 'Integrado' || standard === 'ISO/IEC 42001') {
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
  }`;

const targetNew = `  let effectivenessCoverage = { evaluated: 0, applicable: 0 };

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

content = content.replace(targetOld, targetNew);

// Add effectivenessCoverage to return object
content = content.replace(
  /    hasGlobalHealthData,\n  };\n}/,
  `    hasGlobalHealthData,
    effectivenessCoverage,
  };
}`
);

fs.writeFileSync('src/utils/calculations.ts', content);
console.log('patched calculations 2');
