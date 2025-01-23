import { ProjectSafetyTable } from "@/interfaces/safety.interface";

export const leanSafeties = (safeties: ProjectSafetyTable[] | ProjectSafetyTable) => {
    // Ensure the input is always an array
    const safetyArray = Array.isArray(safeties) ? safeties : [safeties];

    return safetyArray.map((safety) => {
        const processedSafety = safety.safety.map((safetyItem) => {
            const filteredSafetyRecords = safetyItem.safetyRecords.filter((record) => {
                

                // If the user is null, include the record
                if (!record.user) {
                    return true;
                }

                // If the user exists, check if their projects match the safetyItem's projectId
                if (record.user.projects) {

                    return record.user.projects.some(
                        (project) => project.code === safety.code
                    );
                }

                // Exclude the record by default if conditions above are not met
                return false;
            });

            // Process the filtered safety records
            const processedSafetyRecords = filteredSafetyRecords.map((record) => {
                const { safetyRecordFiles } = record;

                if (safetyRecordFiles.length === 0) {
                    return { ...record, safetyRecordFiles: [] };
                }

                // Find the most relevant file
                const mostRelevantFile = safetyRecordFiles.reduce((latest, current) => {
                    const latestDate = latest.expirationDate
                        ? new Date(latest.expirationDate).getTime()
                        : -Infinity;
                    const currentDate = current.expirationDate
                        ? new Date(current.expirationDate).getTime()
                        : -Infinity;

                    // If the current file expires later or expired more recently, pick it
                    return currentDate > latestDate ? current : latest;
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
