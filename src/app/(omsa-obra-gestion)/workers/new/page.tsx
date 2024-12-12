import { SectionTitle } from "@/components";
import { RegisterWorkerForm } from "./ui/RegisterWorkerForm";

export default async function NewWorkerPage() {

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Agregar Operario"} />
            <RegisterWorkerForm/>
        </div>
    );
}   
