"use client";

import { InputSearch, ToolsFilter, ToolTable } from "..";
import { Tool } from "@/interfaces/tool.interface";
import { ProjectData } from "@/interfaces/project.interface";
import { useToolFilter } from "@/hooks/useToolFilter";
import { getToolBrands } from "@/app/utils/getToolBrands";
import { FaFilterCircleXmark, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { ClearFilterButton } from "../ui/buttons/ClearFilterButton";
import Link from "next/link";

interface Props {
    tools: Tool[];
    projects: ProjectData[];
}

export const ToolsTableComponent = ({ tools, projects }: Props) => {
    const { filteredTools, handleFilterChange, restoreFilters } = useToolFilter(tools);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);

    // Determines if any filter is active
    const isFiltering = Boolean(
        searchTerm || selectedProject || selectedBrand || selectedState
    );

    // Handles the search input
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        handleFilterChange("search", searchTerm || null);  // Pass the search term to the filter handler
    };

    // Resets the search term and all dropdown filters
    const resetSearchTerm = () => {
        setSearchTerm(""); // Reset the local search term
        setSelectedProject(null); // Reset project filter
        setSelectedBrand(null); // Reset brand filter
        setSelectedState(null); // Reset state filter
        handleFilterChange("search", null); // Clear the search filter in the hook
        handleFilterChange("project", null); // Clear the project filter in the hook
        handleFilterChange("brand", null); // Clear the brand filter in the hook
        handleFilterChange("state", null); // Clear the state filter in the hook
        restoreFilters();
    };

    const brands = getToolBrands(tools);

    return (
        <div className="flex flex-col w-full">
            <div className="pt-2 pb-2">
                <div className="flex flex-row items-center gap-2 pb-2">
                    <div className="flex-grow">
                        <InputSearch
                            onSearch={handleSearch}
                            resetSearchTerm={resetSearchTerm}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                    <ClearFilterButton label={"Borrar filtros"} action={resetSearchTerm} icon={FaFilterCircleXmark} isFiltering={isFiltering} />
                    <Link
                        href={"/tools/new"}
                        className="flex flex-row px-2 h-8 items-center rounded-lg border bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition">
                        <p className="hidden sm:flex">Agregar nuevo</p>
                        <FaPlus className="sm:hidden text-base" />
                    </Link>
                </div>
                <ToolsFilter
                    projects={projects}
                    onFilterChange={handleFilterChange}
                    toolBrands={brands}
                    selectedProject={selectedProject}
                    selectedBrand={selectedBrand}
                    selectedState={selectedState}
                    setSelectedProject={setSelectedProject}
                    setSelectedBrand={setSelectedBrand}
                    setSelectedState={setSelectedState}
                />
            </div>
            <ToolTable tools={filteredTools} />
        </div>
    );
};
