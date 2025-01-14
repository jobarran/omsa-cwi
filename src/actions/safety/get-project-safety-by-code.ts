import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import prisma from "@/lib/prisma";
import { Company } from "@prisma/client";

export const getOrCreateProjectSafetyByCode = async (projectCode: string): Promise<ProjectSafetyTable | null> => {
    try {
        // Fetch the project by code with safety records
        let project = await prisma.project.findFirst({
            where: { code: projectCode },
            select: {
                id: true,
                name: true,
                code: true,
                status: true,
                users: { select: { legajo: true, name: true, lastName: true, id: true, company: true } },
                safety: {
                    select: {
                        id: true,
                        company: true,
                        projectId: true,
                        requireRecords: true,
                        safetyRecords: {
                            select: {
                                id: true,
                                name: true,
                                user: { select: { name: true, lastName: true, legajo: true } },
                                safetyRecordFiles: {
                                    select: { documentationLink: true, expirationDate: true },
                                },
                            },
                        },
                    },
                },
            },
        });

        // If the project doesn't exist, return null
        if (!project) {
            console.error(`Project with code "${projectCode}" not found.`);
            return null;
        }

        // Check if safety records exist for the project
        if (project.safety.length === 0) {
            console.log(`No safety records found for project "${projectCode}". Creating new safety records.`);

            // Create two Safety records for the project
            const companies = [Company.CWI, Company.OMSA]; // Replace "OtherCompany" with the actual enum value
            await prisma.safety.createMany({
                data: companies.map((company) => ({
                    projectId: project!.id, // Project is guaranteed to be non-null here
                    company,
                    requireRecords: [], // Default empty array; adjust if needed
                })),
            });

            // Re-fetch the project to include the newly created safety records
            project = await prisma.project.findFirst({
                where: { code: projectCode },
                select: {
                    id: true,
                    name: true,
                    code: true,
                    status: true,
                    users: { select: { legajo: true, name: true, lastName: true, id: true, company: true } },
                    safety: {
                        select: {
                            id: true,
                            company: true,
                            projectId: true,
                            requireRecords: true,
                            safetyRecords: {
                                select: {
                                    id: true,
                                    name: true,
                                    user: { select: { name: true, lastName: true, legajo: true } },
                                    safetyRecordFiles: {
                                        select: { documentationLink: true, expirationDate: true },
                                    },
                                },
                            },
                        },
                    },
                },
            });
        }

        // Return the project with safety records
        return project as ProjectSafetyTable;

    } catch (error) {
        console.error("Error fetching or creating project safety records:", error);
        return null;
    }
};
