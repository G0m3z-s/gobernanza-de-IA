const fs = require('fs');
let content = fs.readFileSync('src/data/normativeCatalogAdapter.ts', 'utf8');

const target = `export function getCurrentControlEffectiveness(controlId: string, tests: any[], assessment?: any) {`;

const newFunction = `export interface EffectivenessEvaluation {
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

export function getCurrentControlEffectiveness(controlId: string, tests: any[], assessment?: any) {`;

content = content.replace(target, newFunction);

fs.writeFileSync('src/data/normativeCatalogAdapter.ts', content);
console.log('Added evaluateControlEffectiveness');
