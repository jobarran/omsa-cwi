import { User } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserByLegajo = async (legajo: string): Promise<User | null> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                legajo: legajo,
            },
            include: {
                image: true, // Include related user images
                workerSkill: true, // Include related worker skills
                projects: {
                    select: {
                        code: true
                    }
                },
                receivedComments: {
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

        return user as User; // Explicitly cast the result to User
        ;

    } catch (error) {
        console.error("Error fetching tools: ", error);
        return null;
    }
};
