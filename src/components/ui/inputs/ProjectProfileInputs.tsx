"use client";

import { FaPen, FaSave } from "react-icons/fa"; // Import the icons

type EditableField = "name" | "status" | "address" | "code" | "users" | "image";

export const ProjectProfileInputs = ({
    field,
    label,
    currentValue,
    handleChange,
    editableFields,
    handleSaveClick,
    handleEditClick,
    options = [],
}: {
    field: EditableField;
    label: string;
    currentValue: string;
    handleChange: (field: EditableField, value: string) => void;
    editableFields: { [key in EditableField]: boolean };
    handleSaveClick: (field: EditableField) => void;
    handleEditClick: (field: EditableField) => void;
    options?: string[]; // Options for dropdowns
}) => {
    const isEditable = editableFields[field];

    return (
        <div className="mb-4 w-full">
            <label className="block text-gray-700">
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            <div className="relative w-full">
                {options.length > 0 ? (
                    <select
                        value={currentValue}
                        onChange={(e) => handleChange(field, e.target.value)}
                        disabled={!isEditable}
                        className={`appearance-none border p-2 h-11 rounded w-full pr-12 ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                            }`} // Removed default arrow
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => handleChange(field, e.target.value)}
                        disabled={!isEditable}
                        className={`border p-2 h-11 rounded w-full pr-12 ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`} // Same height for input and disabled style
                    />
                )}
                <button
                    type="button"
                    onClick={() => (isEditable ? handleSaveClick(field) : handleEditClick(field))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
                >
                    {isEditable ? <FaSave /> : <FaPen />}
                </button>
            </div>
        </div>
    );
};
