import { useState, useMemo } from "react";
import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { SafetyRecords } from "@/types";

export const useSafetyRecordFilter = (projectSafety: ProjectSafetyTable) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Handle filtering
    const filteredSafeties = useMemo(() => {
        if (!searchTerm.trim()) {
            return projectSafety;
        }

        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        // Filter through safety records in the project
        return {
            ...projectSafety,
            safety: projectSafety.safety.map((safety) => ({
                ...safety,
                safetyRecords: safety.safetyRecords.filter((record) => {

                    const matchesName = SafetyRecords.some((recordData) => 
                        recordData.name.toLowerCase().includes(lowerCasedSearchTerm) && 
                        recordData.shortName.toLowerCase() === record.name.toLowerCase()
                    );

                    const matchesShortName =  record.name.toLowerCase().includes(lowerCasedSearchTerm); 
                    const matchesLastName = record.user?.lastName.toLowerCase().includes(lowerCasedSearchTerm);
                    const matchesFirstName = record.user?.name.toLowerCase().includes(lowerCasedSearchTerm);
                    const matchesLegajo = record.user?.legajo.toLowerCase().includes(lowerCasedSearchTerm);

                    return matchesName || matchesShortName || matchesLastName || matchesFirstName || matchesLegajo;
                }),
            })),
        };
    }, [projectSafety, searchTerm]);

    // Handle search term changes
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    // Reset search term
    const resetSearchTerm = () => {
        setSearchTerm("");
    };

    return {
        searchTerm,
        setSearchTerm,
        handleSearch,
        resetSearchTerm,
        filteredSafeties,
    };
};
