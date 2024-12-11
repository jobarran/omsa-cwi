'use server';

import { ProjectData, ProjectStatus, ProjectImage } from '@/interfaces/project.interface';
import prisma from '@/lib/prisma';

export const getAllProjects = async (): Promise<ProjectData[]> => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        lastName: true,
                        role: true,
                    },
                },
                image: {
                    select: {
                        url: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        return projects.map((project) => ({
            id: project.id,
            name: project.name,
            address: project.address,
            image: project.image.map((image) => ({ url: image.url })),
            code: project.code,
            status: project.status as ProjectStatus,
            users: project.users.map((user) => ({ id: user.id, name: user.name, lastName: user.lastName, role: user.role })),
        }));

    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};
