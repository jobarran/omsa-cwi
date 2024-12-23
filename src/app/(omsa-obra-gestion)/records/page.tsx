import { getAllRecords } from "@/actions";
import RecordList from "@/components/record/RecordList";

export default async function WorkersPage() {

    const records = await getAllRecords();

    return (

        <div className="flex flex-col items-center justify-between space-y-4">

            <RecordList
                records={records}
            />

        </div>

    );
}