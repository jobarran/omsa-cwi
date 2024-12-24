'use server';

import { Record } from '@/interfaces/record.interface';
import prisma from '@/lib/prisma';

export const getRecordsByObject = async ( code: string): Promise<Record[]> => {
    try {

        const records = await prisma.record.findMany({
            where: { recordTargetId: code },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });


        return records

    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};
