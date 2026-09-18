const fs = require('fs');
let content = fs.readFileSync('src/components/implementation/GapAssessmentTab.tsx', 'utf8');

content = content.replace(
  /import \{ getISO42001AdaptedCatalog, getISO42001AdaptedControls \} from '\.\.\/\.\.\/data\/normativeCatalogAdapter';/,
  `import { getISO42001AdaptedCatalog, getISO42001AdaptedControls, getControlApplicability, getControlImplementationStatus } from '../../data/normativeCatalogAdapter';`
);

fs.writeFileSync('src/components/implementation/GapAssessmentTab.tsx', content);
console.log('Fixed imports');
