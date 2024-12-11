import { Tool } from "@/interfaces/tool.interface";
import { TableImage } from "./TableImage";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { FaArrowRightArrowLeft, FaPen } from "react-icons/fa6";

interface Props {
    tools: Tool[];
}

export const ToolTable = ({ tools }: Props) => {
    // Function to translate the state to Spanish
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
        <div className="relative overflow-x-auto sm:rounded-lg border">
            <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-sky-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">#</th>
                        <th scope="col" className="px-6 py-3 text-center">Imágen</th>
                        <th scope="col" className="px-6 py-3 text-center">Código</th>
                        <th scope="col" className="px-6 py-3 text-center">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-center">Marca</th>
                        <th scope="col" className="px-6 py-3 text-center">Cant.</th>
                        <th scope="col" className="px-6 py-3 text-center">Obra</th>
                        <th scope="col" className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.length > 0 ? (
                        tools.map((tool, index) => (
                            <tr key={tool.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-center">{index + 1}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mx-auto">
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
                                <td className="px-6 py-4 text-center">{tool.code}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center">
                                        <div
                                            title={getStateLabel(tool.state)}
                                            className={`w-3 h-3 rounded-full mr-2 ${tool.state === "ACTIVE"
                                                ? "bg-green-600"
                                                : tool.state === "ON_REPAIR"
                                                    ? "bg-yellow-600"
                                                    : "bg-red-600"
                                                }`}
                                        ></div>
                                        {tool.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">{tool.brand}</td>
                                <td className="px-6 py-4 text-center">{tool.quantity}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center">
                                        {tool.project?.name}
                                        <button
                                            className="font-medium text-sky-800 hover:text-sky-600"
                                            title="Transferir"
                                        >
                                            <FaArrowRightArrowLeft className="text-lg ml-2" />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link
                                            href={`/tools/${tool.id}`}
                                            className="font-medium text-sky-800 hover:text-sky-600"
                                            title="Editar"
                                        >
                                            <FaPen className="text-lg" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-6 py-4 text-center text-gray-700">
                                Sin resultados
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};
