import { getUserPermissions } from "@/actions";
import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllTools } from "@/actions/tool/get-all-tools";
import { auth } from "@/auth.config";
import { SectionTitle, ToolsTableComponent } from "@/components";

export default async function ToolsPage() {
    const session = await auth();

    let userPermissions = null;  // Initialize outside of the session block
    if (session) {
        // Await the result of getUserPermissions
        userPermissions = await getUserPermissions(session.user.id);
    }

    const tools = await getAllTools();
    const projects = await getAllProjects();

    console.log(userPermissions);  // Now you can log the userPermissions

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <SectionTitle label={"Herramientas"} />
            <ToolsTableComponent
                tools={tools}
                projects={projects}
                userPermissions={userPermissions}  // Pass userPermissions to the component
            />
        </div>
    );
}
