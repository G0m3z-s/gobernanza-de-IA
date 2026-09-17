const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newControls = `
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
];`;

let parts = catalog.split('export const mappings: NormativeMapping[] = [];');
let beforeMappings = parts[0].trim();
beforeMappings = beforeMappings.replace(/\];$/, '');

let finalContent = beforeMappings + newControls + '\nexport const mappings: NormativeMapping[] = [];\n';

fs.writeFileSync(catalogPath, finalContent);
