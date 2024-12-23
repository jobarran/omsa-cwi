'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { RecordObject, RecordType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createNewRecord } from "../record/create-new-record";

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

        const tool = await prisma.tool.findUnique({
            where: { id: toolId },
            select: { name: true, code: true },
        });

        if (!tool) {
            throw new Error("Tool not found.");
        }

        const newComment = await prisma.comment.create({
            data: {
                content: content.trim(),
                rating,
                toolId,
                userId,
            },
        });

        await createNewRecord({
            type: RecordType.COMMENT_ADDED,
            recordObject: RecordObject.TOOL,
            recordTargetId: tool.code,
            recordTargetName: tool.name,
            userId,
        });

        // Revalidate the page to show the new comment
        revalidatePath(`/tool/${toolId}`);
    } catch (error) {
        console.error("Error creating new comment:", error);
        throw new Error("Failed to create a new comment. Please try again.");
    }
};
