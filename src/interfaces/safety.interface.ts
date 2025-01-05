import { Company, Company as PrismaCompany, Project, ProjectStatus, User, UserStatus } from "@prisma/client";

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

export interface SafetyTable {
    id: string;
    company: string;
    projectId: string;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
    safetyRecords: SafetyRecord[];
    project: {
        name: string;
        code: string;
        status: ProjectStatus
    };
    user: {
        name: string;
        lastName: string;
        legajo: string;
        status: UserStatus
    };
}

