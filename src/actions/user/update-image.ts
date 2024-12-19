'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

export const updateImage = async (formData: FormData) => {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    const userId = formData.get('userId')?.toString();
    const imageFile = formData.get('image') as File;

    const userRole = session.user.role;
    if (!(userRole === "ADMIN" || session.user.id === userId)) {
        return {
            ok: false,
            message: 'You do not have permission to update images.',
        };
    }


    if (!userId || !imageFile) {
        return {
            ok: false,
            message: 'userId and image are required.',
        };
    }

    try {
        const existingImage = await prisma.userImage.findFirst({
            where: {
                userId,
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
            await prisma.userImage.update({
                where: {
                    id: existingImage.id,
                },
                data: {
                    url: uploadedImageUrl,
                },
            });
        } else {
            // Create a new image entry
            await prisma.userImage.create({
                data: {
                    url: uploadedImageUrl,
                    userId,
                },
            });
        }

        revalidatePath('/admin');
        revalidatePath("/workers");

        return {
            ok: true,
            message: existingImage
                ? 'User image updated successfully.'
                : 'User image added successfully.',
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'An error occurred while updating the user image.',
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
