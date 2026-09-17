const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

catalog = catalog.replace(
  `  { id: 'ISO27001-2022-10', standardId: 'ISO27001-2022', code: '10', title: 'Mejora continua', parentCode: null, order: 10, level: 1, category: 'clause' }

  // ISO 42001 Subclauses Clause 4`,
  `  { id: 'ISO27001-2022-10', standardId: 'ISO27001-2022', code: '10', title: 'Mejora continua', parentCode: null, order: 10, level: 1, category: 'clause' },

  // ISO 42001 Subclauses Clause 4`
);

fs.writeFileSync(catalogPath, catalog);
