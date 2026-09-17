const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newClauses = `
  // ISO 42001 Subclauses Clause 7
  { id: 'ISO42001-2023-7.1', standardId: 'ISO42001-2023', code: '7.1', title: 'Recursos', parentCode: '7', order: 71, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-7.2', standardId: 'ISO42001-2023', code: '7.2', title: 'Competencia', parentCode: '7', order: 72, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-7.3', standardId: 'ISO42001-2023', code: '7.3', title: 'Concienciación', parentCode: '7', order: 73, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-7.4', standardId: 'ISO42001-2023', code: '7.4', title: 'Comunicación', parentCode: '7', order: 74, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-7.5', standardId: 'ISO42001-2023', code: '7.5', title: 'Información documentada', parentCode: '7', order: 75, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-7.5.1', standardId: 'ISO42001-2023', code: '7.5.1', title: 'Generalidades', parentCode: '7.5', order: 751, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-7.5.2', standardId: 'ISO42001-2023', code: '7.5.2', title: 'Creación y actualización de información documentada', parentCode: '7.5', order: 752, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-7.5.3', standardId: 'ISO42001-2023', code: '7.5.3', title: 'Control de la información documentada', parentCode: '7.5', order: 753, level: 3, category: 'subclause' },

  // ISO 42001 Subclauses Clause 8
  { id: 'ISO42001-2023-8.1', standardId: 'ISO42001-2023', code: '8.1', title: 'Planificación y control operacional', parentCode: '8', order: 81, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-8.2', standardId: 'ISO42001-2023', code: '8.2', title: 'Evaluación de riesgos de IA', parentCode: '8', order: 82, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-8.3', standardId: 'ISO42001-2023', code: '8.3', title: 'Tratamiento de riesgos de IA', parentCode: '8', order: 83, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-8.4', standardId: 'ISO42001-2023', code: '8.4', title: 'Evaluación del impacto del sistema de IA', parentCode: '8', order: 84, level: 2, category: 'subclause' },
`;

// Find where clauses array ends to inject the subclauses
catalog = catalog.replace(
  /];\n*export const requirements/, 
  newClauses + '];\n\nexport const requirements'
);

