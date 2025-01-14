export interface SafetyRecord {
    name: string;
    shortName: string;
    slug: string;
    type: string;
    description: string;
}

export const SafetyRecords: SafetyRecord[] = [
    {
        name: 'Alta/Baja De Afip Firmada Por El Empleado',
        shortName: 'AFIP Alta',
        slug: 'afip-alta',
        type: 'empleado',
        description: 'Formulario de alta o baja en AFIP.'
    },
    {
        name: 'Apto Médico Preocupacional',
        shortName: 'Preocupacional',
        slug: 'preocupacional',
        type: 'empleado',
        description: 'Certificado médico preocupacional.'
    },
    {
        name: 'Aviso Inicio De Obra Res 522/01 Art 12',
        shortName: 'Aviso de Obra',
        slug: 'aviso-de-obra',
        type: 'empresa',
        description: 'Notificación oficial de inicio de obra.'
    },
    {
        name: 'Certificado Art C/Clausula De No Repeticion',
        shortName: 'No repeticion',
        slug: 'no-repeticion',
        type: 'empleado',
        description: 'Certificado ART con cláusula de no repetición.'
    },
    {
        name: 'Certificado Seguro Vida Obligatorio',
        shortName: 'SVO',
        slug: 'svo',
        type: 'empleado',
        description: 'Seguro de vida obligatorio para empleados.'
    },
    {
        name: 'Constancia Entrega EPP Res 299/11',
        shortName: 'EPP',
        slug: 'epp',
        type: 'empleado',
        description: 'Constancia de entrega de equipos de protección personal.'
    },
    {
        name: 'Constancia Plan De Capacitacion',
        shortName: 'Capacitacion',
        slug: 'capacitacion',
        type: 'empleado',
        description: 'Documento de plan de capacitación.'
    },
    {
        name: 'F-931 DJ y Presentacion',
        shortName: 'F931 Presentacion',
        slug: 'f931-presentacion',
        type: 'empresa',
        description: 'Declaración jurada y presentación del formulario F-931.'
    },
    {
        name: 'F-931 Nomina De Empleados',
        shortName: 'F931 Nomina',
        slug: 'f931-nomina',
        type: 'empresa',
        description: 'Listado de empleados en el formulario F-931.'
    },
    {
        name: 'F-931 VEP Y Pago',
        shortName: 'F931 Pago',
        slug: 'f931-pago',
        type: 'empresa',
        description: 'Generación de VEP y pago del formulario F-931.'
    },
    {
        name: 'IERIC (Boleta Y Pago)',
        shortName: 'IERIC',
        slug: 'ieric',
        type: 'empresa',
        description: 'Pago y boleta de IERIC.'
    },
    {
        name: 'Inscripcion AFIP',
        shortName: 'AFIP Inscripcion',
        slug: 'afip-inscripcion',
        type: 'empresa',
        description: 'Inscripción en la AFIP.'
    },
    {
        name: 'Inscripcion Anual IERIC',
        shortName: 'IERIC Inscripcion',
        slug: 'ieric-inscripcion',
        type: 'empresa',
        description: 'Inscripción anual en IERIC.'
    },
    {
        name: 'Matricula Habilitante Tec Seg E Hig',
        shortName: 'Matr SeH',
        slug: 'matr-seh',
        type: 'empleado',
        description: 'Matrícula habilitante técnica en seguridad e higiene.'
    },
    {
        name: 'Pago Fondo Cese Laboral',
        shortName: 'Fondo cese laboral',
        slug: 'fondo-cese-laboral',
        type: 'empleado',
        description: 'Pago del fondo de cese laboral.'
    },
    {
        name: 'Pago Matricula',
        shortName: 'Matr ShE pago',
        slug: 'matr-she-pago',
        type: 'empleado',
        description: 'Pago de matrícula en seguridad e higiene.'
    },
    {
        name: 'Poliza De Accidentes Del Trabajo',
        shortName: 'Poliza',
        slug: 'poliza',
        type: 'empresa',
        description: 'Póliza de accidentes laborales.'
    },
    {
        name: 'Poliza Seguro De Vida Obligatorio',
        shortName: 'Poliza SVO',
        slug: 'poliza-svo',
        type: 'empresa',
        description: 'Seguro de vida obligatorio.'
    },
    {
        name: 'Programa De Seg E Hig Aprobado ART',
        shortName: 'Programa Seg',
        slug: 'programa-seg',
        type: 'empresa',
        description: 'Programa de seguridad e higiene aprobado por ART.'
    },
    {
        name: 'Recibos De Haberes',
        shortName: 'Recibo',
        slug: 'recibo',
        type: 'empleado',
        description: 'Comprobantes de recibos de haberes.'
    },
    {
        name: 'UOCRA (Presentacion, Boleta Y Pago)',
        shortName: 'UOCRA',
        slug: 'uocra',
        type: 'empresa',
        description: 'Boleta, presentación y pago en UOCRA.'
    }
];
