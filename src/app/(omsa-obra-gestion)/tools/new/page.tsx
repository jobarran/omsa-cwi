import { getAllProjects } from "@/actions/project/get-all-projects";
import { RegisterToolForm } from "./ui/RegisterToolForm";
import { getAllToolsNamesAndBrands, getToolCategories } from "@/actions";

export default async function NewToolPage() {

    const projects = await getAllProjects();
    const categories = await getToolCategories()
    const toolsNameAndBrand = await getAllToolsNamesAndBrands()


    return (
        <div className="flex flex-col items-center justify-between">
            <RegisterToolForm projects={projects} categories={categories ?? []} toolsNameAndBrand={toolsNameAndBrand} />
        </div>
    );
}   
