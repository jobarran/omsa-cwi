import { Safety } from "@/interfaces/safety.interface";
import prisma from "@/lib/prisma";

export const getSafetyById = async (id: string): Promise<Safety | null> => {
    try {
        const safety = await prisma.safety.findFirst({
            where: {
                id: id,
            },
            include: {
                project: true,
                safetyRecords: true
            },
        });

        return safety as Safety;
        ;

    } catch (error) {
        console.error("Error fetching tools: ", error);
        return null;
    }
};
