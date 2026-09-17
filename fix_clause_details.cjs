const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/NormativeStatus.tsx', 'utf8');

const regex = /const getClauseDetails = \(\) => \{[\s\S]*?const controls = data\.normativeControls\?\.filter\(c => c\.standard === std && c\.code\.startsWith\(clause \+ '\.'\)\) \|\| \[\];/;

const replacement = `const getClauseDetails = () => {
    if (!selectedClause) return null;
    const { clause, std } = selectedClause;

    let resolvedReqs: any[] = [];
    
    if (std === 'ISO/IEC 27001') {
      const reqs = data.requirementAssessments.filter(r => r.clause === clause && r.standard === std);
      resolvedReqs = reqs.map(req => {
        const catalogReq = legacyCatalog.find(c => c.standard === req.standard && c.clause === req.clause && c.requirement === req.requirementId);
        return {
          id: req.id,
          code: req.requirementId,
          title: catalogReq?.title || 'Requisito de la norma',
          description: catalogReq?.description || 'Detalle no disponible para este requisito.',
          status: req.status
        };
      });
    } else {
      const cat = getISO42001AdaptedCatalog();
      const clauseReqs = cat.filter(c => c.clause === clause);
      
      resolvedReqs = clauseReqs.map(catReq => {
        let assessment = resolveAssessment(catReq, data.requirementAssessments, false);
        return {
          ...catReq,
          status: assessment ? assessment.status : 'not_evaluated',
          id: assessment?.id || catReq.id
        };
      });
    }

    const controls = data.normativeControls?.filter(c => c.standard === std && c.code.startsWith(clause + '.')) || [];`;

if (regex.test(content)) {
  fs.writeFileSync('src/components/dashboard/NormativeStatus.tsx', content.replace(regex, replacement));
  console.log("Success");
} else {
  console.log("Failed");
}
