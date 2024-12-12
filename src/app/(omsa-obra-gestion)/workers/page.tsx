import { getUsersByRole } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllUsers } from "@/actions/user/get-all-users";
import { SectionTitle, WorkersTableComponent } from "@/components";
import { UserRole } from "@prisma/client";

export default async function WorkersPage() {

    const projects = await getAllProjects();

    const roles: UserRole[] = [UserRole.WORKER];
    const workerUsers = await getUsersByRole(roles)

    return (

        <div className="flex flex-col items-center justify-between space-y-4">

            <SectionTitle label={"Recursos"} />
            <WorkersTableComponent
                workers={workerUsers}
                projects={projects}
            />

        </div>

    );
}