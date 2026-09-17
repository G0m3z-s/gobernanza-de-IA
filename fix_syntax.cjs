const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

catalog = catalog.replace(/\];\n\];\n/, '];\n');
catalog = catalog.replace(/\];\n\];/, '];\n');

fs.writeFileSync(catalogPath, catalog);
