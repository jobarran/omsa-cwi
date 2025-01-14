import { useState, useMemo } from "react";
import { ProjectSafetyTable } from "@/interfaces/safety.interface";

export const useSafetyFilter = (projectSafeties: ProjectSafetyTable[]) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSafeties = useMemo(() => {
        if (!searchTerm.trim()) {
            return projectSafeties;
        }

        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        return projectSafeties.filter((project) => {
            const matchesProjectName = project.name.toLowerCase().includes(lowerCasedSearchTerm);
            const matchesProjectCode = project.code.toLowerCase().includes(lowerCasedSearchTerm);
            return matchesProjectName || matchesProjectCode;
        });
    }, [projectSafeties, searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

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
