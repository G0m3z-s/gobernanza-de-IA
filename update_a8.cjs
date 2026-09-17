const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const newControls = `
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
];`;

let parts = catalog.split('export const mappings: NormativeMapping[] = [];');
let beforeMappings = parts[0].trim();
beforeMappings = beforeMappings.replace(/\];$/, '');

let finalContent = beforeMappings + newControls + '\nexport const mappings: NormativeMapping[] = [];\n';

fs.writeFileSync(catalogPath, finalContent);
