"use client";

import { useState, useTransition } from "react";
import { updateTool } from "@/actions";
import { ProjectData } from "@/interfaces/project.interface";
import { Tool, ToolCategory } from "@/interfaces/tool.interface";

interface Props {
    tool: Tool;
    field: string;
    projects: ProjectData[];
    categories: ToolCategory[] | null;
    closeModal: () => void;
}

export const ToolTableModal = ({ tool, field, projects, closeModal, categories }: Props) => {
    const [localValue, setLocalValue] = useState<string | string[]>(
        field === "category" ? tool.categories.map((category) => category.id) : (tool.project?.id || "")
    );
    const [isPending, startTransition] = useTransition();

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        if (field === "category") {
            if (e.target instanceof HTMLSelectElement) {
                const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
                setLocalValue(selectedCategories);
            }
        } else {
            setLocalValue(e.target.value);
        }
    };

    const saveChanges = () => {

        startTransition(async () => {
            try {
                // For "category", handle the many-to-many relation with categories
                if (field === "category" && Array.isArray(localValue)) {
                    // Save the updated categories list to the tool
                    await updateTool(field, tool.id, localValue); 
                } else {
                    await updateTool(field, tool.id, localValue); // For other fields
                }
                closeModal();
            } catch (error) {
                console.error("Failed to update tool:", error);
            }
        });
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-5/6 sm:w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl mb-4">Editar {field}</h2>

                {/* Project Selection */}
                {field === "projectId" && (
                    <select
                        value={localValue}
                        onChange={handleFieldChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.code} - {project.name}
                            </option>
                        ))}
                    </select>
                )}

                {/* Category Selection */}
                {field === "category" && categories && (
                    <div className="grid">
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={category.id}
                                    checked={(localValue as string[]).includes(category.id)}
                                    onChange={(e) => {
                                        const selected = new Set(localValue as string[]);
                                        if (e.target.checked) {
                                            selected.add(category.id);
                                        } else {
                                            selected.delete(category.id);
                                        }
                                        setLocalValue(Array.from(selected));
                                    }}
                                    className="mr-2"
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md">
                        Cancelar
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={isPending}
                        className="ml-4 px-4 py-2 bg-sky-500 text-white rounded-md disabled:bg-sky-300"
                    >
                        {isPending ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
};
