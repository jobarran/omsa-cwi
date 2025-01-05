"use client";

import { useState, useMemo } from "react";
import { useSafetyFilter } from "@/hooks/useSafetyFilter";
import { SafetyTable as SafetyTableType } from "@/interfaces/safety.interface";
import { SafetyOptions, SafetySummaryData, SafetyTable } from "..";

interface Props {
    safeties: SafetyTableType[];
}

export const SafetyTableComponent = ({ safeties }: Props) => {
    
    const [showUserTable, setShowUserTable] = useState(false);
    

    // Filter safeties based on the showUserTable flag
    const filteredByUserOrProject = useMemo(() => {
        return safeties.filter((safety) => {
            return showUserTable ? safety.userId : safety.projectId;
        });
    }, [showUserTable, safeties]);

    const {
        searchTerm,
        setSearchTerm,
        handleSearch,
        resetSearchTerm,
        filteredSafeties,
    } = useSafetyFilter(filteredByUserOrProject);

    return (
        <div className="w-full space-y-4">
            <SafetySummaryData safeties={filteredSafeties} />
            <SafetyOptions
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                resetSearchTerm={resetSearchTerm}
                safeties={filteredSafeties}
                showUserTable={showUserTable}
                setShowUserTable={setShowUserTable}
            />
            <SafetyTable safeties={filteredSafeties} showUserTable={showUserTable} />
        </div>
    );
};
