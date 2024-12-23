"use client";

import { useState, useTransition } from "react";
import { User, UserSmallData } from "@/interfaces";
import { ProjectData, ProjectStatus } from "@/interfaces/project.interface";
import { updateProject } from "@/actions";

// Map ProjectStatus enum to Spanish translations
const statusTranslations: { [key in ProjectStatus]: string } = {
    [ProjectStatus.PLANNING]: "Contratada",
    [ProjectStatus.IN_PROGRESS]: "En ejecución",
    [ProjectStatus.COMPLETED]: "Terminada",
    [ProjectStatus.MAINTENANCE]: "Mantenimiento",
};

interface Props {
    project: ProjectData;
    field: string;
    closeModal: () => void;
    managerUsers: UserSmallData[];
}

export const ProjectTableModal = ({ project, field, managerUsers, closeModal }: Props) => {
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
                if (field === "users") {
                    // Handle user changes
                    await updateProject("users", project.id, localValue, project);
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

                {field === "users" && managerUsers && (
                    <div className="grid">
                        {managerUsers.map((user) => (
                            <label key={user.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={user.id}
                                    checked={(localValue as string[]).includes(user.id)}
                                    onChange={(e) => {
                                        const selected = new Set(localValue as string[]);
                                        if (e.target.checked) {
                                            selected.add(user.id);
                                        } else {
                                            selected.delete(user.id);
                                        }
                                        setLocalValue(Array.from(selected));
                                    }}
                                    className="mr-2"
                                />
                                {user.lastName}, {user.name}
                            </label>
                        ))}
                    </div>
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
