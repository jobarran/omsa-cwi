"use client";

import { useEffect, useState, useTransition } from "react";
import { updateProject, updateTool } from "@/actions";
import { ProjectData } from "@/interfaces/project.interface";
import { User } from "@/interfaces";

interface Props {
    field: string;
    project: ProjectData;
    closeModal: () => void;
    managerUsers: User[]
}

export const ProjectEditModal = ({ field, project, closeModal, managerUsers }: Props) => {

    const [localValue, setLocalValue] = useState<string | string[]>(
        field === "users" ? project.users.map((user) => user.id) : []
    );
    const [isPending, startTransition] = useTransition();

    const saveChanges = () => {

        startTransition(async () => {
            try {
                console.log({ field, project: project.id, value: localValue });
                // For "category", handle the many-to-many relation with categories
                if (field === "users" && Array.isArray(localValue)) {
                    // Save the updated categories list to the tool
                    await updateProject(field, project.id, localValue, project);
                }
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
