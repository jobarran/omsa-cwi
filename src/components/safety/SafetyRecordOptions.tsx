"use client";

import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { InputSearch } from "../ui/inputs/InputSearch";
import { SafetyRecordConfigurationModal } from "./SafetyRecordConfigurationModal";
import { SafetyRecords } from "@/types";
import { Company } from "@prisma/client";
import { SafetyRecordNewModal } from "./SafetyRecordNewModal";
import { SafetyPendingRecordsResult } from "@/utils";

interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
    resetSearchTerm: () => void;
    projectCode: string;
    selectedCompany: Company;
    projectName: string;
    safetyId: string;
    safetyRequireRecords: string[];
    safetyPendingRecords: SafetyPendingRecordsResult[]
}

export const SafetyRecordOptions = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    resetSearchTerm,
    projectCode,
    selectedCompany,
    projectName,
    safetyId,
    safetyRequireRecords,
    safetyPendingRecords
}: Props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRecordModalIsOpen, setNewRecordModalIsOpen] = useState(false); // New modal for creating records

    const closeModal = () => setModalIsOpen(false);
    const closeNewRecordModal = () => setNewRecordModalIsOpen(false);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            {/* Input Search and Add Button */}
            <div className="flex flex-row sm:items-center w-full gap-2">
                <div className="flex-grow">
                    <InputSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={handleSearch}
                        resetSearchTerm={resetSearchTerm}
                    />
                </div>
                <button
                    onClick={() => setNewRecordModalIsOpen(true)} // Open the new safety record modal
                    className="flex flex-row justify-center items-center px-3 h-8 rounded-lg border text-sm font-medium bg-sky-800 text-white hover:bg-sky-900 transition sm:w-auto sm:px-4"
                >
                    <span className="hidden sm:block text-nowrap">Nuevo Registro</span>
                    <span className="block sm:hidden">+</span>
                </button>
                <button
                    onClick={() => setModalIsOpen(true)}
                    className="flex flex-row justify-center items-center px-3 h-8 rounded-lg border text-sm font-medium bg-sky-800 text-white hover:bg-sky-900 transition sm:w-auto sm:px-4"
                >
                    <span className="hidden sm:block text-nowrap">Configurar</span>
                    <FaGear className="block sm:hidden" />
                </button>
            </div>

            {modalIsOpen && (
                <SafetyRecordConfigurationModal
                    closeModal={closeModal}
                    safetyRecords={SafetyRecords}
                    projectName={projectName}
                    selectedCompany={selectedCompany}
                    safetyId={safetyId}
                    safetyRequireRecords={safetyRequireRecords}
                />
            )}

            {newRecordModalIsOpen && (
                <SafetyRecordNewModal
                    closeModal={closeNewRecordModal}
                    selectedCompany={selectedCompany}
                    projectName={projectName}
                    safetyId={safetyId}
                    projectCode={projectCode}
                    safetyPendingRecords={safetyPendingRecords}
                />
            )}
        </div>
    );
};
