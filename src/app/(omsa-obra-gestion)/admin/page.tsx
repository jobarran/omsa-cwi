import { getUsersByRole } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllUsers } from "@/actions/user/get-all-users";
import { auth } from "@/auth.config";
import { AdminTableComponent, SectionTitle } from "@/components";
import { UserRoleData } from "@/interfaces";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";


export default async function AdminPage() {
    const projects = await getAllProjects();
    const session = await auth();

    const roles: UserRole[] = [UserRole.ADMIN, UserRole.PROJECT_MANAGER];
    const adminUsers = await getUsersByRole(roles)

    // Check if the user is an ADMIN
    if (session?.user.role !== 'ADMIN') {
        redirect('/');
    }

    // Create a user.id + user.role object
    const userRoleData: UserRoleData = {
        userId: session?.user.id,
        userRole: session?.user.role
    };

    // Pass both userRoleData and session.user to AdminTableComponent
    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Administrar Usuarios"} />
            <AdminTableComponent
                users={adminUsers}
                projects={projects}
                userRoleData={userRoleData}  
            />
        </div>
    );
}
