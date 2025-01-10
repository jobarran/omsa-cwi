import { Company as PrismaCompany } from "@prisma/client";

interface Props {
    projectId?: string | null;
    userId?: string | null;
    company: PrismaCompany;
    name: string;
    recordName?: string | null;
}

export const generateFileName = ({ projectId, userId, name, company, recordName }: Props) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, ""); // Format as YYYYMMDD
    const origin = projectId ? "empresa" : userId ? "operario" : "unknown";
    const sanitizedName = (name || "unknown").toLowerCase().replace(/ /g, "_");
    const companyName = (company || "unknown").toLowerCase().replace(/ /g, "_");
    const sanitizedRecordName = (recordName || "unknown").toLowerCase().replace(/ /g, "_");
    return `${formattedDate}-${origin}-${sanitizedName}-${companyName}-${sanitizedRecordName}`;
};