const newRequirements = `
  // Clause 7
  {
    id: 'ISO42001-2023-7.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-7.1',
    code: '7.1',
    title: 'Recursos',
    summary: 'La organización debe proveer los recursos técnicos, financieros y humanos necesarios para mantener y mejorar el sistema de gestión de IA.',
    implementationQuestion: '¿Se han asignado suficientes recursos (presupuesto, personal, herramientas) para operar eficazmente el sistema de gestión de inteligencia artificial?',
    evidenceGuidance: 'Presupuesto anual asignado, herramientas tecnológicas adquiridas, infraestructura disponible, planificación de capacidades operativas y asignación de personal.',
    auditQuestion: '¿Cómo determina y proporciona la organización los recursos necesarios de forma oportuna para el funcionamiento eficaz del SGIA?',
    applicability: 'mandatory',
    order: 7101
  },
  {
    id: 'ISO42001-2023-7.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-7.2',
    code: '7.2',
    title: 'Competencia',
    summary: 'Garantizar que el personal involucrado en el SGIA cuenta con la educación, formación y experiencia adecuadas, tomando acciones para cubrir cualquier brecha de conocimiento.',
    implementationQuestion: '¿Las personas que operan y gestionan la IA en la empresa están capacitadas y tienen la experiencia o perfil necesarios para hacerlo?',
    evidenceGuidance: 'Matriz de competencias de perfiles, CVs del personal clave, certificaciones, registros de formación, evaluaciones de desempeño o habilidades.',
    auditQuestion: '¿Qué metodología utiliza la organización para identificar las competencias necesarias y evaluar la efectividad de las acciones formativas tomadas?',
    applicability: 'mandatory',
    order: 7201
  },
  {
    id: 'ISO42001-2023-7.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-7.3',
    code: '7.3',
    title: 'Concienciación',
    summary: 'El personal debe ser consciente de la política de IA, su impacto en la eficacia del SGIA y las repercusiones de no cumplir con los lineamientos establecidos.',
    implementationQuestion: '¿Los empleados comprenden la política de IA de la empresa, conocen su rol y saben qué pasa si no se siguen las reglas o se falla?',
    evidenceGuidance: 'Registros de asistencia a charlas de sensibilización, campañas de comunicación interna, encuestas de clima o de conciencia sobre riesgos de IA.',
    auditQuestion: '¿Cómo se asegura la organización de que los colaboradores son plenamente conscientes de su contribución a la eficacia del sistema de IA y de los riesgos de incumplimiento?',
    applicability: 'mandatory',
    order: 7301
  },
  {
    id: 'ISO42001-2023-7.4-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-7.4',
    code: '7.4',
    title: 'Comunicación',
    summary: 'Se requiere definir un plan de comunicación interna y externa sobre el SGIA, detallando qué comunicar, cuándo, a quién, cómo y quién es el responsable.',
    implementationQuestion: '¿Existe una estrategia definida sobre qué, cómo, cuándo y a quién se le comunican los aspectos relevantes de la inteligencia artificial de la organización?',
    evidenceGuidance: 'Matriz de comunicaciones, planes estratégicos de comunicación, actas de reuniones divulgativas, boletines internos, procedimientos de comunicación a partes interesadas.',
    auditQuestion: '¿Cuenta la organización con un mecanismo estructurado que defina claramente las reglas para las comunicaciones pertinentes al SGIA?',
    applicability: 'mandatory',
    order: 7401
  },
  {
    id: 'ISO42001-2023-7.5.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-7.5.1',
    code: '7.5.1',
    title: 'Información documentada requerida',
    summary: 'El SGIA debe incluir toda la documentación obligatoria requerida normativamente, así como cualquier otra información que la organización considere vital para su eficacia.',
    implementationQuestion: '¿La organización mantiene identificados y preservados todos los documentos exigidos y los que se consideran necesarios para operar la IA?',
    evidenceGuidance: 'Listado maestro de documentos, manual del sistema de gestión, mapa de políticas y procedimientos documentados.',
    auditQuestion: '¿Cómo ha determinado y asegurado la organización la disponibilidad de la información documentada necesaria para garantizar la eficacia del SGIA?',
    applicability: 'mandatory',
    order: 75101
  },
  {
    id: 'ISO42001-2023-7.5.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-7.5.2',
    code: '7.5.2',
    title: 'Creación y actualización',
    summary: 'Todo documento creado o actualizado debe contar con identificación adecuada, formato apropiado y estar sujeto a revisión y aprobación formales antes de su uso.',
    implementationQuestion: '¿Cuando se crea o modifica un documento importante, existe un proceso para etiquetarlo claramente, revisarlo y aprobarlo formalmente?',
    evidenceGuidance: 'Historial de control de versiones en los documentos, firmas de aprobación (físicas o digitales), guías o estándares de formateo interno.',
    auditQuestion: '¿Qué proceso asegura sistemáticamente que la revisión, formato y aprobación de la información documentada sea adecuada antes de su publicación o actualización?',
    applicability: 'mandatory',
    order: 75201
  },
  {
    id: 'ISO42001-2023-7.5.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-7.5.3',
    code: '7.5.3',
    title: 'Control de la información documentada',
    summary: 'Asegurar que los documentos estén disponibles donde se necesiten y protegidos contra pérdida, filtración o alteraciones indebidas, controlando sus cambios, acceso y archivo.',
    implementationQuestion: '¿Están los documentos de IA protegidos contra cambios no autorizados, respaldados y fácilmente disponibles para quienes los necesitan en su labor?',
    evidenceGuidance: 'Plataforma de gestión documental con accesos y permisos configurados, registros de auditoría de acceso, políticas documentadas de retención, respaldo y eliminación.',
    auditQuestion: '¿Cómo controla la organización la disponibilidad, distribución, recuperación y prevención del uso no intencionado de información obsoleta?',
    applicability: 'mandatory',
    order: 75301
  },

  // Clause 8
  {
    id: 'ISO42001-2023-8.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-8.1',
    code: '8.1',
    title: 'Planificación y control operacional',
    summary: 'La organización debe implementar y controlar los procesos operativos diseñados durante la planificación del SGIA, manteniendo evidencia de que se ejecutan conforme a sus criterios.',
    implementationQuestion: '¿Se están ejecutando en el día a día los procesos de IA tal como se planearon y se mantiene un registro operativo para demostrarlo?',
    evidenceGuidance: 'Procedimientos operativos en uso, logs o registros de ejecución de sistemas, checklists operativos completados, evidencias de aprobaciones rutinarias.',
    auditQuestion: '¿Qué evidencia demuestra que los procesos requeridos para cumplir los requisitos del SGIA se ejecutan bajo las condiciones y criterios operacionales definidos?',
    applicability: 'mandatory',
    order: 8101
  },
  {
    id: 'ISO42001-2023-8.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-8.2',
    code: '8.2',
    title: 'Ejecución operativa de evaluación de riesgos',
    summary: 'Llevar a cabo las evaluaciones de riesgos de los sistemas de IA de forma práctica en los intervalos previstos o ante cambios, conservando evidencia documental de su ejecución y resultados.',
    implementationQuestion: '¿Se ha aplicado y diligenciado formalmente la evaluación de los riesgos de los sistemas de IA usando el método definido, manteniendo registros de los resultados recientes?',
    evidenceGuidance: 'Matrices de riesgo completadas con fechas recientes, actas de reuniones de reevaluación de riesgos, reportes operativos de evaluación por cada nuevo modelo desplegado.',
    auditQuestion: '¿Existen registros que evidencien que la evaluación de riesgos de IA se realiza operativamente de acuerdo con la metodología y en los plazos definidos en la cláusula 6.1.2?',
    applicability: 'mandatory',
    order: 8201
  },
  {
    id: 'ISO42001-2023-8.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-8.3',
    code: '8.3',
    title: 'Implementación del tratamiento de riesgos',
    summary: 'Ejecutar operativamente los planes de tratamiento de riesgos formulados, aplicando los controles previstos en el SGIA y manteniendo información sobre su estado de avance real.',
    implementationQuestion: '¿Se están aplicando en la práctica las medidas y controles de seguridad diseñados para mitigar los riesgos identificados en los sistemas de IA?',
    evidenceGuidance: 'Seguimiento documentado a los planes de tratamiento de riesgos, evidencias técnicas de controles implementados en producción, comprobaciones de riesgos residuales reales.',
    auditQuestion: '¿De qué forma demuestra operativamente la organización que el plan de tratamiento de riesgos formulado en 6.1.3 se ha implementado con eficacia en sus sistemas de IA?',
    applicability: 'mandatory',
    order: 8301
  },
  {
    id: 'ISO42001-2023-8.4-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-8.4',
    code: '8.4',
    title: 'Ejecución de evaluación de impacto del sistema de IA',
    summary: 'Realizar y documentar de manera efectiva las evaluaciones de impacto, analizando y midiendo en la práctica las consecuencias sobre individuos, sociedad y entorno, de acuerdo a la metodología del SGIA.',
    implementationQuestion: '¿Se están ejecutando estudios concretos y documentados sobre el impacto real y las consecuencias que los sistemas de inteligencia artificial causan sobre las personas y la sociedad?',
    evidenceGuidance: 'Informes operativos y detallados de evaluaciones de impacto de sistemas de IA, registros de evaluación ética realizados, análisis de consecuencias en usos imprevistos reales.',
    auditQuestion: '¿Existen informes o registros documentados que demuestren que las evaluaciones de impacto de los sistemas de IA se ejecutan conforme al proceso de planificación estipulado en 6.1.4?',
    applicability: 'mandatory',
    order: 8401
  }
];`;

catalog = catalog.replace(
  /];\n*$/s, 
  newRequirements + '\n];\n'
);

fs.writeFileSync(catalogPath, catalog);

