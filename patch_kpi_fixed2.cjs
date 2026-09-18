const fs = require('fs');

let content = fs.readFileSync('src/components/dashboard/KPIWidgets.tsx', 'utf8');

content = content.replace(
  /<li className="flex items-center text-rose-600"><div className="w-2 h-2 rounded-full bg-rose-500 mr-2"><\/div>>60%: Crítico<\/li>/,
  '<li className="flex items-center text-rose-600"><div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>&gt;60%: Crítico</li>'
);

fs.writeFileSync('src/components/dashboard/KPIWidgets.tsx', content);
console.log('fixed TS typo');
