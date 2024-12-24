import { getRecordsByObject, getToolByCode, getToolCategories } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { ToolsProfileComponent } from "@/components";
import { redirect } from "next/navigation";

interface Props {
    params: {
        code: string;
    };
}


export default async function ToolByIdPage({ params }: Props) {

    const { code } = params;
    console.log(code)
    const tool = await getToolByCode(code)
    const projects = await getAllProjects()
    const toolCategories = await getToolCategories()

    if (tool === null) {
        redirect('/tools')
    }

    const records = await getRecordsByObject(tool?.code)

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <ToolsProfileComponent tool={tool} projects={projects} categories={toolCategories} records={records} />
        </div>
    );
}   
