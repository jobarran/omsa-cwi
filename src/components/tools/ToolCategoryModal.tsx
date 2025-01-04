"use client";

import { useState, useTransition } from "react";
import { Category } from "@prisma/client";
import { registerNewCategory } from "@/actions";

interface Props {
    closeModal: () => void;
    categories: Category[] | null; // A list of existing categories or null
}

export const ToolCategoryModal = ({ closeModal, categories }: Props) => {

    const [categoryName, setCategoryName] = useState(""); // Store the name of the new category
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Function to handle saving the new category
    const saveChanges = async () => {
        if (categories && categories.some((category) => category.name.toLowerCase() === categoryName.toLowerCase())) {
            // If categories exist and the new category is a duplicate
            setErrorMessage("Esta categoría ya existe.");
            return;
        }

        // If category doesn't exist or categories is null, add it
        startTransition(() => {
            registerNewCategory(categoryName)
            closeModal(); // Close modal after save
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
                <h2 className="text-xl mb-4">Agregar Nueva Categoría</h2>

                {/* Category input field */}
                <div className="mb-4">
                    <label htmlFor="category-name" className="block text-base font-medium text-gray-700">Nombre de la Categoría</label>
                    <input
                        type="text"
                        id="category-name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Escriba el nombre de la categoría"
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md">
                        Cancelar
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={isPending || !categoryName.trim()}
                        className="ml-4 px-4 py-2 bg-sky-800 text-white rounded-md disabled:bg-sky-200"
                    >
                        {isPending ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
};
