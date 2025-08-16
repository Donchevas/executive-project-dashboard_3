export interface Project {
    idClarity: string;
    nombre: string;
    estado: 'En curso' | 'Finalizado' | 'Vencido' | 'Cancelado' | 'Stand-by';
    fase: 'Idea' | 'Planificación' | 'Desarrollo' | 'Ejecución' | 'Pruebas' | 'Cierre';
    avanceReal: number;
    plazo: number;
    responsable: string;
    gestor: string;
    sponsor: string;
    segmentacion: 'Negocio' | 'TI' | 'Normativo' | 'Seguridad';
    tipoTrabajo: 'Proyecto' | 'Evolutivo' | 'Idea';
    fechaInicio: Date;
    fechaFinCompromiso: Date;
    fechaFinReal: Date | null;
    ultimaActualizacion: Date;
}

// Data updated to be consistent around August 2024
export const projects: (Omit<Project, 'fechaInicio' | 'fechaFinCompromiso' | 'fechaFinReal' | 'ultimaActualizacion'> & { fechaInicio: string, fechaFinCompromiso: string, fechaFinReal: string | null, ultimaActualizacion: string })[] = [
  {
    "idClarity": "PRJ001", "nombre": "Implementación CRM", "estado": "En curso", "fase": "Desarrollo", "avanceReal": 45, "plazo": 50, "responsable": "Ana Torres", "gestor": "Carlos Pérez", "sponsor": "Dirección Comercial", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2024-02-15", "fechaFinCompromiso": "2024-09-30", "fechaFinReal": null, "ultimaActualizacion": "2024-08-10"
  },
  {
    "idClarity": "PRJ002", "nombre": "Migración a Cloud", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Luis Ramírez", "gestor": "María Soto", "sponsor": "TI Corporativo", "segmentacion": "TI", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-05-01", "fechaFinCompromiso": "2024-03-15", "fechaFinReal": "2024-03-10", "ultimaActualizacion": "2024-03-16"
  },
  {
    "idClarity": "PRJ003", "nombre": "Actualización Seguridad SOX", "estado": "En curso", "fase": "Planificación", "avanceReal": 20, "plazo": 40, "responsable": "Marta Aguilar", "gestor": "Jorge Vega", "sponsor": "Auditoría Interna", "segmentacion": "Normativo", "tipoTrabajo": "Evolutivo",
    "fechaInicio": "2024-01-10", "fechaFinCompromiso": "2024-10-30", "fechaFinReal": null, "ultimaActualizacion": "2024-08-12"
  },
  {
    "idClarity": "PRJ004", "nombre": "Canal de Atención WhatsApp", "estado": "En curso", "fase": "Desarrollo", "avanceReal": 60, "plazo": 55, "responsable": "Diego Ruiz", "gestor": "Sofía Vargas", "sponsor": "Marketing", "segmentacion": "Negocio", "tipoTrabajo": "Idea",
    "fechaInicio": "2024-03-01", "fechaFinCompromiso": "2024-12-15", "fechaFinReal": null, "ultimaActualizacion": "2024-08-14"
  },
  {
    "idClarity": "PRJ005", "nombre": "Optimización Core Bancario", "estado": "Vencido", "fase": "Ejecución", "avanceReal": 70, "plazo": 100, "responsable": "Claudia Díaz", "gestor": "Raúl Medina", "sponsor": "Banca Corporativa", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-07-20", "fechaFinCompromiso": "2024-06-30", "fechaFinReal": null, "ultimaActualizacion": "2024-07-25"
  },
  {
    "idClarity": "PRJ006", "nombre": "Plataforma E-learning", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Ana Torres", "gestor": "María Soto", "sponsor": "Recursos Humanos", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-01-15", "fechaFinCompromiso": "2023-11-30", "fechaFinReal": "2023-11-20", "ultimaActualizacion": "2023-12-01"
  },
  {
    "idClarity": "PRJ007", "nombre": "Dashboard Financiero", "estado": "En curso", "fase": "Pruebas", "avanceReal": 85, "plazo": 90, "responsable": "Luis Ramírez", "gestor": "Carlos Pérez", "sponsor": "Dirección Financiera", "segmentacion": "Negocio", "tipoTrabajo": "Evolutivo",
    "fechaInicio": "2024-04-01", "fechaFinCompromiso": "2024-10-31", "fechaFinReal": null, "ultimaActualizacion": "2024-08-13"
  },
  {
    "idClarity": "PRJ008", "nombre": "Robotización de Procesos", "estado": "Stand-by", "fase": "Planificación", "avanceReal": 10, "plazo": 15, "responsable": "Marta Aguilar", "gestor": "Jorge Vega", "sponsor": "Operaciones", "segmentacion": "TI", "tipoTrabajo": "Idea",
    "fechaInicio": "2024-06-01", "fechaFinCompromiso": "2025-02-28", "fechaFinReal": null, "ultimaActualizacion": "2024-07-10"
  },
  {
    "idClarity": "PRJ009", "nombre": "Ley de Protección de Datos", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Claudia Díaz", "gestor": "Sofía Vargas", "sponsor": "Legal", "segmentacion": "Normativo", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-02-01", "fechaFinCompromiso": "2023-08-31", "fechaFinReal": "2023-09-05", "ultimaActualizacion": "2023-09-10"
  },
  {
    "idClarity": "PRJ010", "nombre": "Renovación Firewall", "estado": "En curso", "fase": "Ejecución", "avanceReal": 50, "plazo": 60, "responsable": "Diego Ruiz", "gestor": "Raúl Medina", "sponsor": "Seguridad Informática", "segmentacion": "Seguridad", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2024-03-01", "fechaFinCompromiso": "2024-09-30", "fechaFinReal": null, "ultimaActualizacion": "2024-08-05"
  },
  {
    "idClarity": "PRJ011", "nombre": "App Móvil Clientes", "estado": "Vencido", "fase": "Desarrollo", "avanceReal": 80, "plazo": 100, "responsable": "Ana Torres", "gestor": "Carlos Pérez", "sponsor": "Dirección Comercial", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-08-01", "fechaFinCompromiso": "2024-07-31", "fechaFinReal": null, "ultimaActualizacion": "2024-08-01"
  },
  {
    "idClarity": "PRJ012", "nombre": "Sistema de Tickets Interno", "estado": "En curso", "fase": "Desarrollo", "avanceReal": 30, "plazo": 35, "responsable": "Luis Ramírez", "gestor": "María Soto", "sponsor": "TI Corporativo", "segmentacion": "TI", "tipoTrabajo": "Evolutivo",
    "fechaInicio": "2024-05-15", "fechaFinCompromiso": "2024-12-20", "fechaFinReal": null, "ultimaActualizacion": "2024-07-28"
  },
  {
    "idClarity": "PRJ013", "nombre": "Onboarding Digital", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Marta Aguilar", "gestor": "Jorge Vega", "sponsor": "Recursos Humanos", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-09-01", "fechaFinCompromiso": "2024-02-29", "fechaFinReal": "2024-02-20", "ultimaActualizacion": "2024-03-01"
  },
  {
    "idClarity": "PRJ014", "nombre": "Marketplace B2B", "estado": "Cancelado", "fase": "Idea", "avanceReal": 5, "plazo": 10, "responsable": "Diego Ruiz", "gestor": "Sofía Vargas", "sponsor": "Marketing", "segmentacion": "Negocio", "tipoTrabajo": "Idea",
    "fechaInicio": "2024-01-01", "fechaFinCompromiso": "2024-12-31", "fechaFinReal": null, "ultimaActualizacion": "2024-03-15"
  },
  {
    "idClarity": "PRJ015", "nombre": "Auditoría PCI", "estado": "En curso", "fase": "Ejecución", "avanceReal": 75, "plazo": 80, "responsable": "Claudia Díaz", "gestor": "Raúl Medina", "sponsor": "Seguridad Informática", "segmentacion": "Seguridad", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2024-03-10", "fechaFinCompromiso": "2024-09-15", "fechaFinReal": null, "ultimaActualizacion": "2024-08-11"
  },
  {
    "idClarity": "PRJ016", "nombre": "Rebranding Corporativo", "estado": "En curso", "fase": "Planificación", "avanceReal": 15, "plazo": 20, "responsable": "Ana Torres", "gestor": "Carlos Pérez", "sponsor": "Marketing", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2024-02-01", "fechaFinCompromiso": "2024-11-30", "fechaFinReal": null, "ultimaActualizacion": "2024-08-09"
  },
  {
    "idClarity": "PRJ017", "nombre": "Data Warehouse Unificado", "estado": "En curso", "fase": "Desarrollo", "avanceReal": 55, "plazo": 65, "responsable": "Luis Ramírez", "gestor": "María Soto", "sponsor": "TI Corporativo", "segmentacion": "TI", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-11-01", "fechaFinCompromiso": "2025-05-31", "fechaFinReal": null, "ultimaActualizacion": "2024-08-14"
  },
  {
    "idClarity": "PRJ018", "nombre": "Formación en Ciberseguridad", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Marta Aguilar", "gestor": "Jorge Vega", "sponsor": "Recursos Humanos", "segmentacion": "Seguridad", "tipoTrabajo": "Evolutivo",
    "fechaInicio": "2024-01-10", "fechaFinCompromiso": "2024-06-30", "fechaFinReal": "2024-06-25", "ultimaActualizacion": "2024-07-01"
  },
  {
    "idClarity": "PRJ019", "nombre": "Gestor Documental", "estado": "Vencido", "fase": "Pruebas", "avanceReal": 90, "plazo": 100, "responsable": "Diego Ruiz", "gestor": "Sofía Vargas", "sponsor": "Operaciones", "segmentacion": "TI", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-06-15", "fechaFinCompromiso": "2024-05-31", "fechaFinReal": null, "ultimaActualizacion": "2024-06-10"
  },
  {
    "idClarity": "PRJ020", "nombre": "Análisis de Redes Sociales", "estado": "En curso", "fase": "Idea", "avanceReal": 25, "plazo": 30, "responsable": "Claudia Díaz", "gestor": "Raúl Medina", "sponsor": "Marketing", "segmentacion": "Negocio", "tipoTrabajo": "Idea",
    "fechaInicio": "2024-07-01", "fechaFinCompromiso": "2025-01-31", "fechaFinReal": null, "ultimaActualizacion": "2024-08-01"
  },
  {
    "idClarity": "PRJ021", "nombre": "Firma Digital de Contratos", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Ana Torres", "gestor": "María Soto", "sponsor": "Legal", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-10-01", "fechaFinCompromiso": "2024-04-30", "fechaFinReal": "2024-04-15", "ultimaActualizacion": "2024-04-20"
  },
  {
    "idClarity": "PRJ022", "nombre": "Mantenimiento Servidores", "estado": "En curso", "fase": "Ejecución", "avanceReal": 95, "plazo": 98, "responsable": "Luis Ramírez", "gestor": "Carlos Pérez", "sponsor": "TI Corporativo", "segmentacion": "TI", "tipoTrabajo": "Evolutivo",
    "fechaInicio": "2024-08-01", "fechaFinCompromiso": "2024-08-31", "fechaFinReal": null, "ultimaActualizacion": "2024-08-14"
  },
  {
    "idClarity": "PRJ023", "nombre": "Programa de Fidelización", "estado": "Stand-by", "fase": "Planificación", "avanceReal": 30, "plazo": 40, "responsable": "Marta Aguilar", "gestor": "Sofía Vargas", "sponsor": "Dirección Comercial", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-11-01", "fechaFinCompromiso": "2024-08-31", "fechaFinReal": null, "ultimaActualizacion": "2024-06-20"
  },
  {
    "idClarity": "PRJ024", "nombre": "Prevención de Fraude", "estado": "En curso", "fase": "Desarrollo", "avanceReal": 40, "plazo": 50, "responsable": "Diego Ruiz", "gestor": "Raúl Medina", "sponsor": "Seguridad Informática", "segmentacion": "Seguridad", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2024-02-20", "fechaFinCompromiso": "2025-01-20", "fechaFinReal": null, "ultimaActualizacion": "2024-08-10"
  },
  {
    "idClarity": "PRJ025", "nombre": "Estudio de Mercado Latam", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Claudia Díaz", "gestor": "Jorge Vega", "sponsor": "Marketing", "segmentacion": "Negocio", "tipoTrabajo": "Idea",
    "fechaInicio": "2024-03-01", "fechaFinCompromiso": "2024-07-31", "fechaFinReal": "2024-07-30", "ultimaActualizacion": "2024-08-02"
  },
  {
    "idClarity": "PRJ026", "nombre": "Integración Pasarela de Pagos", "estado": "Vencido", "fase": "Ejecución", "avanceReal": 65, "plazo": 100, "responsable": "Ana Torres", "gestor": "María Soto", "sponsor": "Banca Corporativa", "segmentacion": "Negocio", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2023-12-01", "fechaFinCompromiso": "2024-06-30", "fechaFinReal": null, "ultimaActualizacion": "2024-07-15"
  },
  {
    "idClarity": "PRJ027", "nombre": "Optimización SEO/SEM", "estado": "En curso", "fase": "Ejecución", "avanceReal": 50, "plazo": 50, "responsable": "Luis Ramírez", "gestor": "Sofía Vargas", "sponsor": "Marketing", "segmentacion": "Negocio", "tipoTrabajo": "Evolutivo",
    "fechaInicio": "2024-08-01", "fechaFinCompromiso": "2025-02-28", "fechaFinReal": null, "ultimaActualizacion": "2024-08-13"
  },
  {
    "idClarity": "PRJ028", "nombre": "Renovación de Licencias", "estado": "Finalizado", "fase": "Cierre", "avanceReal": 100, "plazo": 100, "responsable": "Marta Aguilar", "gestor": "Carlos Pérez", "sponsor": "TI Corporativo", "segmentacion": "TI", "tipoTrabajo": "Evolutivo",
    "fechaInicio": "2024-06-01", "fechaFinCompromiso": "2024-07-31", "fechaFinReal": "2024-07-25", "ultimaActualizacion": "2024-07-26"
  },
  {
    "idClarity": "PRJ029", "nombre": "Política de Teletrabajo", "estado": "En curso", "fase": "Planificación", "avanceReal": 10, "plazo": 25, "responsable": "Diego Ruiz", "gestor": "Jorge Vega", "sponsor": "Recursos Humanos", "segmentacion": "Normativo", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2024-01-15", "fechaFinCompromiso": "2024-09-15", "fechaFinReal": null, "ultimaActualizacion": "2024-08-05"
  },
  {
    "idClarity": "PRJ030", "nombre": "Contingencia BCP", "estado": "En curso", "fase": "Pruebas", "avanceReal": 80, "plazo": 85, "responsable": "Claudia Díaz", "gestor": "Raúl Medina", "sponsor": "Auditoría Interna", "segmentacion": "Seguridad", "tipoTrabajo": "Proyecto",
    "fechaInicio": "2024-04-01", "fechaFinCompromiso": "2024-11-30", "fechaFinReal": null, "ultimaActualizacion": "2024-07-29"
  }
]
