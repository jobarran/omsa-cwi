"use client";

import { useSafetyFilter } from "@/hooks/useSafetyFilter";
import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { SafetyOptions, SafetySummaryData, SafetyTable, UpcomingExpirationRecords } from "..";
import { getSafetyPendingRecords } from "@/utils";

interface Props {
    projectSafeties: ProjectSafetyTable[];
}

export const SafetyTableComponent = ({ projectSafeties }: Props) => {
    const {
        searchTerm,
        setSearchTerm,
        handleSearch,
        resetSearchTerm,
        filteredSafeties,
    } = useSafetyFilter(projectSafeties);
    return (
        <div className="w-full space-y-4">
            <SafetySummaryData projectSafeties={filteredSafeties} />
            <SafetyOptions
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                resetSearchTerm={resetSearchTerm}
            />
            <SafetyTable projectSafeties={filteredSafeties} />
            <UpcomingExpirationRecords projectSafeties={projectSafeties} />
        </div>
    );
};
