const fs = require('fs');
let content = fs.readFileSync('src/data/normativeCatalog.ts', 'utf8');

// We accidentally injected into the mappings array. Let's fix this.
// I will extract everything up to `export const annexes` and `export const controls` and `export const mappings`, then correctly insert the new requirements into `requirements` array.

// Wait, looking at the previous replacement:
// catalog = catalog.replace(
//  /\];\n*$/s, 
//  newRequirements + '\n];\n'
//);
// The regex `/\];\n*$/s` matched the end of the file, which happened to be the mappings array or controls array!

// Let's rewrite the file carefully.

let newFile = content.split('export const annexes')[0];
let annexesPart = `export const annexes: NormativeAnnex[] = [];
export const controls: NormativeControl[] = [];
export const mappings: NormativeMapping[] = [];
`;

// But wait, the requirements we added were in the mappings array, so they are cut off if I split by `export const annexes`.
// Let's see what is inside the file.
