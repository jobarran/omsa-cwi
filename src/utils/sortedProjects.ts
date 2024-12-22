import { ProjectData } from "@/interfaces/project.interface";

export const sortProjects = (projects: ProjectData[]): ProjectData[] => {
    return projects.sort((a, b) => Number(b.code) - Number(a.code));
};
