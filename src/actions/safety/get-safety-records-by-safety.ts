'use server';

import { SafetyRecord } from '@/interfaces/safety.interface';
import prisma from '@/lib/prisma';

export const getSafetyRecordsBySafety = async (safetyId: string): Promise<SafetyRecord[]> => {
    try {
        const safetyRecords = await prisma.safetyRecord.findMany({
            where: { safetyId },
            include: {
                safety: true,
            },
            orderBy: {
                name: 'desc',
            },
        });

        return safetyRecords as SafetyRecord[];
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};
