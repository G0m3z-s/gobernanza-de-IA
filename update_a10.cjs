const fs = require('fs');
const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newControls = `
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
];`;

let parts = catalog.split('export const mappings: NormativeMapping[] = [];');
let beforeMappings = parts[0].trim();
beforeMappings = beforeMappings.replace(/\];$/, '');

let finalContent = beforeMappings + newControls + '\nexport const mappings: NormativeMapping[] = [];\n';

fs.writeFileSync(catalogPath, finalContent);
