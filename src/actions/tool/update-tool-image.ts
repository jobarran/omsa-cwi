'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

export const updateToolImage = async (formData: FormData) => {

    const session = await auth();

    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    const toolId = formData.get('toolId')?.toString();
    const imageFile = formData.get('image') as File;

    if (!toolId || !imageFile) {
        return {
            ok: false,
            message: 'toolId and image are required.',
        };
    }

    try {
        const existingImage = await prisma.toolImage.findFirst({
            where: {
                toolId,
            },
        });

        const uploadedImageUrl = await uploadLogo(imageFile);
        if (!uploadedImageUrl) {
            return {
                ok: false,
                message: 'Image upload failed.',
            };
        }

        if (existingImage) {
            // Update the existing image
            await prisma.toolImage.update({
                where: {
                    id: existingImage.id,
                },
                data: {
                    url: uploadedImageUrl,
                },
            });
        } else {
            // Create a new image entry
            await prisma.toolImage.create({
                data: {
                    url: uploadedImageUrl,
                    toolId,
                },
            });
        }

        revalidatePath('/toold');

        return {
            ok: true,
            message: existingImage
                ? 'Tool image updated successfully.'
                : 'Tool image added successfully.',
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'An error occurred while updating the tool image.',
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
        console.error('Cloudinary upload error:', error);
        return null;
    }
};
