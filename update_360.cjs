const fs = require('fs');
let code = fs.readFileSync('src/components/ai/AI360View.tsx', 'utf8');

// Update function signature
code = code.replace(
  'export function AI360View({ system, data, onClose }: { system: AISystem, data: DashboardData, onClose: () => void }) {',
  'export function AI360View({ system, data, onClose, onEdit, onEvaluateImpact }: { system: AISystem, data: DashboardData, onClose: () => void, onEdit?: () => void, onEvaluateImpact?: () => void }) {'
);

code = code.replace(
  '<button className="mt-2 text-xs font-semibold text-teal-600 flex items-center hover:text-teal-700">',
  '<button onClick={onEdit} className="mt-2 text-xs font-semibold text-teal-600 flex items-center hover:text-teal-700">'
);

code = code.replace(
  '<button className="px-4 py-2 mt-4 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">',
  '<button onClick={onEvaluateImpact} className="px-4 py-2 mt-4 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">'
);

fs.writeFileSync('src/components/ai/AI360View.tsx', code);
