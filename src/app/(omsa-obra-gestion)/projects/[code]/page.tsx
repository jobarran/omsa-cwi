import { getUserByLegajo } from "@/actions";
import { getProjectByCode } from "@/actions/project/get-project-by-code";
import { auth } from "@/auth.config";
import { AdminProfileComponent, WorkerProfileComponent } from "@/components";
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

    const project = await getProjectByCode(code)

    if (project === null) {
        redirect('/projects')
    }

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            {project.name}
            {/* <WorkerProfileComponent user={user} /> */}
        </div>
    );
}   
