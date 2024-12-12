'use server';

import { User } from '@/interfaces/user.interface';
import prisma from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function getUsersByRole(roles: UserRole[]): Promise<User[]> {
  try {
    // Ensure at least one role is provided
    if (!roles || roles.length === 0) {
      throw new Error('At least one role must be provided');
    }

    const users = await prisma.user.findMany({
      where: {
        role: {
          in: roles, // Filter users by multiple roles
        },
      },
      select: {
        id: true,
        legajo: true,
        company: true,
        name: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        category: true,
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
        workerSkill: true,
      },
      orderBy: {
        lastName: 'asc', // Active users first
      },
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users');
  }
}
