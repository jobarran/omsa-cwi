'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth.config';

// Zod schema for SafetyRecordInput
const createSafetyRecordInputSchema = z.object({
    safetyId: z.string(),
    userId: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    expirationDate: z.string().optional(),
    documentationLink: z.string().optional(),
    projectId: z.string().min(1, 'Project ID is required'),
    company: z.string().min(1, 'Company is required'),
});



// Server action to register the safety record
export const registerNewSafetyRecord = async (formData: FormData) => {

    // Authentication check
    const session = await auth();
    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'User is not authenticated',
        };
    }

    // Convert FormData to an object
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);

    // Validate incoming data using Zod schema
    const userParsed = createSafetyRecordInputSchema.safeParse(data);
    if (!userParsed.success) {
        console.error('Validation failed: ', userParsed.error.format());
        return { ok: false, message: 'Validation failed', errors: userParsed.error.format() };
    }

    try {
        const { safetyId, userId, company, name, expirationDate, documentationLink } = userParsed.data;

        const finalExpirationDate = expirationDate === '' || expirationDate === undefined ? null : normalizeDate(expirationDate);

        const safety = await prisma.safety.findFirst({
            where: { id: safetyId },
            select: { id: true, project: { select: { code: true } } },
        });

        if (!safety) {
            throw new Error(`No safety record found for safetyId: ${safetyId}`);
        }

        // If userId is provided, validate if user belongs to the correct company
        if (userId) {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, company: true },
            });

            if (!user) {
                throw new Error(`No user found with userId: ${userId}`);
            }

            if (user.company !== company) {
                throw new Error(`User with userId: ${userId} is not associated with the provided company.`);
            }
        }

        // Create a Safety Record and link it to the SafetyRecordFile and the safety
        const safetyRecord = await prisma.safetyRecord.create({
            data: {
                name,
                user: userId ? { connect: { id: userId } } : undefined,
                safety: { connect: { id: safety.id } },
            },
        });

        // Create a related safety record file
        const safetyRecordFile = await prisma.safetyRecordFile.create({
            data: {
                expirationDate: finalExpirationDate,
                documentationLink,
                safetyRecord: { connect: { id: safetyRecord.id } },
            },
        });

        // Trigger revalidation after the record has been created
        revalidatePath('/safety');
        revalidatePath(`/safety/${safety.project?.code}`);

        return { ok: true, safetyRecord };

    } catch (error) {
        console.error('Error creating Safety Record:', error);
        return { ok: false, message: 'There was an error creating the safety record.' };
    }
};

// Normalize date format
const normalizeDate = (date: string): string => {
    const normalizedDate = date.replace(/\s\(.+\)$/, ''); // remove extra info like timezone
    const isoDate = new Date(normalizedDate).toISOString();

    if (isNaN(new Date(isoDate).getTime())) {
        throw new Error('Invalid date format');
    }

    return isoDate;
};
