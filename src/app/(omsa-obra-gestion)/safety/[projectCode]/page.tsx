import { getOrCreateProjectSafetyByCode } from "@/actions";
import { auth } from "@/auth.config";
import { SafetyProjectComponent } from "@/components";
import { SafetyRecords } from "@/types";
import { getSafetyPendingRecords, leanSafeties } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
    params: {
        projectCode: string;
    };
}


export default async function SafetyByIdPage({ params }: Props) {

    const session = await auth();

    if (session?.user.role !== 'ADMIN') {
        redirect('/');
    }

    const { projectCode } = params;

    const projectSafety = await getOrCreateProjectSafetyByCode(projectCode)

    if (projectSafety === null) {
        redirect('/safety')
    }

    const updateProjectSafety = leanSafeties(projectSafety)

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SafetyProjectComponent projectSafety={updateProjectSafety[0]}/>
        </div>
    );
}   
