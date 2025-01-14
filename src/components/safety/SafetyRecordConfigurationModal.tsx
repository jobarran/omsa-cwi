"use client";

import { useState, useEffect, useTransition } from "react";
import { SafetyRecord } from "@/types"; // Adjust the import according to your file structure
import { Company } from "@prisma/client";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importing check and X icons
import { updateSafetySingleField } from "@/actions";

interface Props {
    closeModal: () => void;
    safetyRecords: SafetyRecord[]; // List of SafetyRecords
    selectedCompany: Company;
    projectName: string;
    safetyId: string;
    safetyRequireRecords: string[];
}

export const SafetyRecordConfigurationModal = ({
    closeModal,
    safetyRecords,
    selectedCompany,
    projectName,
    safetyId,
    safetyRequireRecords,
}: Props) => {
    const [selectedRecords, setSelectedRecords] = useState<string[]>([]); // Store selected shortNames
    const [isPending, startTransition] = useTransition();

    // Function to handle record selection toggle
    const handleRecordToggle = (shortName: string) => {
        setSelectedRecords((prev) =>
            prev.includes(shortName)
                ? prev.filter((name) => name !== shortName)
                : [...prev, shortName]
        );
    };

    const saveChanges = async () => {
        startTransition(async () => {
            try {
                // Call the server action with the necessary parameters
                const response = await updateSafetySingleField(
                    "requireRecords", // Field to update
                    safetyId, // Safety ID (assumes selectedCompany.id is the safetyId)
                    selectedRecords // Selected records as string[]
                );

                if (response.ok) {
                    // Success feedback
                    console.log("Records updated successfully:", response);
                    closeModal(); // Close the modal
                } else {
                    // Handle server-side error
                    console.error("Failed to update records:", response.message);
                }
            } catch (error) {
                // Handle client-side errors
                console.error("Error during saveChanges:", error);
            }
        });
    };

    // Sort the records by type
    const sortedSafetyRecords = safetyRecords.sort((a, b) => a.type.localeCompare(b.type));

    // Preselect records that match the safetyRequireRecords
    useEffect(() => {
        const preSelectedRecords = sortedSafetyRecords
            .filter((record) => safetyRequireRecords.includes(record.shortName))
            .map((record) => record.shortName);

        setSelectedRecords(preSelectedRecords); // Set selected records when modal opens
    }, [safetyRecords, safetyRequireRecords]);

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 h-full md:h-5/6 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with project name and company name */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">{projectName}</h2>
                    <p className="text-md text-gray-500">{selectedCompany}</p>
                    <p className="text-sm text-gray-500">Seleccionar la documentación requerida para esta obra</p>
                </div>

                {/* Horizontal Line */}
                <hr className="my-2 border-gray-300" />

                {/* List of Safety Records with check and X icons */}
                <div className="mb-4 overflow-y-auto flex-1">
                    {sortedSafetyRecords.map((record) => (
                        <div
                            key={record.shortName}
                            className="flex items-center mb-1 cursor-pointer hover:bg-gray-100 p-1 rounded"
                            onClick={() => handleRecordToggle(record.shortName)} // Toggle check or X when clicked
                        >
                            {/* Conditional check or X icon */}
                            <div className="mr-2">
                                {selectedRecords.includes(record.shortName) ? (
                                    <FaCheck className="text-green-600" />
                                ) : (
                                    <FaTimes className="text-gray-300" />
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                {/* Uppercase and bold for record.type */}
                                <p className="text-base font-bold uppercase text-gray-600">{record.type}</p>

                                {/* Separator */}
                                <span className="mx-2">|</span>

                                {/* record.name */}
                                <p className="text-base text-gray-600">{record.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Container */}
                <div className="flex justify-end mt-auto">
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md">
                        Cancelar
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={isPending || selectedRecords.length === 0}
                        className="ml-4 px-4 py-2 bg-sky-800 text-white rounded-md disabled:bg-sky-200"
                    >
                        {isPending ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
};
