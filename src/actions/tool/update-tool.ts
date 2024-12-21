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
      "category"
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

    revalidatePath("/tools");
    revalidatePath(`/tools/${toolId}`);


    return updatedTool;
  } catch (error) {
    console.error("Error updating tool:", error);
    throw new Error("Failed to update tool. Please check the input and try again.");
  }
}
