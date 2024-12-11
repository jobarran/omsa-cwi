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
            },
        });

        return user as User; // Explicitly cast the result to User
        ;

    } catch (error) {
        console.error("Error fetching tools: ", error);
        return null;
    }
};
