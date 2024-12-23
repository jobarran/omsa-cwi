"use client";

import { User } from "@/interfaces";
import { ProjectProfileEdit, TableImage } from "..";
import { ProjectData, ProjectStatus } from "@/interfaces/project.interface";

interface Props {
    project: ProjectData;
    managerUsers: User[]
}

// Map ProjectStatus enum to Spanish translations
const statusTranslations: { [key in ProjectStatus]: string } = {
    [ProjectStatus.PLANNING]: "Contratada",
    [ProjectStatus.IN_PROGRESS]: "Ejecución",
    [ProjectStatus.COMPLETED]: "Terminada",
    [ProjectStatus.MAINTENANCE]: "Mantenimiento",
};

export const ProjectProfileComponent = ({ project, managerUsers }: Props) => {
    // Filter users by roles
    const projectManagers = project.users.filter((user) => user.role === "PROJECT_MANAGER");
    const workers = project.users.filter((user) => user.role === "WORKER");

    return (
        <div className="container mx-auto px-4 py-4 bg-white rounded-lg border">
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="flex pr-4">
                    {project.image[0]?.url && (
                        <div className="hidden md:block w-72 h-72 overflow-hidden rounded-lg mr-4">
                            <TableImage
                                src={project.image[0]?.url}
                                alt={project.name}
                                className="w-full h-full object-cover"
                                width={0}
                                height={0}
                                priority // Add this property
                            />
                        </div>
                    )}
                </div>

                {/* Project Details */}
                <div className="w-full">
                    <div className="flex mb-2">
                        {/* Image Section Sm*/}
                        {project.image[0]?.url && (
                            <div className="w-20 h-20 md:hidden overflow-hidden rounded-lg mr-4">
                                <TableImage
                                    src={project.image[0]?.url}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                    width={0}
                                    height={0}
                                    priority // Add this property
                                />
                            </div>
                        )}
                        <div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-sky-800">{project.name}</h1>
                                <h2 className="text-lg text-sky-800">{project.code}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-500">

                        <p><strong>Estado:</strong> {statusTranslations[project.status]}</p>

                        <p><strong>Dirección:</strong> {project.address}</p>

                        <div className="flex items-center gap-2">
                            <strong>Jefe de Obra:</strong>
                            {projectManagers.length > 0 ? (
                                projectManagers.map((user, index) => (
                                    <p key={index}>
                                        {user.name} {user.lastName}
                                    </p>
                                ))
                            ) : (
                                <p>No tiene Jefe de Obra asignado.</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <strong>Operarios:</strong>
                            <p>{workers.length} operarios</p>
                        </div>


                    </div>
                </div>
            </div>

            {/* Menu (optional, you can add more content here) */}
            <div className="mt-6">
                <div className="flex border-b"></div>
                <ProjectProfileEdit project={project} managerUsers={managerUsers} />
                <div className="mt-4"></div>
            </div>
        </div>
    );
};
