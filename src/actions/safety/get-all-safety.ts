'use server';

import { SafetyTable } from '@/interfaces/safety.interface';
import prisma from '@/lib/prisma';

export const getAllSafety = async () => {
    try {
        const safetyRecords = await prisma.safety.findMany({
            include: {
                safetyRecords: true,
                project: {
                    select: {
                        name: true,
                        code: true,
                        status: true,
                    }
                },
                user: {
                    select: {
                        name: true,
                        lastName: true,
                        legajo: true,
                        status: true,
                    }
                }
            },
            orderBy: {
                projectId: 'desc',
            },
        });

        return safetyRecords as SafetyTable[];

    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};
