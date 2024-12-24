'use server';

import bcryptjs from 'bcryptjs';
import prisma from "@/lib/prisma"; // Your Prisma client instance
import { revalidatePath } from "next/cache";
import { auth } from '@/auth.config';
import { RecordObject, RecordType } from '@prisma/client';
import { createNewRecord } from '..';
import { getUserCategoryTranslation, getUserFieldTranslation } from '@/utils';

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

    // Define the recordType based on the field
    const recordType =
      field === "status"
        ? RecordType.STATE_CHANGED
        : RecordType.UPDATED;

    const recordObject = updatedUser.role === "WORKER" ? RecordObject.WORKER : RecordObject.USER;

    // Set `details` based on whether the field is `projectId`
    let details: string;

    if (field === "status") {
      details = updatedUser.status
    } else if (field === "category") {
      details = `cambio de categoría a ${getUserCategoryTranslation(updatedUser.category)}`
    } else {
      details = `campo ${getUserFieldTranslation(field)}`;
    }

    await createNewRecord({
      type: recordType,
      recordObject: recordObject,
      recordTargetId: updatedUser.legajo,
      recordTargetName: updatedUser.name + " " + updatedUser.lastName,
      userId: session.user.id,
      details: details
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
