const fs = require('fs');
let content = fs.readFileSync('src/components/ui/RiskDetailsSlideOver.tsx', 'utf8');

content = content.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<RiskControlLinksSection/,
  `</div>\n            </div>\n          </div>\n        <RiskControlLinksSection`
);

fs.writeFileSync('src/components/ui/RiskDetailsSlideOver.tsx', content);
console.log("Fixed");
