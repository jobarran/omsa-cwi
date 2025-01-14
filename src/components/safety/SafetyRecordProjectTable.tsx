"use client"

import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { SafetyRecords } from "@/types";
import { FaCheck, FaGoogleDrive, FaTimes } from "react-icons/fa"; // Icons for check and X
import { Company } from "@prisma/client";
import { FaArrowRotateRight } from "react-icons/fa6";
import { Pagination, SafetyExpirationBullet } from "..";
import { usePagination } from "@/hooks/usePagination";

interface Props {
    safetys: ProjectSafetyTable;
    selectedCompany: Company;
    safetyRequireRecords: string[]
    projectWorkers: [] | {
        legajo: string;
        name: string;
        lastName: string;
    }[]
}

// Helper function to translate record name
const translateRecordName = (name: string): string => {
    const record = SafetyRecords.find((r) => r.shortName === name || r.name === name);
    return record ? record.name : name;
};

// Helper function to get the latest safety record file based on the expirationDate
const getLatestSafetyRecordFile = (safetyRecordFiles: { documentationLink: string | null; expirationDate: Date | null }[]) => {
    return safetyRecordFiles.reduce<{ documentationLink: string | null; expirationDate: Date | null }>((latest, current) => {
        // Ensure both latest.expirationDate and current.expirationDate are not null before comparing
        if (!latest.expirationDate || (current.expirationDate && current.expirationDate > latest.expirationDate)) {
            return current;
        }
        return latest;
    }, { documentationLink: null, expirationDate: null });
};


export const SafetyRecordProjectTable = ({ safetys, selectedCompany }: Props) => {

    const filteredSafetys = selectedCompany
        ? safetys.safety.filter((safety) => safety.company === selectedCompany)  // Filter the safety array inside safetys
        : safetys.safety;  // If no company is selected, return the full safety array

    // Flatten the safetyRecords from all projects and companies into a single array
    const allSafetyRecords = selectedCompany
        ? filteredSafetys
            .filter((safety) => safety.company === selectedCompany)
            .flatMap((safety) => safety.safetyRecords) // Flatten the safetyRecords array
        : safetys.safety.flatMap((safety) => safety.safetyRecords); // Flatten all safetyRecords if no company is selected

    const { currentPage, totalPages, displayedItems, handlePageChange } = usePagination(allSafetyRecords, 20); // Paginate over safetyRecords

    return (
        <div>
            {/* Table */}
            <div className="relative overflow-x-auto sm:rounded-lg border">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-white uppercase bg-sky-800">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-center">Tipo</th>
                            <th scope="col" className="px-4 py-3 text-center">Nombre</th>
                            <th scope="col" className="px-4 py-3 text-center">Registro</th>
                            <th scope="col" className="px-4 py-3 text-center">Vencimiento</th>
                            <th scope="col" className="px-4 py-3 text-center">Requerido</th>
                            <th scope="col" className="px-4 py-3 text-center">Documentación</th>
                            <th scope="col" className="px-4 py-3 text-center">Actualzar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedItems.map((record) => {
                            // Find the corresponding safety record to check its type
                            const safetyRecord = SafetyRecords.find((r) => r.shortName === record.name);
                            if (!safetyRecord) return null;

                            // Get the latest safety record file based on expiration date
                            const latestSafetyRecordFile = getLatestSafetyRecordFile(record.safetyRecordFiles);

                            return (
                                <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 text-center">{record.user ? "Empleado" : "Empresa"}</td>
                                    <td className="px-4 py-2 text-center">{record.user ? `${record.user.lastName} ${record.user.name}` : selectedCompany}</td>
                                    <td className="px-4 py-2 text-center">{translateRecordName(record.name)}</td>
                                    <td className="flex flex-row px-4 py-2 text-center items-center">
                                        <SafetyExpirationBullet expirationDate={latestSafetyRecordFile?.expirationDate} />
                                        {latestSafetyRecordFile?.expirationDate ? new Date(latestSafetyRecordFile.expirationDate).toLocaleDateString() : "sin vencimiento"}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex justify-center items-center">
                                            <FaCheck className="text-green-600 h-5 w-5" />
                                            {/* {record.required ? <FaCheck className="text-green-600 h-5 w-5" /> : <FaTimes className="text-red-600 h-5 w-5" />} */}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex justify-center items-center">
                                            {latestSafetyRecordFile?.documentationLink ? (
                                                <a
                                                    href={latestSafetyRecordFile.documentationLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sky-800 hover:text-sky-900"
                                                >
                                                    <FaGoogleDrive className="h-5 w-5" />
                                                </a>
                                            ) : (
                                                <FaTimes className="text-gray-400 h-5 w-5" />
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => { }}
                                            className="text-sky-800 hover:text-sky-900"
                                            aria-label="Remove Record"
                                        >
                                            <FaArrowRotateRight className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isVisible={totalPages > 1}
            />
        </div>
    );
};
