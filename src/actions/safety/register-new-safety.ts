'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const toolSchema = z.object({
    company: z.enum(["OMSA", "CWI"]).default("CWI"),
    projectId: z.string().optional(),
    userId: z.string().optional()
});

// Create or update the safety record
export async function createSafety(formData: FormData) {

    const session = await auth();

    // Ensure the session is valid and contains a user ID
    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    const userId = session.user.id;
    const userRole = session.user.role;

    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

    const safetyParsed = toolSchema.safeParse({
        company: data.company,
        projectId: data.projectId,
        userId: data.userId,
    });

    if (!safetyParsed.success) {
        console.error("Validation failed: ", safetyParsed.error.format());
        return { ok: false, message: 'Validation failed', errors: safetyParsed.error.format() };
    }

    if (userRole !== "PROJECT_MANAGER" && userRole !== "ADMIN") {
        return {
            ok: false,
            message: 'You have no permission to register new tools',
        };
    }

    try {
        const { ...safetyData } = safetyParsed.data;

        // Ensure either userId or companyId is provided
        if (!safetyData.userId && !safetyData.projectId) {
            throw new Error("Either userId or companyId must be provided.");
        }

        let safety;

        // Handle logic for userId
        if (safetyData.userId) {
            // Check if the user exists
            const user = await prisma.user.findUnique({
                where: { id: safetyData.userId },
            });

            if (!user) {
                throw new Error(`User with ID ${safetyData.userId} does not exist.`);
            }

            // Check for an existing safety record associated with the user
            safety = await prisma.safety.findFirst({
                where: { userId: safetyData.userId },
            });
        }

        // Handle logic for companyId
        if (data.projectId) {
            // Check if the project (company) exists
            const project = await prisma.project.findUnique({
                where: { id: safetyData.projectId },
            });

            if (!project) {
                throw new Error(`Project with ID ${data.projectId} does not exist.`);
            }

            // Check for an existing safety record associated with the company (project)
            safety = await prisma.safety.findFirst({
                where: { projectId: safetyData.projectId, company: safetyData.company },
            });
        }

        // If no existing safety record, create a new one
        if (!safety) {
            if (safetyData.projectId) {
                // Create a safety record for the project (company)
                safety = await prisma.safety.create({
                    data: {
                        projectId: safetyData.projectId, // Link to the company (project)
                        company: safetyData.company,
                    },
                });
            } else if (safetyData.userId) {
                // Create a safety record for the user
                safety = await prisma.safety.create({
                    data: {
                        userId: safetyData.userId,
                        company: safetyData.company,
                    },
                });
            }
        }

        // Ensure safety record creation or retrieval
        if (!safety) {
            throw new Error("Failed to create or retrieve Safety record.");
        }

        // Revalidate the safety page to reflect the changes
        revalidatePath('/safety');

        // Return success message and the safety record
        return {
            ok: true,
            message: 'Safety record successfully created or updated.',
            safety, // Return the safety record here
        };
    } catch (error) {
        console.error('Error creating or updating safety record:', error);
        return {
            ok: false,
            message: 'An error occurred while creating or updating the safety record.',
        };
    }
}
