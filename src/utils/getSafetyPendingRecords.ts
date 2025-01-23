import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { SafetyRecords } from "@/types";
import { Company } from "@prisma/client";

export interface MissingEmpresaRecordsResult {
    companyName: Company; // Ensure this matches the expected type
    missingEmpresaRecords: string[];
}

export interface MissingEmpleadoRecordsResult {
    companyName: Company; // Ensure this matches the expected type
    missingEmpleadoRecords: {
        userName: string;
        userLastName: string;
        userId: string;
        missingRecord: string;
    }[];
}

export interface SafetyPendingRecordsResult {
    companyName: Company; // Match type here
    projectCode: string; // Added project code
    missingEmpresaRecords: string[];
    missingEmpleadoRecords: {
        userName: string;
        userLastName: string;
        userId: string;
        missingRecord: string;
    }[];
}

export const getSafetyPendingRecords = (
    projectSafetyTable: ProjectSafetyTable | ProjectSafetyTable[]
): {
    results: SafetyPendingRecordsResult[];
    hasPendingRecord: boolean;
    safetyPendingRecordsLength: number;
} => {
    // Normalize to an array
    const projectTables = Array.isArray(projectSafetyTable)
        ? projectSafetyTable
        : [projectSafetyTable];

    const results = projectTables.flatMap((project) => {
        const users = project.users || []; // Ensure users is always an array

        return project.safety
            .map((safety) => {
                const { company, requireRecords, safetyRecords } = safety;

                if (!company || !requireRecords || !safetyRecords) {
                    // Skip invalid entries
                    return null;
                }

                // Extract slugs of existing safety records
                const existingRecordSlugs = safetyRecords.map((record) => record.name);

                // Find missing "empresa" records
                const missingEmpresaRecords =
                    requireRecords
                        ?.filter((record) => !existingRecordSlugs.includes(record))
                        .filter((missingRecordSlug) => {
                            const safetyRecord = SafetyRecords.find(
                                (record) => record.shortName === missingRecordSlug
                            );
                            return safetyRecord?.type === "empresa";
                        }) || [];


                // Filter users based on company
                const filteredUsers = users.filter(
                    (user) => user.company === company
                );

                // Find missing "empleado" records for each user
                const missingEmpleadoRecords = filteredUsers.flatMap((user) => {
                    const existingEmpleadoRecords = safetyRecords.filter(
                        (record) => record.user?.legajo === user.legajo
                    );

                    const missingEmpleadoRecordSlugs = requireRecords
                        ?.filter((record) => !existingEmpleadoRecords.some((rec) => rec.name === record))
                        .filter((missingRecordSlug) => {
                            const safetyRecord = SafetyRecords.find(
                                (record) => record.shortName === missingRecordSlug
                            );
                            return safetyRecord?.type === "empleado";
                        }) || [];

                    return missingEmpleadoRecordSlugs.map((slug) => {
                        const record = SafetyRecords.find((r) => r.shortName === slug);
                        return {
                            userName: user.name || "Unknown",
                            userLastName: user.lastName || "Unknown",
                            userId: user.id || "Unknown",
                            missingRecord: record?.shortName || slug,
                        };
                    });
                });

                return {
                    companyName: company,
                    projectCode: project.code || "Unknown",
                    missingEmpresaRecords,
                    missingEmpleadoRecords,
                };
            })
            .filter((result): result is SafetyPendingRecordsResult => result !== null); // Type guard
    });

    // Determine if there are any pending records
    const hasPendingRecord = results.some(
        (result) =>
            result.missingEmpresaRecords.length > 0 || result.missingEmpleadoRecords.length > 0
    );

    // Calculate the total pending records length
    const safetyPendingRecordsLength = results.reduce(
        (total, result) =>
            total + result.missingEmpresaRecords.length + result.missingEmpleadoRecords.length,
        0
    );

    return { results, hasPendingRecord, safetyPendingRecordsLength };
};
