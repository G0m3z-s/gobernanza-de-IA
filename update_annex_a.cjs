const fs = require('fs');

const catalogPath = './src/data/normativeCatalog.ts';
let catalog = fs.readFileSync(catalogPath, 'utf8');

const annexesNew = `export const annexes: NormativeAnnex[] = [
  {
    id: 'ISO42001-2023-A',
    standardId: 'ISO42001-2023',
    code: 'A',
    title: 'Controles de referencia para sistemas de IA',
    type: 'normative',
    order: 1
  }
];`;

const controlsNew = `export const controls: NormativeControl[] = [
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
];`;

catalog = catalog.replace(/export const annexes: NormativeAnnex\[\] = \[\];/, annexesNew);
catalog = catalog.replace(/export const controls: NormativeControl\[\] = \[\];/, controlsNew);

fs.writeFileSync(catalogPath, catalog);
