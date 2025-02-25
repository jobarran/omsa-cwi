"use client";

import { InputSearch, WorkersFilter, WorkerTable } from "..";
import { ProjectData } from "@/interfaces/project.interface";
import { useState } from "react";
import { ClearFilterButton } from "../ui/buttons/ClearFilterButton";
import { User } from "@/interfaces";
import { useWorkerFilter } from "@/hooks/useWorkersFilter";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { UserPermission } from "@prisma/client";
import { xlsxWorkerExport } from "@/utils";

interface Props {
    workers: User[];
    projects: ProjectData[];
    userPermissions: UserPermission[] | null;
}

export const WorkersTableComponent = ({ workers, projects, userPermissions }: Props) => {
    // Always call hooks at the top level
    const { filters, handleFilterChange, restoreFilters, filteredWorkers } = useWorkerFilter(workers);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Check if the user has permissions
    const hasPermissions = userPermissions?.some(permission => ['TOTAL', 'PEOPLE_ADMIN', 'PEOPLE_VIEW'].includes(permission));

    // If no permissions, return early (without affecting hook calls)
    if (!hasPermissions) {
        return (
            <div className="text-center text-gray-600 mt-8">
                No tienes permisos para ver esta página.
            </div>
        );
    }

    const isFiltering = Boolean(filters.search || filters.projectId || filters.status || filters.category);

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedProject(null);
        setSelectedState(null);
        restoreFilters();
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        handleFilterChange("search", term || null); // Update the search filter
    };

    const handleExportToExcel = () => {
        xlsxWorkerExport({
            filteredWorkers,
            selectedProject,
            selectedState,
            selectedCategory
        });
    };

    return (
        <div className="flex flex-col w-full">
            <div className="pb-2">
                <div className="flex flex-row items-center gap-2 pb-2">
                    <div className="flex-grow">
                        <InputSearch
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={handleSearch}
                            resetSearchTerm={() => handleFilterChange("search", null)}
                        />
                    </div>
                    <ClearFilterButton label="Borrar filtros" action={resetFilters} isFiltering={isFiltering} />
                    <Link
                        href={"/workers/new"}
                        className="flex flex-row px-2 py-1 h-8 text-sm items-center rounded-lg border bg-sky-800 text-white font-medium hover:bg-sky-900 transition">
                        <p className="hidden sm:flex">+ Operario</p>
                        <FaPlus className="sm:hidden text-base" />
                    </Link>
                </div>
                <WorkersFilter
                    projects={projects}
                    onFilterChange={handleFilterChange}
                    selectedProject={selectedProject}
                    selectedState={selectedState}
                    selectedCategory={selectedCategory}
                    setSelectedProject={setSelectedProject}
                    setSelectedState={setSelectedState}
                    setSelectedCategory={setSelectedCategory}
                    onExportToExcel={handleExportToExcel}
                />
            </div>
            <WorkerTable workers={filteredWorkers} projects={projects} />
        </div>
    );
};
