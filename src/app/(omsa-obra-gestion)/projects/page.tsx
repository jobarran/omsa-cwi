import { getUserPermissions } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllUsers } from "@/actions/user/get-all-users";
import { auth } from "@/auth.config";
import { ProjectTableComponent, SectionTitle } from "@/components";
import { leanUsers } from "@/utils";


export default async function ProjectPage() {

    const projects = await getAllProjects();
    const users = await getAllUsers()
    const session = await auth();

    let userPermissions = null; 
    
    if (session) {
        userPermissions = await getUserPermissions(session.user.id);
    }

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Obras"} />
            <ProjectTableComponent
                projects={projects}
                users={leanUsers(users)}
                userPermissions={userPermissions}
            />
        </div>
    );
}
