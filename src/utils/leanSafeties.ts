import { ProjectSafetyTable } from "@/interfaces/safety.interface";

export const leanSafeties = (safeties: ProjectSafetyTable[] | ProjectSafetyTable) => {
    // Ensure the input is always an array
    const safetyArray = Array.isArray(safeties) ? safeties : [safeties];

    return safetyArray.map((safety) => {
        const processedSafety = safety.safety.map((safetyItem) => {
            const processedSafetyRecords = safetyItem.safetyRecords.map((record) => {
                const { safetyRecordFiles } = record;

                if (safetyRecordFiles.length === 0) {
                    return { ...record, safetyRecordFiles: [] };
                }

                // Find the most relevant file
                const mostRelevantFile = safetyRecordFiles.reduce((latest, current) => {
                    const latestDate = latest.expirationDate ? new Date(latest.expirationDate).getTime() : -Infinity;
                    const currentDate = current.expirationDate ? new Date(current.expirationDate).getTime() : -Infinity;

                    // If current file expires later or expired more recently, pick it
                    if (currentDate > latestDate) {
                        return current;
                    }

                    return latest;
                });

                return {
                    ...record,
                    safetyRecordFiles: [mostRelevantFile],
                };
            });

            return {
                ...safetyItem,
                safetyRecords: processedSafetyRecords,
            };
        });

        return {
            ...safety,
            safety: processedSafety,
        };
    });
};
