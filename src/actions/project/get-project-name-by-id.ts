import { ProjectData } from "@/interfaces/project.interface";
import prisma from "@/lib/prisma";

export const getProjectNamesByIds = async (ids: string | string[]): Promise<string[]> => {
    try {
        // Ensure ids is always an array
        const idsArray = Array.isArray(ids) ? ids : [ids];

        const projects = await prisma.project.findMany({
            where: {
                id: {
                    in: idsArray,  // Using `in` to fetch all projects with IDs in the array
                },
            },
            select: {
                code: true, // Select the `code` (name) of each project
            },
        });

        // Return an array of project codes (names)
        return projects.map(project => project.code);
    } catch (error) {
        console.error("Error fetching project names: ", error);
        return [];
    }
};
