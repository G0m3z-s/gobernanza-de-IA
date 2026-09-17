const fs = require('fs');
const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newControls = `
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
];`;

let parts = catalog.split('export const mappings: NormativeMapping[] = [];');
let beforeMappings = parts[0].trim();
beforeMappings = beforeMappings.replace(/\];$/, '');

let finalContent = beforeMappings + newControls + '\nexport const mappings: NormativeMapping[] = [];\n';

fs.writeFileSync(catalogPath, finalContent);
