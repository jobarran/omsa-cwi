import { Company, Company as PrismaCompany, Project, User } from "@prisma/client";

// Safety Interface
export interface Safety {
    id: string;
    company: PrismaCompany;
    project?: Project | null;
    projectId?: string | null;
    user?: User | null;
    userId?: string | null;
    safetyRecords?: SafetyRecord[] | null;
    createdAt: Date;
    updatedAt: Date;
}

// SafetyRecord Interface
export interface SafetyRecord {
    id: string;
    name: string;
    required: boolean;
    expirationDate?: Date | null;
    safety: Safety;
    safetyId: string;
    documentationLink: string;
    createdAt: Date;
    updatedAt: Date;
}

// SafetyRecordImage Interface
export interface SafetyRecordImage {
    id: string;
    url: string;
    safetyRecord?: SafetyRecord | null;
    safetyRecordId?: string | null;
}


export interface SafetySmall {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    company: Company;
    projectId: string | null;
    userId: string | null;
}

export interface SafetyRecordInput {
    id?: string;
    name: string;
    required: boolean;
    expirationDate: string;
    documentationLink: string;
}