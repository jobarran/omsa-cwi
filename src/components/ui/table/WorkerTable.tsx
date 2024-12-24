"use client"

import { User } from "@/interfaces";
import { FaArrowRightArrowLeft, FaUser } from "react-icons/fa6";
import { TableImage } from "./TableImage";
import Link from "next/link";
import { useState } from "react";
import { AdminTableModal } from "./AdminTableModal";
import { ProjectData } from "@/interfaces/project.interface";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components";

interface Props {
    workers: User[];
    projects: ProjectData[];
}

const transcribeCategory = (category: string | undefined): string => {
    const transcriptionMap: Record<string, string> = {
        N_A: "-",
        AYUDANTE: "Ay",
        MEDIO_OFICIAL: "Med Of",
        OFICIAL: "Of",
        OFICIAL_ESPECIALIZADO: "Of Esp",
        CAPATAZ: "Cap",
    };
    return transcriptionMap[category || "N_A"] || "-";
};

export const WorkerTable = ({ workers, projects }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);

    const { currentPage, totalPages, displayedItems, handlePageChange } = usePagination(workers, 15);

    const openModal = (user: User, field: string) => {
        setSelectedUser(user);
        setFieldToEdit(field);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setFieldToEdit(null);
    };

    return (
        <div>
            <div className="relative overflow-x-auto sm:rounded-lg border">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-white uppercase bg-sky-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">#</th>
                            <th scope="col" className="px-6 py-3 text-center">Legajo</th>
                            <th scope="col" className="px-6 py-3 text-center">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-center">Categoría</th>
                            <th scope="col" className="px-6 py-3 text-center">Proyecto</th>
                            <th scope="col" className="px-6 py-3 text-center">Teléfono</th>
                            <th scope="col" className="px-6 py-3 text-center">Perfil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.length > 0 ? (
                            workers.map((worker, index) => (
                                <tr key={worker.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-center">{index + 1}</td>
                                    <td className="px-6 py-4 text-center">{worker.legajo || "N/A"}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        {worker.lastName}, {worker.name}
                                    </td>
                                    <td className="px-6 py-4 text-center">{transcribeCategory(worker.category)}</td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center justify-center">
                                            {worker.projects && worker.projects.length > 0 ? (
                                                worker.projects.map((project: { name: string; code: string }, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-sky-100 text-sky-800 px-1 py-1 text-xs rounded-lg m-1"
                                                    >
                                                        {project.code}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400">Sin obras</span>
                                            )}
                                            <FaArrowRightArrowLeft
                                                className="inline-block ml-2 text-sky-600 cursor-pointer"
                                                onClick={() => openModal(worker, "projects")}

                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">{worker.phone || "N/A"}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            href={`workers/${worker.legajo}`}
                                            className="text-sky-600 hover:text-sky-800"
                                            title="Editar"
                                        >
                                            <FaUser className="inline-block" />
                                        </Link>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-700">
                                    Sin resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {isModalOpen && selectedUser && fieldToEdit && (
                    <AdminTableModal
                        user={selectedUser}
                        field={fieldToEdit}
                        projects={projects}
                        closeModal={closeModal}
                    />
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
