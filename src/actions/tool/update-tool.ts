"use server";

import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";

export async function updateTool(field: string, toolId: string, value: string | string[]) {
  try {
    const validFields = [
      "code",
      "name",
      "brand",
      "description",
      "state",
      "quantity",
      "projectId", 
    ];
    
    if (!validFields.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }

    // Handle array input for single-value fields
    const fieldValue = Array.isArray(value) ? value[0] : value; // Use the first value from the array if necessary

    const updatedTool = await prisma.tool.update({
      where: { id: toolId },
      data: { [field]: fieldValue },
    });

    revalidatePath("/tools");

    return updatedTool;
  } catch (error) {
    console.error("Error updating tool:", error);
    throw new Error("Failed to update tool. Please check the input and try again.");
  }
}
