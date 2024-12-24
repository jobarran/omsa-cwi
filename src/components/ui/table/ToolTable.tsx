"use client"

import { Tool, ToolCategory } from "@/interfaces/tool.interface";
import { TableImage } from "./TableImage";
import Link from "next/link";
import { FaArrowRightArrowLeft, FaEye, } from "react-icons/fa6";
import { ToolTableModal } from "./ToolTableModal";
import { useState } from "react";
import { ProjectData } from "@/interfaces/project.interface";
import { UserPermission } from "@prisma/client";
import { calculateYearsAndMonths, getPermissionBoolean } from "@/utils";
import { Pagination } from "@/components";
import { usePagination } from "@/hooks/usePagination";

interface Props {
    tools: Tool[];
    projects: ProjectData[]
    toolCategories: ToolCategory[] | null
    userPermissions: UserPermission[] | null;
}

export const ToolTable = ({ tools, projects, toolCategories, userPermissions }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);

    const { currentPage, totalPages, displayedItems, handlePageChange } = usePagination(tools, 10);

    const isToolAdmin = getPermissionBoolean(userPermissions, "ADMIN", "TOOL")

    const openModal = (tool: Tool, field: string) => {
        setSelectedTool(tool);
        setFieldToEdit(field);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTool(null);
        setFieldToEdit(null);
    };

    const getStateLabel = (state: string) => {
        switch (state) {
            case "ACTIVE":
                return "Activo";
            case "ON_REPAIR":
                return "En reparación";
            case "INACTIVE":
                return "Inactivo";
            default:
                return "";
        }
    };

    return (
        <div>
            <div className="relative overflow-x-auto sm:rounded-lg border">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-white uppercase bg-sky-800">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-center">#</th>
                            <th scope="col" className="px-4 py-3 text-center">Imágen</th>
                            <th scope="col" className="px-4 py-3 text-center">Código</th>
                            <th scope="col" className="px-4 py-3 text-center">Nombre</th>
                            <th scope="col" className="px-4 py-3 text-center">Marca</th>
                            <th scope="col" className="px-4 py-3 text-center">Tiempo</th>
                            <th scope="col" className="px-4 py-3 text-center">Categoría</th>
                            <th scope="col" className="px-4 py-3 text-center">Obra</th>
                            <th scope="col" className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedItems.length > 0 ? (
                            displayedItems.map((tool, index) => (
                                <tr key={tool.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="w-14 h-14 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mx-auto">
                                            <TableImage
                                                src={tool.image[0]?.url}
                                                alt={tool.name}
                                                className="object-cover"
                                                width={0}
                                                height={0}
                                                style={{ width: "100%", height: "100%" }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {tool.code.length > 12 ? `${tool.code.substring(0, 12)}...` : tool.code}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center whitespace-nowrap">
                                            <div
                                                title={getStateLabel(tool.state)}
                                                className={`w-3 h-3 rounded-full mr-2 ${tool.state === "ACTIVE"
                                                    ? "bg-green-600"
                                                    : tool.state === "ON_REPAIR"
                                                        ? "bg-yellow-600"
                                                        : "bg-red-600"
                                                    }`}
                                            ></div>
                                            {tool.name.length > 15 ? `${tool.name.substring(0, 15)}...` : tool.name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap">{tool.brand}</td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap">
                                        {tool.boughtAt ? calculateYearsAndMonths(tool.boughtAt) : "-"}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {tool.categories && tool.categories.length > 0 ? (
                                            tool.categories.map((category, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-teal-100 text-teal-800 px-1 py-1 text-xs rounded-lg m-1"
                                                >
                                                    {category.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center">
                                            {tool.project?.code}
                                            {isToolAdmin &&
                                                <button
                                                    className="font-medium text-sky-800 hover:text-sky-600"
                                                    title="Transferir"
                                                    onClick={() => openModal(tool, "projectId")}
                                                >
                                                    <FaArrowRightArrowLeft className="text-lg ml-2" />
                                                </button>
                                            }
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`/tools/${tool.code}`}
                                                className="font-medium text-sky-800 hover:text-sky-600"
                                                title="Editar"
                                            >
                                                <FaEye className="text-xl" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-4 py-2 text-center text-gray-700">
                                    Sin resultados
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

                {isModalOpen && selectedTool && fieldToEdit && (
                    <ToolTableModal
                        tool={selectedTool}
                        field={fieldToEdit}
                        projects={projects}
                        closeModal={closeModal}
                        categories={toolCategories}
                    />
                )}

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
