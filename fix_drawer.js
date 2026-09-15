import fs from 'fs';

let content = fs.readFileSync('src/components/implementation/RequirementDrawer.tsx', 'utf8');

content = content.replace("import { X, Bot, Shield, FileText, CheckCircle2, ChevronRight, History } from 'lucide-react';", "import { X, Bot, Shield, FileText, CheckCircle2, ChevronRight, History, AlertTriangle } from 'lucide-react';\nimport { useStore } from '../../store/useStore';");

content = content.replace("  const { currentOrgId, user } = useAuth();", 
`  const { currentOrgId, user } = useAuth();
  const { data } = useStore();
  
  // Basic AI Check for ISO 42001 AI Impact Assessment
  const isAIAssessmentReq = requirement?.standard === 'ISO 42001' && (requirement?.clause?.startsWith('8.2') || requirement?.title?.toLowerCase().includes('impacto'));
  const aiSystems = data?.aiSystems || [];
  const impacts = data?.aiImpactAssessments || [];
  const systemsWithoutImpact = aiSystems.filter(sys => !impacts.some(imp => imp.aiSystemId === sys.id));
  const showAIWarning = isAIAssessmentReq && systemsWithoutImpact.length > 0;
`);

fs.writeFileSync('src/components/implementation/RequirementDrawer.tsx', content);
console.log('Fixed Drawer');
