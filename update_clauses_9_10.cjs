const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newClauses = `
  // ISO 42001 Subclauses Clause 9
  { id: 'ISO42001-2023-9.1', standardId: 'ISO42001-2023', code: '9.1', title: 'Seguimiento, medición, análisis y evaluación', parentCode: '9', order: 91, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-9.2', standardId: 'ISO42001-2023', code: '9.2', title: 'Auditoría interna', parentCode: '9', order: 92, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-9.2.1', standardId: 'ISO42001-2023', code: '9.2.1', title: 'Generalidades', parentCode: '9.2', order: 921, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-9.2.2', standardId: 'ISO42001-2023', code: '9.2.2', title: 'Programa de auditoría interna', parentCode: '9.2', order: 922, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-9.3', standardId: 'ISO42001-2023', code: '9.3', title: 'Revisión por la dirección', parentCode: '9', order: 93, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-9.3.1', standardId: 'ISO42001-2023', code: '9.3.1', title: 'Generalidades', parentCode: '9.3', order: 931, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-9.3.2', standardId: 'ISO42001-2023', code: '9.3.2', title: 'Entradas de la revisión por la dirección', parentCode: '9.3', order: 932, level: 3, category: 'subclause' },
  { id: 'ISO42001-2023-9.3.3', standardId: 'ISO42001-2023', code: '9.3.3', title: 'Resultados de la revisión por la dirección', parentCode: '9.3', order: 933, level: 3, category: 'subclause' },

  // ISO 42001 Subclauses Clause 10
  { id: 'ISO42001-2023-10.1', standardId: 'ISO42001-2023', code: '10.1', title: 'Mejora continua', parentCode: '10', order: 101, level: 2, category: 'subclause' },
  { id: 'ISO42001-2023-10.2', standardId: 'ISO42001-2023', code: '10.2', title: 'No conformidad y acción correctiva', parentCode: '10', order: 102, level: 2, category: 'subclause' },
`;

catalog = catalog.replace(
  /];\n*export const requirements/, 
  newClauses + '];\n\nexport const requirements'
);

