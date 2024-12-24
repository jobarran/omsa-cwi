'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { RecordObject, RecordType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createNewRecord } from "../record/create-new-record";

interface NewCommentProps {
    content: string;
    rating: number | null;
    workerLegajo: string;
}

export const createNewWorkerComment = async ({ content, rating, workerLegajo }: NewCommentProps) => {
    try {
        // Validate inputs
        if (!content.trim() || !workerLegajo) {
            throw new Error("Content and Tool ID are required.");
        }

        // Authenticate user
        const session = await auth();
        if (!session || !session.user) {
            throw new Error("You must be logged in to post a comment.");
        }

        const userId = session.user.id;

        const user = await prisma.user.findUnique({
            where: { legajo: workerLegajo },
            select: { name: true, lastName: true, id: true },
        });

        if (!user) {
            throw new Error("Worker not found.");
        }

        const newComment = await prisma.comment.create({
            data: {
                content: content.trim(),
                rating,
                userId,
                commentedUserId: user.id,

            },
        });

        await createNewRecord({
            type: RecordType.COMMENT_ADDED,
            recordObject: RecordObject.WORKER,
            recordTargetId: workerLegajo,
            recordTargetName: user.name + " " + user.lastName,
            userId,
        });

        // Revalidate the page to show the new comment
        revalidatePath(`/workers/${workerLegajo}`);
    } catch (error) {
        console.error("Error creating new comment:", error);
        throw new Error("Failed to create a new comment. Please try again.");
    }
};
