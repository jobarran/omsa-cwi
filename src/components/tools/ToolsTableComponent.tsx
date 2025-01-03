"use client";

import { useState } from "react";
import { ToolAdminButtons, ToolCategoryModal, ToolSearch, ToolsFilter, ToolSummaryData, ToolTable } from "..";
import { Tool, ToolCategory } from "@/interfaces/tool.interface";
import { ProjectData } from "@/interfaces/project.interface";
import { useToolFilter } from "@/hooks/useToolFilter";
import { getToolBrands } from "@/utils/getToolBrands";
import { UserPermission } from "@prisma/client";
import { getPermissionBoolean, xlsxToolExport } from "@/utils";

interface Props {
    tools: Tool[];
    projects: ProjectData[];
    userPermissions: UserPermission[] | null;
    toolCategories: ToolCategory[] | null
}

export const ToolsTableComponent = ({ tools, projects, userPermissions, toolCategories }: Props) => {

    const { filteredTools, handleFilterChange, restoreFilters } = useToolFilter(tools);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<{ id: string; name: string }[] | null>(toolCategories); // State to store categories

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Determines if any filter is active
    const isFiltering = Boolean(
        searchTerm || selectedProject || selectedBrand || selectedState
    );

    // Handles the search input
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        handleFilterChange("search", searchTerm || null);
    };

    const handleExportToExcel = () => {
        xlsxToolExport({ filteredTools, selectedProject, selectedBrand, selectedState })
    };

    // Resets the search term and all dropdown filters
    const resetSearchTerm = () => {
        setSearchTerm("");
        setSelectedProject(null);
        setSelectedBrand(null);
        setSelectedState(null);
        handleFilterChange("search", null);
        handleFilterChange("project", null);
        handleFilterChange("brand", null);
        handleFilterChange("state", null);
        restoreFilters();
    };

    const brands = getToolBrands(tools);

    // Check if user has permissions
    if (!userPermissions || !userPermissions.some(permission => ['TOTAL', 'TOOL_ADMIN', 'TOOL_VIEW'].includes(permission))) {
        return (
            <div className="text-center text-gray-600 mt-8">
                No tienes permisos para ver esta página.
            </div>
        );
    }

    const isToolAdmin = getPermissionBoolean(userPermissions, "ADMIN", "TOOL")
    const isToolView = getPermissionBoolean(userPermissions, "VIEW", "TOOL")

    const toolNames = Array.from(new Set(tools.map(tool => tool.name)));

    return (
        <div className="flex flex-col w-full">
            <div className="w-full">
                <ToolSummaryData tools={filteredTools} />

                {isToolView && (
                    <div className={`flex flex-col w-full gap-2 sm:gap-2 ${isToolAdmin ? 'sm:flex-row justify-between items-center' : ''}`}>
                        {/* Admin Buttons (only if isToolAdmin is true) */}
                        {isToolAdmin && (
                            <div className="w-full sm:w-auto sm:order-2 flex justify-center">
                                <ToolAdminButtons openModal={openModal} />
                            </div>
                        )}

                        {/* Search Bar (always rendered if isToolView) */}
                        <div className={`w-full ${isToolAdmin ? 'sm:flex-1 sm:order-1' : ''}`}>
                            <ToolSearch
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                handleSearch={handleSearch}
                                resetSearchTerm={resetSearchTerm}
                                isFiltering={isFiltering}
                                toolNames={toolNames}
                            />
                        </div>
                    </div>
                )}

                {isToolView || isToolAdmin ? (
                    <div className="pt-2 pb-2">
                        {(isToolView || isToolAdmin) && (
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
                                onExportToExcel={handleExportToExcel}
                            />
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 mt-8">
                        No tienes permisos para ver esta página.
                    </div>
                )}

                <ToolTable
                    tools={filteredTools}
                    projects={projects}
                    toolCategories={toolCategories}
                    userPermissions={userPermissions}
                />
            </div>
            {isModalOpen && (
                <ToolCategoryModal
                    closeModal={closeModal}
                    categories={categories || []} // Default to an empty array if categories are null
                />
            )}
        </div>

    );
};
