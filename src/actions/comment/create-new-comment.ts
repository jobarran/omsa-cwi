'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface NewCommentProps {
    content: string;
    rating: number | null;
    toolId: string;
}

export const createNewComment = async ({ content, rating, toolId }: NewCommentProps) => {
    try {
        // Validate inputs
        if (!content.trim() || !toolId) {
            throw new Error("Content and Tool ID are required.");
        }

        // Authenticate user
        const session = await auth();
        if (!session || !session.user) {
            throw new Error("You must be logged in to post a comment.");
        }

        const userId = session.user.id;

        // Create new comment in the database
        await prisma.comment.create({
            data: {
                content: content.trim(),
                rating,
                toolId,
                userId,
            },
        });

        // Revalidate the page to show the new comment
        revalidatePath(`/tools/${toolId}`);
    } catch (error) {
        console.error("Error creating new comment:", error);
        throw new Error("Failed to create a new comment. Please try again.");
    }
};
