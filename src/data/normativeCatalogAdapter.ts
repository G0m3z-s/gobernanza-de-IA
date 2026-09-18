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

export function getControlApplicability(assessment: any) {
  if (!assessment) return 'not_evaluated';
  if (assessment.applicability) return assessment.applicability;
  if (assessment.status === 'not_applicable') return 'not_applicable';
  return 'not_evaluated';
}

export function getControlImplementationStatus(assessment: any) {
  if (!assessment) return 'not_evaluated';
  // Avoid returning not_applicable as an implementation status conceptually for new logic
  if (assessment.status === 'not_applicable' && assessment.applicability !== 'not_applicable') {
    // If it's legacy and doesn't have applicability, we still return the raw status or map it to not_evaluated implementation 
    // But to not break legacy UI, we might return it. The prompt says "NO incluir not_applicable como nuevo estado de implementación".
    // If applicability is not_applicable, UI handles it. So implementation status could be whatever it was.
  }
  return assessment.status || 'not_evaluated';
}

export function getControlEvidenceStatus(assessment: any) {
  if (!assessment) return null;
  // Use existing evidenceStatus if it's there. 
  // If it's 'pending_review' but we don't know if there are actual evidences, we trust the DB field for now, 
  // EXCEPT when creating a new form where we will remove the default 'pending_review'.
  return assessment.evidenceStatus || null; 
}

export function getControlTestResult(assessment: any) {
  if (!assessment) return 'not_tested';
  return assessment.testResult || 'not_tested';
}


export interface EffectivenessEvaluation {
  hasData: boolean;
  source: 'real_test' | 'legacy' | 'none';
  result: 'EFFECTIVE' | 'PARTIALLY_EFFECTIVE' | 'INEFFECTIVE' | 'INCONCLUSIVE' | 'NOT_TESTED';
  testId?: string;
  performedAt?: string;
  hasSubsequentInconclusive?: boolean;
}

export function evaluateControlEffectiveness(controlId: string, tests: any[], assessment?: any): EffectivenessEvaluation {
  const safeTests = tests || [];
  
  // Filter for completed/reviewed tests for this control
  const validTests = safeTests.filter(t => 
    t.controlId === controlId && 
    (t.status === 'COMPLETED' || t.status === 'REVIEWED')
  );

  // Sort by performedAt desc, fallback to createdAt desc
  validTests.sort((a, b) => {
    const timeA = new Date(a.performedAt).getTime();
    const timeB = new Date(b.performedAt).getTime();
    if (timeA === timeB) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return timeB - timeA;
  });

  const latestConclusive = validTests.find(t => t.result !== 'INCONCLUSIVE');
  const latestTest = validTests[0];

  if (latestConclusive) {
    return {
      hasData: true,
      source: 'real_test',
      result: latestConclusive.result,
      testId: latestConclusive.id,
      performedAt: latestConclusive.performedAt,
      hasSubsequentInconclusive: latestTest && latestTest.id !== latestConclusive.id && latestTest.result === 'INCONCLUSIVE'
    };
  }

  if (assessment?.testResult && assessment.testResult !== 'not_tested') {
    return {
      hasData: true,
      source: 'legacy',
      result: assessment.testResult.toUpperCase(),
    };
  }

  return {
    hasData: false,
    source: 'none',
    result: 'NOT_TESTED'
  };
}

export function getCurrentControlEffectiveness(controlId: string, tests: any[], assessment?: any) {
  if (!tests) return assessment?.testResult || 'not_tested';
  
  // Filter for completed/reviewed tests for this control
  const validTests = tests.filter(t => 
    t.controlId === controlId && 
    (t.status === 'COMPLETED' || t.status === 'REVIEWED')
  );

  if (validTests.length === 0) {
    return assessment?.testResult || 'not_tested';
  }

  // Sort by performedAt desc, fallback to createdAt desc
  validTests.sort((a, b) => {
    const timeA = new Date(a.performedAt).getTime();
    const timeB = new Date(b.performedAt).getTime();
    if (timeA === timeB) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return timeB - timeA;
  });

  // Find the most recent test that is NOT inconclusive
  const latestConclusive = validTests.find(t => t.result !== 'INCONCLUSIVE');
  
  if (latestConclusive) {
    // Map to legacy lowercase values or use raw
    return latestConclusive.result.toLowerCase();
  }
  
  // If all are inconclusive, what do we return? Legacy or inconclusive? 
  // "Una prueba INCONCLUSIVE ... no debería sustituir un resultado anterior válido" 
  // If there is no previous valid result, return legacy.
  return assessment?.testResult || 'not_tested';
}

