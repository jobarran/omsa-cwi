import { Company, Project, ProjectStatus } from "@prisma/client";

// Safety Interface
export interface Safety {
    id: string;
    company: Company;  // Changed PrismaCompany to Company enum
    project: Project;
    projectId: string;
    safetyRecords?: SafetyRecord[] | null;
    requireRecords?: string[] | null;
    createdAt: Date;
    updatedAt: Date;
}

// SafetyRecord Interface
export interface SafetyRecord {
    id: string;
    name: string;
    createdAt: Date;
    safetyId: string;
    userId: string | null;
    updatedAt: Date;

}

export interface SafetySmall {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    company: Company;
    requireRecords?: string[] | null;
    projectId: string | null;
    userId: string | null;
}

export interface SafetyRecordInput {
    id?: string;
    name: string;
    userId: string;
    userName: string;
    origen: string;
    expirationDate: string;
    documentationLink: string;
}

export interface SafetyTable {
    safetyRecords: SafetyRecord[];
    project: {
        name: string;
        code: string;
        status: ProjectStatus;
    };
}

export interface ProjectSafetyTable {
    id: string;
    name: string;
    code: string;
    status: ProjectStatus;
    users: { legajo: string, name: string, lastName: string, id: string, company: Company }[] | [],
    safety: {
        id: string;
        company: Company;
        projectId: string | null;
        requireRecords?: string[] | null;
        safetyRecords: {
            id: string;
            name: string;
            user: { name: string, lastName: string, legajo: string } | null;
            safetyRecordFiles: { documentationLink: string | null, expirationDate: Date | null }[];  // Correct property order
        }[];
    }[];
}


export interface SafetyList {
    safety: {
        id: string;
        company: string;
        projectId: string | null;
        requireRecords?: string[] | null;
        safetyRecords: {
            id: string;
            name: string;
            safetyRecordFiles: { documentationLink: string | null, expirationDate: Date | null }
        }[];
    }[];
}
