"use client";

import { useState } from "react";
import { Safety, SafetyRecordInput } from "@/interfaces/safety.interface";
import { SafetyRecords } from "@/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { FaGoogleDrive, FaRegCopy } from "react-icons/fa";
import { FaCheck, FaPaste, FaPlus, FaUserPlus } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";
import { generateFileName } from "@/utils";
import { SafetyRecordDriveModal } from "./SafetyRecordDriveModal";

interface Props {
    formData: SafetyRecordInput;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    loading: boolean;
    handleAddSafetyRecord: () => void;
    error: string | null;
    safety: Safety;
}

export const SafetyRecordForm = ({
    formData,
    handleChange,
    loading,
    handleAddSafetyRecord,
    error,
    safety,
}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isButtonDisabled = !formData.name || !formData.expirationDate || loading;

    const fileNameData = {
        projectId: safety.projectId,
        userId: safety.userId,
        company: safety.company,
        recordName: formData.name,
        name: safety.project?.code ? safety.project.code : safety.user?.lastName ? safety.user?.lastName : ""
    };

    const handleCopyToClipboard = () => {
        const fileName = generateFileName(fileNameData);
        navigator.clipboard.writeText(fileName);
    };

    return (
        <div className="w-full justify-center items-center">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Carga de registros de seguridad</h1>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_3fr_3fr_auto] gap-4 items-end">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                        Nombre de registro <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded p-2 border-gray-300 h-11 text-base w-full"
                        required
                    >
                        <option value="">Seleccionar</option>
                        {SafetyRecords.map((record) => (
                            <option key={record.shortName} value={record.shortName}>
                                {record.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Expiration Date Field */}
                <div>
                    <label htmlFor="expirationDate" className="mb-1 text-sm font-medium text-gray-700">
                        Vencimiento <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                        selected={formData.expirationDate ? new Date(formData.expirationDate) : null}
                        onChange={(date: Date | null) => {
                            handleChange({
                                target: {
                                    name: "expirationDate",
                                    value: date ? date.toISOString().split("T")[0] : "",
                                },
                            } as React.ChangeEvent<HTMLInputElement>);
                        }}
                        dateFormat="yyyy-MM-dd"
                        className="border border-gray-300 p-2 h-11 rounded md:pr-12 w-full text-base"
                        locale={es}
                    />
                </div>

                {/* Documentation Link Field */}
                <div>
                    <label htmlFor="documentationLink" className="mb-1 text-sm font-medium text-gray-700">
                        Documentación <span className="text-gray-400">/ Link</span>
                    </label>
                    <div className="flex items-center">
                        <input
                            value={formData.documentationLink}
                            onChange={handleChange}
                            type="text"
                            id="documentationLink"
                            name="documentationLink"
                            className="border rounded-l p-2 border-gray-300 text-base w-full h-11"
                            placeholder="Ingrese link de Drive"
                            required
                            disabled={!formData.name}
                        />
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className={`bg-sky-800 hover:bg-sky-900 text-white h-11 px-4 rounded-r flex items-center justify-center ${!formData.name ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={!formData.name}
                        >
                            <FaGoogleDrive className="text-xl" />
                        </button>
                    </div>
                </div>
                {/* Required Checkbox */}
                <div className="flex flex-row justify-center items-center space-x-4">
                    <div className="flex flex-col items-center">
                        <label htmlFor="required" className="mb-1 text-sm font-medium text-gray-700">
                            Req.
                        </label>
                        <div className="relative flex items-center justify-center">
                            <input
                                id="required"
                                name="required"
                                type="checkbox"
                                checked={formData.required}
                                onChange={handleChange}
                                className="w-11 h-11 rounded-lg border-gray-300 bg-white appearance-none checked:bg-sky-900 checked:border-sky-900"
                                style={{
                                    borderWidth: "1px",
                                }}
                            />
                            <span className="absolute flex items-center justify-center pointer-events-none">
                                <FaCheck className="text-3xl text-white" />
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center">
                        <label htmlFor="required" className="mb-1 text-sm font-medium text-gray-700">
                            Agregar
                        </label>
                        <button
                            type="submit"
                            className={`flex items-center justify-center w-11 h-11 bg-sky-800 hover:bg-sky-900 transition text-white rounded-full ${isButtonDisabled ? "opacity-50" : "hover:bg-blue-700"}`}
                            disabled={isButtonDisabled}
                            onClick={handleAddSafetyRecord}
                        >
                            <FaPlus className="text-3xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <SafetyRecordDriveModal
                    handleCopyToClipboard={handleCopyToClipboard}
                    setIsModalOpen={setIsModalOpen}
                    fileNameData={fileNameData}
                />
            )}
        </div>
    );
};
