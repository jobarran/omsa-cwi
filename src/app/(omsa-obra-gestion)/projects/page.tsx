import { getUserPermissions, getUsersByRole } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { auth } from "@/auth.config";
import { ProjectTableComponent } from "@/components";
import { leanUsers } from "@/utils";
import { UserRole } from "@prisma/client";


export default async function ProjectPage() {

    const projects = await getAllProjects();

    const roles: UserRole[] = [UserRole.PROJECT_MANAGER];
    const managerUsers = await getUsersByRole(roles)

    const session = await auth();

    let userPermissions = null;

    if (session) {
        userPermissions = await getUserPermissions(session.user.id);
    }

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <ProjectTableComponent
                projects={projects}
                managerUsers={leanUsers(managerUsers)}
                userPermissions={userPermissions}
            />
        </div>
    );
}
