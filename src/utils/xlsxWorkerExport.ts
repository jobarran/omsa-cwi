import { User } from "@/interfaces";
import * as XLSX from "xlsx";

interface Props {
    filteredWorkers: User[];
    selectedProject: string | null;
    selectedState: string | null;
    selectedCategory: string | null;
}

export const xlsxWorkerExport = ({ filteredWorkers, selectedProject, selectedState, selectedCategory }: Props) => {
    // Map filtered workers to the export data format
    const exportData = filteredWorkers.map((worker) => {

        // If worker's projects exists, map and join them
        const workerProjects = worker.projects
        ? worker.projects.map((project: { code: string }) => project.code).join(", ")
        : "";
    
        return {
            "Legajo": worker.legajo,
            "Nombre": `${worker.name} ${worker.lastName}`,  // Full name of the worker
            "Teléfono": worker.phone,
            "Categoría": worker.category, // Assuming category is a string or an enum
            "Estado": worker.status,  // Worker status
            "Proyectos": workerProjects,  // List of associated projects (comma-separated)
            "Habilidades": worker.workerSkill.map(skill => skill.name).join(", ")  // Assuming skills are stored as an array
        };
    });

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Workers");

    // Get the current date in YYYY_MM_DD format
    const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, "_");

    // Build the filtering part of the file name based on active filters
    let filterName = "";

    if (selectedProject || selectedState || selectedCategory) {
        filterName = "Filtro";

        if (selectedProject) {
            filterName += `-proyecto`;
        }

        if (selectedState) {
            filterName += `-estado`;
        }

        if (selectedCategory) {
            filterName += `-categoria`;
        }
    }

    // Generate the filename with the current date and any filter names
    const fileName = `${currentDate}_OPERARIOS_${filterName}.xlsx`;

    // Write the workbook to a binary string and trigger the download with the dynamic file name
    XLSX.writeFile(wb, fileName);
};
