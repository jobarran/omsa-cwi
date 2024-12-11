"use client";

import { registerNewUser } from "@/actions";
import { UserPermission } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  lastName: string;
  email: string | undefined;
  phone: string;
  password: string | undefined;
  role: "ADMIN" | "PROJECT_MANAGER" | "WORKER";
  image: string | null;
  permissions: UserPermission[];
  legajo: string;
  company: "OMSA" | "CWI";
};

export const RegisterUserForm = () => {
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
      email: "",
      phone: "",
      password: "123456",
      role: "PROJECT_MANAGER",
      image: null,
      permissions: [],
      legajo: "",
      company: "CWI",
    },
  });

  // Watch the role field to dynamically disable email and password
  const role = watch("role");

  // Set default email based on first name and last name
  useEffect(() => {
    const name = watch("name");
    const lastName = watch("lastName");

    if (name && lastName) {
      const email = `${name[0].toLowerCase()}${lastName.toLowerCase()}@obrasmetalicas.com.ar`;
      setValue("email", email);
    }
  }, [watch, setValue]);


  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { image, ...userToSave } = data;
    Object.entries(userToSave).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (image && image.length > 0) {
      formData.append("image", image[0]);
    }

    const { message, ok } = await registerNewUser(formData);

    console.log(message);

    if (ok) {
      router.replace(`/admin`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* First row: Name, LastName, Email */}
        <div className="flex flex-col md:flex-row md:gap-4 mb-4">
          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese su nombre"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="lastName" className="mb-1 text-sm font-medium text-gray-700">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName", { required: true })}
              type="text"
              id="lastName"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese su apellido"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              id="password"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese su contraseña"
              disabled={role === "WORKER"} // Disable password if role is WORKER
            />
          </div>
        </div>

        {/* Second row: Phone, Password */}
        <div className="flex flex-col md:flex-row md:gap-4 mb-4">
          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="phone" className="mb-1 text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              {...register("phone")}
              type="text"
              id="phone"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese su teléfono"
            />
          </div>
          <div className="flex flex-col w-full md:w-2/3 mb-4 md:mb-0">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese su correo electrónico"
              disabled={role === "WORKER"} // Disable email if role is WORKER
            />
          </div>
        </div>

        {/* Third row: Role */}
        <div className="flex flex-col mb-4">
          <label htmlFor="role" className="mb-1 text-sm font-medium text-gray-700">
            Rol <span className="text-red-500">*</span>
          </label>
          <select
            {...register("role", { required: true })}
            id="role"
            className="border rounded p-2 border-gray-300 h-10"
          >
            <option value="ADMIN">Administrador</option>
            <option value="PROJECT_MANAGER">Jefe de Obra</option>
            <option value="WORKER">Operario</option>
          </select>
        </div>

        {/* Fourth row: Legajo and Company */}
        <div className="flex flex-col md:flex-row md:gap-4 mb-4">
          <div className="flex flex-col w-full md:w-1/3 mb-4 md:mb-0">
            <label htmlFor="legajo" className="mb-1 text-sm font-medium text-gray-700">
              Legajo <span className="text-red-500">*</span>
            </label>
            <input
              {...register("legajo", { required: true })}
              type="text"
              id="legajo"
              className="border rounded p-2 border-gray-300"
              placeholder="Ingrese el legajo"
            />
          </div>
          <div className="flex flex-col w-full md:w-2/3 mb-4 md:mb-0">
            <label htmlFor="company" className="mb-1 text-sm font-medium text-gray-700">
              Empresa <span className="text-red-500">*</span>
            </label>
            <select
              {...register("company", { required: true })}
              id="company"
              className="border rounded p-2 border-gray-300 h-10"
            >
              <option value="OMSA">OMSA</option>
              <option value="CWI">CWI</option>
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