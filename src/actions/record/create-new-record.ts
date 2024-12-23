'use server';

import prisma from '@/lib/prisma';
import { RecordObject, RecordType } from '@prisma/client';

// Extended details for TOOL_COMMENT

interface CreateRecordInput {
    type: RecordType;
    recordObject: RecordObject;
    recordTargetId: string;
    recordTargetName: string;
    details?: string | undefined | null;
    userId: string;
}

export const createNewRecord = async ({
    type,
    recordObject,
    recordTargetId,
    recordTargetName,
    details,
    userId,
}: CreateRecordInput) => {
    try {

        // Create the record in the database
        const newRecord = await prisma.record.create({
            data: {
                type,
                recordObject,
                recordTargetId,
                recordTargetName,
                details: details ?? '',
                userId,
            },
        });

        return newRecord;
        
    } catch (error) {
        console.error('Error creating action:', error);
        throw new Error('Failed to create action');
    }
};
