"use client";

import { AdminTable, InputSearch } from "..";
import { ProjectData } from "@/interfaces/project.interface";
import { LinkButtonBig } from "../ui/buttons/LinkButtonBig";
import { User, UserRoleData } from "@/interfaces";
import { useWorkerFilter } from "@/hooks/useWorkersFilter";
import { useState } from "react";
import { ClearFilterButton } from "../ui/buttons/ClearFilterButton";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

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
        handleFilterChange("search", term || null);
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

                <ClearFilterButton label="Borrar filtros" action={resetFilters} isFiltering={isFiltering} />

                <Link
                    href={"/admin/new/user"}
                    className="flex flex-row px-2 h-8 items-center rounded-lg border bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition">
                    <p className="hidden sm:flex">+ Usuario</p>
                    <FaPlus className="sm:hidden text-base" />
                </Link>
            </div>

            <AdminTable
                users={filteredWorkers}
                projects={projects}
                userRoleData={userRoleData}
            />
        </div>

    );
};
