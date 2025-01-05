'use server';

import { ProjectData, ProjectStatus, ProjectImage, projectidName } from '@/interfaces/project.interface';
import prisma from '@/lib/prisma';

export const getAllProjectsIdName = async (): Promise<projectidName[]> => {
    try {
    
        const projects = await prisma.project.findMany({
            select: {
              id: true,
              name: true,
              safety: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  company: true,
                  projectId: true,
                  userId: true,
                },
              },
            },
            orderBy: {
              code: 'desc',
            },
          });          

        return projects

    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};
