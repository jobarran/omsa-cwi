'use server';

import { ProjectData, ProjectStatus } from '@/interfaces/project.interface';
import prisma from '@/lib/prisma';
import { initialData } from '@/seed/seed';

export const runSeed = async () => {
    
    console.log('Starting seed')

    // Clear existing data
    // await prisma.safetyRecordFile.deleteMany({});
    await prisma.safetyRecord.deleteMany({});
    await prisma.safety.deleteMany({});

    // // Insert users
    // const { users } = initialData;
    // await prisma.user.createMany({
    //     data: users,
    // });

    console.log('Seed executed successfully');

    await prisma.$disconnect();

}

// (() => {
//     if (process.env.NODE_ENV === 'production') return;
//     runSeed();
// })();


