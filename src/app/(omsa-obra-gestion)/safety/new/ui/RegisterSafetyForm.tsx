"use client";

import { createSafety } from "@/actions";
import { SafetyRecordsComponent } from "@/components";
import { User, UserSafetyData } from "@/interfaces";
import { projectidName } from "@/interfaces/project.interface";
import { SafetySmall } from "@/interfaces/safety.interface"; // Updated import
import { Company as PrismaCompany } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { FaAnglesRight, FaCheck } from "react-icons/fa6";

// Enum for company options
const companyEnum = Object.values(PrismaCompany);

type FormInputs = {
    projectId: string | null;
    userId: string | null;
    company: string;
};

interface Props {
    projects: projectidName[]; // Added safety field
    users: UserSafetyData[];
}

export const RegisterSafetyForm = ({ projects, users }: Props) => {
    const router = useRouter();

    const {
        handleSubmit,
        register,
        setValue,
        formState: { isValid },
        watch,
    } = useForm<FormInputs>({
        mode: "onChange",
        defaultValues: {
            projectId: null,
            userId: null,
            company: "",
        },
    });

    const [origen, setOrigen] = useState<string>("");
    const [safetyCreated, setSafetyCreated] = useState<boolean>(false);
    const [safety, setSafety] = useState<SafetySmall | undefined>();
    const [disableSafetyFields, setDisableSafetyFields] = useState<boolean>(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true); // State to manage button enable/disable

    const watchProjectId = watch("projectId");
    const watchUserId = watch("userId");
    const watchCompany = watch("company");

    // If projectId is selected, set userId to null and vice versa
    useEffect(() => {
        if (watchProjectId) {
            setValue("userId", null); // Clear userId when projectId is selected
            setValue("company", "")
        } else if (watchUserId) {
            setValue("projectId", null); // Clear projectId when userId is selected
        }
    }, [watchProjectId, watchUserId, setValue]);

    // Update company field when userId changes
    useEffect(() => {
        if (watchUserId) {
            const selectedUser = users.find((user) => user.id === watchUserId);
            if (selectedUser) {
                setValue("company", selectedUser.company); // Set company based on selected user
            }
        }
    }, [watchUserId, users, setValue]);

    // Manage submit button disabled state
    useEffect(() => {
        if (origen === "") {
            setIsSubmitDisabled(true);
        } else if (origen === "obra" && (watchProjectId === null || watchCompany === "")) {
            setIsSubmitDisabled(true);
        } else if (origen === "operario" && watchUserId === null) {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    }, [origen, watchProjectId, watchCompany, watchUserId]);

    useEffect(() => {
        setValue("userId", null);
        setValue("company", "")
        setValue("projectId", null);
    }, [origen]);

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();
        const { ...safetyToSave } = data;

        Object.entries(safetyToSave).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        const { message, ok, safety } = await createSafety(formData);

        if (ok && safety) {
            setSafetyCreated(true);
            setSafety(safety);
            setDisableSafetyFields(true)
            setIsSubmitDisabled(true)
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col md:flex-row w-full gap-4">
                    {/* Origen dropdown */}
                    <div className="w-full md:w-1/3">
                        <label htmlFor="origen" className="mb-1 text-sm font-medium text-gray-700">
                            Origen <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="origen"
                            value={origen}
                            onChange={(e) => setOrigen(e.target.value)}
                            className="border rounded p-2 border-gray-300 h-11 text-base w-full"
                            disabled={disableSafetyFields}
                        >
                            <option value="">Seleccione Origen</option>
                            <option value="obra">Obra</option>
                            <option value="operario">Operario</option>
                        </select>
                    </div>

                    {/* Conditionally render projectId dropdown if "obra" is selected */}
                    {origen === "obra" && (
                        <div className="w-full md:w-1/3">
                            <label htmlFor="projectId" className="mb-1 text-sm font-medium text-gray-700">
                                Obra <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("projectId", { required: !watchUserId })}
                                id="projectId"
                                className="border rounded p-2 border-gray-300 h-11 text-base w-full"
                                disabled={disableSafetyFields}
                            >
                                <option value="">Seleccione una obra</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Conditionally render userId dropdown if "operario" is selected */}
                    {origen === "operario" && (
                        <div className="w-full md:w-2/3">
                            <label htmlFor="userId" className="mb-1 text-sm font-medium text-gray-700">
                                Usuario <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("userId", { required: !watchProjectId })}
                                id="userId"
                                className="border rounded p-2 border-gray-300 h-11 text-base w-full"
                                disabled={disableSafetyFields}
                            >
                                <option value="">Seleccione un usuario</option>
                                {users.map((user) => (
                                    <option
                                        key={user.id}
                                        value={user.id}
                                        disabled={!!user.safety}
                                        className={user.safety ? "text-green-600" : "text-gray-700"} // Green for disabled users
                                    >
                                        {user.name} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Conditionally render company dropdown and disable options if necessary */}
                    {origen === "obra" && watchProjectId && (
                        <div className="w-full md:w-1/3">
                            <label htmlFor="company" className="mb-1 text-sm font-medium text-gray-700">
                                Empresa <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("company", { required: true })} // Ensure the field is registered
                                id="company"
                                className="border rounded p-2 border-gray-300 h-11 text-base w-full"
                                disabled={disableSafetyFields}
                            >
                                <option value="">Seleccione una empresa</option>
                                {companyEnum.map((company) => {
                                    // Get the selected project
                                    const selectedProject = projects.find(
                                        (project) => project.id === watchProjectId
                                    );

                                    // Check if the selected project's safety has the current company
                                    const isDisabled =
                                        selectedProject?.safety?.some(
                                            (safety) => safety.company === company
                                        ) || false;

                                    return (
                                        <option
                                            key={company}
                                            value={company}
                                            disabled={isDisabled}
                                            className={isDisabled ? "text-green-600" : "text-gray-700"} // Highlight disabled options
                                        >
                                            {company}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    )}

                    <div className="flex flex-col items-center">
                        <label htmlFor="required" className="mb-1 text-sm font-medium text-gray-700 text-center">
                            Seguir
                        </label>
                        {safetyCreated ? (
                            // Display green check icon if safety is created
                            <div className="flex items-center justify-center w-11 h-11 bg-green-600 hover:bg-green-700 transition text-white rounded-full">
                                <FaCheck className="text-3xl" />
                            </div>
                        ) : (
                            // Display submit button if not created
                            <button
                                type="submit"
                                className={`flex items-center justify-center w-11 h-11 bg-sky-800 hover:bg-sky-900 transition text-white rounded-full ${isSubmitDisabled ? "opacity-50" : "hover:bg-blue-700"}`}
                                disabled={isSubmitDisabled}
                            >
                                <FaAnglesRight className="text-3xl" />
                            </button>
                        )}
                    </div>
                </div>

            </form>

            {safetyCreated && safety && <SafetyRecordsComponent safety={safety} />}
        </div>
    );
};
