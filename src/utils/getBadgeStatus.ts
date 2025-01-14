import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { differenceInDays } from "date-fns";

interface Props {
    projectSafety: ProjectSafetyTable;
    company: string;
    type: string;
}

export const getBadgeStatus = ({ projectSafety, company, type }: Props): "apto" | "apto-c" | "apto-w" | "no-apto" | "n-a" => {
    // Parse the field into company and type
    if (!company || !type) return "n-a"; // Malformed field

    const safetyEntry = projectSafety.safety.find((entry) => entry.company === company);

    if (!safetyEntry) return "n-a"; // No entry for the specified company

    // Helper function to get the most recent expiration date
    const getMostRecentExpirationDate = (record: {
        id: string;
        name: string;
        user: { name: string; lastName: string; legajo: string } | null;
        required: boolean;
        safetyRecordFiles: { documentationLink: string | null; expirationDate: Date | null }[];
    }) => {
        // Filter out null expirationDate and find the most recent one
        const validExpirationDates = record.safetyRecordFiles
            .filter((file) => file.expirationDate !== null)
            .map((file) => new Date(file.expirationDate!));

        if (validExpirationDates.length === 0) return null;

        return new Date(Math.max(...validExpirationDates.map((date) => date.getTime()))); // Get the most recent date
    };

    // Check type-specific logic
    if (type === "empleados") {
        // Check if 'user' exists in 'safetyEntry.safetyRecords' and has necessary properties
        const hasUser = safetyEntry.safetyRecords.some((record) => record.user && record.user.name && record.user.lastName);
        if (!hasUser) return "n-a"; // Employees must have user details

        if (safetyEntry.safetyRecords && safetyEntry.safetyRecords.length > 0) {
            const now = new Date();

            const status = safetyEntry.safetyRecords.map((record) => {
                const expirationDate = getMostRecentExpirationDate(record);
                if (!expirationDate) return "n-a";

                const daysDifference = differenceInDays(expirationDate, now);

                if (daysDifference < 0) return "no-apto"; // Expired
                if (daysDifference >= 0 && daysDifference <= 7) return "apto-w"; // Within 7 days
                if (daysDifference > 7 && daysDifference <= 14) return "apto-c"; // Between 8 and 14 days
                if (daysDifference > 14) return "apto"; // More than 14 days

                return "n-a"; // Default fallback
            });

            return status.includes("no-apto") ? "no-apto" : status.sort()[0]; // Return the most critical status
        }

        return "n-a"; // No safety records for employees
    }

    if (type === "empresa") {
        // Logic for companies, ignore user details
        if (safetyEntry.safetyRecords && safetyEntry.safetyRecords.length > 0) {
            const now = new Date();

            const status = safetyEntry.safetyRecords.map((record) => {
                const expirationDate = getMostRecentExpirationDate(record);
                if (!expirationDate) return "n-a";

                const daysDifference = differenceInDays(expirationDate, now);

                if (daysDifference < 0) return "no-apto"; // Expired
                if (daysDifference >= 0 && daysDifference <= 7) return "apto-c"; // Within 7 days
                if (daysDifference > 7 && daysDifference <= 14) return "apto-w"; // Between 8 and 14 days
                if (daysDifference > 14) return "apto"; // More than 14 days

                return "n-a"; // Default fallback
            });

            return status.includes("no-apto") ? "no-apto" : status.sort()[0]; // Return the most critical status
        }

        return "n-a"; // No safety records for companies
    }

    return "n-a"; // Default fallback
};
