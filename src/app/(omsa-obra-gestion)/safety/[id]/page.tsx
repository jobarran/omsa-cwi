import { getRecordsByObject, getUserByLegajo } from "@/actions";
import { getSafetyById } from "@/actions/safety/get-safety-by-id";
import { auth } from "@/auth.config";
import { AdminProfileComponent, WorkerProfileComponent } from "@/components";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}


export default async function SafetyByIdPage({ params }: Props) {

    const session = await auth();

    // Check if the user is an ADMIN
    if (session?.user.role !== 'ADMIN') {
        redirect('/');
    }

    const { id } = params;

    const record = await getSafetyById(id)

    if (record === null) {
        redirect('/safety')
    }

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <p>{record.id}</p>
        </div>
    );
}   
