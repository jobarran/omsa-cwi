import { useState, useMemo } from "react";
import { SafetyTable } from "@/interfaces/safety.interface";

export const useSafetyFilter = (safeties: SafetyTable[]) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Handle filtering
    const filteredSafeties = useMemo(() => {
        if (!searchTerm.trim()) {
            return safeties;
        }

        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        return safeties.filter((safety) => {
            // Check if any safety record matches the search term
            const matchesSafetyRecord = safety.safetyRecords.some((record) =>
                record.name.toLowerCase().includes(lowerCasedSearchTerm) ||
                record.documentationLink.toLowerCase().includes(lowerCasedSearchTerm)
            );

            // Check if the company name or project/user name matches
            const matchesCompany = safety.company.toLowerCase().includes(lowerCasedSearchTerm);
            const matchesProject = safety.project?.name.toLowerCase().includes(lowerCasedSearchTerm) || false;
            const matchesUser = safety.user?.name.toLowerCase().includes(lowerCasedSearchTerm) || false;

            return matchesSafetyRecord || matchesCompany || matchesProject || matchesUser;
        });
    }, [safeties, searchTerm]);

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
