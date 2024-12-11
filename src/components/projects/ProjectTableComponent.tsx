"use client";

import { AdminTable, ProjectTable } from "..";
import { ProjectData } from "@/interfaces/project.interface";
import { LinkButtonBig } from "../ui/buttons/LinkButtonBig";
import { User, UserRoleData, UserSmallData } from "@/interfaces";

interface Props {
    projects: ProjectData[];
    userRoleData: UserRoleData; 
    users: UserSmallData[]
}

export const ProjectTableComponent = ({ projects, userRoleData, users }: Props) => {

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-end gap-2 pb-2">
                <LinkButtonBig label={"Agregar Nuevo"} link={"/projects/new"} />
            </div>
            <ProjectTable
                projects={projects}
                userRoleData={userRoleData}
                users={users}
            />
        </div>
    );
};
