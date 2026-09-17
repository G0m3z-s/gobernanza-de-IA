const fs = require('fs');

let calc = fs.readFileSync('src/utils/calculations.ts', 'utf8');

const missingDefs = `  const reqs = (data.requirementAssessments || []).filter(r => 
    r.status !== 'not_applicable' && 
    (standard === 'Integrado' || r.standard === standard)
  );
  const ctrlAssesments = (data.controlAssessments || []).filter(c => 
    (standard === 'Integrado' || c.standard === standard)
  );`;

// Insert them before getEvidenceScore if they don't exist
if (!calc.includes('const reqs =')) {
  calc = calc.replace('const getEvidenceScore', missingDefs + '\n\n  const getEvidenceScore');
}

fs.writeFileSync('src/utils/calculations.ts', calc);
