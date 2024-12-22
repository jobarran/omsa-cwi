"use client";

import { ToolEditableField } from "@/types";
import { FaPen, FaSave } from "react-icons/fa"; // Import the icons

export const ToolProfileInput = ({
    field,
    label,
    currentValue,
    handleChange,
    editableFields,
    handleSaveClick,
    handleEditClick,
    options = [],
}: {
    field: ToolEditableField;
    label: string;
    currentValue: string;
    handleChange: (field: ToolEditableField, value: string) => void;
    editableFields: { [key in ToolEditableField]: boolean };
    handleSaveClick: (field: ToolEditableField) => void;
    handleEditClick: (field: ToolEditableField) => void;
    options?: string[]; // Options for dropdowns
}) => {
    const isEditable = editableFields[field];

    return (
        <div className="w-full">
            <label className="block text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="relative w-full">
                {field === "description" ? (
                    <textarea
                        value={currentValue}
                        onChange={(e) => handleChange(field, e.target.value)}
                        disabled={!isEditable}
                        rows={3}
                        className={`border p-2 rounded w-full pr-12 resize-none ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                    />
                ) : options.length > 0 ? (
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
                        className={`border p-2 h-11 rounded w-full pr-12 ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                            }`} // Same height for input and disabled style
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
