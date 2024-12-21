import { getAllProjects } from "@/actions/project/get-all-projects";
import { RegisterToolForm } from "./ui/RegisterToolForm";
import { SectionTitle } from "@/components";
import { getToolCategories } from "@/actions";

export default async function NewToolPage() {

    const projects = await getAllProjects();
    const categories = await getToolCategories()

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Agregar equipo"} />
            <RegisterToolForm projects={projects} categories={categories ?? []} />
        </div>
    );
}   
