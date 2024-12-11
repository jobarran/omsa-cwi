import { User, UserRoleData } from "@/interfaces";
import { TableImage } from "./TableImage";
import { FaEdit } from "react-icons/fa"; // Replaced icon
import Link from "next/link";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { ProjectStatus, UserStatus } from "@prisma/client";
import { Project, ProjectData } from "@/interfaces/project.interface";

interface Props {
    project: ProjectData;
    openModal: (project: ProjectData, field: string) => void;
    userRoleData: UserRoleData;
}

// Map ProjectStatus enum to Spanish translations
const statusTranslations: { [key in ProjectStatus]: string } = {
    [ProjectStatus.PLANNING]: "No iniciado",
    [ProjectStatus.IN_PROGRESS]: "En progreso",
    [ProjectStatus.COMPLETED]: "Completado",
};

export const ProjectTableRow = ({ project, openModal, userRoleData }: Props) => {

    // Check if the current user is the same as the userRoleData and if role is 'ADMIN'
    const isAdminAndSameUser = userRoleData.userRole === "ADMIN";

    const workerCount = project.users
        ? project.users.filter((user) => user.role === "WORKER").length
        : 0;

    return (
        <tr
            className={`${project.status === ProjectStatus.COMPLETED ? "opacity-50 text-gray-400" : ""
                } bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
        >
            <td className="px-4 py-2 w-24 text-center"> {/* Adjusted column width */}
                <TableImage
                    src={project.image[0]?.url}
                    alt={project.name}
                    className="w-16 h-16 rounded-full mx-auto"
                    width={0}
                    height={0}
                />
            </td>
            <td className="px-4 py-2 text-center">{project.code}</td>
            <td className="px-4 py-2 text-center">{project.name}</td>
            <td className="px-4 py-2 text-center">
                {statusTranslations[project.status]}
                {isAdminAndSameUser &&
                    <FaArrowRightArrowLeft
                        className="inline-block ml-2 text-sky-600 cursor-pointer"
                        onClick={() => openModal(project, "status")}
                    />
                }
            </td>
            <td className="px-4 py-2 text-center">{workerCount}</td>
            <td className="px-4 py-2 text-center">
                {project.users && project.users.length > 0 ? (
                    project.users
                        .filter((user) => user.role !== "WORKER") // Exclude WORKER users
                        .map((user, index) => (
                            <span
                                key={index}
                                className="inline-block bg-teal-100 text-teal-800 px-1 py-1 text-xs rounded-lg m-1"
                            >
                                {user.name} {user.lastName}
                            </span>
                        ))
                ) : (
                    <span className="text-gray-400">N/A</span>
                )}
                {isAdminAndSameUser && (
                    <FaArrowRightArrowLeft
                        className="inline-block ml-2 text-sky-600 cursor-pointer"
                        onClick={() => openModal(project, "projectUser")}
                    />
                )}
            </td>
            {/* <td className="px-4 py-4 text-center w-16">
                <Link
                    href={`/projects/${project.id}`}
                    className="text-sky-600 hover:text-sky-800"
                    title="Editar"
                >
                    <FaEdit className="h-5 w-5 mx-auto" />
                </Link>
            </td> */}
        </tr>
    );
};
