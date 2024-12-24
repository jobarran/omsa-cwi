import { getRecordsByObject, getRecordsByUser, getUserByLegajo } from "@/actions";
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
    const user = await getUserByLegajo(legajo);

    if (user === null) {
        redirect('/admin');
    }

    const recordsByUser = await getRecordsByUser(user.id);
    const recordsByObject = await getRecordsByObject(legajo);

    // Combine records and remove duplicates based on `record.id`
    const allRecords = [...recordsByUser, ...recordsByObject];
    const uniqueRecords = allRecords.filter(
        (record, index, self) =>
            index === self.findIndex((r) => r.id === record.id)
    );

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <AdminProfileComponent user={user} records={uniqueRecords} />
        </div>
    );
}
