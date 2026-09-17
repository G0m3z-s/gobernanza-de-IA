import { 
  Standard, 
  NormativeClause, 
  NormativeRequirement, 
  NormativeAnnex, 
  NormativeControl, 
  NormativeMapping 
} from '../types/catalog';

export const standards: Standard[] = [
  {
    id: 'ISO42001-2023',
    code: 'ISO/IEC 42001',
    name: 'Information technology — Artificial intelligence — Management system',
    version: '2023',
    year: 2023,
    type: 'management_system',
    status: 'active'
  },
  {
    id: 'ISO27001-2022',
    code: 'ISO/IEC 27001',
    name: 'Information security, cybersecurity and privacy protection — Information security management systems',
    version: '2022',
    year: 2022,
    type: 'management_system',
    status: 'active'
  }
];

export const clauses: NormativeClause[] = [
  // ISO 42001 Clauses
  { id: 'ISO42001-2023-4', standardId: 'ISO42001-2023', code: '4', title: 'Contexto de la organización', parentCode: null, order: 4, level: 1, category: 'clause' },
  { id: 'ISO42001-2023-5', standardId: 'ISO42001-2023', code: '5', title: 'Liderazgo', parentCode: null, order: 5, level: 1, category: 'clause' },
  { id: 'ISO42001-2023-6', standardId: 'ISO42001-2023', code: '6', title: 'Planificación', parentCode: null, order: 6, level: 1, category: 'clause' },
  { id: 'ISO42001-2023-7', standardId: 'ISO42001-2023', code: '7', title: 'Soporte', parentCode: null, order: 7, level: 1, category: 'clause' },
  { id: 'ISO42001-2023-8', standardId: 'ISO42001-2023', code: '8', title: 'Operación', parentCode: null, order: 8, level: 1, category: 'clause' },
  { id: 'ISO42001-2023-9', standardId: 'ISO42001-2023', code: '9', title: 'Evaluación del desempeño', parentCode: null, order: 9, level: 1, category: 'clause' },
  { id: 'ISO42001-2023-10', standardId: 'ISO42001-2023', code: '10', title: 'Mejora continua', parentCode: null, order: 10, level: 1, category: 'clause' },
  
  // ISO 27001 Clauses
  { id: 'ISO27001-2022-4', standardId: 'ISO27001-2022', code: '4', title: 'Contexto de la organización', parentCode: null, order: 4, level: 1, category: 'clause' },
  { id: 'ISO27001-2022-5', standardId: 'ISO27001-2022', code: '5', title: 'Liderazgo', parentCode: null, order: 5, level: 1, category: 'clause' },
  { id: 'ISO27001-2022-6', standardId: 'ISO27001-2022', code: '6', title: 'Planificación', parentCode: null, order: 6, level: 1, category: 'clause' },
  { id: 'ISO27001-2022-7', standardId: 'ISO27001-2022', code: '7', title: 'Soporte', parentCode: null, order: 7, level: 1, category: 'clause' },
  { id: 'ISO27001-2022-8', standardId: 'ISO27001-2022', code: '8', title: 'Operación', parentCode: null, order: 8, level: 1, category: 'clause' },
  { id: 'ISO27001-2022-9', standardId: 'ISO27001-2022', code: '9', title: 'Evaluación del desempeño', parentCode: null, order: 9, level: 1, category: 'clause' },
  { id: 'ISO27001-2022-10', standardId: 'ISO27001-2022', code: '10', title: 'Mejora continua', parentCode: null, order: 10, level: 1, category: 'clause' },

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
];

