import { Tool } from "@/interfaces/tool.interface";
import prisma from "@/lib/prisma";

export const getToolById = async (tolId: string): Promise<Tool | null> => {
    try {
        const tool = await prisma.tool.findFirst({
            where: {
                id: tolId
            },
            include: {
                project: { select: { id: true, name: true, code: true } },
                user: { select: { id: true, name: true, lastName: true, email: true } },
                categories: { select: { id: true, name: true } },
                image: { select: { url: true } },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        rating: true,
                        createdAt: true, // Add createdAt
                        user: {
                            select: {
                                name: true, // Add user with name
                                lastName: true,
                            }
                        }
                    }
                },
            },
        });

        return tool;

    } catch (error) {
        console.error("Error fetching tools: ", error);
        return null;
    }
};
