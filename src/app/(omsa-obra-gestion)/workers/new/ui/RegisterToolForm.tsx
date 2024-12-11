"use client";

import { registerNewTool } from '@/actions/tool/register-new-tool';
import { ProjectData } from '@/interfaces/project.interface';
import { useRouter } from "next/navigation";
import React from 'react';
import { useForm } from 'react-hook-form';

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
    image: string | null;
};

interface Props {
    projects: ProjectData[];
}

export const RegisterToolForm = ({ projects }: Props) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
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
        },
    });

    const onSubmit = async (data: FormInputs) => {

        const formData = new FormData();

        const { image, ...toolToSave } = data;
        Object.entries(toolToSave).forEach(([key, value]) => {
            formData.append(key, typeof value === 'number' ? value.toString() : value);
        });

        if (image && image.length > 0) {
            formData.append('image', image[0]);
        }

        const { message, ok } = await registerNewTool(formData);

        if (ok) {
            router.replace(`/tools`);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">

                {/* First row: Name, Code, Brand */}
                <div className="flex flex-col md:flex-row md:gap-4 mb-4">
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
                            className="border rounded p-2 border-gray-300"
                            placeholder="Ingrese el código"
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
                        <label
                            htmlFor="name"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Nombre del equipo <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            id="name"
                            className="border rounded p-2 border-gray-300"
                            placeholder="Ingrese el nombre del equipo"
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
                        <label
                            htmlFor="brand"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Marca del equipo
                        </label>
                        <input
                            {...register("brand")}
                            type="text"
                            id="brand"
                            className="border rounded p-2 border-gray-300"
                            placeholder="Ingrese la marca del equipo"
                        />
                    </div>
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
                        className="border rounded p-2 border-gray-300"
                        placeholder="Ingrese la descripción"
                    />
                </div>

                {/* Third row: State, Quantity, Project */}
                <div className="flex flex-col md:flex-row md:gap-4 mb-4">
                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
                        <label
                            htmlFor="quantity"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Cantidad <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("quantity", { required: true, min: 1 })}
                            type="number"
                            id="quantity"
                            className="border rounded text-sm p-2 border-gray-300 h-10"
                            placeholder="Ingrese la cantidad"
                        />
                    </div>

                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
                        <label
                            htmlFor="state"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Estado <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("state", { required: true })}
                            id="state"
                            className="border rounded p-2 border-gray-300 h-10"
                        >
                            <option value="ACTIVE">Activo</option>
                            <option value="INACTIVE">Inactivo</option>
                            <option value="ON_REPAIR">En reparación</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
                        <label
                            htmlFor="projectId"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Proyecto <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("projectId", { required: true })}
                            id="projectId"
                            className="border rounded p-2 border-gray-300 h-10"
                        >
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
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
