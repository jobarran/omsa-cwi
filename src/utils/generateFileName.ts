import { Company as PrismaCompany } from "@prisma/client";

interface Props {
    origin: string;
    projectCode?: string | null;
    company: PrismaCompany;
    userName: string;
    recordName?: string | null;
}

export const generateFileName = ({ origin, projectCode, userName, company, recordName }: Props) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, ""); // Format as YYYYMMDD
    const sanitizedName = (userName || "unknown").toLowerCase().replace(/ /g, "_");
    const companyName = (company || "unknown").toLowerCase().replace(/ /g, "_");
    const sanitizedRecordName = (recordName || "unknown").toLowerCase().replace(/ /g, "_");
    return `${projectCode}-${formattedDate}-${origin}-${sanitizedName}-${companyName}-${sanitizedRecordName}`;
};
