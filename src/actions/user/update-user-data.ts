'use server';

import bcryptjs from 'bcryptjs';
import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";
import { auth } from '@/auth.config';

// Update user data function
export async function updateUserData(field: string, userId: string, value: string | string[]) {

  const session = await auth();

  if (!session?.user?.id) {
    return {
      ok: false,
      message: 'User is not authenticated',
    };
  }

  const userRole = session.user.role;
  if (!(userRole === "ADMIN" || session.user.id === userId)) {
    return {
      ok: false,
      message: 'You do not have permission to update images.',
    };
  }

  try {
    const validFields = [
      "legajo",
      "company",
      "name",
      "lastName",
      "phone",
      "password",
      "status",
      "category",
    ];

    if (!validFields.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }

    // If the password is being updated, hash it
    let fieldValue = Array.isArray(value) ? value[0] : value;
    if (field === "password") {
      fieldValue = typeof fieldValue === "string" ? bcryptjs.hashSync(fieldValue, 10) : '';
    }


    // Update the user's record in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { [field]: fieldValue },
    });

    // Revalidate paths
    revalidatePath("/admin");
    revalidatePath("/workers");

    console.log("User updated successfully:", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user. Please check the input and try again.");
  }
}
