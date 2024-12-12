"use client";

import { AdminTable, InputSearch } from "..";
import { ProjectData } from "@/interfaces/project.interface";
import { LinkButtonBig } from "../ui/buttons/LinkButtonBig";
import { User, UserRoleData } from "@/interfaces";
import { useWorkerFilter } from "@/hooks/useWorkersFilter";
import { useState } from "react";
import { ClearFilterButton } from "../ui/buttons/ClearFilterButton";

interface Props {
    users: User[];
    projects: ProjectData[];
    userRoleData: UserRoleData;
}

export const AdminTableComponent = ({ users, projects, userRoleData }: Props) => {

    const { filters, handleFilterChange, restoreFilters, filteredWorkers } = useWorkerFilter(users);
    const [searchTerm, setSearchTerm] = useState("");
    const isFiltering = Boolean(filters.search);

    const resetFilters = () => {
        setSearchTerm("");
        restoreFilters();
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        handleFilterChange("search", term || null); // Update the search filter
    };

    return (
        <div className="flex flex-col w-full">

            <div className="flex flex-row items-center gap-2 pb-2">
                <div className="flex-grow">

                    <InputSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={handleSearch}
                        resetSearchTerm={() => handleFilterChange("search", null)}
                    />
                </div>
                <div className="hidden sm:flex">
                    <ClearFilterButton label="Borrar filtros" action={resetFilters} isFiltering={isFiltering} />

                </div>
                <LinkButtonBig label={"Agregar"} link={"/admin/new/user"} />
            </div>

            <AdminTable
                users={filteredWorkers}
                projects={projects}
                userRoleData={userRoleData}
            />
        </div>
    );
};
