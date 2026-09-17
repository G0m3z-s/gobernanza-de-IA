const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newControls = `
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
];`;

let parts = catalog.split('export const mappings: NormativeMapping[] = [];');
let beforeMappings = parts[0].trim();
beforeMappings = beforeMappings.replace(/\];$/, '');

let finalContent = beforeMappings + newControls + '\nexport const mappings: NormativeMapping[] = [];\n';

fs.writeFileSync(catalogPath, finalContent);
