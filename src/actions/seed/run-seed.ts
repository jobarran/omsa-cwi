'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { initialData } from '@/seed/seed';

export const runSeed = async () => {

    const session = await auth();

    if (session?.user?.email !== 'jbarrandeguy@obrasmetalicas.com.ar') {
        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    console.log('Starting cascading delete of all data...');

    try {
        // Delete SafetyRecordFiles first
        await prisma.safetyRecordFile.deleteMany({});
        console.log('Deleted all SafetyRecordFiles.');

        // Delete SafetyRecords
        await prisma.safetyRecord.deleteMany({});
        console.log('Deleted all SafetyRecords.');

        // Delete Safeties
        await prisma.safety.deleteMany({});
        console.log('Deleted all Safeties.');

        // Delete Comments
        await prisma.comment.deleteMany({});
        console.log('Deleted all Comments.');

        // Delete ToolImages
        await prisma.toolImage.deleteMany({});
        console.log('Deleted all ToolImages.');

        // Delete Tools
        await prisma.tool.deleteMany({});
        console.log('Deleted all Tools.');

        // Delete ProjectImages
        await prisma.projectImage.deleteMany({});
        console.log('Deleted all ProjectImages.');

        // Delete WorkerSkills
        await prisma.workerSkill.deleteMany({});
        console.log('Deleted all WorkerSkills.');

        // Delete UserImages
        await prisma.userImage.deleteMany({});
        console.log('Deleted all UserImages.');

        // Delete Records
        await prisma.record.deleteMany({});
        console.log('Deleted all Records.');

        // Delete Users
        await prisma.user.deleteMany({});
        console.log('Deleted all Users.');

        // Delete Projects
        await prisma.project.deleteMany({});
        console.log('Deleted all Projects.');

        // Delete Categories
        await prisma.category.deleteMany({});
        console.log('Deleted all Categories.');

        console.log('All data deleted successfully!');

        // Insert users
        const { users } = initialData;
        await prisma.user.createMany({
            data: users,
        });

        console.log('main user created');


    } catch (error) {
        console.error('Error deleting data:', error);
    } finally {
        await prisma.$disconnect();
    }
};


// (() => {
//     if (process.env.NODE_ENV === 'production') return;
//     runSeed();
// })();


