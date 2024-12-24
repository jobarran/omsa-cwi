import { getRecordsByObject, getUserByLegajo } from "@/actions";
import { auth } from "@/auth.config";
import { AdminProfileComponent, WorkerProfileComponent } from "@/components";
import { redirect } from "next/navigation";

interface Props {
    params: {
        legajo: string;
    };
}


export default async function WorkerByLegajoPage({ params }: Props) {

    const session = await auth();

    // Check if the user is an ADMIN
    if (session?.user.role !== 'ADMIN') {
        redirect('/');
    }

    const { legajo } = params;
    const user = await getUserByLegajo(legajo)

    if (user === null) {
        redirect('/workers')
    }

    const records = await getRecordsByObject(user.legajo)

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <WorkerProfileComponent user={user} records={records} />
        </div>
    );
}   
