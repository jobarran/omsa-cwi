import { getAllRecords } from "@/actions";
import { RecordComponent } from "@/components";

export default async function WorkersPage() {

    const records = await getAllRecords();

    return (

        <div className="flex flex-col items-center justify-between space-y-4">

            <RecordComponent records={records} />

        </div>

    );
}