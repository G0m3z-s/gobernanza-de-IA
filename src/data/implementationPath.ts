export const isoImplementationPath = [
  {
    id: 'phase-1',
    title: 'Fase 1: Contexto y Liderazgo',
    description: 'Establecer los cimientos estratégicos y la dirección del sistema.',
    steps: [
      {
        id: 'step-1-1',
        title: 'Contexto de la Organización',
        clause: 'ISO 42001 / 27001 - 4.1 y 4.2',
        description: 'Identificar factores internos y externos, y las partes interesadas relevantes para el ecosistema. Es vital comprender quién se ve afectado por el sistema.',
        templateName: 'F-01_Matriz_Contexto_Partes_Interesadas.xlsx',
        aiPrompt: 'Generar análisis preliminar de contexto (FODA) y partes interesadas para una empresa de [Sector] implementando un Sistema de Gestión.'
      },
      {
        id: 'step-1-2',
        title: 'Política del Sistema',
        clause: 'ISO 42001 / 27001 - 5.2',
        description: 'Redactar y aprobar la política de uso, seguridad y gestión aplicable a toda la organización. Debe reflejar el compromiso de la alta dirección.',
        templateName: 'F-02_Plantilla_Politica_Gestion.docx',
        aiPrompt: 'Redactar un borrador de Política de Sistema de Gestión (IA y Seguridad) basada en principios éticos, cumplimiento normativo y mejora continua.'
      },
      {
        id: 'step-1-3',
        title: 'Roles y Responsabilidades',
        clause: 'ISO 42001 / 27001 - 5.3',
        description: 'Asignar responsabilidades claras sobre la gestión, evaluación de riesgos, operación y auditoría del sistema.',
        templateName: 'F-03_Matriz_Roles_Responsabilidades.xlsx',
        aiPrompt: 'Definir responsabilidades clave para un Líder de IA, Oficial de Seguridad (CISO) y Auditor Interno.'
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Fase 2: Riesgos y Planificación',
    description: 'Evaluar riesgos y planificar acciones para tratarlos.',
    steps: [
      {
        id: 'step-2-1',
        title: 'Metodología de Riesgos',
        clause: 'ISO 42001 / 27001 - 6.1.2',
        description: 'Establecer cómo la organización identificará, analizará y valorará los riesgos asociados a la seguridad de la información y sistemas de Inteligencia Artificial.',
        templateName: 'F-04_Metodologia_Evaluacion_Riesgos.docx',
        aiPrompt: 'Generar un esquema metodológico para evaluación de riesgos de IA (Impacto vs Probabilidad), considerando sesgos, privacidad y seguridad.'
      },
      {
        id: 'step-2-2',
        title: 'Declaración de Aplicabilidad (SoA)',
        clause: 'ISO 42001 / 27001 - 6.1.3',
        description: 'Documento que justifica qué controles del anexo normativo aplican a la organización y cuáles se excluyen (y por qué).',
        templateName: 'F-05_Declaracion_Aplicabilidad_SoA.xlsx',
        aiPrompt: 'Sugerir una justificación estándar para la inclusión de controles criptográficos y controles de transparencia algorítmica.'
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Fase 3: Soporte y Operación',
    description: 'Ejecutar los controles y gestionar los recursos del sistema.',
    steps: [
      {
        id: 'step-3-1',
        title: 'Inventario de Sistemas / Activos',
        clause: 'ISO 42001 / 27001 - 8.1',
        description: 'Mantener un registro actualizado de todos los activos de información y sistemas de IA utilizados en la organización.',
        templateName: 'F-06_Inventario_Activos_IA.xlsx',
        aiPrompt: 'Listar los campos críticos que debe contener un inventario de sistemas de IA para cumplir con normativas (Ej: Modelo, Proveedor, Propósito, Riesgo).'
      },
      {
        id: 'step-3-2',
        title: 'Evaluación de Impacto de IA',
        clause: 'ISO 42001 - 8.2',
        description: 'Evaluar de manera sistemática los impactos potenciales de un sistema de IA antes de su despliegue.',
        templateName: 'F-07_Evaluacion_Impacto_IA_AIA.docx',
        aiPrompt: 'Crear un cuestionario base para una Evaluación de Impacto de IA (Algorithmic Impact Assessment).'
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Fase 4: Evaluación y Mejora',
    description: 'Medir el desempeño y actuar sobre las desviaciones.',
    steps: [
      {
        id: 'step-4-1',
        title: 'Programa de Auditoría Interna',
        clause: 'ISO 42001 / 27001 - 9.2',
        description: 'Planificar, establecer y mantener un programa de auditorías para comprobar la conformidad del sistema.',
        templateName: 'F-08_Programa_Auditoria_Interna.xlsx',
        aiPrompt: 'Proponer una agenda y lista de verificación preliminar para la primera auditoría interna de un Sistema de Gestión de IA.'
      },
      {
        id: 'step-4-2',
        title: 'Gestión de No Conformidades',
        clause: 'ISO 42001 / 27001 - 10.1',
        description: 'Proceso para reaccionar ante las no conformidades, evaluar la necesidad de acción y ejecutar acciones correctivas.',
        templateName: 'F-09_Reporte_No_Conformidades_CAPA.docx',
        aiPrompt: 'Estructurar los pasos para realizar un análisis de causa raíz efectivo utilizando la metodología de los 5 Porqués.'
      }
    ]
  }
];
