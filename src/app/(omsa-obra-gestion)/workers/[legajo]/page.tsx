import { getUserByLegajo } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
    params: {
        legajo: string;
    };
}


export default async function WorkerByLegajoPage({ params }: Props) {

    const { legajo } = params;
    const user = await getUserByLegajo(legajo)

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            {user?.name}
        </div>
    );
}   
