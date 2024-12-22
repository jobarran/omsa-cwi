"use client";

import { Tool, ToolCategory } from "@/interfaces/tool.interface";
import { compressImage, dateToString, stringToDate } from "@/utils";
import { useEffect, useState } from "react";
import { AdminProfileInputs, ToolProfileInput, ToolTableModal } from "..";
import { ToolEditableField } from "@/types";
import { updateTool, updateToolImage } from "@/actions";
import { ProjectData } from "@/interfaces/project.interface";
import { FaPen } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

interface Props {
    tool: Tool;
    categories: ToolCategory[] | null;
    projects: ProjectData[]
}

export const ToolsProfileEdit = ({ tool, projects, categories }: Props) => {
    const [editableFields, setEditableFields] = useState<
        { [key in ToolEditableField]: boolean }
    >({
        name: false,
        code: false,
        brand: false,
        description: false,
        state: false,
        quantity: false,
        project: false,
        categories: false,
        image: false,
        boughtAt: false
    });

    const [file, setFile] = useState<File | null>(null);
    const [currentValues, setCurrentValues] = useState<{ [key in ToolEditableField]: any }>({
        name: tool.name,
        code: tool.code,
        brand: tool.brand ?? "",
        description: tool.description ?? "",
        state: tool.state,
        quantity: tool.quantity.toString(),
        project: tool.project?.name ?? "",
        categories: tool.categories.map((cat) => cat.name).join(", "),
        image: "",
        boughtAt: dateToString(tool.boughtAt),
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(tool);
    const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);

    useEffect(() => {
        setCurrentValues({
            name: tool.name,
            code: tool.code,
            brand: tool.brand ?? "",
            description: tool.description ?? "",
            state: tool.state,
            quantity: tool.quantity.toString(),
            project: tool.project?.name ?? "",
            categories: tool.categories.map((cat) => cat.name).join(", "),
            image: "",
            boughtAt: dateToString(tool.boughtAt),
        })
        setSelectedTool(tool)
    }, [tool])


    const openModal = (field: string) => {
        setFieldToEdit(field);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFieldToEdit(null);
    };

    const handleEditClick = (field: ToolEditableField) => {
        setEditableFields((prev) => ({ ...prev, [field]: true }));
    };

    const handleSaveClick = (field: ToolEditableField) => {
        setEditableFields((prev) => ({ ...prev, [field]: false }));
        handleUpdateTool(tool.id, field, currentValues[field]);
    };

    const handleChange = (field: ToolEditableField, value: string) => {
        setCurrentValues((prev) => ({ ...prev, [field]: value }));
    };
    const handleUpdateTool = (toolId: string, field: ToolEditableField, value: string) => {
        if (field === "boughtAt") {
            // Convert to Date object before sending to backend
            const dateValue = stringToDate(value); // Convert the value to Date
            updateTool(field, toolId, dateValue);
        } else {
            updateTool(field, toolId, value);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async (userId: string, field: ToolEditableField, value: string) => {

        const formData = new FormData();
        formData.append("toolId", userId);

        if (file) {
            try {
                const compressedImage = await compressImage(file);
                formData.append("image", compressedImage);
            } catch (error) {
                alert("Failed to compress image. Please try again.");
                return;
            }
        }

        const { message, ok } = await updateToolImage(formData);


    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Editar Herramienta</h2>
            <form className="flex flex-col">

                {/* First line */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                    <ToolProfileInput
                        field="name" // Replace with the correct EditableField value
                        label="Name"
                        currentValue={currentValues.name} // Provide the current value from state or props
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                    <ToolProfileInput
                        field="code"
                        label="Code"
                        currentValue={currentValues.code}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                    <ToolProfileInput
                        field="brand"
                        label="Brand"
                        currentValue={currentValues.brand}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                    <div className="mb-4 w-full relative">
                        <label className="block text-gray-700">
                            Fecha de compra
                        </label>
                        <div className="relative w-full">
                            <input
                                type="date"
                                value={currentValues.boughtAt}
                                onChange={(e) => handleChange("boughtAt", e.target.value)}
                                className={`border p-2 rounded w-full pr-10 resize-none ${!editableFields.boughtAt ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            />
                            <button
                                type="button"
                                onClick={() => (editableFields.boughtAt ? handleSaveClick('boughtAt') : handleEditClick('boughtAt'))}
                                className="absolute right-3 top-2/4 transform -translate-y-1/2 text-sky-800"
                            >
                                {editableFields.boughtAt ? <FaSave /> : <FaPen />}
                            </button>
                        </div>
                    </div>


                </div>

                {/* Second line */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700">
                            Categoría
                        </label>
                        <div className="relative w-full">

                            <input
                                type="text"
                                value={currentValues.categories}
                                onChange={() => { }}
                                className={`border p-2 h-11 rounded w-full pr-12 bg-gray-100 cursor-not-allowed `}
                            />

                            <button
                                type="button"
                                onClick={() => openModal("category")}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
                            >
                                <FaPen />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700">
                            Obra
                        </label>
                        <div className="relative w-full">

                            <input
                                type="text"
                                value={currentValues.project}
                                onChange={() => { }}
                                className={`border p-2 h-11 rounded w-full pr-12 bg-gray-100 cursor-not-allowed `}
                            />

                            <button
                                type="button"
                                onClick={() => openModal("projectId")}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
                            >
                                <FaPen />
                            </button>
                        </div>
                    </div>

                    <ToolProfileInput
                        field="state"
                        label="State"
                        currentValue={currentValues.state}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                        options={["ACTIVE", "ON_REPAIR", "INACTIVE"]}

                    />

                    <ToolProfileInput
                        field="quantity"
                        label="Quantity"
                        currentValue={currentValues.quantity}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />
                </div>

                {/* Third line */}
                <div className="grid grid-cols-1 w-full">
                    <ToolProfileInput
                        field="description"
                        label="Description"
                        currentValue={currentValues.description}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />
                </div>

                {/* File Upload Section */}
                <div className="grid grid-cols-1 w-full">
                    <label htmlFor="image" className="mb-1 text-sm font-medium text-gray-700 block">
                        Imagen
                    </label>
                    <div className="flex w-full items-center gap-4">
                        <input
                            type="file"
                            id="image"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                        />
                        <button
                            type="button"
                            disabled={!file}
                            onClick={() => handleFileUpload(tool.id, "image", "")}
                            className={`flex items-center justify-center px-4 py-3 ${file ? "bg-sky-600 text-white" : "bg-gray-200 text-black"}  rounded-md text-sm whitespace-nowrap`}
                        >
                            Subir Imagen
                        </button>
                    </div>
                </div>



            </form>
            {isModalOpen && selectedTool && fieldToEdit && (
                <ToolTableModal
                    tool={selectedTool}
                    field={fieldToEdit}
                    projects={projects}
                    closeModal={closeModal}
                    categories={categories}
                />
            )}
        </div>
    );
};
