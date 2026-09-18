const fs = require('fs');
let content = fs.readFileSync('src/components/controls/SoaTab42001.tsx', 'utf8');

content = content.replace(
  /testResult: getCurrentControlEffectiveness, getControlTestResult\(assessment\.id \? assessment : null\),/,
  `testResult: getCurrentControlEffectiveness(c.id, data.controlEffectivenessTests || [], assessment.id ? assessment : null),
      testCount: (data.controlEffectivenessTests || []).filter(t => t.controlId === c.id).length,`
);

content = content.replace(
  /import \{ getISO42001AdaptedControls, resolveAssessment, getControlApplicability, getControlImplementationStatus, getControlTestResult \} from '\.\.\/\.\.\/data\/normativeCatalogAdapter';/,
  `import { getISO42001AdaptedControls, resolveAssessment, getControlApplicability, getControlImplementationStatus, getCurrentControlEffectiveness, getControlTestResult } from '../../data/normativeCatalogAdapter';`
);

fs.writeFileSync('src/components/controls/SoaTab42001.tsx', content);
console.log("fixed");
