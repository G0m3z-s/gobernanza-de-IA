const fs = require('fs');
let content = fs.readFileSync('src/components/dashboard/NormativeStatus.tsx', 'utf8');

const regex = /const getClauseImplementation = \(clause: string, std: string\) => \{[\s\S]*?return \{ color, text, percent \};\n  \};/;

const replacement = `const getClauseImplementation = (clause: string, std: string) => {
    // ISO 27001 Legacy logic
    if (std === 'ISO/IEC 27001') {
      let reqs = data.requirementAssessments.filter(r => r.clause === clause && r.standard === std);
      if (reqs.length === 0) return { color: 'bg-slate-200', text: 'Sin requisitos', percent: 0 };

      const allNotEvaluated = reqs.every(r => !r.status || r.status === 'not_evaluated');
      if (allNotEvaluated) return { color: 'bg-slate-300', text: 'No evaluado', percent: 0 };

      const allNotApplicable = reqs.every(r => r.status === 'not_applicable');
      if (allNotApplicable) return { color: 'bg-slate-200', text: 'No aplica', percent: 0 };

      // Excluir not_applicable
      reqs = reqs.filter(r => r.status !== 'not_applicable');

      if (reqs.length === 0) return { color: 'bg-slate-200', text: 'No aplica', percent: 0 };

      let totalScore = 0;
      reqs.forEach(r => {
        switch(r.status) {
          case 'verified': totalScore += 100; break;
          case 'implemented_maintained': totalScore += 90; break;
          case 'implemented': totalScore += 70; break;
          case 'documented': totalScore += 40; break;
          case 'planned': totalScore += 20; break;
          case 'gap': totalScore += 0; break;
          case 'not_evaluated': totalScore += 0; break;
          default: totalScore += 0;
        }
      });

      const percent = Math.round(totalScore / reqs.length);

      let color = '';
      let text = percent + '%';
      if (percent < 40) color = 'bg-rose-500';
      else if (percent < 70) color = 'bg-amber-400';
      else if (percent < 90) color = 'bg-teal-400';
      else color = 'bg-emerald-500';

      return { color, text, percent };
    }

    // ISO 42001 New logic
    if (clause === 'Anexo A') {
      return { color: 'bg-slate-200', text: 'Ver controles', percent: 0, isAnnex: true };
    }

    const cat = getISO42001AdaptedCatalog();
    const clauseReqs = cat.filter(c => c.clause === clause);
    
    if (clauseReqs.length === 0) return { color: 'bg-slate-200', text: 'Sin requisitos', percent: 0 };

    const resolvedReqs = clauseReqs.map(catReq => {
      let assessment = resolveAssessment(catReq, data.requirementAssessments, false);
      return {
        ...catReq,
        status: assessment ? assessment.status : 'not_evaluated'
      };
    });

    const allNotEvaluated = resolvedReqs.every(r => r.status === 'not_evaluated');
    if (allNotEvaluated) return { color: 'bg-slate-300', text: 'No evaluado', percent: 0 };

    const allNotApplicable = resolvedReqs.every(r => r.status === 'not_applicable');
    if (allNotApplicable) return { color: 'bg-slate-200', text: 'No aplica', percent: 0 };

    const applicableReqs = resolvedReqs.filter(r => r.status !== 'not_applicable');
    if (applicableReqs.length === 0) return { color: 'bg-slate-200', text: 'No aplica', percent: 0 };

    let totalScore = 0;
    applicableReqs.forEach(r => {
      switch(r.status) {
        case 'verified': totalScore += 100; break;
        case 'implemented_maintained': totalScore += 90; break;
        case 'implemented': totalScore += 70; break;
        case 'documented': totalScore += 40; break;
        case 'planned': totalScore += 20; break;
        case 'gap': totalScore += 0; break;
        case 'not_evaluated': totalScore += 0; break;
        default: totalScore += 0;
      }
    });

    const percent = Math.round(totalScore / applicableReqs.length);

    let color = '';
    let text = percent + '%';
    if (percent < 40) color = 'bg-rose-500';
    else if (percent < 70) color = 'bg-amber-400';
    else if (percent < 90) color = 'bg-teal-400';
    else color = 'bg-emerald-500';

    return { color, text, percent };
  };`;

if (regex.test(content)) {
  fs.writeFileSync('src/components/dashboard/NormativeStatus.tsx', content.replace(regex, replacement));
  console.log("Success");
} else {
  console.log("Failed");
}
