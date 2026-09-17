import { requirements, controls } from './normativeCatalog';

export function getISO42001AdaptedCatalog() {
  const iso42001Reqs = requirements.filter(r => r.standardId === 'ISO42001-2023');
  
  if (iso42001Reqs.length !== 32) {
    console.warn(`Discrepancia en cantidad de requerimientos ISO 42001: esperado 32, encontrado ${iso42001Reqs.length}`);
  }

  return iso42001Reqs.map(req => {
    // The legacy GapAssessmentTab expects specific fields to render and pass to RequirementDrawer
    return {
      id: req.id, // we might not need this if not used, but keep it
      standard: 'ISO/IEC 42001', // exact string expected by legacy to match standard filter
      clause: req.code.split('.')[0], // derive clause like '4', '6'
      requirement: req.id, // CRITICAL: This maps to 'requirementId' in Firestore when saving!
      code: req.code, // we will use this in GapAssessmentTab for rendering instead of requirement
      title: req.title,
      description: `${req.summary || ''}\n\n${req.implementationQuestion || ''}`.trim(),
      summary: req.summary,
      implementationQuestion: req.implementationQuestion,
      evidenceGuidance: req.evidenceGuidance,
      auditQuestion: req.auditQuestion,
      legacyRequirementId: req.code, // This is the ID that was used before (e.g. '4.1')
      type: 'requirement' // Explicitly mark as requirement for UI grouping
    };
  });
}

export function getISO42001AdaptedControls() {
  const iso42001Controls = controls.filter(c => c.standardId === 'ISO42001-2023' && c.annexId === 'ISO42001-2023-A');
  
  if (iso42001Controls.length !== 38) {
    console.warn(`Discrepancia en cantidad de controles ISO 42001: esperado 38, encontrado ${iso42001Controls.length}`);
  }

  return iso42001Controls.map(ctrl => {
    return {
      id: ctrl.id,
      standard: 'ISO/IEC 42001',
      clause: 'Anexo A', 
      requirement: ctrl.id, // Will be overridden dynamically to controlId when saving in RequirementDrawer if type is control
      code: ctrl.code,
      title: ctrl.title,
      description: `${ctrl.summary || ''}\n\n${ctrl.objective || ''}`.trim(),
      summary: ctrl.summary,
      objective: ctrl.objective,
      implementationGuidance: ctrl.implementationGuidance,
      evidenceGuidance: ctrl.evidenceGuidance,
      auditQuestion: ctrl.auditQuestion,
      controlGroup: ctrl.controlGroup,
      legacyControlId: ctrl.code, // Legacy ID was like 'A.6.1'
      type: 'control' // Explicitly mark as control
    };
  });
}

export function resolveAssessment(catReq: any, assessments: any[], isControl = false) {
  let assessment;
  if (isControl) {
    assessment = assessments?.find(a => a.control === catReq.requirement && a.standard === catReq.standard);
    if (!assessment && catReq.legacyControlId) {
      assessment = assessments?.find(a => a.control === catReq.legacyControlId && a.standard === catReq.standard);
    }
  } else {
    assessment = assessments?.find(a => a.requirementId === catReq.requirement && a.standard === catReq.standard);
    if (!assessment && catReq.legacyRequirementId) {
      assessment = assessments?.find(a => a.requirementId === catReq.legacyRequirementId && a.standard === catReq.standard);
    }
  }
  return assessment;
}
