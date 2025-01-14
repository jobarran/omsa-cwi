import { getAllProjectSafety } from "@/actions";
import { SafetyTableComponent } from '@/components';
import { leanSafeties } from "@/utils";

export default async function SafetyPage() {

  const projectSafeties = await getAllProjectSafety();
  const updatedSafeties = leanSafeties(projectSafeties)

  return (
    <div className="flex flex-col items-center justify-between space-y-4">

      <SafetyTableComponent projectSafeties={updatedSafeties} />

    </div>
  );
};

