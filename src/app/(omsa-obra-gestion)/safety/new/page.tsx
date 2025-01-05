import { getAllProjectsIdName, getAllUsersSafety } from "@/actions";
import { RegisterSafetyForm } from "./ui/RegisterSafetyForm";
import { getAllUsers } from "@/actions/user/get-all-users";

export default async function NewUserPage() {

    const users = await getAllUsersSafety()
    const projects = await getAllProjectsIdName()
    

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <RegisterSafetyForm users={users} projects={projects}/>
        </div>
    );
}   
