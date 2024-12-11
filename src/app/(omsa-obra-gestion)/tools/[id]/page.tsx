import { getToolById } from "@/actions";
import { SectionTitle, ToolsProfileComponent } from "@/components";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}


export default async function ToolByIdPage({ params }: Props) {

    const { id } = params;
    const tool = await getToolById(id)

    if (tool === null) {
        redirect('/tools')
    }
    
    return (
        <div className="flex flex-col items-center justify-between space-y-4">
            <ToolsProfileComponent tool={tool} />
        </div>
    );
}   
