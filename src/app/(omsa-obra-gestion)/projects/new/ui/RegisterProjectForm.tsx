"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerNewProject } from "@/actions";
import { useEffect, useState } from "react";
import { compressImage } from "@/utils";


// Define the form inputs
interface ProjectFormInputs {
  name: string;
  address: string;
  code: string;
  image: FileList | null;
}

interface UserSelectData {
  id: string;
  name: string;
  lastName: string;
}

interface RegisterProjectFormProps {
  users: UserSelectData[]; // List of users for the dropdown
}

export const RegisterProjectForm = ({ users }: RegisterProjectFormProps) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<ProjectFormInputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      code: "",
      image: null,
    },
  });


  const onSubmit = async (data: ProjectFormInputs) => {
    
    const formData = new FormData();

    // Append fields to FormData
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("code", data.code);

    // Handle image compression and append compressed image
    if (data.image && data.image.length > 0) {
      try {
        const compressedImage = await compressImage(data.image[0]);
        formData.append("image", compressedImage);
      } catch (error) {
        alert("Failed to compress image. Please try again.");
        return;
      }
    }

    // API call to create a new project
    const { ok, message } = await registerNewProject(formData);
    if (ok) {
      router.replace("/projects");
    } else {
      alert(`Failed to create project: ${message}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* First row: Name, Address */}
        <div className="flex flex-col md:flex-row md:gap-4 mb-4">
          <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
              Nombre del Proyecto <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese el nombre del proyecto"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">
              Dirección <span className="text-red-500">*</span>
            </label>
            <input
              {...register("address", { required: true })}
              type="text"
              id="address"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese la dirección del proyecto"
            />
          </div>
        </div>

        {/* Second row: Code */}
        <div className="flex flex-col mb-4">
          <label htmlFor="code" className="mb-1 text-sm font-medium text-gray-700">
            Código del Proyecto <span className="text-red-500">*</span>
          </label>
          <input
            {...register("code", { required: true })}
            type="text"
            id="code"
            className="border rounded p-2 border-gray-300"
            placeholder="Ingrese un código único para el proyecto"
          />
        </div>

        {/* Image upload */}
        <div className="flex flex-col mb-4">
          <label htmlFor="image" className="mb-1 text-sm font-medium text-gray-700">
            Imagen del Proyecto
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