import { getUserPermissions, getUsersByRole } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { auth } from "@/auth.config";
import { WorkersTableComponent } from "@/components";
import { UserRole } from "@prisma/client";

export default async function WorkersPage() {

    const session = await auth();

    let userPermissions = null;

    if (session) {
        userPermissions = await getUserPermissions(session.user.id);
    }

    const projects = await getAllProjects();

    const roles: UserRole[] = [UserRole.WORKER];
    const workerUsers = await getUsersByRole(roles)

    return (

        <div className="flex flex-col items-center justify-between space-y-4">

            <WorkersTableComponent
                workers={workerUsers}
                projects={projects}
                userPermissions={userPermissions}
            />

        </div>

    );
}