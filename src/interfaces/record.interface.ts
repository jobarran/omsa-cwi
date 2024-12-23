import { RecordObject, RecordType } from "@prisma/client";

export interface Record {
    id: string;
    type: RecordType;
    recordObject: RecordObject; // Changed from recordObject
    recordTargetId: string;
    recordTargetName: string;
    details: string | null;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        lastName: string;
        role: string;
    } | null; // Nullable user
}
