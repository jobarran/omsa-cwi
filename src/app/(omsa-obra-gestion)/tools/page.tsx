import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllTools } from "@/actions/tool/get-all-tools";
import { InputSearch, SectionTitle, ToolsTableComponent } from "@/components";

export default async function ToolsPage() {

    const tools = await getAllTools()
    const projects = await getAllProjects();

    return (
        <div className="flex flex-col items-center justify-between space-y-4">

            <SectionTitle label={"Herramientas"} />
            <ToolsTableComponent
                tools={tools}
                projects={projects}
            />

        </div>
    );
}