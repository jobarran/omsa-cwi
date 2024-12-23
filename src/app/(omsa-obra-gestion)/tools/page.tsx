import { getToolCategories, getUserPermissions } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllTools } from "@/actions/tool/get-all-tools";
import { auth } from "@/auth.config";
import { SectionTitle, ToolsTableComponent } from "@/components";

export default async function ToolsPage() {
    
    const session = await auth();

    let userPermissions = null; 
    
    if (session) {
        userPermissions = await getUserPermissions(session.user.id);
    }

    const tools = await getAllTools();
    const projects = await getAllProjects();
    const toolCategories = await getToolCategories()


    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <ToolsTableComponent
                tools={tools}
                projects={projects}
                userPermissions={userPermissions}
                toolCategories={toolCategories}
            />
        </div>
    );
}
