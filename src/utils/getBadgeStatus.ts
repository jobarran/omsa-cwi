import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { SafetyRecords } from "@/types";
import { Company } from "@prisma/client";
import { differenceInDays } from "date-fns";

interface Props {
    projectSafety: ProjectSafetyTable;
    company: string;
    type: string;
    users: { legajo: string; name: string; lastName: string; id: string; company: Company }[] | [];
}

export const getBadgeStatus = ({
    projectSafety,
    company,
    type,
    users,
}: Props): "apto" | "apto-w" | "no-apto" | "n-a" => {
    if (!company || !type) return "n-a";

    // Find the safety entry for the given company
    const safetyEntry = projectSafety.safety.find((entry) => entry.company === company);
    if (!safetyEntry) return "n-a";

    const requiredRecords = safetyEntry.requireRecords || [];
    const now = new Date();

    // Helper: Get the most recent expiration date from safetyRecordFiles
    const getMostRecentExpirationDate = (record: {
        safetyRecordFiles: { expirationDate: Date | null }[];
    }) => {
        const validDates = record.safetyRecordFiles
            .filter((file) => file.expirationDate)
            .map((file) => new Date(file.expirationDate!))
            .filter((date) => !isNaN(date.getTime()));
        return validDates.length > 0 ? new Date(Math.max(...validDates.map((date) => date.getTime()))) : null;
    };

    // Filter users belonging to the provided company
    const companyUsers = users.filter((user) => user.company === company);

    if (type === "empleado") {
        // Filter required records of type "empleado"
        const requiredEmployeeRecords = requiredRecords.filter((record) => {
            const recordInfo = SafetyRecords.find((safety) => safety.shortName === record);
            return recordInfo?.type === "empleado";
        });

        // If no required records or no users in the company, return "apto"
        if (requiredEmployeeRecords.length === 0 || companyUsers.length === 0) return "apto";

        // Ensure all users in the company have the required records
        const hasAllRequired = companyUsers.every((user) =>
            requiredEmployeeRecords.every((requiredRecord) =>
                safetyEntry.safetyRecords.some(
                    (record) => record.name === requiredRecord && record.user?.legajo === user.legajo
                )
            )
        );

        if (!hasAllRequired) return "no-apto";

        // Evaluate the statuses for users in the company
        const employeeStatuses = safetyEntry.safetyRecords
            .filter((record) => record.user && companyUsers.some((user) => user.legajo === record.user?.legajo))
            .map((record) => {
                const expirationDate = getMostRecentExpirationDate(record);
                if (!expirationDate) return "n-a";

                const daysDiff = differenceInDays(expirationDate, now);
                if (daysDiff <= 0) return "no-apto";
                if (daysDiff <= 7) return "apto-w";
                return "apto";
            });

        if (employeeStatuses.includes("no-apto")) return "no-apto";
        if (employeeStatuses.includes("apto-w")) return "apto-w";
        return "apto";
    }

    if (type === "empresa") {
        // Filter required records of type "empresa"
        const requiredCompanyRecords = requiredRecords.filter((record) => {
            const recordInfo = SafetyRecords.find((safety) => safety.shortName === record);
            return recordInfo?.type === "empresa";
        });

        // If no required records, return "apto"
        if (requiredCompanyRecords.length === 0) return "apto";

        // Ensure the company has all the required records
        const hasAllRequired = requiredCompanyRecords.every((requiredRecord) =>
            safetyEntry.safetyRecords.some((record) => record.name === requiredRecord)
        );

        if (!hasAllRequired) return "no-apto";

        // Evaluate the statuses for company safety records
        const companyStatuses = safetyEntry.safetyRecords
            .filter((record) => !record.user)
            .map((record) => {
                const expirationDate = getMostRecentExpirationDate(record);
                if (!expirationDate) return "n-a";

                const daysDiff = differenceInDays(expirationDate, now);
                if (daysDiff <= 0) return "no-apto";
                if (daysDiff <= 7) return "apto-w";
                return "apto";
            });

        if (companyStatuses.includes("no-apto")) return "no-apto";
        if (companyStatuses.includes("apto-w")) return "apto-w";
        return "apto";
    }

    return "n-a"; // Fallback for unknown types
};
