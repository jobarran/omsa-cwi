import { getAllProjects } from "@/actions/project/get-all-projects";
import { SectionTitle } from "@/components";
import { RegisterUserForm } from "./ui/RegisterUserForm";

export default async function NewUserPage() {

    const projects = await getAllProjects();

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Agregar Usuario"} />
            <RegisterUserForm/>
        </div>
    );
}   
