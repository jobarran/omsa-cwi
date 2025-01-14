"use client";

import { useMemo, useState } from "react";
import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { Company } from "@prisma/client";
import { SafetyRecordProjectTable } from "./SafetyRecordProjectTable";
import { SafetyRecordCompanySelectionButton, SafetyRecordOptions, SafetySummaryData } from "..";
import { useSafetyRecordFilter } from "@/hooks/useSafetyRecordFilter";
import { getSafetyPendingRecords } from "@/utils";

interface Props {
    projectSafety: ProjectSafetyTable;
}

export const SafetyProjectComponent = ({ projectSafety }: Props) => {
    const [selectedCompany, setSelectedCompany] = useState<Company>("CWI");
    const {
        searchTerm,
        setSearchTerm,
        handleSearch,
        resetSearchTerm,
        filteredSafeties,
    } = useSafetyRecordFilter(projectSafety);

    const safetyPendingRecords = getSafetyPendingRecords(projectSafety)

    // Find the safety object for the selected company
    const selectedSafety = useMemo(() => {
        return projectSafety.safety.find((s) => s.company === selectedCompany) || null;
    }, [selectedCompany, projectSafety]);

    // Extract safetyId and requireRecords from the selected safety
    const selectedSafetyId = selectedSafety?.id || '';
    const selectedSafetyRequireRecords = selectedSafety?.requireRecords || [];

    return (
        <div className="w-full space-y-4">
            <SafetyRecordCompanySelectionButton
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
            />
            <SafetySummaryData projectSafeties={projectSafety} />
            <SafetyRecordOptions
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                resetSearchTerm={resetSearchTerm}
                projectCode={projectSafety.code}
                projectName={projectSafety.name}
                selectedCompany={selectedCompany}
                safetyId={selectedSafetyId}
                safetyRequireRecords={selectedSafetyRequireRecords}
                safetyPendingRecords={safetyPendingRecords.results}
            />
            <SafetyRecordProjectTable
                safetys={filteredSafeties}
                selectedCompany={selectedCompany}
                safetyRequireRecords={selectedSafetyRequireRecords}
                projectWorkers={filteredSafeties.users}
            />
        </div>

    );
};