const newRequirements = `
  // Clause 9
  ,{
    id: 'ISO42001-2023-9.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-9.1',
    code: '9.1',
    title: 'Seguimiento, medición, análisis y evaluación',
    summary: 'La organización debe determinar métodos, criterios y periodicidad para monitorear y analizar sistemáticamente tanto el desempeño operativo como la eficacia global del SGIA.',
    implementationQuestion: '¿La organización tiene claro qué métricas necesita revisar, con qué frecuencia, quién las consolida y cómo se interpretan para juzgar si el SGIA funciona bien?',
    evidenceGuidance: 'Cuadros de mando o dashboards operativos, reportes periódicos de indicadores de SGIA, registros de monitoreo, análisis de tendencias.',
    auditQuestion: '¿De qué forma demuestra la organización que evalúa sistemáticamente el desempeño de sus procesos de IA y la eficacia de su SGIA?',
    applicability: 'mandatory',
    order: 9101
  },
  {
    id: 'ISO42001-2023-9.2.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-9.2.1',
    code: '9.2.1',
    title: 'Auditoría interna: Generalidades',
    summary: 'Ejecutar auditorías internas a intervalos planificados para determinar si el SGIA es conforme con los requisitos propios y los de la norma ISO/IEC 42001, y si se mantiene eficazmente.',
    implementationQuestion: '¿La organización somete su SGIA a auditorías internas regulares para comprobar de manera objetiva que se cumplen las reglas y que el sistema está vivo?',
    evidenceGuidance: 'Informes formales de auditoría interna, registros de hallazgos (conformidades y no conformidades).',
    auditQuestion: '¿Qué evidencias confirman que se han realizado auditorías internas para evaluar objetivamente la conformidad y eficacia del SGIA?',
    applicability: 'mandatory',
    order: 92101
  },
  {
    id: 'ISO42001-2023-9.2.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-9.2.2',
    code: '9.2.2',
    title: 'Programa de auditoría interna',
    summary: 'Establecer y mantener un programa estructurado que defina las frecuencias, métodos, responsabilidades, criterios y el alcance de las auditorías, asegurando la objetividad e imparcialidad de los auditores.',
    implementationQuestion: '¿Existe una planificación formal (programa) que dicte cuándo se auditará, bajo qué criterios y garantizando que los auditores no revisen su propio trabajo?',
    evidenceGuidance: 'Documento del programa anual de auditorías, criterios de selección de auditores, actas de designación asegurando imparcialidad.',
    auditQuestion: '¿Cómo gestiona la organización su programa de auditoría para asegurar cobertura adecuada, frecuencia pertinente e imparcialidad de los auditores?',
    applicability: 'mandatory',
    order: 92201
  },
  {
    id: 'ISO42001-2023-9.3.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-9.3.1',
    code: '9.3.1',
    title: 'Revisión por la dirección: Generalidades',
    summary: 'La alta dirección debe revisar el sistema de gestión de IA de la organización a intervalos planificados para asegurar su idoneidad, adecuación y eficacia continuas.',
    implementationQuestion: '¿La gerencia o alta dirección se reúne de forma periódica y planificada para revisar si el sistema de IA sigue siendo útil y efectivo para el negocio?',
    evidenceGuidance: 'Actas de revisión por la dirección, agenda del comité directivo.',
    auditQuestion: '¿Existe evidencia de que la alta dirección revisa el SGIA a intervalos planificados para confirmar que sigue siendo conveniente, adecuado y eficaz?',
    applicability: 'mandatory',
    order: 93101
  },
  {
    id: 'ISO42001-2023-9.3.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-9.3.2',
    code: '9.3.2',
    title: 'Entradas de la revisión por la dirección',
    summary: 'La revisión directiva debe basarse en información concreta, incluyendo desempeño previo, contexto externo/interno, resultados de auditorías, métricas de desempeño y retroalimentación.',
    implementationQuestion: '¿Antes de la reunión directiva, se consolida información sobre cómo ha rendido el sistema, qué ha fallado, resultados de auditorías y el progreso de planes previos?',
    evidenceGuidance: 'Presentaciones gerenciales con análisis de indicadores, reportes consolidados de auditoría y no conformidades preparatorios para la revisión.',
    auditQuestion: '¿Demuestra la organización que todas las entradas requeridas (cambios, desempeño, retroalimentación, auditorías, etc.) fueron presentadas a la alta dirección?',
    applicability: 'mandatory',
    order: 93201
  },
  {
    id: 'ISO42001-2023-9.3.3-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-9.3.3',
    code: '9.3.3',
    title: 'Resultados de la revisión por la dirección',
    summary: 'Como producto de la revisión gerencial, deben documentarse las decisiones sobre oportunidades de mejora y necesidades de cambio o recursos para el SGIA.',
    implementationQuestion: '¿De la reunión de la dirección salen decisiones formales, asignación de recursos o planes de acción concretos para mejorar la IA?',
    evidenceGuidance: 'Actas firmadas con decisiones explícitas gerenciales, nuevos presupuestos autorizados, directrices documentadas de mejora continua.',
    auditQuestion: '¿Cuáles fueron los resultados tangibles de la última revisión gerencial y cómo demuestran que se tomaron decisiones orientadas a la mejora o provisión de recursos?',
    applicability: 'mandatory',
    order: 93301
  },

  // Clause 10
  {
    id: 'ISO42001-2023-10.1-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-10.1',
    code: '10.1',
    title: 'Mejora continua',
    summary: 'La organización debe mejorar continuamente la idoneidad, adecuación y eficacia de su SGIA, evidenciando una evolución real más allá del simple cumplimiento.',
    implementationQuestion: '¿Puede la organización demostrar con ejemplos concretos que su sistema de gestión de IA hoy funciona mejor, es más eficiente o maduro que el año anterior?',
    evidenceGuidance: 'Proyectos de optimización tecnológica ejecutados, rediseño de procesos, métricas de mejora demostrables antes/después, lecciones aprendidas aplicadas.',
    auditQuestion: '¿De qué forma demuestra la organización que su sistema de gestión está evolucionando y mejorando continuamente de manera estructural?',
    applicability: 'mandatory',
    order: 10101
  },
  {
    id: 'ISO42001-2023-10.2-R1',
    standardId: 'ISO42001-2023',
    clauseId: 'ISO42001-2023-10.2',
    code: '10.2',
    title: 'No conformidad y acción correctiva',
    summary: 'Ante una no conformidad, la organización debe reaccionar para contenerla (corrección), analizar sus causas subyacentes e implementar acciones definitivas (acciones correctivas) validando luego su eficacia.',
    implementationQuestion: '¿Cuando se detecta un fallo, la empresa no solo soluciona el problema inmediato, sino que investiga la causa raíz y toma acciones para que no se repita nunca más?',
    evidenceGuidance: 'Registros del ciclo CAPA (Corrective and Preventive Actions), informes de investigación de causa raíz (ej. 5 Porqués, Ishikawa), validación documentada de efectividad de las acciones tras el cierre.',
    auditQuestion: '¿Cómo evidencia la organización que distingue entre la corrección de un evento y la ejecución sistemática de una acción correctiva evaluando posteriormente su eficacia real?',
    applicability: 'mandatory',
    order: 10201
  }
];`;

let parts = catalog.split('export const annexes: NormativeAnnex[] = [];');
let beforeAnnexes = parts[0].trim();
beforeAnnexes = beforeAnnexes.replace(/\];$/, '');

let finalContent = beforeAnnexes + newRequirements + '\nexport const annexes: NormativeAnnex[] = [];\nexport const controls: NormativeControl[] = [];\nexport const mappings: NormativeMapping[] = [];\n';

fs.writeFileSync(catalogPath, finalContent);
