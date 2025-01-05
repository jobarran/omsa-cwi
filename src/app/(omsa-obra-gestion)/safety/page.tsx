import { getAllSafety } from "@/actions";
import { SafetyTableComponent } from '@/components';

export default async function SafetyPage() {

    const safeties = await getAllSafety();

    return (
        <div className="flex flex-col items-center justify-between space-y-4">
          
          <SafetyTableComponent safeties={safeties} />

        </div>
    );
};

