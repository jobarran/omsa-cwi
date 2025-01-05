"use client";

import { SafetyTable } from "@/interfaces/safety.interface";
import { calculateDotColor } from "@/utils";
import { ProjectStatus, UserStatus } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

interface Props {
    safeties: SafetyTable[];
}

// Map ProjectStatus enum to Spanish translations
const projectStatusTranslations: { [key in ProjectStatus]: string } = {
    [ProjectStatus.PLANNING]: "Contratada",
    [ProjectStatus.IN_PROGRESS]: "Ejecución",
    [ProjectStatus.COMPLETED]: "Terminada",
    [ProjectStatus.MAINTENANCE]: "Mantenimiento",
};

// Map ProjectStatus enum to Spanish translations
const userStatusTranslations: { [key in UserStatus]: string } = {
    [UserStatus.ACTIVE]: "Activo",
    [UserStatus.INACTIVE]: "Inactivo",
};

export const SafetyTableComponent = ({ safeties }: Props) => {
    const [showUserTable, setShowUserTable] = useState(true); // Toggle between user and project tables

    return (
        <>
            <div className="flex space-x-4">
                <button
                    onClick={() => setShowUserTable(true)}
                    className={`px-4 py-2 ${showUserTable ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Safety User Table
                </button>
                <button
                    onClick={() => setShowUserTable(false)}
                    className={`px-4 py-2 ${!showUserTable ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Safety Project Table
                </button>
            </div>

            {/* Only one table is rendered based on showUserTable */}
            <div className="w-full rounded-lg">
                <div className="relative overflow-x-auto sm:rounded-lg border">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-white uppercase bg-sky-800">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-center">Nombre</th>
                                <th scope="col" className="px-4 py-3 text-center">Estado</th>
                                <th scope="col" className="px-4 py-3 text-center">Empresa</th>
                                <th scope="col" className="px-4 py-3 text-center">Seguridad</th>
                                <th scope="col" className="px-4 py-3 text-center">Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {safeties.map((safety) => (
                                // Conditionally render data based on user or project selection
                                (showUserTable ? safety.userId !== null : safety.projectId !== null) && (
                                    <tr key={safety.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-4 py-2 text-center">
                                            {showUserTable ? safety.user?.name : safety.project?.name}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {showUserTable ? userStatusTranslations[safety.user?.status] : projectStatusTranslations[safety.project?.status]}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {showUserTable ? safety.company : safety.company}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex justify-center space-x-1">
                                                {safety.safetyRecords
                                                    .filter((rec) => rec.expirationDate)  // Ensure expirationDate is not null or undefined
                                                    .sort((a, b) => {
                                                        // Sort records by expiration date (earliest first)
                                                        return new Date(a.expirationDate!).getTime() - new Date(b.expirationDate!).getTime();
                                                    })
                                                    .map((rec, i) => {
                                                        const dotStyle = calculateDotColor(rec.expirationDate);
                                                        return (
                                                            <span
                                                                key={i}
                                                                className={`h-4 w-4 rounded-full`}
                                                                style={dotStyle} // Apply the style here
                                                                title={rec.name}
                                                            />
                                                        );
                                                    })}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-center flex items-center justify-center">
                                            <Link
                                                href={`/safety/${safety.id}`}
                                                className="font-medium text-sky-800 hover:text-sky-600"
                                                title="Editar"
                                            >
                                                <FaEye className="text-xl" />
                                            </Link>
                                        </td>

                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
