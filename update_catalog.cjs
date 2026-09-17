const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

// Clauses 4, 5, 6
const newClauses = `
  // ISO 42001 Subclauses Clause 4
  { id: 'ISO42001-2023-4.1', standardId: 'ISO42001-2023', code: '4.1', title: 'Comprensión de la organización y su contexto', parentCode: '4', order: 41, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-4.2', standardId: 'ISO42001-2023', code: '4.2', title: 'Necesidades y expectativas de las partes interesadas', parentCode: '4', order: 42, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-4.3', standardId: 'ISO42001-2023', code: '4.3', title: 'Determinación del alcance del SGIA', parentCode: '4', order: 43, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-4.4', standardId: 'ISO42001-2023', code: '4.4', title: 'Sistema de gestión de inteligencia artificial', parentCode: '4', order: 44, level: 2, category: 'subclause' },
  
  // ISO 42001 Subclauses Clause 5
  { id: 'ISO42001-2023-5.1', standardId: 'ISO42001-2023', code: '5.1', title: 'Liderazgo y compromiso', parentCode: '5', order: 51, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-5.2', standardId: 'ISO42001-2023', code: '5.2', title: 'Política de IA', parentCode: '5', order: 52, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-5.3', standardId: 'ISO42001-2023', code: '5.3', title: 'Roles, responsabilidades y autoridades', parentCode: '5', order: 53, level: 2, category: 'subclause' },

  // ISO 42001 Subclauses Clause 6
  { id: 'ISO42001-2023-6.1', standardId: 'ISO42001-2023', code: '6.1', title: 'Acciones para abordar riesgos y oportunidades', parentCode: '6', order: 61, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-6.1.1', standardId: 'ISO42001-2023', code: '6.1.1', title: 'Generalidades', parentCode: '6.1', order: 611, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-6.1.2', standardId: 'ISO42001-2023', code: '6.1.2', title: 'Evaluación de riesgos de IA', parentCode: '6.1', order: 612, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-6.1.3', standardId: 'ISO42001-2023', code: '6.1.3', title: 'Tratamiento de riesgos de IA', parentCode: '6.1', order: 613, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-6.1.4', standardId: 'ISO42001-2023', code: '6.1.4', title: 'Evaluación del impacto del sistema de IA', parentCode: '6.1', order: 614, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-6.2', standardId: 'ISO42001-2023', code: '6.2', title: 'Objetivos de IA y planificación para lograrlos', parentCode: '6', order: 62, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-6.3', standardId: 'ISO42001-2023', code: '6.3', title: 'Planificación de cambios', parentCode: '6', order: 63, level: 2, category: 'subclause' },
`;

// Insert the new clauses before the closing bracket of the clauses array
catalog = catalog.replace(
  /];\n*export const requirements/, 
  newClauses + '];\n\nexport const requirements'
);

