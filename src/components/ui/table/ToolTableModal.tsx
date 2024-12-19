"use client";

import { useState, useTransition } from "react";
import { updateTool } from "@/actions";
import { ProjectData } from "@/interfaces/project.interface";
import { Tool } from "@/interfaces/tool.interface";

interface Props {
    tool: Tool;
    field: string;
    projects: ProjectData[];
    closeModal: () => void;
}

export const ToolTableModal = ({ tool, field, projects, closeModal }: Props) => {
    const [localValue, setLocalValue] = useState<string>(
        tool.project?.id || "" // Default to the first project's ID if available
    );
    const [isPending, startTransition] = useTransition();

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalValue(e.target.value);
    };

    const saveChanges = () => {
        startTransition(async () => {
            try {
                console.log({ field, tool: tool.id, value: localValue });
                await updateTool(field, tool.id, localValue); // Call the server action
                closeModal();
            } catch (error) {
                console.error("Failed to update tool:", error);
            }
        });
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl mb-4">Editar {field}</h2>

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