export const requirements: NormativeRequirement[] = [
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

  // Clause 7
  ,{
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
];
export const annexes: NormativeAnnex[] = [
  {
    id: 'ISO42001-2023-A',
    standardId: 'ISO42001-2023',
    code: 'A',
    title: 'Controles de referencia para sistemas de IA',
    type: 'normative',
    order: 1
  }
];
export const controls: NormativeControl[] = [
  // A.2
  {
    id: 'ISO42001-2023-A.2.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.2.2',
    title: 'Política de IA',
    summary: 'La organización debe establecer una política formal que oriente el desarrollo, provisión o uso responsable de la inteligencia artificial.',
    objective: 'Proporcionar dirección y apoyo desde la dirección para la gestión responsable de los sistemas de IA.',
    implementationGuidance: 'La política debe contemplar el propósito, principios éticos, alcance de aplicación, responsabilidades, usos permitidos y restringidos, excepciones y un mecanismo de revisión y aprobación. No es necesario crear un manual extenso, pero sí un marco claro y oficial.',
    evidenceGuidance: 'Política de IA aprobada y en su versión vigente, acta de aprobación del comité o alta gerencia, evidencia de comunicación a los empleados y registro de revisiones.',
    auditQuestion: '¿Existe una política de IA formalmente aprobada, comunicada a las partes interesadas y aplicada en los procesos de la organización?',
    controlGroup: 'A.2',
    order: 22
  },
  {
    id: 'ISO42001-2023-A.2.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.2.3',
    title: 'Alineación con otras políticas organizacionales',
    summary: 'Evaluar y garantizar que la introducción o uso de IA no entra en conflicto con otras políticas de la organización, integrando lineamientos cuando sea pertinente.',
    objective: 'Asegurar la coherencia normativa interna y evitar conflictos entre la gestión de IA y otros dominios.',
    implementationGuidance: 'Identificar el impacto de la IA en políticas de seguridad de la información, privacidad de datos, desarrollo seguro, ética, recursos humanos o compras. Se puede actualizar una política existente (ej. política de privacidad) o crear un anexo específico para IA, dependiendo de la necesidad real.',
    evidenceGuidance: 'Matriz de políticas organizacionales y sus cruces con IA, registros de control de cambios de políticas actualizadas, actas de revisión conjunta.',
    auditQuestion: '¿Cómo evalúa la organización la intersección de la IA con otras políticas existentes para asegurar su alineación y evitar vacíos o conflictos?',
    controlGroup: 'A.2',
    order: 23
  },
  {
    id: 'ISO42001-2023-A.2.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.2.4',
    title: 'Revisión de la política de IA',
    summary: 'Garantizar que la política de IA se mantiene actualizada revisándola periódicamente o cuando ocurran cambios sustanciales.',
    objective: 'Mantener la relevancia, adecuación y eficacia de la política de IA en el tiempo.',
    implementationGuidance: 'Definir una periodicidad de revisión (ej. anual) y disparadores de revisión extraordinaria, tales como cambios regulatorios, incidentes éticos o de seguridad, adopción de un nuevo tipo de sistema de IA, o cambios importantes de proveedores.',
    evidenceGuidance: 'Historial de versiones de la política de IA, actas de revisión por la dirección, definición de próxima fecha de revisión y responsable de la actualización.',
    auditQuestion: '¿Qué mecanismos aseguran que la política de IA se revise a intervalos planificados o tras cambios organizacionales y tecnológicos significativos?',
    controlGroup: 'A.2',
    order: 24
  },

  // A.3
  {
    id: 'ISO42001-2023-A.3.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.3.2',
    title: 'Roles y responsabilidades de IA',
    summary: 'La organización debe definir claramente quién responde por las distintas actividades y procesos relacionados con los sistemas de IA.',
    objective: 'Asegurar que todas las actividades de gestión de IA tengan propietarios y responsables asignados.',
    implementationGuidance: 'No es obligatorio inventar cargos nuevos. Se pueden asignar roles de IA (ej. propietario del sistema, responsable de riesgo, supervisor de impacto, o gestor de datos) a puestos existentes. Lo crucial es que las responsabilidades estén documentadas y entendidas.',
    evidenceGuidance: 'Organigrama actualizado, matriz RACI, descripciones de cargo modificadas, actas de designación de roles o constitución de un comité de IA.',
    auditQuestion: '¿Cómo evidencia la organización que las responsabilidades clave para el ciclo de vida de la IA están claramente asignadas, documentadas y son comprendidas?',
    controlGroup: 'A.3',
    order: 32
  },
  {
    id: 'ISO42001-2023-A.3.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.3.3',
    title: 'Reporte de preocupaciones',
    summary: 'Proveer un mecanismo formal y seguro para que los empleados o partes interesadas puedan informar preocupaciones relacionadas con sistemas de IA.',
    objective: 'Facilitar la detección temprana de riesgos, sesgos o fallas éticas mediante el reporte seguro de anomalías.',
    implementationGuidance: 'Puede integrarse con líneas éticas o de cumplimiento ya existentes. Debe garantizar protección contra represalias, posibilidad de anonimato (donde la ley lo permita) y asegurar el registro, escalamiento y cierre de los reportes.',
    evidenceGuidance: 'Procedimiento documentado de canales de reporte, registros de casos o tickets, tiempos de respuesta, evidencias de investigación y resolución.',
    auditQuestion: '¿Existe un mecanismo claro y protegido para reportar preocupaciones sobre IA, y se puede evidenciar la gestión de dichos reportes?',
    controlGroup: 'A.3',
    order: 33
  },

  // A.4
  {
    id: 'ISO42001-2023-A.4.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.4.2',
    title: 'Documentación de recursos',
    summary: 'La organización debe identificar y mantener documentados los recursos más relevantes que se necesitan a lo largo del ciclo de vida de sus sistemas de IA.',
    objective: 'Garantizar la trazabilidad y conocimiento exacto de los recursos que sostienen los sistemas de IA.',
    implementationGuidance: 'Registrar datos, herramientas tecnológicas, modelos base, infraestructura de hardware/software y servicios en la nube utilizados. Sirve como un catálogo o inventario de los cimientos del sistema de IA.',
    evidenceGuidance: 'Inventario centralizado de recursos de IA, diagramas de arquitectura, fichas técnicas de los sistemas, y registros de configuración base.',
    auditQuestion: '¿De qué forma documenta e identifica la organización todos los recursos clave necesarios para desarrollar o mantener sus sistemas de IA?',
    controlGroup: 'A.4',
    order: 42
  },
  {
    id: 'ISO42001-2023-A.4.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.4.3',
    title: 'Recursos de datos',
    summary: 'Identificar y documentar específicamente los conjuntos de datos que los sistemas de IA utilizan para entrenamiento, validación, pruebas u operación.',
    objective: 'Asegurar la trazabilidad y la transparencia sobre qué datos alimentan y configuran el comportamiento de la IA.',
    implementationGuidance: 'Documentar el origen, finalidad, tipo de datos, criterios de calidad aplicados y responsables. Este control se centra en el conocimiento y caracterización del recurso (inventariarlo), mientras que controles posteriores abordarán su gestión activa.',
    evidenceGuidance: 'Diccionarios de datos, inventarios de datasets con orígenes y propósitos, registros de retención y documentación técnica de flujos de datos.',
    auditQuestion: '¿Se han documentado formalmente los recursos de datos (entrenamiento, validación y uso) especificando su origen, finalidad y características?',
    controlGroup: 'A.4',
    order: 43
  },
  {
    id: 'ISO42001-2023-A.4.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.4.4',
    title: 'Recursos de herramientas',
    summary: 'Mantener un registro de las herramientas de software empleadas para desarrollar, evaluar, desplegar u operar los sistemas de IA.',
    objective: 'Mantener el control sobre el ecosistema de software y dependencias tecnológicas asociadas a la IA.',
    implementationGuidance: 'El inventario debe incluir plataformas MLOps, librerías y frameworks, APIs externas y herramientas de pruebas. Controlar las versiones para facilitar la reproducibilidad y auditoría.',
    evidenceGuidance: 'Inventario de activos de software y herramientas, lista de versiones y licencias activas, configuraciones de repositorios y dependencias.',
    auditQuestion: '¿Qué evidencia existe sobre el registro y control de las herramientas de software y plataformas utilizadas en el ciclo de vida de la IA?',
    controlGroup: 'A.4',
    order: 44
  },
  {
    id: 'ISO42001-2023-A.4.5',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.4.5',
    title: 'Recursos de sistemas y computación',
    summary: 'Identificar la infraestructura y capacidad de cómputo (hardware, cloud, almacenamiento) necesaria para soportar los sistemas de inteligencia artificial.',
    objective: 'Garantizar que se documentan las necesidades y la disposición de capacidad computacional para el funcionamiento de la IA.',
    implementationGuidance: 'Documentar proveedores de nube (ej. AWS, GCP, Azure), servidores locales, GPUs/CPUs requeridas y esquemas de disponibilidad. Este no es un control puro de ciberseguridad, sino un requerimiento de trazabilidad de infraestructura.',
    evidenceGuidance: 'Inventario de infraestructura tecnológica, diagramas de despliegue, contratos de nivel de servicio (SLA) con proveedores cloud y especificaciones de capacidad.',
    auditQuestion: '¿Cuenta la organización con un inventario o documentación técnica que detalle la infraestructura y recursos de computación asignados a los sistemas de IA?',
    controlGroup: 'A.4',
    order: 45
  },
  {
    id: 'ISO42001-2023-A.4.6',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.4.6',
    title: 'Recursos humanos',
    summary: 'Identificar explícitamente los perfiles, capacidades y roles humanos indispensables para el desarrollo, supervisión o mantenimiento del sistema de IA.',
    objective: 'Asegurar que se comprende y dimensiona la necesidad de personal experto o de supervisión para el sistema de IA.',
    implementationGuidance: 'Este control busca identificar el "quiénes se necesitan" (ej. data scientists, responsables de riesgo, especialistas legales, supervisores humanos de la inferencia). A diferencia del requisito 7.2 (que verifica si la persona actual es competente), A.4.6 define el perfil del recurso humano como un activo estructural necesario.',
    evidenceGuidance: 'Definiciones de perfiles técnicos requeridos, diseño organizacional del equipo de IA, requisitos de roles en documentación de proyectos.',
    auditQuestion: '¿Se han documentado los perfiles, roles y tipos de recursos humanos que la organización requiere específicamente para el ciclo de vida de sus sistemas de IA?',
    controlGroup: 'A.4',
    order: 46
  }

  // A.5
  ,{
    id: 'ISO42001-2023-A.5.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.5.2',
    title: 'Proceso de evaluación del impacto del sistema de IA',
    summary: 'Establecer un proceso estructurado y sistemático para identificar, analizar y evaluar los impactos de los sistemas de IA a lo largo de su ciclo de vida.',
    objective: 'Proporcionar una base metodológica y repetible para comprender las consecuencias de los sistemas de IA sobre las partes afectadas.',
    implementationGuidance: 'Este control detalla el "cómo" estructurar la evaluación, definiendo: el sistema, su finalidad, las partes afectadas, los impactos (positivos o negativos), su probabilidad/severidad y el impacto residual tras el tratamiento. Debe contemplar mecanismos de actualización ante cambios en el modelo, finalidad, datos o regulación. Nota: El requisito 6.1.4 establece la obligación del SGIA, el 8.4 exige la ejecución operativa, y este control (A.5.2) proporciona las directrices prácticas para implementar el proceso.',
    evidenceGuidance: 'Metodología o procedimiento de evaluación de impacto (AIIA), formularios estandarizados, matrices de evaluación de impactos, y criterios de calificación documentados.',
    auditQuestion: '¿Existe un proceso definido, estructurado y repetible para llevar a cabo la evaluación de impacto de los sistemas de inteligencia artificial de la organización?',
    controlGroup: 'A.5',
    order: 52
  },
  {
    id: 'ISO42001-2023-A.5.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.5.3',
    title: 'Documentación de las evaluaciones de impacto',
    summary: 'Conservar resultados detallados y trazables de las evaluaciones de impacto realizadas para cada sistema de IA aplicable.',
    objective: 'Garantizar la transparencia, responsabilidad y trazabilidad de las decisiones tomadas respecto a los impactos del sistema de IA.',
    implementationGuidance: 'La documentación debe permitir reconstruir el análisis realizado: identificar el sistema evaluado, versión, fecha, responsables, contexto de uso, impactos identificados, medidas propuestas, revisión y aprobación. Está pensado para alimentar directamente registros como el módulo de AI Impact Assessment.',
    evidenceGuidance: 'Informes formales de impacto (AIIA), registros estructurados de evaluaciones, historiales de aprobación y actas de revisión por comités.',
    auditQuestion: '¿Se documentan exhaustivamente los resultados de las evaluaciones de impacto, incluyendo el contexto, hallazgos, medidas y decisiones adoptadas?',
    controlGroup: 'A.5',
    order: 53
  },
  {
    id: 'ISO42001-2023-A.5.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.5.4',
    title: 'Evaluación de impactos sobre individuos o grupos',
    summary: 'Analizar las posibles consecuencias de los sistemas de IA sobre las personas o grupos específicos directamente afectados por su uso o resultados.',
    objective: 'Identificar y mitigar proactivamente impactos adversos sobre los derechos, bienestar e intereses de individuos y grupos.',
    implementationGuidance: 'Analizar dimensiones como privacidad, equidad, riesgo de discriminación, afectación a la autonomía, accesibilidad y consecuencias económicas. Debe considerarse la necesidad de supervisión humana (capacidad de revisión, override) y mecanismos de reclamación cuando el impacto sobre el individuo lo justifique, especialmente en poblaciones vulnerables.',
    evidenceGuidance: 'Secciones específicas de análisis por grupos afectados dentro del informe AIIA, pruebas de detección de sesgos, resultados de consultas a grupos focales y justificación de mecanismos de supervisión humana.',
    auditQuestion: '¿Cómo evalúa y aborda la organización las consecuencias específicas que sus sistemas de IA pueden tener sobre los individuos y grupos afectados?',
    controlGroup: 'A.5',
    order: 54
  },
  {
    id: 'ISO42001-2023-A.5.5',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.5.5',
    title: 'Evaluación de impactos sociales',
    summary: 'Evaluar los efectos potenciales del sistema de IA sobre la sociedad en general o en contextos colectivos más amplios.',
    objective: 'Comprender y gestionar las repercusiones sistémicas, culturales y medioambientales del uso de la IA a gran escala.',
    implementationGuidance: 'Dependiendo de la naturaleza del sistema, evaluar efectos sobre el empleo, confianza pública, desigualdad, seguridad colectiva, medio ambiente (consumo de recursos) y posibles consecuencias no previstas derivadas del uso masivo. No todas las dimensiones aplicarán a todos los sistemas, debiéndose adaptar según el contexto.',
    evidenceGuidance: 'Análisis de impacto social o ambiental documentado, estudios de escenarios, consultas públicas y registros de medidas adoptadas frente a riesgos sistémicos.',
    auditQuestion: '¿De qué forma determina la organización si sus sistemas de IA pueden generar impactos a nivel social, sistémico o medioambiental, y cómo los gestiona?',
    controlGroup: 'A.5',
    order: 55
  }

  // A.6
  ,{
    id: 'ISO42001-2023-A.6.1.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.1.2',
    title: 'Objetivos para el desarrollo responsable de sistemas de IA',
    summary: 'La organización debe establecer objetivos que orienten el desarrollo responsable de sus sistemas IA.',
    objective: 'Asegurar que los sistemas se desarrollen bajo principios éticos y técnicos alineados con los valores organizacionales.',
    implementationGuidance: 'Permitir definir objetivos relacionados, según el sistema y contexto, con: desempeño, seguridad, robustez, transparencia, equidad, privacidad, supervisión humana, confiabilidad, accesibilidad, impactos y cumplimiento. No exigir que todos los objetivos apliquen a todos los sistemas. Los objetivos deben poder traducirse posteriormente en: criterios → medidas → pruebas → evidencia.',
    evidenceGuidance: 'Criterios de desarrollo responsable documentados, especificaciones, Definition of Done, criterios de aceptación, políticas técnicas, documentos de arquitectura.',
    auditQuestion: '¿Se han definido objetivos verificables para el desarrollo responsable del sistema de IA que puedan traducirse en criterios y medidas operativas?',
    controlGroup: 'A.6',
    order: 612
  },
  {
    id: 'ISO42001-2023-A.6.1.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.1.3',
    title: 'Procesos para el diseño y desarrollo responsable de sistemas de IA',
    summary: 'Definir y documentar un proceso para diseñar y desarrollar IA de manera controlada y responsable.',
    objective: 'Integrar prácticas de gobernanza e hitos de control dentro del ciclo de vida de desarrollo técnico de la IA.',
    implementationGuidance: 'Puede considerar: ideación, requisitos, diseño, datos, desarrollo, entrenamiento, integración, pruebas, aprobación, despliegue, cambios, retiro. No imponer una metodología específica como Agile, Scrum o MLOps; debe poder integrarse con procesos SDLC (Software Development Life Cycle) existentes. Los cambios materiales pueden provocar reevaluación de riesgos, impacto y nueva aprobación.',
    evidenceGuidance: 'Procedimiento SDLC/ML lifecycle documentado, diagramas, workflows, gates de control, aprobaciones, tickets, repositorios, registros de cambios.',
    auditQuestion: '¿Existe y se aplica un proceso de diseño y desarrollo documentado que integre controles responsables a lo largo del ciclo de vida técnico del sistema de IA?',
    controlGroup: 'A.6',
    order: 613
  },
  {
    id: 'ISO42001-2023-A.6.2.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.2.2',
    title: 'Requisitos y especificaciones del sistema de IA',
    summary: 'Definir y documentar requisitos para sistemas IA nuevos o cambios relevantes a sistemas existentes.',
    objective: 'Garantizar que los sistemas de IA se construyan sobre especificaciones precisas, seguras y adecuadas a su finalidad.',
    implementationGuidance: 'Permitir considerar: requisitos funcionales, no funcionales, desempeño, seguridad, datos, privacidad, explicabilidad, supervisión humana, restricciones, interfaces, criterios de aceptación, requisitos regulatorios. No asumir que todos aplican siempre; dependen del nivel de riesgo y contexto del sistema.',
    evidenceGuidance: 'Especificación funcional, historias de usuario, requerimientos, criterios de aceptación, contratos de interfaces, requisitos regulatorios, matrices de trazabilidad.',
    auditQuestion: '¿Se documentan, revisan y aprueban los requisitos y especificaciones funcionales y no funcionales de los sistemas de IA antes de su desarrollo o modificación?',
    controlGroup: 'A.6',
    order: 622
  },
  {
    id: 'ISO42001-2023-A.6.2.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.2.3',
    title: 'Documentación del diseño y desarrollo del sistema de IA',
    summary: 'Mantener trazabilidad suficiente sobre cómo fue diseñado y desarrollado el sistema de IA.',
    objective: 'Asegurar la comprensión técnica, reproducibilidad y justificación de las decisiones de diseño del modelo o sistema.',
    implementationGuidance: 'Puede incluir: arquitectura, componentes, modelo, versión, datasets, dependencias, prompts, APIs, decisiones de diseño, supuestos, restricciones y cambios relevantes. No exigir un documento único. Puede existir evidencia distribuida en herramientas técnicas, repositorios y plataformas MLOps.',
    evidenceGuidance: 'Diagramas de arquitectura, repositorios de código, Architecture Decision Records (ADR), model cards, fichas técnicas, documentación de APIs, control de versiones.',
    auditQuestion: '¿Existe documentación técnica que registre y justifique adecuadamente cómo se diseñó y desarrolló el sistema de IA, incluyendo componentes y decisiones clave?',
    controlGroup: 'A.6',
    order: 623
  },
  {
    id: 'ISO42001-2023-A.6.2.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.2.4',
    title: 'Verificación y validación del sistema de IA',
    summary: 'Definir y ejecutar verificaciones y validaciones antes y durante el uso del sistema IA cuando corresponda.',
    objective: 'Asegurar que el sistema se construyó según las especificaciones (verificación) y resuelve el problema adecuado de manera segura (validación).',
    implementationGuidance: 'Diferenciar claramente: Verificación (¿se construyó conforme a requisitos/especificaciones?) y Validación (¿el sistema resulta adecuado para el uso previsto y contexto correspondiente?). Puede considerar precisión, robustez, sesgo, seguridad, rendimiento, límites, casos extremos, pruebas humanas y criterios de aceptación. No reducir V&V solamente a accuracy.',
    evidenceGuidance: 'Plan de pruebas, casos de prueba, resultados documentados, métricas de evaluación, datasets de validación, actas de aprobación, registro de incidencias, evidencia de retesting.',
    auditQuestion: '¿Cómo evidencia la organización la ejecución de pruebas de verificación técnica y validación funcional/contextual antes de la puesta en marcha del sistema IA?',
    controlGroup: 'A.6',
    order: 624
  },
  {
    id: 'ISO42001-2023-A.6.2.5',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.2.5',
    title: 'Implementación / despliegue del sistema de IA',
    summary: 'Planificar y controlar el paso del sistema IA hacia ambientes de uso o producción.',
    objective: 'Garantizar que las transiciones de sistemas de IA a entornos operativos sean seguras y cuenten con la autorización pertinente.',
    implementationGuidance: 'Debe permitir verificar, según corresponda: aprobación previa, requisitos cumplidos, validaciones superadas, configuración, responsables, rollback, comunicación, documentación y transición a operación. No confundir con 6.3 (Planificación de cambios). Mientras 6.3 gestiona cambios macro al SGIA, A.6.2.5 controla el despliegue técnico del sistema de IA.',
    evidenceGuidance: 'Planes de despliegue (deployment plan), checklist de paso a producción, release approval, change ticket, release notes, rollback plan, evidencia de operación en producción.',
    auditQuestion: '¿El despliegue del sistema de IA en ambientes de producción se realiza bajo controles estrictos de paso, documentación y aprobación técnica/negocio?',
    controlGroup: 'A.6',
    order: 625
  },
  {
    id: 'ISO42001-2023-A.6.2.6',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.2.6',
    title: 'Operación y monitoreo del sistema de IA',
    summary: 'Definir cómo será operado, supervisado y mantenido el sistema IA durante su uso activo.',
    objective: 'Garantizar la salud del sistema y la detección oportuna de anomalías, derivas (drift) y fallas operativas.',
    implementationGuidance: 'Puede considerar monitoreo de: desempeño, errores, drift, disponibilidad, sesgo, alucinaciones (cuando aplique), override humano, reclamaciones, incidentes, actualización, soporte y mantenimiento. No todas estas métricas aplican a todos los sistemas; el control debe soportar umbrales y criterios específicos por sistema IA. Queda preparado para integrarse con herramientas de medición (aiMetrics).',
    evidenceGuidance: 'Dashboards operativos (aiMetrics), registros de operación, configuración de alertas por umbrales, reportes periódicos de desempeño, tickets de incidentes de modelo, revisiones de mantenimiento.',
    auditQuestion: '¿Se han definido parámetros, métricas y umbrales específicos de monitoreo y operación en tiempo real para el sistema de IA, y se gestionan sus desvíos o incidentes?',
    controlGroup: 'A.6',
    order: 626
  },
  {
    id: 'ISO42001-2023-A.6.2.7',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.2.7',
    title: 'Documentación técnica del sistema de IA',
    summary: 'Determinar y mantener documentación técnica adecuada para las partes interesadas pertinentes.',
    objective: 'Facilitar la comprensión, uso seguro y auditoría del sistema de IA mediante documentación pertinente para cada audiencia.',
    implementationGuidance: 'La documentación puede variar según el destinatario (usuario, administrador, equipo técnico, cliente, auditor, autoridad, proveedor). Puede incluir: finalidad, capacidades, limitaciones, arquitectura, requisitos, instrucciones, dependencias, versiones, riesgos conocidos y condiciones de uso. No imponer el mismo documento denso a todas las partes, sino adaptar la profundidad.',
    evidenceGuidance: 'Manuales técnicos, manuales de usuario, model cards, system cards, documentación de APIs, fichas técnicas, documentación de operación y guías de usuario.',
    auditQuestion: '¿Disponen las diversas partes interesadas (usuarios, administradores) de la documentación técnica y manuales adaptados a su nivel sobre el uso, riesgos y limitaciones del sistema?',
    controlGroup: 'A.6',
    order: 627
  },
  {
    id: 'ISO42001-2023-A.6.2.8',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.6.2.8',
    title: 'Registro de eventos del sistema de IA',
    summary: 'Determinar qué eventos del sistema IA deben registrarse para permitir trazabilidad, monitoreo e investigación.',
    objective: 'Proveer un rastro forense y de auditoría que permita investigar el comportamiento, las decisiones y las fallas del sistema de IA.',
    implementationGuidance: 'Según contexto puede considerar: fecha/hora, versión, usuario, entrada, salida, decisión, error, override, cambio, incidente, llamada a modelo o acción automatizada. MUY IMPORTANTE: NO obligar a registrar datos personales, prompts completos o información sensible cuando ello genere un riesgo innecesario. Debe considerarse: privacidad, seguridad, minimización, retención y acceso.',
    evidenceGuidance: 'Archivos de logs, audit trail estructurado, políticas de logging del sistema, configuraciones de retención y ofuscación de datos sensibles, registros de eventos operacionales.',
    auditQuestion: '¿La organización ha determinado qué eventos técnicos registrar, por cuánto tiempo y quién accede, balanceando la trazabilidad de la IA frente a los riesgos de privacidad y seguridad?',
    controlGroup: 'A.6',
    order: 628
  }

  // A.7
  ,{
    id: 'ISO42001-2023-A.7.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.7.2',
    title: 'Datos para el desarrollo y la mejora del sistema de IA',
    summary: 'La organización debe establecer procesos para gestionar activamente los datos relacionados con el desarrollo, operación o mejora de sus sistemas de IA.',
    objective: 'Comprender y controlar el ciclo de vida y el papel de los datos utilizados por los sistemas de IA, desde su ingreso hasta su eliminación.',
    implementationGuidance: 'Este control exige ir más allá de la mera identificación del dataset (A.4.3). Contempla definir reglas claras para la recolección, recepción, almacenamiento, procesamiento, mantenimiento, seguridad y eliminación de datos. Aplica tanto a modelos entrenados internamente como a sistemas que consumen IA de terceros (ej. documentos para RAG, knowledge bases o APIs). El foco es la gestión del dato en función del sistema de IA, no duplicar todo un SGSI (ISO 27001).',
    evidenceGuidance: 'Procedimientos documentados de gestión del ciclo de vida de los datos, flujos de datos (data pipelines), políticas de almacenamiento y retención, registros de control de uso y asignación de responsables.',
    auditQuestion: '¿Existe un proceso formal que dicte cómo se gestionan activamente y se controlan los datos empleados o generados por el sistema de IA?',
    controlGroup: 'A.7',
    order: 72
  },
  {
    id: 'ISO42001-2023-A.7.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.7.3',
    title: 'Adquisición de datos',
    summary: 'Determinar y documentar formalmente cómo se obtienen y seleccionan los datos utilizados por el sistema de IA.',
    objective: 'Asegurar que el ingreso de datos a la organización cumpla con lineamientos legales, éticos y técnicos desde su origen.',
    implementationGuidance: 'Documentar la fuente (interna, proveedor, dataset público, open data, API), propietario, derechos de uso, licencias, características de la población representada y criterios de selección. Preparar el registro para considerar restricciones jurídicas o regulatorias aplicables al contexto (ej. requerimientos normativos locales o autorizaciones de tratamiento), sin asumir que el consentimiento es el único mecanismo universal. Aplica tanto a datos de entrenamiento como a bases de conocimiento externas.',
    evidenceGuidance: 'Fichas de adquisición de datasets, contratos o acuerdos de licencia (EULA), registros de origen, autorizaciones o fundamentos legales documentados y metadatos de adquisición.',
    auditQuestion: '¿Están documentadas las fuentes, licencias y criterios de selección bajo los cuales se adquieren los datos que alimentan al sistema de IA?',
    controlGroup: 'A.7',
    order: 73
  },
  {
    id: 'ISO42001-2023-A.7.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.7.4',
    title: 'Calidad de los datos para los sistemas de IA',
    summary: 'Definir criterios de calidad pertinentes y comprobar que los datos satisfacen dichos criterios según el propósito previsto del sistema de IA.',
    objective: 'Mitigar riesgos operativos, sesgos o fallas mediante el aseguramiento de la integridad e idoneidad de los datos.',
    implementationGuidance: 'Evaluar dimensiones como exactitud, completitud, actualidad, consistencia y representatividad. No se debe asumir automáticamente que todo dataset contiene un sesgo indebido; la calidad y el sesgo deben medirse siempre frente al contexto, finalidad y población objetivo. Esta información de calidad conecta directamente con la evaluación de impacto y el perfil de riesgo.',
    evidenceGuidance: 'Perfiles de calidad de datos, data quality reports, estadísticas descriptivas, análisis de distribución y representatividad, registros de limpieza o corrección, y criterios de aceptación definidos.',
    auditQuestion: '¿Se han establecido y evaluado criterios de calidad objetivos sobre los datos, garantizando que sean idóneos y representativos para el uso previsto del sistema IA?',
    controlGroup: 'A.7',
    order: 74
  },
  {
    id: 'ISO42001-2023-A.7.5',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.7.5',
    title: 'Procedencia de los datos',
    summary: 'Mantener trazabilidad suficiente sobre el origen y evolución de los datos utilizados por la IA a lo largo del tiempo.',
    objective: 'Garantizar la auditabilidad y la capacidad de reconstruir la historia y las transformaciones de un conjunto de datos.',
    implementationGuidance: 'Registrar la fuente original, fechas, transformaciones sucesivas, combinaciones con otros datasets, transferencias y el versionado. Este control aborda la trazabilidad temporal e histórica (Data Lineage), a diferencia de la adquisición (A.7.3) que se centra en el acto de entrada legal o comercial. Permite responder cómo llegó un dato al estado final utilizado por el modelo.',
    evidenceGuidance: 'Registros de procedencia (lineage), metadatos de historial, control de versiones de datasets, registros de pipelines ETL/ELT y catálogos de datos auditables.',
    auditQuestion: '¿Existe trazabilidad demostrable que permita reconstruir la historia, origen y transformaciones sufridas por los datos desde su fuente hasta el sistema IA?',
    controlGroup: 'A.7',
    order: 75
  },
  {
    id: 'ISO42001-2023-A.7.6',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.7.6',
    title: 'Preparación de los datos',
    summary: 'Definir y documentar los criterios y métodos utilizados para transformar o preparar los datos antes de su consumo por la IA.',
    objective: 'Estandarizar y hacer transparente el proceso técnico mediante el cual los datos crudos se adaptan para ser útiles al sistema.',
    implementationGuidance: 'Documentar qué se hizo y por qué: exploración, limpieza, normalización, balanceo, anonimización/pseudonimización, feature engineering, o chunking/embeddings para sistemas RAG. La separación estricta en training/validation/test aplica para modelos propios, pero no se exige para APIs genéricas o asistentes que solo consumen contexto. Debe justificarse el efecto de estas transformaciones sobre el resultado final.',
    evidenceGuidance: 'Documentación técnica de pipelines de datos, scripts de transformación comentados, registros de decisiones de limpieza, evidencias de anonimización y reportes de partición de datos.',
    auditQuestion: '¿Se encuentran documentados y justificados los métodos técnicos aplicados para preparar, limpiar y transformar los datos antes de su uso por la IA?',
    controlGroup: 'A.7',
    order: 76
  }

  // A.8
  ,{
    id: 'ISO42001-2023-A.8.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.8.2',
    title: 'Documentación del sistema e información para los usuarios',
    summary: 'Proporcionar a los usuarios información suficiente, clara y comprensible para interactuar adecuadamente con el sistema de IA y comprender sus capacidades y límites.',
    objective: 'Empoderar al usuario final para que utilice el sistema de forma segura, informada y acorde a su propósito previsto.',
    implementationGuidance: 'A diferencia de A.6.2.7 (que cubre diagramas de arquitectura técnica y requerimientos), A.8.2 se centra en el "Manual del Usuario" y las interfaces de front-end. Debe informar: finalidad, usos restringidos, cuándo se interactúa con IA, nivel de autonomía, limitaciones, sesgos potenciales y canales de soporte. La transparencia sobre contenido generado por IA aplica donde el contexto y la legislación lo exijan, adaptando la profundidad al tipo de usuario.',
    evidenceGuidance: 'Guías de uso, manuales de usuario, system cards orientadas al consumidor, mensajes o advertencias en la interfaz gráfica, FAQs de producto y material de inducción.',
    auditQuestion: '¿Qué información específica reciben los usuarios finales para asegurar que comprenden las limitaciones, finalidad e interacción esperada con el sistema de IA?',
    controlGroup: 'A.8',
    order: 82
  },
  {
    id: 'ISO42001-2023-A.8.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.8.3',
    title: 'Informes externos / mecanismos externos de reporte',
    summary: 'Disponer de mecanismos para que terceros y partes interesadas externas puedan informar impactos adversos o preocupaciones sobre el sistema de IA.',
    objective: 'Facilitar la detección temprana de daños externos o fallas del sistema mediante el feedback directo del entorno.',
    implementationGuidance: 'El objetivo es que los externos tengan "dónde quejarse o avisar" de forma accesible (formularios web, portales de ayuda, correos). Mientras A.3.3 rige las líneas éticas internas (empleados informando riesgos sistémicos), A.8.3 capta a la víctima o al ciudadano. Si ya existe un canal corporativo de PQR (Peticiones, Quejas y Reclamos), puede integrarse sin crear uno nuevo, pero debe estar preparado para clasificar impactos de IA. Actúa como el paso previo (recepción) a una gestión de incidente.',
    evidenceGuidance: 'Canales de recepción documentados (links, buzones), procedimientos de clasificación de quejas externas por IA, registros de casos ingresados, y acuerdos de nivel de servicio (SLA) para respuesta.',
    auditQuestion: '¿Cuenta la organización con un mecanismo público, accesible y funcional mediante el cual partes externas puedan reportar impactos adversos causados por su IA?',
    controlGroup: 'A.8',
    order: 83
  },
  {
    id: 'ISO42001-2023-A.8.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.8.4',
    title: 'Comunicación de incidentes',
    summary: 'Determinar, planificar y ejecutar la comunicación de incidentes relevantes del sistema de IA hacia los usuarios y partes pertinentes.',
    objective: 'Proveer notificaciones oportunas, precisas y proporcionadas cuando ocurren fallas significativas que afectan los derechos o la operación.',
    implementationGuidance: 'Establece el flujo Organización → Usuario (a diferencia de A.8.3 que es Externo → Organización). El plan debe definir matrices de severidad para decidir: qué se comunica, a quién, cuándo y por qué canal. No todo bug menor se comunica; debe basarse en el impacto y en obligaciones legales o contractuales aplicables (ej. notificaciones de brechas). Sirve como el puente final del módulo de Incident Management.',
    evidenceGuidance: 'Plan o protocolo de comunicación de incidentes, matrices de severidad y escalamiento, plantillas pre-aprobadas de notificación, y registros de comunicaciones efectivamente emitidas (emails, comunicados).',
    auditQuestion: '¿Existen reglas y matrices claras que definan qué incidentes técnicos o éticos deben ser comunicados a los afectados, cuándo, y cómo?',
    controlGroup: 'A.8',
    order: 84
  },
  {
    id: 'ISO42001-2023-A.8.5',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.8.5',
    title: 'Información para las partes interesadas',
    summary: 'Identificar y gestionar las obligaciones y necesidades de comunicación sobre la IA hacia todas las partes interesadas pertinentes.',
    objective: 'Garantizar que reguladores, proveedores, socios y demás stakeholders reciban la información requerida por norma, contrato o conveniencia.',
    implementationGuidance: 'Extiende el espectro más allá de los usuarios directos (A.8.2). A.8.5 aborda la comunicación con reguladores, autoridades, auditores, socios comerciales y clientes corporativos. Permite conectar obligaciones nacidas de la ley, auditorías o cláusulas de cumplimiento (ej. reportes periódicos de sesgo o explicabilidad). La arquitectura está lista para recibir, en un futuro, los cruces específicos de obligaciones legales locales.',
    evidenceGuidance: 'Matriz de stakeholders con requisitos de información (Stakeholder Map), reportes de cumplimiento enviados a entes reguladores, cláusulas informativas en contratos B2B, y minutas de comités externos.',
    auditQuestion: '¿De qué forma identifica y cumple la organización con las necesidades de información exigidas por partes interesadas más allá del usuario final (reguladores, socios)?',
    controlGroup: 'A.8',
    order: 85
  }

  // A.9
  ,{
    id: 'ISO42001-2023-A.9.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.9.2',
    title: 'Procesos para el uso responsable de los sistemas de IA',
    summary: 'La organización debe definir, documentar y mantener procesos que orienten el uso responsable de los sistemas IA.',
    objective: 'Garantizar que la organización utiliza los sistemas de IA de manera responsable y alineada con políticas, restricciones y objetivos aprobados.',
    implementationGuidance: 'A.9.2 rige los procesos para UTILIZAR la IA (ej. ChatGPT, APIs externas, o IA propia), diferenciándose de A.6.1.3 que rige su DISEÑO y DESARROLLO. Considerar aprobación de uso, condiciones, restricciones, perfiles autorizados, revisión de salidas y supervisión humana. Debe permitir gobernar tanto la IA propia como la consumida como servicio. Conceptualmente preparado para gestionar Shadow AI clasificando herramientas (permitido, restringido, prohibido) según las políticas futuras.',
    evidenceGuidance: 'Procedimiento de uso responsable, política de uso aceptable de IA, matrices de herramientas autorizadas, registros de aprobaciones de uso, y evidencias de supervisión o revisión de resultados.',
    auditQuestion: '¿Cómo gobierna y autoriza la organización el uso diario de las herramientas y sistemas de IA para asegurar que no dependa exclusivamente del criterio de cada usuario?',
    controlGroup: 'A.9',
    order: 92
  },
  {
    id: 'ISO42001-2023-A.9.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.9.3',
    title: 'Objetivos para el uso responsable de los sistemas de IA',
    summary: 'La organización debe identificar y documentar objetivos que orienten el uso responsable de sus sistemas IA.',
    objective: 'Establecer metas claras y medibles para que la operación real del sistema respete los principios de equidad, transparencia y seguridad aplicables.',
    implementationGuidance: 'Mientras A.6.1.2 define objetivos técnicos antes del despliegue (Desarrollo), A.9.3 establece cómo medir y guiar el comportamiento durante la Operación (Uso). Los objetivos (ej. responsabilidad, privacidad, necesidad de validación humana antes de decisión) se adaptarán al nivel de autonomía y riesgo de cada IA. Estructurado para que, en un futuro, cada objetivo pueda conectarse con criterios, indicadores y revisiones periódicas.',
    evidenceGuidance: 'Documentos de objetivos operativos por sistema, acuerdos de nivel de servicio (SLA) orientados a equidad o explicabilidad, y registros de revisión del nivel de supervisión humana.',
    auditQuestion: '¿Qué objetivos específicos, como la necesidad de validación humana o resguardo de privacidad, guían la manera en que los empleados y procesos consumen las salidas del sistema de IA?',
    controlGroup: 'A.9',
    order: 93
  },
  {
    id: 'ISO42001-2023-A.9.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.9.4',
    title: 'Uso previsto del sistema de IA',
    summary: 'Asegurar que el sistema IA sea utilizado de acuerdo con su finalidad aprobada, condiciones definidas y restricciones conocidas.',
    objective: 'Prevenir el uso fuera de propósito, usos no autorizados o la aplicación del sistema en contextos para los cuales no fue validado ni diseñado.',
    implementationGuidance: 'Verifica que durante el USO REAL se respete la finalidad aprobada (a diferencia de A.6.2.2 que define esta finalidad en el diseño, y A.8.2 que meramente informa al usuario al respecto). Considera conceptualmente los campos intendedUse, prohibitedUse y restrictedUse del inventario de IA. Cualquier desviación significativa del uso previsto debe poder disparar una nueva evaluación de riesgo, impacto y aprobación.',
    evidenceGuidance: 'Registros de monitoreo de actividad, auditorías de logs de uso (audit trail), revisiones de excepciones de uso, y actas de aprobación para casos de uso extendidos.',
    auditQuestion: '¿Mediante qué controles asegura la organización que el sistema de IA no se está empleando para fines, poblaciones o contextos distintos a los que fueron oficialmente aprobados?',
    controlGroup: 'A.9',
    order: 94
  }

  // A.10
  ,{
    id: 'ISO42001-2023-A.10.2',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.10.2',
    title: 'Asignación de responsabilidades',
    summary: 'La organización debe determinar y documentar cómo se distribuyen las responsabilidades relacionadas con el sistema IA entre la propia organización, socios, proveedores, clientes y terceros pertinentes.',
    objective: 'Garantizar claridad sobre quién asume el riesgo y el control en un ecosistema donde intervienen múltiples organizaciones o terceros.',
    implementationGuidance: 'Puede considerar, según contexto: quién desarrolla, quién proporciona el modelo o los datos, quién opera, monitorea, aprueba, responde ante incidentes, mantiene, comunica o evalúa impactos y riesgos. Diferenciar claramente quién EJECUTA una actividad técnica versus quién conserva la RESPONSABILIDAD de su resultado y gobernanza. La distribución debe corresponder a la relación real y no exige todas las categorías en todo contrato.',
    evidenceGuidance: 'Matrices RACI interorganizacionales, contratos comerciales, anexos técnicos, acuerdos de nivel de servicio (SLA), Data Processing Agreements (DPA), y mapas de arquitectura de responsabilidades.',
    auditQuestion: '¿Cómo asegura la organización que las obligaciones éticas, de riesgo y cumplimiento estén claramente asignadas y asumidas cuando interactúa con terceros y socios en el ciclo de vida de IA?',
    controlGroup: 'A.10',
    order: 102
  },
  {
    id: 'ISO42001-2023-A.10.3',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.10.3',
    title: 'Proveedores',
    summary: 'Establecer un proceso para gestionar proveedores cuyos productos, servicios o componentes participen en los sistemas de IA, manteniéndolos alineados con el enfoque responsable de la organización.',
    objective: 'Mitigar los riesgos heredados al depender de tecnologías, modelos, datos o infraestructuras de terceros en la cadena de suministro de IA.',
    implementationGuidance: 'Aplica a proveedores de modelos fundacionales, APIs, SaaS con IA, etiquetado o cloud. La evaluación (due diligence) debe ser proporcional a la criticidad y riesgo. Antes de contratar: evaluar riesgos técnicos, privacidad, seguridad. Durante: monitorear desempeño y cambios (ej. nueva versión de modelo). Al terminar: transición y borrado de datos. Conceptualmente preparado para integrarse a una gestión de proveedores (Providers) basada en nivel de riesgo.',
    evidenceGuidance: 'Evaluaciones de due diligence de proveedores, contratos, SLAs, fichas de proveedor, registros de monitoreo de APIs/servicios, reportes de incidentes de terceros y revisiones periódicas.',
    auditQuestion: '¿De qué manera selecciona, evalúa, contrata y monitorea la organización a los proveedores tecnológicos de IA para asegurar que cumplen con sus estándares internos de uso responsable?',
    controlGroup: 'A.10',
    order: 103
  },
  {
    id: 'ISO42001-2023-A.10.4',
    standardId: 'ISO42001-2023',
    annexId: 'ISO42001-2023-A',
    code: 'A.10.4',
    title: 'Clientes',
    summary: 'Considerar las necesidades y expectativas pertinentes de los clientes cuando la organización proporciona productos o servicios relacionados con IA.',
    objective: 'Asegurar que la provisión de soluciones de IA hacia el mercado o clientes B2B se realice de manera transparente, segura y alineada a los compromisos adquiridos.',
    implementationGuidance: 'Aplica especialmente cuando la organización actúa como PROVEEDOR hacia un cliente (incluso como integrador para entidades públicas). Debe considerar la finalidad contratada, restricciones, responsabilidades compartidas y niveles de soporte. Es imperativo distinguir la responsabilidad del proveedor (mantener servicio) de la del cliente (usarlo como está previsto). Una organización puede ser simultáneamente cliente de un LLM y proveedor de un SaaS.',
    evidenceGuidance: 'Documentación de requisitos del cliente, contratos de provisión de servicio, SLAs hacia el cliente, actas de aceptación de entregables, manuales entregados y revisiones de servicio.',
    auditQuestion: 'Cuando la organización funge como proveedora de soluciones IA, ¿cómo identifica, documenta y respeta las expectativas de sus clientes en cuanto a desempeño, responsabilidades y riesgos?',
    controlGroup: 'A.10',
    order: 104
  }
];
export const mappings: NormativeMapping[] = [];
