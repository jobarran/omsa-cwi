import { ToolState } from "@prisma/client";

// Translations object
export const toolStateTranslations: Record<string, string> = {
    [ToolState.ACTIVE]: "Activo",        // Translation for ACTIVE
    [ToolState.ON_REPAIR]: "Mantenimiento", // Translation for ON_REPAIR
    [ToolState.INACTIVE]: "Inactivo",    // Translation for INACTIVE
};

// Function to get translation
export const getToolStateTranslation = (state: string | null): string => {

    if (state) {
        return toolStateTranslations[state] || ""; // Return translation or empty string
    }
    return ""
}


// Translations object
const fieldTranslations: Record<string, string> = {
    code: "Código",
    name: "Nombre",
    brand: "Marca",
    description: "Descripción",
    state: "Estado",
    quantity: "Cantidad",
    projectId: "ID del proyecto",
    category: "Categoría",
    boughtAt: "Fecha de compra",
};

// Function to get translation
export const getFieldTranslation = (field: string | null): string => {
    return field ? fieldTranslations[field] || "" : ""; // Return translation or empty string
}
