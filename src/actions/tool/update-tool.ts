"use server";

import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";
import { createNewRecord } from "../record/create-new-record";
import { RecordObject, RecordType } from "@prisma/client";
import { auth } from "@/auth.config";
import { getProjectNamesByIds } from "..";

export async function updateTool(field: string, toolId: string, value: string | string[] | Date) {

  const session = await auth();

  // Ensure the session is valid and contains a user ID
  if (!session?.user?.id) {
    return {
      ok: false,
      message: 'User is not authenticated',
    };
  }

  try {

    const validFields = [
      "code",
      "name",
      "brand",
      "description",
      "state",
      "quantity",
      "projectId",
      "category",
      "boughtAt"
    ];

    if (!validFields.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }

    // Handle array input for category field (many-to-many relation)
    if (field === "category" && Array.isArray(value)) {
      const updatedTool = await prisma.tool.update({
        where: { id: toolId },
        data: {
          categories: {
            set: [], // First clear the existing categories
            connect: value.map((categoryId) => ({ id: categoryId })) // Then connect the new categories
          }
        },
      });

      revalidatePath("/tools");

      return updatedTool;
    }

    // Handle single value for other fields
    const fieldValue = Array.isArray(value) ? value[0] : value;

    const updatedTool = await prisma.tool.update({
      where: { id: toolId },
      data: { [field]: fieldValue },
    });

    // Define the recordType based on the field
    const recordType =
      field === "projectId"
        ? RecordType.TRANSFERRED
        : field === "state"
          ? RecordType.STATE_CHANGED
          : RecordType.UPDATED;

    // Set `details` based on whether the field is `projectId`
    let details: string;

    if (field === "projectId") {
      if (typeof value === "string" || Array.isArray(value)) {
        const projectCodes = await getProjectNamesByIds(
          Array.isArray(value) ? value : [value]
        );
        details = projectCodes.join(" ");
      } else {
        throw new Error("Invalid value for projectId. Expected string or string[].");
      }
    } else if (field === "state") {
      details = updatedTool.state
    } else {
      details = field;
    }

    await createNewRecord({
      type: recordType,
      recordObject: RecordObject.TOOL,
      recordTargetId: updatedTool.code,
      recordTargetName: updatedTool.name + " " + updatedTool.brand,
      userId: session.user.id,
      details: details

    });

    revalidatePath("/tools");
    revalidatePath(`/tools/${toolId}`);


    return updatedTool;
  } catch (error) {
    console.error("Error updating tool:", error);
    throw new Error("Failed to update tool. Please check the input and try again.");
  }
}
