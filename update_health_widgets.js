import fs from 'fs';

let content = fs.readFileSync('src/components/dashboard/HealthWidgets.tsx', 'utf8');

const originalAIStats = `  const aiStats = {
    total: data.aiSystems.length,
    approved: data.aiSystems.filter(a => a.approvalStatus === 'approved').length,
    pending: data.aiSystems.filter(a => a.approvalStatus === 'pending_review').length,
    highRisk: data.aiSystems.filter(a => a.riskRating === 'Alto' || a.riskRating === 'Crítico').length,
  };`;

const newAIStats = `  const impacts = data.aiImpactAssessments || [];
  const aiStats = {
    total: data.aiSystems.length,
    active: data.aiSystems.filter(a => a.lifecycleStage === 'OPERATION' || a.approvalStatus === 'approved').length,
    withoutImpact: data.aiSystems.filter(s => !impacts.some(i => i.aiSystemId === s.id)).length,
    highImpact: data.aiSystems.filter(s => s.impactLevel === 'high' || s.impactLevel === 'critical').length,
    incidents: (data.aiIncidents || []).filter(i => i.status !== 'closed' && i.status !== 'resolved').length,
  };`;

content = content.replace(originalAIStats, newAIStats);

const originalAIHTML = `        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500"><span>Aprobados:</span> <span className="text-emerald-600">{aiStats.approved}</span></div>
          <div className="flex justify-between text-xs text-slate-500"><span>Alto Riesgo:</span> <span className="text-orange-600">{aiStats.highRisk}</span></div>
        </div>`;

const newAIHTML = `        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500"><span>Sin Impacto (AIA):</span> <span className={aiStats.withoutImpact > 0 ? "text-amber-600" : "text-emerald-600"}>{aiStats.withoutImpact}</span></div>
          <div className="flex justify-between text-xs text-slate-500"><span>Incidentes IA:</span> <span className={aiStats.incidents > 0 ? "text-rose-600" : "text-slate-500"}>{aiStats.incidents}</span></div>
        </div>`;

content = content.replace(originalAIHTML, newAIHTML);

fs.writeFileSync('src/components/dashboard/HealthWidgets.tsx', content);
console.log('HealthWidgets updated');
