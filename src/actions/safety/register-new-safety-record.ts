'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";
import { SafetyRecordInput } from '@/interfaces/safety.interface';

interface CreateMultipleSafetyRecordsInput {
    safetyId: string;
    records: SafetyRecordInput[];
}

export async function createSafetyRecords({
    records,
    safetyId
}: CreateMultipleSafetyRecordsInput) {
    try {
        // Loop through each record in the array and create it
        const createdRecords = await Promise.all(
            records.map(async ({ name, required, expirationDate, documentationLink }) => {

                const normalizedExpirationDate = normalizeDate(expirationDate);

                const safety = await prisma.safety.findFirst({
                    where: { id: safetyId },
                });

                if (!safety) {
                    throw new Error("Failed to create or retrieve Safety record.");
                }

                // Create a Safety Record with the required safetyId
                const safetyRecord = await prisma.safetyRecord.create({
                    data: {
                        name,
                        required,
                        expirationDate: normalizedExpirationDate,
                        documentationLink,
                        safety: { 
                            connect: { id: safetyId }
                        }
                    }
                });

                return safetyRecord;
            })
        );

        revalidatePath('/safety');

        return createdRecords;
    } catch (error) {
        console.error('Error creating Safety Records:', error);
        throw new Error('There was an error creating the safety records.');
    }
}

const normalizeDate = (date: string): string => {
    const normalizedDate = date.replace(/\s\(.+\)$/, ''); // remove extra info like timezone
    const isoDate = new Date(normalizedDate).toISOString();

    if (isNaN(new Date(isoDate).getTime())) {
        throw new Error('Invalid date format');
    }

    return isoDate;
};