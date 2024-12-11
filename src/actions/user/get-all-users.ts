'use server';

import { User } from '@/interfaces/user.interface';
import prisma from '@/lib/prisma';

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        legajo: true,
        company: true,
        name: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        image: { select: { url: true } },
        projects: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        permissions: true,
        status: true,
        workerSkill: true
      },
      orderBy: {
        status: 'desc', // Active users first, assuming 'ACTIVE' is a higher priority than 'INACTIVE'
      },
    });

    return users;  // Return the users directly from Prisma
    
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users');
  }
}
