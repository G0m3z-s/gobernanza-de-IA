const fs = require('fs');
let content = fs.readFileSync('src/types/index.ts', 'utf8');

const target1 = "status: 'not_evaluated' | 'gap' | 'planned' | 'documented' | 'implemented' | 'evidenced' | 'verified';";
const replacement1 = "status: 'not_evaluated' | 'gap' | 'planned' | 'documented' | 'implemented' | 'evidenced' | 'verified' | 'not_applicable';";

if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  fs.writeFileSync('src/types/index.ts', content);
  console.log("Success patch types");
} else {
  console.log("Failed patch types");
}
