"use server";

import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";

export async function updateSafetySingleField(
  field: string,
  safetyId: string,
  value: string | string[],
) {
  const session = await auth();

  // Ensure the session is valid and contains a user ID
  if (!session?.user?.id) {
    return {
      ok: false,
      message: "User is not authenticated",
    };
  }

  try {
    const validFields = ["requireRecords"];

    if (!validFields.includes(field)) {
      return {
        ok: false,
        message: `Invalid field: ${field}`,
      };
    }

    // Handle single value for other fields
    const fieldValue = Array.isArray(value) ? value : [value];

    const updatedSafety = await prisma.safety.update({
      where: { id: safetyId },
      data: { [field]: fieldValue },
    });

    // Revalidate paths for updates
    revalidatePath("/safety");
    revalidatePath(`/safety/${safetyId}`);

    return {
      ok: true,
      message: "Safety record updated successfully",
      data: updatedSafety, // Include updated record for reference
    };
  } catch (error) {
    // Narrowing the type of error to check for `message`
    if (error instanceof Error) {
      console.error("Error updating safety:", error.message);
      return {
        ok: false,
        message: "Failed to update safety. Please check the input and try again.",
        error: error.message,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        ok: false,
        message: "An unknown error occurred while updating safety.",
      };
    }
  }
}
