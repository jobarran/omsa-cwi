'use server';

import { Record } from '@/interfaces/record.interface';
import prisma from '@/lib/prisma';

export const getAllRecords = async (): Promise<Record[]> => {
    try {
        
        const records = await prisma.record.findMany({
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
