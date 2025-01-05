'use server';

import { User, UserSafetyData } from '@/interfaces/user.interface';
import prisma from '@/lib/prisma';

export async function getAllUsersSafety(): Promise<UserSafetyData[]> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        legajo: true,
        company: true,
        name: true,
        lastName: true,
        safety: true,
        permissions: true,
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
