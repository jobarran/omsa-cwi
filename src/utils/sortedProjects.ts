import { ProjectData } from "@/interfaces/project.interface";
import { ProjectStatus } from "@prisma/client";

export const sortProjects = (projects: ProjectData[]): ProjectData[] => {
    return projects.sort((a, b) => {
        // First, sort by status priority: PLANNING -> IN_PROGRESS -> COMPLETED
        const statusOrder = {
            [ProjectStatus.PLANNING]: 0,
            [ProjectStatus.IN_PROGRESS]: 1,
            [ProjectStatus.COMPLETED]: 2,
        };

        // Compare statuses first
        const statusComparison = statusOrder[a.status] - statusOrder[b.status];
        if (statusComparison !== 0) {
            return statusComparison;
        }

        // If statuses are the same, sort by code (convert to number before comparing)
        return Number(b.code) - Number(a.code);
    });
};
