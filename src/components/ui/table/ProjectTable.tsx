"use client";

import { ProjectTableHeader, ProjectTableModal, ProjectTableRow } from "@/components";
import { User, UserSmallData } from "@/interfaces";
import { ProjectData } from "@/interfaces/project.interface";
import { sortProjects } from "@/utils";
import { useState } from "react";

interface Props {
    projects: ProjectData[];
    managerUsers: UserSmallData[]
    isProjectAdmin: boolean;
}

export const ProjectTable = ({ projects, managerUsers, isProjectAdmin }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);


    const sortedProjects = sortProjects(projects)

    const openModal = (project: ProjectData, field: string) => {
        setSelectedProject(project);
        setFieldToEdit(field);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setFieldToEdit(null);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-gray-500">
                <ProjectTableHeader />
                <tbody>
                    {sortedProjects.length > 0 ? (
                        sortedProjects.map((project) => (
                            <ProjectTableRow
                                key={project.id}
                                project={project}
                                openModal={openModal}
                                isProjectAdmin={isProjectAdmin}
                            />
                        ))

                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-gray-700">
                                Sin resultados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {isModalOpen && selectedProject && fieldToEdit && isProjectAdmin && (
                <ProjectTableModal
                    project={selectedProject}
                    field={fieldToEdit}
                    closeModal={closeModal}
                    managerUsers={managerUsers}
                />
            )}
        </div>
    );
};
