"use client";

import { ProjectSummaryData, ProjectTable } from "..";
import { ProjectData } from "@/interfaces/project.interface";
import { LinkButtonBig } from "../ui/buttons/LinkButtonBig";
import { User, UserRoleData, UserSmallData } from "@/interfaces";
import { UserPermission } from "@prisma/client";
import { getPermissionBoolean } from "@/utils";

interface Props {
    projects: ProjectData[];
    managerUsers: UserSmallData[]
    userPermissions: UserPermission[] | null;
}

export const ProjectTableComponent = ({ projects, managerUsers, userPermissions }: Props) => {

    const isProjectAdmin = getPermissionBoolean(userPermissions, "ADMIN", "PROJECT")
    const isProjectView = getPermissionBoolean(userPermissions, "VIEW", "PROJECT")

    // Check if user has permissions
    if (!isProjectAdmin && !isProjectView) {
        return (
            <div className="text-center text-gray-600 mt-8">
                No tienes permisos para ver esta página.
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">

            {(isProjectAdmin) && (
                <div className="flex flex-row items-center justify-end gap-2 pb-2">
                    <LinkButtonBig label={"Agregar Nuevo"} link={"/projects/new"} />
                </div>
            )}

            {(isProjectAdmin || isProjectView) && (
                <>
                    <ProjectSummaryData projects={projects} />
                    <ProjectTable
                        projects={projects}
                        managerUsers={managerUsers}
                        isProjectAdmin={isProjectAdmin}
                    />
                </>
            )}


        </div>
    );
};
