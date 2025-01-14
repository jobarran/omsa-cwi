'use server';

import { ProjectSafetyTable } from '@/interfaces/safety.interface';
import prisma from '@/lib/prisma';

export const getAllProjectSafety = async (): Promise<ProjectSafetyTable[]> => {
    try {
        const safetyRecords = await prisma.project.findMany({
            select: {
                id: true,
                name: true,
                code: true,
                status: true,
                users: { select: { legajo: true, name: true, lastName: true, id: true, company: true } },
                safety: {
                    select: {
                        id: true,
                        company: true,
                        projectId: true,
                        requireRecords: true,
                        safetyRecords: {
                            select: {
                                id: true,
                                name: true,
                                safetyRecordFiles: { select: { documentationLink: true, expirationDate: true } }
                            },
                        },
                    },
                },
            },
            orderBy: {
                code: 'desc',
            },
        });

        return safetyRecords as ProjectSafetyTable[];
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};
