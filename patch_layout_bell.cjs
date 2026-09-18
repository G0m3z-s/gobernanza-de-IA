const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

content = content.replace(
  /<span className="absolute top-1\.5 right-1\.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" \/>/,
  '<span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />'
);

fs.writeFileSync('src/components/Layout.tsx', content);
console.log('patched Layout bell');
