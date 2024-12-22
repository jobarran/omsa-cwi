'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const projectSchema = z.object({
    code: z.string().min(1, "Code is required"),
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
});

export const registerNewProject = async (formData: FormData) => {

    console.log('iniciando guardado')

    const session = await auth();

    if (!session?.user?.id) {

        console.log('No user')

        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    const userRole = session.user.role;

    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

    const projectParsed = projectSchema.safeParse({
        code: data.code,
        name: data.name,
        address: data.address,
    });

    if (!projectParsed.success) {
        console.error("Validation failed: ", projectParsed.error.format());
        return {
            ok: false,
            message: 'Validation failed',
            errors: projectParsed.error.format(),
        };
    }

    if (userRole !== "ADMIN") {
        return {
            ok: false,
            message: 'You do not have permission to register new projects',
        };
    }

    try {
        console.log('Guardadndo')

        const existingProject = await prisma.project.findUnique({
            where: { code: projectParsed.data.code },
        });

        if (existingProject) {
            console.log('Repetido')

            return {
                ok: false,
                message: 'This project is already registered',
            };
        }

        console.log('Creando')

        const newProject = await prisma.project.create({

            data: {
                code: projectParsed.data.code,
                name: projectParsed.data.name,
                address: projectParsed.data.address,
            },
        });

        const imageFile = formData.get('image') as File | null;
        let projectImageUrl: string | null = null;

        if (imageFile) {
            projectImageUrl = await uploadLogo(imageFile);
            if (projectImageUrl) {
                await prisma.projectImage.create({
                    data: {
                        url: projectImageUrl,
                        projectId: newProject.id,
                    },
                });
            }
        }

        revalidatePath('/projects');
        console.log('ok')
        return {
            ok: true,
            project: newProject,
            message: projectImageUrl
                ? 'Project created successfully with image.'
                : 'Project created successfully without an image.',
        };

    } catch (error) {
        console.log('Error creating project:', error)
        console.error('Error creating project:', error);
        return {
            ok: false,
            message: 'An error occurred while creating the project',
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
        console.error('Error uploading image:', error);
        return null;
    }
};
