const fs = require('fs');
let content = fs.readFileSync('src/components/implementation/GapAssessmentTab.tsx', 'utf8');

// 1. Add import for getISO42001AdaptedControls
const importRegex = /import \{ getISO42001AdaptedCatalog \} from '\.\.\/\.\.\/data\/normativeCatalogAdapter';/;
const importReplacement = `import { getISO42001AdaptedCatalog, getISO42001AdaptedControls } from '../../data/normativeCatalogAdapter';`;
content = content.replace(importRegex, importReplacement);

// 2. Add activeCategory state
const stateRegex = /const \[view, setView\] = useState\<'cards' \| 'matrix'\>\('matrix'\);[\s\S]*?const \[selectedReq, setSelectedReq\] = useState\<any\>\(null\);/;
const stateReplacement = `const [view, setView] = useState<'cards' | 'matrix'>('matrix');
  const [selectedReq, setSelectedReq] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<'requirements' | 'controls'>('requirements');`;
content = content.replace(stateRegex, stateReplacement);

// 3. Update baseCatalog logic
const baseCatalogRegex = /const baseCatalog = standard === 'Integrado'[\s\S]*?: legacyCatalog\.filter\(c => c\.standard === standard\);/;
const baseCatalogReplacement = `const getCatalogForCategory = () => {
    if (activeCategory === 'requirements') {
      return standard === 'Integrado' 
        ? [...legacyCatalog.filter(c => c.standard === 'ISO/IEC 27001' && c.clause !== 'Anexo A'), ...getISO42001AdaptedCatalog()]
        : standard === 'ISO/IEC 42001'
          ? getISO42001AdaptedCatalog()
          : legacyCatalog.filter(c => c.standard === standard && c.clause !== 'Anexo A');
    } else {
      return standard === 'Integrado'
        ? [...legacyCatalog.filter(c => c.standard === 'ISO/IEC 27001' && c.clause === 'Anexo A'), ...getISO42001AdaptedControls()]
        : standard === 'ISO/IEC 42001'
          ? getISO42001AdaptedControls()
          : legacyCatalog.filter(c => c.standard === standard && c.clause === 'Anexo A');
    }
  };

  const baseCatalog = getCatalogForCategory();`;
content = content.replace(baseCatalogRegex, baseCatalogReplacement);

// 4. Update enrichedCatalog logic
const enrichedCatalogRegex = /const enrichedCatalog = baseCatalog\.map\(catReq => \{[\s\S]*?let assessment = data\.requirementAssessments\.find\(a => a\.requirementId === catReq\.requirement && a\.standard === catReq\.standard\);[\s\S]*?\/\/ Fallback to legacy ID if assessment for the new ID doesn't exist[\s\S]*?if \(\!assessment && \(catReq as any\)\.legacyRequirementId\) \{[\s\S]*?assessment = data\.requirementAssessments\.find\(a => a\.requirementId === \(catReq as any\)\.legacyRequirementId && a\.standard === catReq\.standard\);[\s\S]*?\}[\s\S]*?return \{[\s\S]*?\.\.\.catReq,[\s\S]*?requirement: assessment \? assessment\.requirementId : catReq\.requirement,[\s\S]*?status: assessment \? assessment\.status : 'not_evaluated',[\s\S]*?assessmentId: assessment\?\.id[\s\S]*?\};[\s\S]*?\}\);/;
const enrichedCatalogReplacement = `const enrichedCatalog = baseCatalog.map(catReq => {
    const isNewControl = (catReq as any).type === 'control';
    
    let assessment;
    if (isNewControl) {
      assessment = data.controlAssessments?.find(a => a.control === catReq.requirement && a.standard === catReq.standard);
      if (!assessment && (catReq as any).legacyControlId) {
        assessment = data.controlAssessments?.find(a => a.control === (catReq as any).legacyControlId && a.standard === catReq.standard);
      }
    } else {
      assessment = data.requirementAssessments?.find(a => a.requirementId === catReq.requirement && a.standard === catReq.standard);
      if (!assessment && (catReq as any).legacyRequirementId) {
        assessment = data.requirementAssessments?.find(a => a.requirementId === (catReq as any).legacyRequirementId && a.standard === catReq.standard);
      }
    }

    const resolvedAssessmentId = assessment 
       ? (isNewControl ? (assessment as any).control : (assessment as any).requirementId)
       : catReq.requirement;

    return {
      ...catReq,
      requirement: resolvedAssessmentId,
      status: assessment ? assessment.status : 'not_evaluated',
      assessmentId: assessment?.id,
      justification: (assessment as any)?.justification || ''
    };
  });`;
content = content.replace(enrichedCatalogRegex, enrichedCatalogReplacement);

// 5. Add tabs in UI
const uiRegex = /<h2 className="text-lg font-semibold text-slate-800">Gap Assessment<\/h2>/;
const uiReplacement = `<h2 className="text-lg font-semibold text-slate-800">Gap Assessment</h2>
        <div className="flex bg-slate-100 p-1 rounded-lg ml-4">
          <button
            className={\`px-4 py-1.5 text-sm font-medium rounded-md transition-colors \${activeCategory === 'requirements' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}\`}
            onClick={() => setActiveCategory('requirements')}
          >
            Requisitos
          </button>
          <button
            className={\`px-4 py-1.5 text-sm font-medium rounded-md transition-colors \${activeCategory === 'controls' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}\`}
            onClick={() => setActiveCategory('controls')}
          >
            Anexo A / Controles
          </button>
        </div>`;
content = content.replace(uiRegex, uiReplacement);

fs.writeFileSync('src/components/implementation/GapAssessmentTab.tsx', content);
console.log("Success");
