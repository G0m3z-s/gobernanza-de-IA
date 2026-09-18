const fs = require('fs');
let content = fs.readFileSync('src/utils/calculations.ts', 'utf8');

content = content.replace(
  /import \{ getISO42001AdaptedCatalog, getISO42001AdaptedControls, resolveAssessment \} from "\.\.\/data\/normativeCatalogAdapter";/,
  `import { getISO42001AdaptedCatalog, getISO42001AdaptedControls, resolveAssessment, evaluateControlEffectiveness, getControlApplicability } from "../data/normativeCatalogAdapter";`
);

fs.writeFileSync('src/utils/calculations.ts', content);
console.log('patched imports');
