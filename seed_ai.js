import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { readFile } from 'fs/promises';

async function seed() {
  const config = JSON.parse(await readFile('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app, config.firestoreDatabaseId);
  const orgId = 'org-nova';

  const batch = writeBatch(db);

  // AI Providers
  const providers = [
    { id: 'prv-openai', name: 'OpenAI', type: 'API', service: 'LLM', riskRating: 'medium', status: 'approved' },
    { id: 'prv-anthropic', name: 'Anthropic', type: 'API', service: 'LLM', riskRating: 'low', status: 'approved' },
    { id: 'prv-aws', name: 'AWS', type: 'Cloud', service: 'Infrastructure', riskRating: 'low', status: 'approved' }
  ];

  for (const prov of providers) {
    const ref = doc(db, 'aiProviders', prov.id);
    batch.set(ref, { ...prov, organizationId: orgId, createdAt: new Date().toISOString() });
  }

  // AI Systems
  const aiSystems = [
    { 
      id: 'ai-rrhh', code: 'AI-001', name: 'Asistente RRHH', type: 'AI_ASSISTANT', processId: 'proc-5', process: 'Talento Humano', 
      ownerId: 'Sofía Castro', providerId: 'prv-openai', providerName: 'OpenAI', modelName: 'GPT-4o', 
      purpose: 'Asistencia en filtrado de candidatos', 
      autonomyLevel: 'ADVISORY', humanOversightLevel: 'High', 
      personalData: true, sensitiveData: true, 
      riskLevel: 'high', classification: 'restricted', approvalStatus: 'approved', lifecycleStage: 'OPERATION',
      nextReviewDate: '2027-01-01'
    },
    { 
      id: 'ai-chat', code: 'AI-002', name: 'Chatbot clientes', type: 'AI_AGENT', processId: 'proc-6', process: 'Servicio al Cliente', 
      ownerId: 'Diego Torres', providerId: 'prv-anthropic', providerName: 'Anthropic', modelName: 'Claude 3.5 Sonnet', 
      purpose: 'Soporte de primer nivel a clientes', 
      autonomyLevel: 'SEMI_AUTONOMOUS', humanOversightLevel: 'Medium', 
      personalData: true, sensitiveData: false, 
      riskLevel: 'medium', classification: 'allowed', approvalStatus: 'conditionally_approved', lifecycleStage: 'OPERATION',
      nextReviewDate: '2026-12-01'
    },
    { 
      id: 'ai-dev', code: 'AI-003', name: 'Asistente desarrollo', type: 'AI_ASSISTANT', processId: 'proc-4', process: 'Tecnología', 
      ownerId: 'Laura Rojas', providerId: 'prv-openai', providerName: 'OpenAI', modelName: 'GitHub Copilot', 
      purpose: 'Apoyo en generación de código', 
      autonomyLevel: 'ADVISORY', humanOversightLevel: 'High', 
      personalData: false, sensitiveData: false, confidentialData: true,
      riskLevel: 'medium', classification: 'allowed', approvalStatus: 'approved', lifecycleStage: 'OPERATION',
      nextReviewDate: '2027-06-01'
    },
    { 
      id: 'ai-risk', code: 'AI-004', name: 'Modelo predictivo de riesgo', type: 'AI_MODEL', processId: 'proc-3', process: 'Operaciones', 
      ownerId: 'Luis Gómez', providerId: 'prv-aws', providerName: 'AWS SageMaker', modelName: 'Custom XGBoost', 
      purpose: 'Predecir fallos en logística', 
      autonomyLevel: 'ADVISORY', humanOversightLevel: 'High', 
      personalData: false, sensitiveData: false, 
      riskLevel: 'low', classification: 'allowed', approvalStatus: 'pending_review', lifecycleStage: 'VALIDATION',
      nextReviewDate: '2026-10-01'
    },
    { 
      id: 'ai-doc', code: 'AI-005', name: 'Automatización documental con IA', type: 'MLOPS_PIPELINE', processId: 'proc-3', process: 'Operaciones', 
      ownerId: 'Luis Gómez', providerId: 'prv-openai', providerName: 'OpenAI', modelName: 'GPT-4o-mini', 
      purpose: 'Extracción de datos de facturas', 
      autonomyLevel: 'SEMI_AUTONOMOUS', humanOversightLevel: 'Medium', 
      personalData: true, sensitiveData: false, confidentialData: true,
      riskLevel: 'medium', classification: 'allowed', approvalStatus: 'approved', lifecycleStage: 'OPERATION',
      nextReviewDate: '2026-11-01'
    }
  ];

  for (const sys of aiSystems) {
    const ref = doc(db, 'aiSystems', sys.id);
    batch.set(ref, { ...sys, organizationId: orgId, createdAt: new Date().toISOString() }, { merge: true }); // Merge if exists to not break older structure totally
  }

  // AI Impact Assessments
  const impacts = [
    { id: 'imp-1', aiSystemId: 'ai-rrhh', purpose: 'Filtrado de CVs', privacyImpact: 'High', fairnessImpact: 'High', residualImpact: 75, status: 'completed' },
    { id: 'imp-2', aiSystemId: 'ai-chat', purpose: 'Atención al cliente', privacyImpact: 'Medium', fairnessImpact: 'Low', residualImpact: 40, status: 'completed' }
  ];

  for (const imp of impacts) {
    const ref = doc(db, 'aiImpactAssessments', imp.id);
    batch.set(ref, { ...imp, organizationId: orgId, createdAt: new Date().toISOString() });
  }

  // Incidents
  const incidents = [
    { id: 'inc-1', aiSystemId: 'ai-chat', category: 'incorrect_output', severity: 'medium', description: 'Chatbot dio información incorrecta de tarifas', status: 'open', ownerId: 'Diego Torres' }
  ];

  for (const inc of incidents) {
    const ref = doc(db, 'aiIncidents', inc.id);
    batch.set(ref, { ...inc, organizationId: orgId, createdAt: new Date().toISOString() });
  }

  await batch.commit();
  console.log('AI data seeded successfully.');
  process.exit(0);
}

seed();