// We need to replace the requirements array entirely to make sure everything matches.
const newRequirements = `export const requirements: NormativeRequirement[] = [
  // Clause 4
  {
    id: 'ISO42001-2023-4.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-4.1',
    code: '4.1',
    title: 'Contexto de la organización',
    summary: 'La organización debe identificar cuestiones internas y externas relevantes que impacten su capacidad de gestionar sistemas de inteligencia artificial de forma responsable.',
    implementationQuestion: '¿Se han documentado y analizado los factores internos y externos (como leyes, tecnología, cultura) que afectan la estrategia de IA de la organización?',
    evidenceGuidance: 'Análisis de contexto, matriz DOFA o PESTEL orientada a tecnologías de la información.',
    auditQuestion: '¿Cómo evalúa y actualiza la organización los factores del entorno que impactan su Sistema de Gestión de Inteligencia Artificial?',
    applicability: 'mandatory',
    order: 4101
  },
  {
    id: 'ISO42001-2023-4.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-4.2',
    code: '4.2',
    title: 'Partes interesadas',
    summary: 'Se requiere determinar quiénes son las partes interesadas relevantes para la IA y cuáles son sus requisitos, obligaciones y expectativas.',
    implementationQuestion: '¿La organización sabe quiénes se ven afectados por sus sistemas de IA y qué esperan (por ejemplo, reguladores, usuarios, desarrolladores)?',
    evidenceGuidance: 'Registro de partes interesadas, matriz de requerimientos y expectativas.',
    auditQuestion: '¿Qué método se usó para definir las partes interesadas relacionadas con la IA y cómo se validan sus necesidades?',
    applicability: 'mandatory',
    order: 4201
  },
  {
    id: 'ISO42001-2023-4.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-4.3',
    code: '4.3',
    title: 'Alcance del sistema de gestión',
    summary: 'La organización debe definir claramente los límites y aplicabilidad de su sistema de gestión de IA.',
    implementationQuestion: '¿Se ha redactado de forma precisa qué procesos, productos o sistemas de IA están cubiertos por el SGIA?',
    evidenceGuidance: 'Documento de alcance oficial, manual del sistema de gestión.',
    auditQuestion: '¿Dónde está documentado el alcance del SGIA y qué exclusiones han sido debidamente justificadas?',
    applicability: 'mandatory',
    order: 4301
  },
  {
    id: 'ISO42001-2023-4.4-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-4.4',
    code: '4.4',
    title: 'Sistema de Gestión',
    summary: 'Es obligatorio establecer, implementar, mantener y mejorar de forma continua el sistema de gestión de IA y sus procesos.',
    implementationQuestion: '¿La organización ha puesto en marcha los procesos necesarios para que el sistema de IA funcione y mejore regularmente?',
    evidenceGuidance: 'Mapa de procesos, documentación central del SGIA.',
    auditQuestion: '¿Cómo evidencia la organización la operación y mejora continua de los procesos de su SGIA de acuerdo a los requisitos?',
    applicability: 'mandatory',
    order: 4401
  },

  // Clause 5
  {
    id: 'ISO42001-2023-5.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-5.1',
    code: '5.1',
    title: 'Compromiso de la alta dirección',
    summary: 'La dirección debe rendir cuentas sobre la efectividad de la IA, asegurando recursos, objetivos alineados y promoviendo la mejora continua.',
    implementationQuestion: '¿La dirección proporciona los recursos necesarios y promueve activamente el cumplimiento del SGIA?',
    evidenceGuidance: 'Acta de aprobación presupuestal, revisión por la dirección, comunicaciones corporativas.',
    auditQuestion: '¿Cómo demuestra la alta dirección su compromiso visible y rendición de cuentas frente al desempeño del SGIA?',
    applicability: 'mandatory',
    order: 5101
  },
  {
    id: 'ISO42001-2023-5.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-5.2',
    code: '5.2',
    title: 'Política de Inteligencia Artificial',
    summary: 'Se debe formular y comunicar una política de IA que exprese la intención de cumplir obligaciones, garantizar el desarrollo ético y mejorar continuamente.',
    implementationQuestion: '¿Existe un documento formal (Política de IA) respaldado por la dirección, publicado y entendido por los empleados?',
    evidenceGuidance: 'Política de IA firmada, registros de difusión o inducción al personal.',
    auditQuestion: '¿Se encuentra la Política de IA documentada, alineada al contexto estratégico de la empresa y comunicada a las partes interesadas?',
    applicability: 'mandatory',
    order: 5201
  },
  {
    id: 'ISO42001-2023-5.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-5.3',
    code: '5.3',
    title: 'Asignación de roles y autoridades',
    summary: 'La alta dirección debe asignar y comunicar las responsabilidades para garantizar la conformidad del sistema de IA e informar sobre su desempeño.',
    implementationQuestion: '¿Están claras las personas encargadas de velar por el buen funcionamiento y cumplimiento normativo del sistema de IA?',
    evidenceGuidance: 'Matriz de roles y responsabilidades, descripciones de cargo, organigrama.',
    auditQuestion: '¿Cómo asegura la organización que las personas asignadas entienden su responsabilidad sobre el desempeño del SGIA?',
    applicability: 'mandatory',
    order: 5301
  },

  // Clause 6
  {
    id: 'ISO42001-2023-6.1.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-6.1.1',
    code: '6.1.1',
    title: 'Planificación de riesgos',
    summary: 'Se debe planificar acciones preventivas considerando el contexto y partes interesadas, con el fin de evitar riesgos y maximizar oportunidades en la IA.',
    implementationQuestion: '¿Tiene la organización una estrategia previa para detectar posibles fallos, sesgos u oportunidades derivadas de sus sistemas de IA?',
    evidenceGuidance: 'Procedimiento de gestión de riesgos, plan de acción inicial.',
    auditQuestion: '¿En qué marco planifica la organización el abordaje de los riesgos y cómo se integra con el contexto evaluado?',
    applicability: 'mandatory',
    order: 61101
  },
  {
    id: 'ISO42001-2023-6.1.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-6.1.2',
    code: '6.1.2',
    title: 'Evaluación de riesgos de IA',
    summary: 'Obligación de establecer una metodología repetible para identificar, analizar y priorizar los riesgos inherentes al desarrollo, uso o retiro de IA.',
    implementationQuestion: '¿Existe un método estándar para calificar y documentar qué tan graves pueden ser los riesgos de sus modelos de IA?',
    evidenceGuidance: 'Metodología de riesgos, matriz de riesgos de IA documentada con evaluación de probabilidad e impacto.',
    auditQuestion: '¿Cómo garantiza que el proceso de evaluación de riesgos produce resultados consistentes, comparables y repetibles?',
    applicability: 'mandatory',
    order: 61201
  },
  {
    id: 'ISO42001-2023-6.1.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-6.1.3',
    code: '6.1.3',
    title: 'Tratamiento de riesgos',
    summary: 'La organización debe diseñar e implementar planes concretos para mitigar, transferir, evitar o aceptar formalmente los riesgos de IA, apoyándose en controles.',
    implementationQuestion: '¿Para cada riesgo inaceptable de IA identificado, se han definido controles y planes de mitigación específicos?',
    evidenceGuidance: 'Plan de tratamiento de riesgos (RTP), declaración de aplicabilidad (SoA).',
    auditQuestion: '¿Están documentados los planes de tratamiento de riesgos y se han seleccionado controles apropiados en alineación con el nivel de riesgo?',
    applicability: 'mandatory',
    order: 61301
  },
  {
    id: 'ISO42001-2023-6.1.4-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-6.1.4',
    code: '6.1.4',
    title: 'Evaluación de impacto del sistema de IA',
    summary: 'Exige realizar evaluaciones de impacto para sistemas de IA específicos o grupos de ellos, analizando las consecuencias negativas sobre las partes interesadas (incluyendo individuos y sociedad).',
    implementationQuestion: '¿Se analizan las consecuencias sociales, éticas y sobre derechos humanos antes de desplegar un sistema de IA?',
    evidenceGuidance: 'Documento de evaluación de impacto de IA (AIIA), análisis ético de casos de uso.',
    auditQuestion: '¿Qué proceso sigue la organización para evaluar y documentar el impacto de sus sistemas de IA sobre terceros o la sociedad?',
    applicability: 'mandatory',
    order: 61401
  },
  {
    id: 'ISO42001-2023-6.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-6.2',
    code: '6.2',
    title: 'Objetivos del SGIA',
    summary: 'Se deben fijar metas medibles relacionadas con el desempeño de la IA, comunicarlas y establecer planes de acción para lograrlas.',
    implementationQuestion: '¿Existen indicadores o metas concretas para asegurar el éxito, la fiabilidad y el uso responsable de la IA?',
    evidenceGuidance: 'Tablero de objetivos e indicadores, actas de planificación.',
    auditQuestion: '¿Los objetivos del sistema de gestión son coherentes con la Política de IA, son medibles y cuentan con un plan de logro documentado?',
    applicability: 'mandatory',
    order: 6201
  },
  {
    id: 'ISO42001-2023-6.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-6.3',
    code: '6.3',
    title: 'Planificación de cambios',
    summary: 'Cuando la organización requiera cambios en su sistema de gestión de IA, debe planificarlos asegurando la disponibilidad de recursos y previniendo efectos adversos.',
    implementationQuestion: '¿Si deciden cambiar la tecnología de IA o sus procesos internos, se realiza de forma planificada y controlada?',
    evidenceGuidance: 'Registro de cambios, procedimiento de gestión del cambio.',
    auditQuestion: '¿Cómo evidencia la organización que los cambios al SGIA se han llevado a cabo de manera planificada considerando los riesgos?',
    applicability: 'mandatory',
    order: 6301
  }
];`;

catalog = catalog.replace(/export const requirements: NormativeRequirement\[\] = \[[\s\S]*?\];/, newRequirements);

fs.writeFileSync(catalogPath, catalog);
