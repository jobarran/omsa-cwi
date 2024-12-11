import { getAllProjects } from "@/actions/project/get-all-projects";
import { getAllUsers } from "@/actions/user/get-all-users";
import { SectionTitle, WorkersTableComponent } from "@/components";

export default async function WorkersPage() {

    const projects = await getAllProjects();
    const users = await getAllUsers()
    const workers = users.filter(user => user.role === "WORKER");

    return (

        <div className="flex flex-col items-center justify-between space-y-4">

            <SectionTitle label={"Recursos"} />
            <WorkersTableComponent
                workers={workers}
                projects={projects}
            />

        </div>

    );
}