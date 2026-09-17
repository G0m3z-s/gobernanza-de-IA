const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newControls = `
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
];`;

let parts = catalog.split('export const mappings: NormativeMapping[] = [];');
let beforeMappings = parts[0].trim();
beforeMappings = beforeMappings.replace(/\];$/, '');

let finalContent = beforeMappings + newControls + '\nexport const mappings: NormativeMapping[] = [];\n';

fs.writeFileSync(catalogPath, finalContent);
