"use server"

import { UserPermission } from "@prisma/client";
import prisma from "@/lib/prisma";

export const getUserPermissions = async (id: string): Promise<UserPermission[] | null> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
            select: {
                permissions: true,  // Select only the 'permissions' field
            },
        });

        return user?.permissions ?? null; // Return only the permissions array

    } catch (error) {
        console.error("Error fetching user permissions: ", error);
        return null;
    }
};
