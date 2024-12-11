"use server";

import { ProjectData, ProjectStatus } from "@/interfaces/project.interface";
import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";

export const updateProject = async (field: string, projectId: string, value: string | string[], project: ProjectData) => {
    try {
        const updateData: Record<string, any> = {};

        if (field === "projectUser") {
            if (typeof value === "string") {
                updateData.users = {
                    connect: { id: value },
                };
            } else if (Array.isArray(value)) {
                const userIdsToConnect = value.filter((userId) => !project.users.some(user => user.id === userId));
                const userIdsToDisconnect = project.users.filter((user) => !value.includes(user.id));

                updateData.users = {
                    connect: userIdsToConnect.map((userId) => ({ id: userId })),
                    disconnect: userIdsToDisconnect.map((user) => ({ id: user.id })),
                };
            }
        }

        // Handle status update
        if (field === "status") {
            updateData.status = value; // Directly assign the status value
        }

        // Update the project in the database
        await prisma.project.update({
            where: { id: projectId },
            data: updateData,
        });

        // Optionally, revalidate the page
        revalidatePath("/projects"); // Replace with your desired page path
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error updating project:", error.message);
            throw new Error("Error updating project: " + error.message);
        } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
        }
    }
};
