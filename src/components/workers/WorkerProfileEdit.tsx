"use client";

import { useState } from "react";
import { User } from "@/interfaces";
import { updateUserData } from "@/actions";
import { AdminProfileInputs } from "..";
import { compressImage, dateToString, stringToDate } from "@/utils";
import { updateImage } from "@/actions/user/update-image";
import { AdminPickerInput } from "../ui/inputs/AdminPickerInput";
import { AdminEditableField } from "@/types";

interface Props {
    user: User;
}

export const WorkerProfileEdit = ({ user }: Props) => {
    const [editableFields, setEditableFields] = useState<{ [key in AdminEditableField]: boolean }>({
        name: false,
        lastName: false,
        phone: false,
        category: false,
        status: false,
        company: false,
        password: false,
        image: false,
        entryDate: false
    });

    const [file, setFile] = useState<File | null>(null); // State for handling file upload
    const [currentValues, setCurrentValues] = useState<{ [key in AdminEditableField]: string }>({
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        category: user.category,
        status: user.status,
        company: user.company,
        password: "", // Assuming password is being handled separately
        image: "",
        entryDate: dateToString(user.entryDate)
    });

    const handleEditClick = (field: AdminEditableField) => {
        setEditableFields((prev) => ({ ...prev, [field]: true }));
    };

    const handleSaveClick = (field: AdminEditableField) => {
        setEditableFields((prev) => ({ ...prev, [field]: false }));
        handleUpdateUser(user.id, field, currentValues[field]);
    };

    const handleChange = (field: AdminEditableField, value: string) => {
        setCurrentValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdateUser = (userId: string, field: AdminEditableField, value: string) => {
        if (field === "entryDate") {
            // Convert to Date object before sending to backend
            const dateValue = stringToDate(value); // Convert the value to Date
            updateUserData(field, userId, dateValue);
        } else {
            updateUserData(field, userId, value)
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
        }
    };

    const handleFileUpload = async (userId: string, field: AdminEditableField, value: string) => {

        const formData = new FormData();
        formData.append("userId", userId);

        if (file) {
            try {
                const compressedImage = await compressImage(file);
                formData.append("image", compressedImage);
            } catch (error) {
                alert("Failed to compress image. Please try again.");
                return;
            }
        }

        const { message, ok } = await updateImage(formData);

        // if (ok) {
        //     router.replace(`/admin/${userId}`);
        // }

    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Editar</h2>
            <form className="flex flex-col">

                {/* 1st Line: Legajo, Name, LastName, Password */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {/* Legajo */}
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700">Legajo</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={user.legajo}
                                disabled={true}
                                className={`border p-2 h-11 rounded w-full pr-12 bg-gray-100 text-gray-600`}
                            />
                        </div>
                    </div>

                    {/* Company */}
                    <AdminProfileInputs
                        field="company"
                        label="Empresa"
                        currentValue={currentValues.company}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                        options={["OMSA", "CWI"]}
                    />

                    {/* Status */}
                    <AdminProfileInputs
                        field="status"
                        label="Estado"
                        currentValue={currentValues.status}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                        options={["ACTIVE", "INACTIVE"]}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {/* Name */}
                    <AdminProfileInputs
                        field="name"
                        label="Nombre"
                        currentValue={currentValues.name}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                    {/* LastName */}
                    <AdminProfileInputs
                        field="lastName"
                        label="Apellido"
                        currentValue={currentValues.lastName}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                </div>

                {/* 2nd Line: Phone, Status, Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {/* Phone */}
                    <AdminProfileInputs
                        field="phone"
                        currentValue={currentValues.phone}
                        label="Teléfono"
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                    {/* Category */}
                    <AdminProfileInputs
                        field="category"
                        label="Categoría"
                        currentValue={currentValues.category}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                        options={["N_A", "AYUDANTE", "MEDIO_OFICIAL", "OFICIAL", "OFICIAL_ESPECIALIZADO", "CAPATAZ"]}
                    />

                    <AdminPickerInput
                        label={"Fecha de ingreso"}
                        currentValue={currentValues.entryDate}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                </div>

                {/* File Upload Section */}
                <div className="flex-1">
                    <label htmlFor="image" className="mb-1 text-sm font-medium text-gray-700 block">
                        Imagen
                    </label>
                    <div className="flex w-full items-center gap-4">
                        <input
                            type="file"
                            id="image"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            className="block w-full border border-gray-200 text-gray-600 shadow-sm rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                        />
                        <button
                            type="button"
                            disabled={!file}
                            onClick={() => handleFileUpload(user.id, "image", "")}
                            className={`flex items-center justify-center px-4 py-3 ${file ? "bg-sky-600 text-white" : "bg-gray-200 text-black"}  rounded-md text-sm whitespace-nowrap`}
                        >
                            Subir Imagen
                        </button>
                    </div>
                </div>



            </form>
        </div>
    );
};