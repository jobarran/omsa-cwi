import { User, UserRoleData } from "@/interfaces";
import { TableImage } from "./TableImage";
import { FaEdit } from "react-icons/fa"; // Replaced icon
import Link from "next/link";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { UserRole, UserStatus } from "@prisma/client";
import { roleTranslations } from "@/utils";

interface Props {
    user: User;
    openModal: (user: User, field: string) => void;
    userRoleData: UserRoleData;
}

export const AdminTableRow = ({ user, openModal, userRoleData }: Props) => {

    // Check if the current user is the same as the userRoleData and if role is 'ADMIN'
    const isAdminAndSameUser = userRoleData.userId === user.id && userRoleData.userRole === "ADMIN";

    return (
        <tr
            className={`border-b hover:bg-gray-50 
        ${user.status === UserStatus.INACTIVE ? "bg-white opacity-50 text-gray-400" : ""}
        ${user.role !== UserRole.WORKER ? "bg-sky-50" : ""}`}
        >
            <td className="px-4 py-2 text-center">
                <TableImage
                    src={user.image[0]?.url}
                    alt={user.name}
                    className="w-16 h-16 rounded-full mx-auto"
                    width={0}
                    height={0}
                />
            </td>
            <td className="px-4 py-2 text-center">{user.legajo}</td>
            <td className="px-4 py-2 text-center whitespace-nowrap">{user.lastName}, {user.name}</td>
            <td className="px-4 py-2 text-center">
                <div className="flex items-center justify-center">
                    {roleTranslations[user.role]}
                    {!isAdminAndSameUser && (
                        <FaArrowRightArrowLeft
                            className="inline-block ml-2 text-sky-600 cursor-pointer"
                            onClick={() => openModal(user, "role")}
                        />
                    )}
                </div>
            </td>
            <td className="px-4 py-2 text-center">
                {user.projects && user.projects.length > 0 ? (
                    user.projects.map((project: { name: string; code: string }, index: number) => (
                        <span
                            key={index}
                            className="inline-block bg-sky-100 text-sky-800 px-2 py-1 text-xs rounded-lg m-1"
                        >
                            {project.code}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400">Sin obras</span>
                )}
                <FaArrowRightArrowLeft
                    className="inline-block ml-2 text-sky-600 cursor-pointer"
                    onClick={() => openModal(user, "projects")}
                />
            </td>
            <td className="px-4 py-2 text-center">
                {user.permissions && user.permissions.length > 0 ? (
                    user.permissions.map((permission, index) => (
                        <span
                            key={index}
                            className="inline-block bg-teal-100 text-teal-800 px-1 py-1 text-xs rounded-lg m-1"
                        >
                            {permission}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400">Sin permisos</span>
                )}
                <FaArrowRightArrowLeft
                    className="inline-block ml-2 text-sky-600 cursor-pointer"
                    onClick={() => openModal(user, "permissions")}
                />
            </td>
            <td className="px-4 py-4 text-center w-16">
                <Link
                    href={`admin/${user.legajo}`}
                    className="text-sky-600 hover:text-sky-800"
                    title="Editar"
                >
                    <FaEdit className="h-5 w-5 mx-auto" />
                </Link>
            </td>
        </tr>
    );
};
