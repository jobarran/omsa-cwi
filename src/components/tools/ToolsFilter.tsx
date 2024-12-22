"use client";

import { ProjectData } from "@/interfaces/project.interface";
import { ToolFilters } from "@/interfaces/tool.interface";
import { FaRegFileExcel } from "react-icons/fa6";

interface Props {
    projects: ProjectData[];
    onFilterChange: (key: keyof ToolFilters, value: string | null) => void;
    toolBrands: string[];
    selectedProject: string | null;
    selectedBrand: string | null;
    selectedState: string | null;
    setSelectedProject: (value: string | null) => void;
    setSelectedBrand: (value: string | null) => void;
    setSelectedState: (value: string | null) => void;
    onExportToExcel: () => void
}

export const ToolsFilter = ({
    projects,
    onFilterChange,
    toolBrands,
    selectedProject,
    selectedBrand,
    selectedState,
    setSelectedProject,
    setSelectedBrand,
    setSelectedState,
    onExportToExcel
}: Props) => {

    return (
        <div className="flex flex-wrap items-center gap-2 pb-2 w-full">
            {/* Proyecto Dropdown */}
            <select
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 text-sm outline-none"
                value={selectedProject || ""}
                onChange={(e) => {
                    setSelectedProject(e.target.value || null);
                    onFilterChange("project", e.target.value || null);
                }}
            >
                <option value="" disabled>
                    Obra
                </option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>

            {/* Marca Dropdown */}
            <select
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 text-sm outline-none"
                value={selectedBrand || ""}
                onChange={(e) => {
                    setSelectedBrand(e.target.value || null);
                    onFilterChange("brand", e.target.value || null);
                }}
            >
                <option value="" disabled>
                    Marca
                </option>
                {toolBrands.map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>

            {/* Estado Dropdown */}
            <select
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 text-sm outline-none"
                value={selectedState || ""}
                onChange={(e) => {
                    setSelectedState(e.target.value || null);
                    onFilterChange("state", e.target.value || null);
                }}
            >
                <option value="" disabled>
                    Estado
                </option>
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
                <option value="ON_REPAIR">Mantenimiento</option>
            </select>

            {/* Exportar a Excel Button */}
            <button
                onClick={onExportToExcel}
                className="hidden sm:flex px-3 py-1 items-center rounded-md bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition"
            >
                <FaRegFileExcel className="sm:mr-2" />
                <p className="hidden sm:block text-sm">Exportar a Excel</p>
            </button>
        </div>
    );
};
