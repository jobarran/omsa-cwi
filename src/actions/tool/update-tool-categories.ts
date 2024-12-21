"use server";

import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";

export async function updateToolCategories(field: string, userId: string, value: string | string[]) {
    try {
        const updateData: Record<string, any> = {};

        if (field === "projects" && Array.isArray(value)) {
            // Sanitize the value to remove undefined or invalid IDs
            const sanitizedProjectIds = value.filter((projectId) => projectId !== undefined);

            updateData.projects = {
                set: sanitizedProjectIds.map((projectId) => ({ id: projectId })), // Disconnect all existing and set new associations
            };
        } else if (field === "permissions" && Array.isArray(value)) {
            // Directly update permissions as an array
            updateData.permissions = value;
        } else {
            // For other fields, assign value directly
            updateData[field] = value;
        }

        // Update the user in the database
        await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        // Optionally, revalidate the page
        revalidatePath("/admin"); // Replace with your desired page path
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error updating user:", error.message);
            throw new Error("Error updating user: " + error.message);
        } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
        }
    }
}
