'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const registerNewCategory = async (categoryName: string) => {
    const session = await auth();

    // Ensure the session is valid and contains a user ID
    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'USER IS NOT AUTHENTICATED',
        };
    }

    const userId = session.user.id;
    const userRole = session.user.role;

    if (userRole !== "PROJECT_MANAGER" && userRole !== "ADMIN") {
        return {
            ok: false,
            message: 'YOU HAVE NO PERMISSION TO REGISTER NEW TOOLS',
        };
    }

    // Convert categoryName to uppercase before proceeding
    const upperCaseCategoryName = categoryName.toUpperCase();

    try {
        // Check if the category already exists
        const existingCategory = await prisma.category.findUnique({
            where: { name: upperCaseCategoryName },
        });

        if (existingCategory) {
            return {
                ok: false,
                message: 'THIS CATEGORY IS ALREADY REGISTERED',
            };
        }

        const newCategory = await prisma.category.create({
            data: {
                name: upperCaseCategoryName
            },
        });

        revalidatePath('/tool');

        return {
            ok: true,
            category: newCategory,
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'CANNOT CREATE CATEGORY',
        };
    }
};
