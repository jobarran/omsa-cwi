"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaGoogleDrive } from "react-icons/fa6";
import { Company } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { registerNewSafetyRecord } from "@/actions";
import { SafetyRecordDriveInstructions } from "..";
import { generateFileName, SafetyPendingRecordsResult } from "@/utils";

interface Props {
    closeModal: () => void;
    selectedCompany: Company;
    projectName: string;
    safetyId: string;
    projectCode: string
    safetyPendingRecords: SafetyPendingRecordsResult[]
}

type FileNameData = {
    origin: string;
    projectCode?: string | null;
    company: Company;
    userName: string;
    recordName?: string | null;
};

type FormInputs = {
    safetiId: string;
    userId: string;
    name: string;
    expirationDate: string;
    documentationLink: string;
};

export const SafetyRecordNewModal = ({
    closeModal,
    selectedCompany,
    projectName,
    safetyId,
    projectCode,
    safetyPendingRecords
}: Props) => {

    const [origen, setOrigen] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<{ id: string; name: string; lastName: string }[]>([]); // Store filtered users
    const [filteredRecords, setFilteredRecords] = useState<string[]>([]); // Store filtered missingRecords for the selected user
    const [fileNameData, setFileNameData] = useState<FileNameData>({
        origin: origen,
        projectCode: projectCode,
        company: selectedCompany,
        userName: '',
        recordName: undefined
    });

    useEffect(() => {
        // Find the selected company's records based on selectedCompanyProp
        const companyData = safetyPendingRecords.find(
            (record) => record.companyName === selectedCompany
        );
        if (companyData) {
            // Extract unique users from missingEmpleadoRecords
            const uniqueUsers = Array.from(
                new Map(
                    companyData.missingEmpleadoRecords.map((record) => [
                        record.userId,
                        { id: record.userId, name: record.userName, lastName: record.userLastName },
                    ])
                ).values()
            );

            setFilteredUsers(uniqueUsers); // Update the filtered users
        } else {
            setFilteredUsers([]); // Clear users if no company is found
        }
    }, [safetyPendingRecords]); // Re-run effect when the prop changes



    const {
        handleSubmit,
        register,
        formState: { isValid },
        setValue,
        reset,
        watch,
    } = useForm<FormInputs>({
        mode: "onChange",
        defaultValues: {
            safetiId: safetyId,
            userId: "",
            name: "",
            expirationDate: "",
            documentationLink: "",
        },
    });

    // Watch values to dynamically update fileNameData
    const userId = watch("userId");
    const recordName = watch("name");

    const handleResetAll = () => {
        reset({
            userId: "",
            name: "",
            expirationDate: "",
            documentationLink: "",
        });
        setFileNameData({
            origin: origen,
            projectCode: projectCode,
            company: selectedCompany,
            userName: '',
            recordName: undefined
        });
    };

    useEffect(() => {
        if (userId) {
            const companyData = safetyPendingRecords.find((record) => record.companyName === selectedCompany);
            if (companyData) {
                const userRecords = companyData.missingEmpleadoRecords.filter(
                    (record) => record.userId === userId
                );
                const recordNames = userRecords.map((record) => record.missingRecord); // Extract missingRecord values

                setFilteredRecords(recordNames); // Update the filtered records
            }
        } else {
            const companyData = safetyPendingRecords.find((record) => record.companyName === selectedCompany);
            if (companyData) {
                const recordNames = companyData.missingEmpresaRecords
                setFilteredRecords(recordNames); // Update the filtered records
            }
        }
    }, [userId, selectedCompany, safetyPendingRecords]);


    useEffect(() => {
        handleResetAll()
    }, [origen]);

    useEffect(() => {
        if (userId) {
            // Find the user matching the userId
            const foundUser = filteredUsers.find((user) => user.id === userId);

            // If a user is found, update the userName in fileNameData
            setFileNameData((prev) => ({
                ...prev,
                userName: foundUser ? foundUser.lastName : '', // Set the last name if found
                recordName: recordName || undefined,
                origen: origen || undefined
            }));
        } else {
            // If userId is undefined or empty, reset userName
            setFileNameData((prev) => ({
                ...prev,
                userName: '',
                recordName: recordName || undefined,
                origen: origen || undefined
            }));
        }

        // Log the userName for debugging
        console.log(fileNameData.userName);
    }, [userId, recordName, origen, filteredUsers]);



    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();

        // Flatten the data and append each individual field
        formData.append('safetyId', safetyId);
        formData.append('userId', data.userId || '');
        formData.append('projectId', projectCode);
        formData.append('company', selectedCompany);
        formData.append('name', data.name);
        formData.append('expirationDate', data.expirationDate);
        formData.append('documentationLink', data.documentationLink);

        try {
            const result = await registerNewSafetyRecord(formData);  // Send the structured data

            if (result.ok) {
                closeModal();
                handleResetAll();
                console.log("Safety record successfully created or updated.");
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error creating safety record:", error);
        }
    };




    const handleCopyToClipboard = () => {
        const fileName = generateFileName(fileNameData);
        navigator.clipboard.writeText(fileName);
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 h-full md:h-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">{projectName}</h2>
                    <p className="text-md text-gray-500">{selectedCompany}</p>
                    <p className="text-sm text-gray-500">Crear un nuevo registro de seguridad</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full gap-4">
                        {/* Origen Field */}
                        <div>
                            <label htmlFor="origen" className="mb-1 text-sm font-medium text-gray-700">
                                Origen <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="origen"
                                value={origen}
                                onChange={(e) => setOrigen(e.target.value)}
                                className="border rounded p-2 border-gray-300 h-11 text-base w-full"
                            >
                                <option value="">Seleccione Origen</option>
                                <option value="empresa">Empresa</option>
                                <option value="empleado">Empleado</option>
                            </select>
                        </div>

                        {/* User Dropdown (Visible when origen === "empleado") */}
                        {origen === "empleado" && (
                            <div className="w-full">
                                <label htmlFor="userId" className="mb-1 text-sm font-medium text-gray-700">
                                    Usuario <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="userId"
                                    className="border rounded p-2 border-gray-300 h-11 text-base w-full"
                                    onChange={(e) => setValue("userId", e.target.value)}
                                >
                                    <option value="">Seleccione un usuario</option>
                                    {filteredUsers.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Name Field (Filtered by selected user) */}
                        <div>
                            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                                Nombre de registro <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="name"
                                {...register("name", { required: true })}
                                className={`border rounded p-2 border-gray-300 h-11 text-base w-full ${!origen ? "opacity-50" : ""}`}
                                disabled={!origen || filteredRecords.length === 0}
                            >
                                <option value="">Seleccionar</option>
                                {filteredRecords.map((record) => (
                                    <option key={record} value={record}>
                                        {record}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Expiration Date Field */}
                    <div>
                        <label htmlFor="expirationDate" className="mb-1 text-sm font-medium text-gray-700">
                            Vencimiento
                        </label>
                        <DatePicker
                            selected={watch("expirationDate") ? new Date(watch("expirationDate")) : null}
                            onChange={(date: Date | null) => setValue("expirationDate", date ? date.toISOString().split("T")[0] : "")}
                            dateFormat="yyyy-MM-dd"
                            className="border border-gray-300 p-2 h-11 rounded md:pr-12 w-full text-base"
                            locale={es}
                            disabled={!watch("name")}
                            placeholderText="Sin vencimiento"
                        />
                    </div>

                    <div>
                        <label htmlFor="documentationLink" className="mb-1 text-sm font-medium text-gray-700">
                            Documentación <span className="text-gray-400">/ Link</span>
                        </label>
                        <div className="flex items-center">
                            <input
                                value={watch("documentationLink")}
                                onChange={(e) => setValue("documentationLink", e.target.value)}
                                type="text"
                                id="documentationLink"
                                name="documentationLink"
                                className="border rounded-l p-2 border-gray-300 text-base w-full h-11"
                                placeholder="Ingrese link de Drive"
                                disabled={!watch("name")}
                            />
                            <button
                                type="button"
                                className={`bg-sky-800 hover:bg-sky-900 text-white h-11 px-4 rounded-r flex items-center justify-center ${!watch("name") ? "opacity-50" : ""}`}
                                disabled={!watch("name")}
                            >
                                <FaGoogleDrive className="text-xl" />
                            </button>
                        </div>

                        <SafetyRecordDriveInstructions
                            handleCopyToClipboard={handleCopyToClipboard}
                            fileNameData={{
                                origin: origen,
                                projectCode: projectCode,
                                company: selectedCompany,
                                userName: fileNameData.userName,
                                recordName: fileNameData.recordName
                            }}
                        />

                        {/* Submit and Cancel Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-500 rounded transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={`px-6 py-2 bg-sky-800 hover:bg-sky-900 text-white rounded transition ${isValid ? "" : "opacity-50"
                                    }`}
                                disabled={!isValid}
                            >
                                Agregar
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};
