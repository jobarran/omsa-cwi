import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllUsers } from "@/actions/user/get-all-users";
import { auth } from "@/auth.config";
import { ProjectTableComponent, SectionTitle } from "@/components";
import { UserRoleData } from "@/interfaces";
import { leanUsers } from "@/utils";


export default async function ProjectPage() {
    const projects = await getAllProjects();
    const users = await getAllUsers()
    const session = await auth();

    // Create a user.id + user.role object
        const userRoleData: UserRoleData = {
            userId: session?.user.id,
            userRole: session?.user.role
        };
 
    // Pass both userRoleData and session.user to AdminTableComponent
    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Administrar Obras"} />
            <ProjectTableComponent
                projects={projects}
                userRoleData={userRoleData}
                users={leanUsers(users)}
            />
        </div>
    );
}
