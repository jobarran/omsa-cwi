"use client";

import { AdminTableHeader, AdminTableModal, AdminTableRow } from "@/components";
import { User, UserRoleData } from "@/interfaces";
import { ProjectData } from "@/interfaces/project.interface";
import { UserRole, UserStatus } from "@prisma/client";
import { useState } from "react";

interface Props {
    users: User[];
    projects: ProjectData[];
    userRoleData: UserRoleData;
}

export const AdminTable = ({ users, projects, userRoleData }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);


    const openModal = (user: User, field: string) => {
        setSelectedUser(user);
        setFieldToEdit(field);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setFieldToEdit(null);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-gray-500">
                <AdminTableHeader />
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <AdminTableRow
                                key={user.id}
                                user={user}
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

            {isModalOpen && selectedUser && fieldToEdit && (
                <AdminTableModal
                    user={selectedUser}
                    field={fieldToEdit}
                    projects={projects}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};
