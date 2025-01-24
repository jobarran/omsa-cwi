"use client";

import { useState, useTransition } from "react";
import { User } from "@/interfaces";
import { ProjectData } from "@/interfaces/project.interface";
import { UserPermission, UserRole } from "@prisma/client";
import { permissionTranslations, roleTranslations } from "@/utils";
import { updateUserProjectsPermissions } from "@/actions";

interface Props {
    user: User;
    field: string;
    projects: ProjectData[];
    closeModal: () => void;
}

export const AdminTableModal = ({ user, field, projects, closeModal }: Props) => {

    // State to hold the value of the selected field
    const [localValue, setLocalValue] = useState<string | string[]>(
        field === "permissions"
            ? user.permissions || []
            : field === "projects"
                ? user.projects?.map((project: ProjectData) => project.id) || [] // Initialize with project IDs
                : field === "role" && user.role === "WORKER"
                    ? user.role // Ensure it's a string for "WORKER"
                    : user.role || '' // Handle other roles, default to empty string
    );

    // Separate state for WORKER users handling one project only
    const [workerProject, setWorkerProject] = useState<string>(
        user.role === UserRole.WORKER && user.projects?.length === 1
            ? user.projects[0].id
            : null
    );

    const [isPending, startTransition] = useTransition(); // Handle loading state

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        let newValue: string | string[];
        if ((field === "permissions" || field === "projects") && e.target instanceof HTMLSelectElement) {
            newValue = Array.from(e.target.selectedOptions).map((option) => option.value);
        } else {
            newValue = e.target.value;
        }

        setLocalValue(newValue);
    };

    const handleWorkerProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setWorkerProject(e.target.value);
    };

    const saveChanges = () => {
        startTransition(async () => {
            try {
                // For WORKER users, use the workerProject state
                const valueToSave = field === "projects" && user.role === UserRole.WORKER
                    ? workerProject
                    : localValue;
                await updateUserProjectsPermissions(field, user.id, valueToSave); // Call the server action
                closeModal(); // Close the modal on success
            } catch (error) {
                console.error("Failed to update user:", error);
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
                {field === "role" && (
                    <select
                        value={localValue as string}
                        onChange={handleFieldChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        {Object.values(UserRole).map((role) => (
                            <option key={role} value={role}>
                                {roleTranslations[role]} {/* Use the translated role */}
                            </option>
                        ))}
                    </select>
                )}
                {field === "projects" && (
                    user.role === UserRole.WORKER ? (
                        <select
                            value={workerProject || ""}
                            onChange={handleWorkerProjectChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            {/* Placeholder option */}
                            <option value="" disabled>
                                Seleccionar obra
                            </option>
                            {/* Map through projects to display available options */}
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.code} - {project.name}
                                </option>
                            ))}
                        </select>
                    ) : (

                        projects.map((project) => (
                            <label key={project.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={project.id}
                                    checked={(localValue as string[]).includes(project.id)} // Check if the project is selected
                                    onChange={(e) => {
                                        const selected = new Set(localValue as string[]);
                                        if (e.target.checked) {
                                            selected.add(project.id);
                                        } else {
                                            selected.delete(project.id);
                                        }
                                        setLocalValue(Array.from(selected));
                                    }}
                                    className="mr-2"
                                />
                                {project.code} - {project.name} {/* Display project information */}
                            </label>
                        ))
                    )
                )}
                {field === "permissions" && (
                    <div className="grid gap-2">
                        {Object.values(UserPermission).map((permission) => (
                            <label key={permission} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={permission}
                                    checked={(localValue as string[]).includes(permission)} // Check if the permission is selected
                                    onChange={(e) => {
                                        const selected = new Set(localValue as string[]);
                                        if (e.target.checked) {
                                            selected.add(permission);
                                        } else {
                                            selected.delete(permission);
                                        }
                                        setLocalValue(Array.from(selected));
                                    }}
                                    className="mr-2"
                                />
                                {permissionTranslations[permission as UserPermission]} {/* Display translated permission */}
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
