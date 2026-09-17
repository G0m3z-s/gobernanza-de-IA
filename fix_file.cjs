const fs = require('fs');
let content = fs.readFileSync('src/data/normativeCatalog.ts', 'utf8');

// The new requirements we want to insert are currently after `export const mappings: NormativeMapping[] = [`
// Let's isolate the requirements array.
let parts = content.split('export const annexes: NormativeAnnex[] = [];');
let beforeAnnexes = parts[0];

// The new requirements are currently in parts[1]. Let's extract them.
let newReqs = parts[1].replace('export const controls: NormativeControl[] = [];\nexport const mappings: NormativeMapping[] = [\n', '');

// So newReqs starts with the Clause 7 requirements!
// Let's put newReqs inside the requirements array in beforeAnnexes.

beforeAnnexes = beforeAnnexes.trim();
// beforeAnnexes ends with the `];` of the requirements array.
beforeAnnexes = beforeAnnexes.replace(/];$/, '');

let finalContent = beforeAnnexes + ',\n' + newReqs + '\nexport const annexes: NormativeAnnex[] = [];\nexport const controls: NormativeControl[] = [];\nexport const mappings: NormativeMapping[] = [];\n';

// Because newReqs also ended with `];\n`, wait, let's just make sure it's valid syntax.
// newReqs ends with `}];` ? Yes, because the replace was `newRequirements + '\n];\n'`.
// So newReqs is `, { ... } ];` or similar. Wait, in the previous script I defined `newRequirements` as `  // Clause 7 \n { ... }`.
// It didn't start with a comma.
// So beforeAnnexes needs a comma before we append newReqs (minus its closing bracket if we want, or we can just append and it closes itself).
// Actually, let's just do it manually with regex.

fs.writeFileSync('fix_script.txt', 'done');
