"use server";

import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";
import { createNewRecord, getProjectNamesByIds } from "..";
import { RecordObject, RecordType } from "@prisma/client";
import { auth } from "@/auth.config";

export async function updateUserProjectsPermissions(field: string, userId: string, value: string | string[]) {

    // Authenticate user
    const session = await auth();

    try {
        const updateData: Record<string, any> = {};

        if (field === "projects") {
            if (Array.isArray(value)) {
                // Sanitize the array value to remove undefined or invalid IDs
                const sanitizedProjectIds = value.filter((projectId) => projectId !== undefined);

                // Set projects using sanitized array
                updateData.projects = {
                    set: sanitizedProjectIds.map((projectId) => ({ id: projectId })), // Disconnect all existing and set new associations
                };
            } else {
                // If it's not an array (single value), handle it as a single project
                updateData.projects = {
                    set: [{ id: value }] // Set a single project association
                };
            }
        } else if (field === "permissions" && Array.isArray(value)) {
            // Directly update permissions as an array
            updateData.permissions = value;
        } else {
            // For other fields, assign value directly
            updateData[field] = value;
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        if (field === 'projects' || field === 'permissions') {
            const recordType = field === "projects" ? RecordType.TRANSFERRED : RecordType.PERMISSION_CHANGED;
            const recordObject = updatedUser.role === "WORKER" ? RecordObject.WORKER : RecordObject.USER;
            // Initialize details variable
            let details: string;

            if (field === "projects") {
                // If field is projects, get project names by IDs
                const projectCodes = await getProjectNamesByIds(value);
                details = projectCodes.join(' '); // Join the project names with spaces
            } else {
                // For other fields like 'permissions', just join the values
                details = Array.isArray(value) ? value.join(' ') : value;
            }

            // Create the new record
            await createNewRecord({
                type: recordType,
                recordObject: recordObject,
                recordTargetId: updatedUser.legajo,
                recordTargetName: updatedUser.name + " " + updatedUser.lastName,
                userId: session?.user.id ?? '',
                details: details
            });
        }


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
