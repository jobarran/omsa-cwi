"use client";

import { registerNewTool } from '@/actions/tool/register-new-tool';
import { ProjectData } from '@/interfaces/project.interface';
import { ToolCategory } from '@/interfaces/tool.interface';
import { compressImage } from '@/utils';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from 'react-hook-form';
import { es } from 'date-fns/locale'; // Import Spanish locale
import { SearchDropdown } from '@/components';

type FormInputs = {
    code: string;
    name: string;
    brand: string;
    description: string;
    photo: string;
    state: 'ACTIVE' | 'INACTIVE' | 'ON_REPAIR';
    quantity: number;
    projectId: string;
    userId: string;
    image: FileList | null;
    boughtAt: Date;
    category: string; // Changed to a single string for category id
};

interface Props {
    projects: ProjectData[];
    categories: ToolCategory[];
    toolsNameAndBrand: { name: string; brand: string | null }[];
}

export const RegisterToolForm = ({ projects, categories, toolsNameAndBrand }: Props) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
        control,
        setValue, // Get setValue from useForm
        formState: { isValid },
    } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            code: '',
            name: '',
            brand: '',
            description: '',
            state: 'ACTIVE',
            quantity: 1,
            projectId: '',
            userId: '',
            image: null,
            boughtAt: undefined,
            category: '', // Default to empty string for single category
        },
    });

    // Function to handle the selection of name
    const handleNameSelect = (selectedName: string) => {
        setValue('name', selectedName);  // Set the name field value
    };

    // Function to handle the addition of a new name
    const handleNameAdd = (newName: string) => {
        setValue('name', newName);  // Set the name field value
    };

    // Function to handle the selection of brand
    const handleBrandSelect = (selectedBrand: string) => {
        setValue('brand', selectedBrand);  // Set the brand field value
    };

    // Function to handle the addition of a new brand
    const handleBrandAdd = (newBrand: string) => {
        setValue('brand', newBrand);  // Set the brand field value
    };

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();
        const { image, boughtAt, ...toolToSave } = data;

        // Handle the rest of the data
        Object.entries(toolToSave).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, typeof value === "number" ? value.toString() : value);
            }
        });

        // Append 'boughtAt' as a string date if it's a valid date
        if (boughtAt instanceof Date && !isNaN(boughtAt.getTime())) {
            const formattedDate = boughtAt.toISOString(); // Convert to ISO 8601 format
            formData.append("boughtAt", formattedDate);
        }

        if (image && image.length > 0) {
            try {
                const compressedImage = await compressImage(image[0]);
                formData.append("image", compressedImage);
            } catch (error) {
                alert("Failed to compress image. Please try again.");
                return;
            }
        }

        const { message, ok } = await registerNewTool(formData);

        if (ok) {
            router.replace(`/tools`);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">

                {/* First row: Name, Code, Brand */}
                <div className="flex flex-col md:flex-row md:gap-4 md:mb-4">
                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
                        <label
                            htmlFor="code"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Código <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("code", { required: true })}
                            type="text"
                            id="code"
                            className="border rounded p-2 border-gray-300 text-base"
                            placeholder="Ingrese el código"
                        />
                    </div>

                    {/* Name Search Dropdown */}
                    <SearchDropdown
                        options={toolsNameAndBrand.map(tool => tool.name)} // Extract only the names
                        onWordAdd={handleNameAdd}
                        onWordSelect={handleNameSelect}
                        label="Nombre de la herramienta"
                    />

                    {/* Brand Search Dropdown */}
                    <SearchDropdown
                        options={toolsNameAndBrand.map(tool => tool.brand)} // Extract only the brands
                        onWordAdd={handleBrandAdd}
                        onWordSelect={handleBrandSelect}
                        label="Marca de la herramienta"
                    />
                </div>

                {/* Second row: Description */}
                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="description"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        Descripción
                    </label>
                    <textarea
                        {...register("description")}
                        rows={3}
                        id="description"
                        className="border rounded p-2 border-gray-300 text-base"
                        placeholder="Ingrese la descripción"
                    />
                </div>

                {/* Third row: State, Quantity, Project, Bought At */}
                <div className="flex flex-col md:flex-row md:gap-4 mb-4">

                    <div className="flex flex-col w-full md:w-1/4 mb-4 md:mb-0">
                        <label
                            htmlFor="category"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Categoría <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("category", { required: true })}
                            id="category"
                            className="border rounded p-2 border-gray-300 h-10 text-base"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col w-full md:w-1/4 mb-4 md:mb-0">
                        <label
                            htmlFor="state"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Estado <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("state", { required: true })}
                            id="state"
                            className="border rounded p-2 border-gray-300 h-10 text-base"
                        >
                            <option value="ACTIVE">Activo</option>
                            <option value="INACTIVE">Inactivo</option>
                            <option value="ON_REPAIR">En reparación</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-full md:w-1/4 mb-4 md:mb-0">
                        <label
                            htmlFor="projectId"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Proyecto <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("projectId", { required: true })}
                            id="projectId"
                            className="border rounded p-2 border-gray-300 h-10 text-base"
                        >
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col w-full md:w-1/4 mb-4 md:mb-0">
                        <label
                            htmlFor="boughtAt"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Fecha de compra
                        </label>
                        <Controller
                            control={control}
                            name="boughtAt"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <DatePicker
                                    selected={value ? new Date(value) : null} // Handle null values
                                    onChange={(date: Date | null) => onChange(date)} // Handle both Date and null
                                    onBlur={onBlur}
                                    dateFormat="yyyy-MM-dd"
                                    className="border border-gray-300 p-2 h-10 rounded pr-56 md:pr-12 w-full text-base"
                                    disabled={false}
                                    locale={es} // Set Spanish locale here

                                />
                            )}
                        />
                    </div>
                </div>


                {/* Fourth row: Image */}
                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="image"
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        Imagen
                    </label>
                    <input
                        {...register("image")}
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                    />
                </div>

                {/* Required Fields Notice */}
                <div className="my-4 text-sm text-gray-500">
                    <p>* Campos obligatorios</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-medium rounded py-2 px-4 disabled:opacity-50"
                    disabled={!isValid}
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};
