"use client";

import { useState, useEffect } from "react";
import { ToolAdminButtons, ToolCategoryModal, ToolSearch, ToolsFilter, ToolTable } from "..";
import { Tool, ToolCategory } from "@/interfaces/tool.interface";
import { ProjectData } from "@/interfaces/project.interface";
import { useToolFilter } from "@/hooks/useToolFilter";
import { getToolBrands } from "@/utils/getToolBrands";
import { UserPermission } from "@prisma/client";
import * as XLSX from "xlsx"; // Import the xlsx library
import { getToolCategories } from "@/actions";

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
        // Process the data
        const exportData = filteredTools.map((tool) => {

            const categories = tool.categories ? tool.categories.map((category) => category.name).join(", ") : "";

            return {
                "Código": tool.code,
                "Categorias": categories,
                "Nombre": tool.name,
                "Marca": tool.brand,
                "Descripción": tool.description,
                "Proyecto": tool.project?.code, // Only include project code
                "Estado": tool.state,
                "Usuario": `${tool.user?.name} ${tool.user?.lastName}`, // Combine user name and last name
            };
        });

        // Create a worksheet from the data
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Create a workbook and add the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Tools");

        // Get the current date in YYYY_MM_DD format
        const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, "_");

        // Build the filtering part of the file name based on active filters
        let filterName = "";

        if (selectedProject || selectedBrand || selectedState) {
            filterName = "Filtro";

            if (selectedProject) {
                filterName += `-proyecto`;
            }

            if (selectedBrand) {
                filterName += `-marca`;
            }

            if (selectedState) {
                filterName += `-estado`;
            }
        }

        // Generate the filename with the current date and any filter names
        const fileName = `${currentDate}_HERRAMIENTAS_${filterName}.xlsx`;

        // Write the workbook to a binary string and trigger the download with the dynamic file name
        XLSX.writeFile(wb, fileName);
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

    // Check user permissions for UI elements
    const isToolAdmin = userPermissions.includes("TOOL_ADMIN");
    const isToolView = userPermissions.includes("TOOL_VIEW");
    const isTotal = userPermissions.includes("TOTAL");

    return (
        <div>
            <div className="flex flex-col w-full">

                {(isToolAdmin || isTotal) && (
                    <ToolAdminButtons
                        openModal={openModal}
                    />
                )}

                {isToolView || isToolAdmin || isTotal ? (
                    <div className="pt-2 pb-2">
                        <ToolSearch
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleSearch={handleSearch}
                            resetSearchTerm={resetSearchTerm}
                            isFiltering={isFiltering}
                        />
                        {(isToolView || isToolAdmin || isTotal) && (
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

                <ToolTable tools={filteredTools} projects={projects} toolCategories={toolCategories} />
            </div>
            {(isModalOpen) && (
                <ToolCategoryModal
                    closeModal={closeModal}
                    categories={categories || []} // Default to an empty array if categories are null
                />
            )}
        </div>
    );
};
