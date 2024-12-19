import { UserPermission } from "@prisma/client";

export const permissionTranslations: Record<UserPermission, string> = {
    TOTAL: "Total",
    TOOL_ADMIN: "Herramientas Admin",
    TOOL_VIEW: "Herramientas Vista",
    PEOPLE_ADMIN: "Operarios Admin",
    PEOPLE_VIEW: "Operarios Vista",
    PROJECT_ADMIN: "Obras Admin",
    PROJECT_VIEW: "Obras Vista",
};