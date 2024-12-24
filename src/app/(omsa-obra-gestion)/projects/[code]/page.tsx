import { getUsersByRole } from "@/actions";
import { getProjectByCode } from "@/actions/project/get-project-by-code";
import { auth } from "@/auth.config";
import { ProjectProfileComponent } from "@/components";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
    params: {
        code: string;
    };
}


export default async function ProjectByCodePage({ params }: Props) {

    const session = await auth();

    // Check if the user is an ADMIN
    if (session?.user.role !== 'ADMIN') {
        redirect('/');
    }

    const { code } = params;

    const roles: UserRole[] = [UserRole.PROJECT_MANAGER];

    const project = await getProjectByCode(code)
    const managerUsers = await getUsersByRole(roles)
    
    if (project === null) {
        redirect('/projects')
    }

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <ProjectProfileComponent project={project} managerUsers={managerUsers} />
        </div>
    );
}   
