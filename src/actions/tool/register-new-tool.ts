'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const toolSchema = z.object({
    code: z.string().min(1, "Code is required"),
    name: z.string().min(1, "Name is required"),
    brand: z.string().optional(),
    description: z.string().optional(),
    state: z.enum(["ACTIVE", "INACTIVE", "ON_REPAIR"]).default("ACTIVE"),
    quantity: z.number().int().positive("Quantity must be a positive integer").default(1),
    projectId: z.string().min(1, "Project ID is required"),
    boughtAt: z
        .string()
        .refine((date) => !isNaN(new Date(date).getTime()), {
            message: "Invalid date format for 'boughtAt'",
        })
        .optional(),
    category: z.string().optional(), // Optional category ID
});

export const registerNewTool = async (formData: FormData) => {
    const session = await auth();

    // Ensure the session is valid and contains a user ID
    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    const userId = session.user.id;
    const userRole = session.user.role;

    // Use a Record type to ensure types are correctly asserted
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

    const toolParsed = toolSchema.safeParse({
        code: data.code,
        name: data.name,
        brand: data.brand,
        description: data.description,
        photo: data.photo,
        state: data.state,
        quantity: Number(data.quantity),
        projectId: data.projectId,
        boughtAt: data.boughtAt as string | undefined,
        category: data.category as string | undefined, // Optional category ID
    });

    if (!toolParsed.success) {
        console.error("Validation failed: ", toolParsed.error.format());
        return { ok: false, message: 'Validation failed', errors: toolParsed.error.format() };
    }

    if (userRole !== "PROJECT_MANAGER" && userRole !== "ADMIN") {
        return {
            ok: false,
            message: 'You have no permission to register new tools',
        };
    }

    try {
        // Check if the tool already exists
        const existingTool = await prisma.tool.findUnique({
            where: { code: toolParsed.data.code },
        });

        if (existingTool) {
            return {
                ok: false,
                message: 'This tool is already registered',
            };
        }

        // Remove the category field from the data before creating the tool
        const { category, ...toolDataWithoutCategory } = toolParsed.data;

        let categoryConnectData: { id: string }[] = [];
        if (category) {
            const categoryExists = await prisma.category.findUnique({
                where: { id: category },
            });

            if (!categoryExists) {
                return {
                    ok: false,
                    message: 'Category not found',
                };
            }

            categoryConnectData = [{ id: category }];
        }

        const newTool = await prisma.tool.create({
            data: {
                ...toolDataWithoutCategory,
                boughtAt: toolDataWithoutCategory.boughtAt ? new Date(toolDataWithoutCategory.boughtAt) : undefined,
                userId,
                categories: categoryConnectData.length > 0 ? { connect: categoryConnectData } : undefined,
            },
        });

        // Process for uploading and saving images
        const toolImage = await uploadLogo(formData.get('image') as File);

        console.log(formData.get('image')); // Make sure 'image' is not null

        if (toolImage) {
            await prisma.toolImage.create({
                data: {
                    url: toolImage,
                    toolId: newTool.id,
                }
            });
        } else {
            console.warn('No image uploaded. Tool created without image.');
        }

        revalidatePath('/tool');

        return {
            ok: true,
            tool: newTool,
            message: toolImage
                ? 'Tool created with image.'
                : 'Tool created without image. Image was not provided.',
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Cannot create Tool',
        };
    }
};

const uploadLogo = async (image: File) => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
        return result.secure_url;

    } catch (error) {
        console.error(error);
        return null;
    }
};
