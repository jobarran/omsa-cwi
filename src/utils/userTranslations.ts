// Translations object
const userFieldTranslations: Record<string, string> = {
    legajo: "Legajo",
    company: "Empresa",
    name: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    password: "Contraseña",
    status: "Estado",
    category: "Categoría",
};

// Function to get translation
export const getUserFieldTranslation = (field: string | null): string => {
    return field ? userFieldTranslations[field] || "" : ""; // Return translation or empty string
}

// Function to get translation
export const getUserStatusTranslation = (status: string | null): string => {
    if (status === 'ACTIVE') {
        return 'Acivo'
    } else if (status === "INACTIVE") {
        return 'Inactivo'
    }
    return ""
}

const userCategoryTranslations: Record<string, string> = {
    N_A: 'No aplica',
    AYUDANTE: 'Ayudante',
    MEDIO_OFICIAL: 'Medio Oficial',
    OFICIAL: 'Oficial',
    OFICIAL_ESPECIALIZADO: 'Of Especializado',
    CAPATAZ: 'Capataz'
};

// Function to get translation
export const getUserCategoryTranslation = (field: string | null): string => {
    return field ? userCategoryTranslations[field] || "" : ""; // Return translation or empty string
}