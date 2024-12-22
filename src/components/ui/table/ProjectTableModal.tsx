"use client";

import { useState, useTransition } from "react";
import { UserSmallData } from "@/interfaces";
import { ProjectData, ProjectStatus } from "@/interfaces/project.interface";
import { updateProject } from "@/actions";

// Map ProjectStatus enum to Spanish translations
const statusTranslations: { [key in ProjectStatus]: string } = {
    [ProjectStatus.PLANNING]: "Contratada",
    [ProjectStatus.IN_PROGRESS]: "En ejecución",
    [ProjectStatus.COMPLETED]: "Completada",
};

interface Props {
    project: ProjectData;
    field: string;
    closeModal: () => void;
    users: UserSmallData[];
}

export const ProjectTableModal = ({ project, field, users, closeModal }: Props) => {
    const [localValue, setLocalValue] = useState<string[]>(project.users.map(user => user.id));
    const [status, setStatus] = useState<ProjectStatus>(project.status); // Add status state
    const [isPending, startTransition] = useTransition();

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Array.from(e.target.selectedOptions, (option) => option.value);
        setLocalValue(selectedValue);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as ProjectStatus); // Update status
    };

    const saveChanges = () => {
        startTransition(async () => {
            try {
                if (field === "projectUser") {
                    // Handle user changes
                    await updateProject("projectUser", project.id, localValue, project);
                } else if (field === "status") {
                    // Handle status changes
                    await updateProject("status", project.id, status, project); // Use the updated status
                }
                closeModal();
            } catch (error) {
                console.error("Failed to update project:", error);
            }
        });
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-5/6 sm:w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl mb-4">Editar {field}</h2>

                {field === "projectUser" && (
                    <select
                        multiple
                        value={localValue}
                        onChange={handleFieldChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} {user.lastName}
                            </option>
                        ))}
                    </select>
                )}

                {field === "status" && (
                    <select
                        value={status} // Bind the selected status
                        onChange={handleStatusChange} // Handle status change
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        {Object.values(ProjectStatus).map((status) => (
                            <option key={status} value={status}>
                                {statusTranslations[status]}
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
