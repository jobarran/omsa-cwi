import { getRecordsByUser, getUserByLegajo } from "@/actions";
import { auth } from "@/auth.config";
import { AdminProfileComponent } from "@/components";
import { redirect } from "next/navigation";

interface Props {
    params: {
        legajo: string;
    };
}


export default async function AdminByLegajoPage({ params }: Props) {

    const session = await auth();

    // Check if the user is an ADMIN
    if (session?.user.role !== 'ADMIN') {
        redirect('/');
    }

    const { legajo } = params;
    console.log(legajo)
    const user = await getUserByLegajo(legajo)

    if (user === null) {
        redirect('/admin')
    }

    const records = await getRecordsByUser(user.id)

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <AdminProfileComponent user={user} records={records} />
        </div>
    );
}   
