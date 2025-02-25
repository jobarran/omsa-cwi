"use client";

import { ProjectData } from "@/interfaces/project.interface";
import { UserCategory } from "@prisma/client";
import { FaRegFileExcel } from "react-icons/fa6";

interface Props {
    projects: ProjectData[];
    onFilterChange: (key: "projectId" | "status" | "category" | "search", value: string | null) => void;
    selectedProject: string | null;
    selectedState: string | null;
    selectedCategory: string | null;
    setSelectedProject: (value: string | null) => void;
    setSelectedState: (value: string | null) => void;
    setSelectedCategory: (value: string | null) => void;
    onExportToExcel: () => void
}

export const WorkersFilter = ({
    projects,
    onFilterChange,
    selectedProject,
    selectedState,
    selectedCategory,
    setSelectedProject,
    setSelectedState,
    setSelectedCategory,
    onExportToExcel
}: Props) => {

    const userCategoryTranscriptions: Record<UserCategory, string> = {
        [UserCategory.N_A]: "No Aplica",
        [UserCategory.AYUDANTE]: "Ayudante",
        [UserCategory.MEDIO_OFICIAL]: "Medio Oficial",
        [UserCategory.OFICIAL]: "Oficial",
        [UserCategory.OFICIAL_ESPECIALIZADO]: "Oficial Especializado",
        [UserCategory.CAPATAZ]: "Capataz",
    };

    return (
        <div className="flex flex-wrap items-center gap-2 w-full">

            {/* Project Dropdown */}
            <select
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 h-8 text-md outline-none"
                value={selectedProject || ""}
                onChange={(e) => {
                    const projectId = e.target.value || null;
                    setSelectedProject(projectId);
                    onFilterChange("projectId", projectId);
                }}
            >
                <option value="">Seleccione un proyecto</option>
                {projects.map((project) => (
                    <option key={project.code} value={project.code}>
                        {project.name}
                    </option>
                ))}
            </select>

            {/* Category Dropdown */}
            <select
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 h-8 text-md outline-none"
                value={selectedCategory || ""}
                onChange={(e) => {
                    const category = e.target.value || null;
                    setSelectedCategory(category);
                    onFilterChange("category", category);
                }}
            >
                <option value="" disabled className="text-gray-600">Seleccione una Categoría</option>
                {Object.entries(userCategoryTranscriptions).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>

            {/* State Dropdown */}
            <select
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 h-8 text-md outline-none"
                value={selectedState || ""}
                onChange={(e) => {
                    const state = e.target.value || null;
                    setSelectedState(state);
                    onFilterChange("status", state);
                }}
            >
                <option value="" disabled className="text-gray-600">Seleccione un estado</option>
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
            </select>

            {/* Export to Excel Button */}
            <button
                onClick={onExportToExcel}
                className="hidden sm:flex px-2 py-1 h-8 text-sm items-center rounded-md bg-sky-800 text-white font-medium hover:bg-sky-900 transition"
            >
                <FaRegFileExcel className="sm:mr-2" />
                <p>Exportar a Excel</p>
            </button>
        </div>
    );
};
