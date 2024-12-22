import { Tool } from "@/interfaces/tool.interface";
import * as XLSX from "xlsx"

interface Props {
    filteredTools: Tool[];
    selectedProject: string | null;
    selectedBrand: string | null;
    selectedState: string | null;
}

export const xlsxToolExport = ({ filteredTools, selectedProject, selectedBrand, selectedState }: Props) => {

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