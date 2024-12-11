import { Tool } from "@/interfaces/tool.interface";
import prisma from "@/lib/prisma";

export const getToolRating = async (tolId: string): Promise<number | null> => {
    try {
        // Fetch all ratings for the given toolId
        const comments = await prisma.comment.findMany({
            where: {
                toolId: tolId
            },
            select: {
                rating: true,
            }
        });

        // If no comments exist, return null
        if (comments.length === 0) return null;

        // Calculate the average rating
        const totalRating = comments.reduce((sum, comment) => sum + (comment.rating || 0), 0);
        const averageRating = totalRating / comments.length;

        return averageRating;

    } catch (error) {
        console.error("Error fetching comments: ", error);
        return null;
    }
};
