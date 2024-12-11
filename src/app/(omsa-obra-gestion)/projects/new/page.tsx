import { SectionTitle } from "@/components";
import { RegisterProjectForm } from "./ui/RegisterProjectForm";
import { getAllUsers } from "@/actions/user/get-all-users";

export default async function NewUserPage() {

    const users = await getAllUsers()

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Agregar Obra"} />
            <RegisterProjectForm users={users}/>
        </div>
    );
}   
