import prisma from '../lib/prisma';
import { initialData } from './seed';


async function main() {

    console.log('Starting seed')

    // Clear existing data
    await prisma.user.deleteMany({});
    await prisma.project.deleteMany({});

    // Insert users
    const { users } = initialData;
    await prisma.user.createMany({
        data: users,
    });


    console.log('Seed executed successfully');

    await prisma.$disconnect();

}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();