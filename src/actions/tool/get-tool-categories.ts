"use server"

import prisma from "@/lib/prisma";
import { ToolCategory } from "@/interfaces/tool.interface";

export const getToolCategories = async (): Promise<ToolCategory[] | null> => {
    try {
        const toolCategories = await prisma.category.findMany();

        return toolCategories ?? null;

    } catch (error) {
        console.error("Error fetching toolCategories: ", error);
        return null;
    }
};
