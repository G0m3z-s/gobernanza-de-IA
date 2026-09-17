const fs = require('fs');

const content = `import React, { useState } from 'react';
import { DashboardData } from '../../types';
import { SlideOver } from '../ui/SlideOver';
import { normativeCatalog as legacyCatalog } from '../../data/catalog';
import { getISO42001AdaptedCatalog, resolveAssessment } from '../../data/normativeCatalogAdapter';

export function NormativeStatus({ data, standard }: { data: DashboardData, standard: string }) {
  // Solo cláusulas 4-10. Anexo A no cuenta en porcentaje de cláusulas.
  const clauses = ['4', '5', '6', '7', '8', '9', '10', 'Anexo A'];
  const [selectedClause, setSelectedClause] = useState<{clause: string, std: string} | null>(null);

  const getCatalogForStandard = (std: string) => {
    return std === 'ISO/IEC 42001' 
      ? getISO42001AdaptedCatalog() 
      : legacyCatalog.filter(c => c.standard === std);
  };

  const getClauseImplementation = (clause: string, std: string) => {
    // Si es Anexo A, devolvemos un bloque estático visual ya que no queremos mezclarlo en los requerimientos
    if (clause === 'Anexo A') {
      return { color: 'bg-slate-200', text: 'Ver controles', percent: 0, isAnnex: true };
    }

    const cat = getCatalogForStandard(std);
    const clauseReqs = cat.filter(c => c.clause === clause);
    
    if (clauseReqs.length === 0) return { color: 'bg-slate-200', text: 'Sin requisitos', percent: 0 };

    // Resolve assessments for each requirement in the catalog
    const resolvedReqs = clauseReqs.map(catReq => {
      // Para ISO 42001 usamos resolveAssessment, para 27001 buscamos directo
      let assessment = std === 'ISO/IEC 42001' 
        ? resolveAssessment(catReq, data.requirementAssessments, false)
        : data.requirementAssessments.find(a => a.requirementId === catReq.requirement && a.standard === std);
      
      return {
        ...catReq,
        status: assessment ? assessment.status : 'not_evaluated'
      };
    });

    const allNotEvaluated = resolvedReqs.every(r => r.status === 'not_evaluated');
    if (allNotEvaluated) return { color: 'bg-slate-300', text: 'No evaluado', percent: 0 };

    const allNotApplicable = resolvedReqs.every(r => r.status === 'not_applicable');
    if (allNotApplicable) return { color: 'bg-slate-200', text: 'No aplica', percent: 0 };

    // Excluir not_applicable
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
  };

  const getClauseDetails = () => {
    if (!selectedClause) return null;
    const { clause, std } = selectedClause;

    const cat = getCatalogForStandard(std);
    const clauseReqs = cat.filter(c => c.clause === clause);
    
    // Resolved requirements
    const resolvedReqs = clauseReqs.map(catReq => {
      let assessment = std === 'ISO/IEC 42001' 
        ? resolveAssessment(catReq, data.requirementAssessments, false)
        : data.requirementAssessments.find(a => a.requirementId === catReq.requirement && a.standard === std);
      
      return {
        ...catReq,
        status: assessment ? assessment.status : 'not_evaluated',
        id: assessment?.id || catReq.id
      };
    });

    const controls = data.normativeControls?.filter(c => c.standard === std && c.code.startsWith(clause + '.')) || [];

    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">Requisitos ({resolvedReqs.length})</h4>
          {resolvedReqs.length > 0 ? (
            <div className="space-y-3">
              {resolvedReqs.map(req => {
                const reqCode = \`\${std} - \${(req as any).code || req.requirement}\`;
                const reqTitle = req.title || 'Requisito de la norma';
                const reqDesc = req.description || 'Detalle no disponible para este requisito.';
                return (
                <div key={req.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">{reqCode}</span>
                    <span className={\`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded \${
                      req.status === 'implemented' || req.status === 'verified' || req.status === 'implemented_maintained' ? 'bg-emerald-100 text-emerald-700' :
                      req.status === 'gap' ? 'bg-rose-100 text-rose-700' :
                      req.status === 'not_applicable' ? 'bg-slate-200 text-slate-500 line-through' :
                      'bg-slate-200 text-slate-700'
                    }\`}>
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-sm block mb-1">{reqTitle}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{reqDesc}</p>
                  </div>
                </div>
              )})}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No hay requisitos mapeados en esta cláusula.</p>
          )}
        </div>

        {clause === 'Anexo A' || controls.length > 0 ? (
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">Controles Asociados ({controls.length})</h4>
            {controls.length > 0 ? (
              <div className="space-y-3">
                {controls.map(ctrl => (
                  <div key={ctrl.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900 text-sm">{ctrl.code}</span>
                      <div className="flex items-center space-x-2">
                        <span className={\`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded \${
                          ctrl.implementationStatus === 'Implementado' ? 'bg-emerald-100 text-emerald-700' :
                          ctrl.implementationStatus === 'En Proceso' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-200 text-slate-700'
                        }\`}>
                          {ctrl.implementationStatus}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2" title={ctrl.name}>{ctrl.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No hay controles directos mapeados.</p>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const standards = standard === 'Integrado' ? ['ISO/IEC 27001', 'ISO/IEC 42001'] : [standard];

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Estado Normativo</h2>
        
        <div className="space-y-6">
          {standards.map(std => (
            <div key={std}>
              <h3 className="text-sm font-medium text-slate-600 mb-2">{std}</h3>
              
              <div className="flex space-x-1">
                {clauses.map(clause => {
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
                })}
              </div>
              <div className="flex space-x-1 mt-1">
                {clauses.map(clause => (
                  <div key={clause} className="flex-1 text-center text-[10px] text-slate-500 font-medium">
                    {clause}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-500 flex-wrap gap-y-2">
          <div className="flex items-center"><div className="w-2 h-2 bg-emerald-500 rounded-sm mr-1"></div>Saludable</div>
          <div className="flex items-center"><div className="w-2 h-2 bg-teal-400 rounded-sm mr-1"></div>En progreso</div>
          <div className="flex items-center"><div className="w-2 h-2 bg-amber-400 rounded-sm mr-1"></div>Parcial</div>
          <div className="flex items-center"><div className="w-2 h-2 bg-rose-500 rounded-sm mr-1"></div>Brecha</div>
          <div className="flex items-center"><div className="w-2 h-2 bg-slate-300 rounded-sm mr-1"></div>No evaluado</div>
        </div>
      </div>

      <SlideOver
        isOpen={!!selectedClause}
        onClose={() => setSelectedClause(null)}
        title={\`Cláusula \${selectedClause?.clause}\`}
        description={\`Norma: \${selectedClause?.std}\`}
      >
        <div className="mt-2">
          {getClauseDetails()}
        </div>
      </SlideOver>
    </>
  );
}
`;

fs.writeFileSync('src/components/dashboard/NormativeStatus.tsx', content);
console.log("Success");
