"use server";

import { ProjectData } from "@/interfaces/project.interface";
import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";
import { createNewRecord } from "..";
import { RecordObject, RecordType } from "@prisma/client";
import { auth } from "@/auth.config";

export async function updateProject(field: string, projectId: string, value: string | string[], project: ProjectData) {

  const session = await auth();

  try {
    const validFields = ["name", "status", "address", "code", "users"];

    // Validate the field
    if (!validFields.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }

    const updateData: Record<string, any> = {};

    // Handle 'users' field update
    if (field === "users") {
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

    // Handle other fields (status, name, etc.)
    else {
      updateData[field] = Array.isArray(value) ? value[0] : value;
    }

    // Update the project in the database
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    if (field === 'status' ) {
      await createNewRecord({
        type: RecordType.STATE_CHANGED,
        recordObject: RecordObject.PROJECT,
        recordTargetId: updatedProject.code,
        recordTargetName: project.name,
        userId: session?.user.id ?? '',
      });
    }

    // Revalidate paths to ensure cache is updated
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.code}`);

    // If the 'users' field was updated, revalidate related user paths
    if (field === "users") {
      console.log('revalidating users')
      revalidatePath("/projects"); // Replace with your desired page path
      revalidatePath(`/projects/${project.code}`);
    }

    return updatedProject;

  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(`Failed to update project: ${error instanceof Error ? error.message : error}`);
  }
}
