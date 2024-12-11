import { UserRole } from "@prisma/client";

export const roleTranslations: Record<UserRole, string> = {
    ADMIN: "Admin",
    PROJECT_MANAGER: "Jefe de Obra",
    WORKER: "Operario",
};