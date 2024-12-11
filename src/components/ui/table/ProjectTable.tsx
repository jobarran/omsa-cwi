"use client";

import { AdminTableModal, ProjectTableHeader, ProjectTableModal, ProjectTableRow } from "@/components";
import { User, UserRoleData, UserSmallData } from "@/interfaces";
import { ProjectData } from "@/interfaces/project.interface";
import { sortProjects } from "@/utils";
import { ProjectStatus, UserStatus } from "@prisma/client";
import { useState } from "react";

interface Props {
    projects: ProjectData[];
    userRoleData: UserRoleData;
    users: UserSmallData[]
}

export const ProjectTable = ({ projects, userRoleData, users }: Props) => {

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
                                userRoleData={userRoleData}
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

            {isModalOpen && selectedProject && fieldToEdit && (
                <ProjectTableModal
                    project={selectedProject}
                    field={fieldToEdit}
                    closeModal={closeModal}
                    users={users}
                />
            )}
        </div>
    );
};
