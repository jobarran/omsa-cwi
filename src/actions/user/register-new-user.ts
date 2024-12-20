'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcryptjs from 'bcryptjs';

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    legajo: z.string().min(1, "Legajo is required"),
    company: z.enum(["CWI", "OMSA"], {
        errorMap: () => ({ message: "Invalid company" }),
    }),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password is required and must be at least 6 characters"),
    phone: z.string().min(1, "Phone is required"),
    role: z.enum(["ADMIN", "PROJECT_MANAGER", "WORKER"], {
        errorMap: () => ({ message: "Invalid role" }),
    }),
    category: z.enum(["N_A", "AYUDANTE", "MEDIO_OFICIAL", "OFICIAL", "OFICIAL_ESPECIALIZADO", "CAPATAZ"], {
        errorMap: () => ({ message: "Invalid category" }),
    }),
});

export const registerNewUser = async (formData: FormData) => {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    const userId = session.user.id;
    const userRole = session.user.role;

    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

    // Safely extract fields from FormData
    const email = typeof data.email === "string" ? data.email.toLowerCase() : null;
    const password = typeof data.password === "string" ? bcryptjs.hashSync(data.password, 10) : null;

    if (!email || !password) {
        return { ok: false, message: 'Invalid email or password provided' };
    }

    const userParsed = userSchema.safeParse({
        name: data.name,
        lastName: data.lastName,
        legajo: data.legajo,
        company: data.company,
        email,
        password,
        phone: data.phone,
        role: data.role,
        category: data.category
    });

    if (!userParsed.success) {
        console.error("Validation failed: ", userParsed.error.format());
        return { ok: false, message: 'Validation failed', errors: userParsed.error.format() };
    }

    if (userRole !== "ADMIN") {
        return {
            ok: false,
            message: 'You have no permission to register new user',
        };
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: userParsed.data.email },
                    { legajo: userParsed.data.legajo },
                ],
            },
        });

        if (existingUser) {
            return {
                ok: false,
                message: 'A user with this email or legajo already exists',
            };
        }

        const newUser = await prisma.user.create({
            data: {
                ...userParsed.data,
                status: "ACTIVE",
            },
        });

        const userImage = await uploadLogo(formData.get('image') as File);

        if (userImage) {
            await prisma.userImage.create({
                data: {
                    url: userImage,
                    userId: newUser.id,
                }
            });
        } else {
            console.warn('No image uploaded. User created without image.');
        }

        revalidatePath('/users');

        return {
            ok: true,
            user: newUser,
            message: userImage
                ? 'User created with image.'
                : 'User created without image. Image was not provided.',
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Cannot create user',
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
