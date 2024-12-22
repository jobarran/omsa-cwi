import { User } from "@/interfaces";
import { ProjectData } from "@/interfaces/project.interface";
import prisma from "@/lib/prisma";

export const getProjectByCode = async (code: string): Promise<ProjectData | null> => {
    try {
        const project = await prisma.project.findFirst({
            where: {
                code: code,
            },
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
        });

        return project as ProjectData
        

    } catch (error) {
        console.error("Error fetching tools: ", error);
        return null;
    }
};
