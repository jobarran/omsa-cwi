export interface SafetyRecord {
    name: string;
    shortName: string;
    description: string;
    link: string;
}

export const SafetyRecords: SafetyRecord[] = [
    {
        name: 'Inscripción AFIP',
        shortName: 'AFIP',
        description: 'Inscripción en la Administración Federal de Ingresos Públicos.',
        link: 'https://www.afip.gob.ar/',
    },
    {
        name: 'Anexo declaración de recursos afectados',
        shortName: 'Recursos',
        description: 'Declaración de los recursos afectados según normativa.',
        link: 'https://www.afip.gob.ar/',
    },
    {
        name: 'F-931 DJ y Presentación',
        shortName: 'F931 DJ',
        description: 'Declaración jurada y presentación del formulario 931.',
        link: 'https://www.afip.gob.ar/',
    },
    {
        name: 'F-931 VEP y Pago',
        shortName: 'F931 Pago',
        description: 'Generación de VEP y pago del formulario 931.',
        link: 'https://www.afip.gob.ar/',
    },
    {
        name: 'F-931 Nómina de empleados',
        shortName: 'F931',
        description: 'Listado detallado de los empleados según formulario 931.',
        link: 'https://www.afip.gob.ar/',
    },
    {
        name: 'Póliza de accidentes de trabajo',
        shortName: 'Póliza',
        description: 'Cobertura de accidentes laborales para empleados.',
        link: '/',
    },
    {
        name: 'Certificado de cobertura ART',
        shortName: 'ART',
        description: 'Certificado de cobertura ART.',
        link: '/',
    },
    {
        name: 'Póliza seguro de vida obligatorio',
        shortName: 'Seguro Vida',
        description: 'Seguro de vida obligatorio para empleados.',
        link: 'https://www.afip.gob.ar/',
    },
    {
        name: 'Inscripción anual IERIC',
        shortName: 'IERIC Inscripción',
        description: 'Inscripción anual en el Instituto de Estadística y Registro de la Industria de la Construcción.',
        link: 'https://www.ieric.org.ar/',
    },
    {
        name: 'Boleta y pago IERIC',
        shortName: 'IERIC Pago',
        description: 'Generación y pago de la boleta del IERIC.',
        link: 'https://www.ieric.org.ar/',
    },
    {
        name: 'Boleta y pago UOCRA',
        shortName: 'UOCRA',
        description: 'Pago de la boleta de la Unión Obrera de la Construcción de la República Argentina.',
        link: 'https://www.uocra.org/',
    },
    {
        name: 'Aviso de obra',
        shortName: 'Aviso Obra',
        description: 'Notificación oficial de inicio de obra.',
        link: '/',
    },
    {
        name: 'Programa de seguridad',
        shortName: 'Seguridad',
        description: 'Programa de seguridad e higiene en el trabajo.',
        link: '/',
    },
    {
        name: 'Clausula de no repeticion',
        shortName: 'No repeticion',
        description: 'Cláusula legal que establece la no repetición de actos en situaciones contractuales.',
        link: '/',
    },
];
