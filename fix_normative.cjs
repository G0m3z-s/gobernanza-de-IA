const fs = require('fs');

let norm = fs.readFileSync('src/components/dashboard/NormativeStatus.tsx', 'utf8');

const oldStatusColor = `  const getStatusColor = (clause: string, std: string) => {
    const reqs = data.requirementAssessments.filter(r => r.clause === clause && r.standard === std);
    if (reqs.length === 0) return 'bg-slate-200';
    
    // Simplistic mock logic for demo based on first requirement in clause
    const status = reqs[0].status;
    switch (status) {
      case 'verified':
      case 'implemented':
      case 'documented': return 'bg-teal-400';
      case 'planned': return 'bg-amber-400';
      case 'gap': return 'bg-rose-500';
      case 'not_evaluated': return 'bg-slate-300';
      default: return 'bg-slate-200';
    }
  };`;

const newStatusInfo = `  const getClauseImplementation = (clause: string, std: string) => {
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
  };`;

norm = norm.replace(oldStatusColor, newStatusInfo);

// Now change the rendering block to use getClauseImplementation
const oldRenderBlock = `<div
                      key={clause}
                      className={\`flex-1 h-8 \${getStatusColor(clause, std)} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group\`}
                     onClick={() => setSelectedClause({ clause, std })}
                  >
                    <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-slate-800 text-white text-xs px-2 py-1 rounded z-10 shadow-lg">
                      Explorar Cláusula {clause}
                    </div>
                  </div>`;

const newRenderBlock = `                  {(() => {
                    const info = getClauseImplementation(clause, std);
                    return (
                      <div
                        key={clause}
                        className={\`flex-1 h-8 \${info.color} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group\`}
                        onClick={() => setSelectedClause({ clause, std })}
                      >
                        <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-1 w-max bg-slate-800 text-white text-xs px-2 py-1 rounded z-10 shadow-lg text-center">
                          <p className="font-bold">Cláusula {clause}</p>
                          <p>{info.text}</p>
                        </div>
                      </div>
                    );
                  })()}`;
                  
norm = norm.replace(/<div\s+key=\{clause\}\s+className=\{`flex-1 h-8 \$\{getStatusColor\(clause, std\)\} rounded-sm cursor-pointer hover:opacity-80 transition-opacity relative group`\}[\s\S]*?<\/div>\s*<\/div>/g, newRenderBlock);

fs.writeFileSync('src/components/dashboard/NormativeStatus.tsx', norm);
