"use client";

import { registerNewUser } from "@/actions";
import { compressImage } from "@/utils";
import { UserCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale'; // Import Spanish locale

type FormInputs = {
  name: string;
  lastName: string;
  phone: string;
  image: FileList | null;
  legajo: string;
  company: "OMSA" | "CWI";
  category: "N_A" | "AYUDANTE" | "MEDIO_OFICIAL" | "OFICIAL" | "OFICIAL_ESPECIALIZADO" | "CAPATAZ";
  entryDate: string

};

export const RegisterWorkerForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue,
    watch,
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      image: null,
      legajo: "",
      company: "CWI",
      category: "N_A",
      entryDate: ""
    },
  });

  const onSubmit = async (data: FormInputs) => {

    const formData = new FormData();

    const { image, ...userToSave } = data;
    formData.append("role", "WORKER"); // Fixed role
    formData.append("password", "123456"); // Fixed password

    const email = `${data.name[0].toLowerCase().replace(/\s/g, '')}${data.lastName.toLowerCase().replace(/\s/g, '')}@obrasmetalicas.com.ar`;
    formData.append("email", email);



    Object.entries(userToSave).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (image && image.length > 0) {
      try {
        const compressedImage = await compressImage(image[0]);
        formData.append("image", compressedImage);
      } catch (error) {
        alert("Failed to compress image. Please try again.");
        return;
      }
    }

    const { message, ok } = await registerNewUser(formData);

    if (ok) {
      router.replace(`/workers`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* First row: Name, LastName */}
        <div className="flex flex-col md:flex-row md:gap-4 md:mb-4">
          <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="border rounded p-2 border-gray-300 text-base"
              placeholder="Ingrese su nombre"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="lastName" className="mb-1 text-sm font-medium text-gray-700">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName", { required: true })}
              type="text"
              id="lastName"
              className="border rounded p-2 border-gray-300 text-base"
              placeholder="Ingrese su apellido"
            />
          </div>
        </div>

        {/* Second row: Phone, Company */}
        <div className="flex flex-col md:flex-row md:gap-4 md:mb-4">
          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="phone" className="mb-1 text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              {...register("phone")}
              type="text"
              id="phone"
              className="border rounded p-2 border-gray-300 h-11 text-base"
              placeholder="Ingrese su teléfono"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="company" className="mb-1 text-sm font-medium text-gray-700">
              Empresa <span className="text-red-500">*</span>
            </label>
            <select
              {...register("company", { required: true })}
              id="company"
              className="border rounded p-2 border-gray-300 h-11 text-base"
            >
              <option value="OMSA">OMSA</option>
              <option value="CWI">CWI</option>
            </select>
          </div>

          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="entryDate" className="mb-1 text-sm font-medium text-gray-700">
              Fecha de ingreso <span className="text-red-500">*</span>
            </label>
            <DatePicker
              selected={watch("entryDate") ? new Date(watch("entryDate")) : null}
              onChange={(date: Date | null) => setValue("entryDate", date ? date.toISOString().split("T")[0] : "")}
              dateFormat="yyyy-MM-dd"
              className="border p-2 border-gray-300 h-11 text-base rounded w-full"
              locale={es}
            />
          </div>

        </div>

        {/* Third row: Legajo and Category */}
        <div className="flex flex-col md:flex-row md:gap-4 md:mb-4">
          <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="legajo" className="mb-1 text-sm font-medium text-gray-700">
              Legajo <span className="text-red-500">*</span>
            </label>
            <input
              {...register("legajo", { required: true })}
              type="text"
              id="legajo"
              className="border rounded p-2 border-gray-300 h-11 text-base"
              placeholder="Ingrese el legajo"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="category" className="mb-1 text-sm font-medium text-gray-700">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category", { required: true })}
              id="category"
              className="border rounded p-2 border-gray-300  h-11 text-base"
            >
              <option value="N_A">No Aplica</option>
              <option value="AYUDANTE">Ayudante</option>
              <option value="MEDIO_OFICIAL">Medio Oficial</option>
              <option value="OFICIAL">Oficial</option>
              <option value="OFICIAL_ESPECIALIZADO">Oficial Especializado</option>
              <option value="CAPATAZ">Capataz</option>
            </select>
          </div>
        </div>

        {/* Image upload */}
        <div className="flex flex-col mb-4">
          <label htmlFor="image" className="mb-1 text-sm font-medium text-gray-700">
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
          Registrar
        </button>
      </form>
    </div>
  );
};
