import { SafetyTable as SafetyTableType } from "@/interfaces/safety.interface";
import { ProjectStatus, UserStatus } from "@prisma/client";
import { calculateDotColor } from "@/utils";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";

interface Props {
    safeties: SafetyTableType[];
    showUserTable: boolean;
}

const projectStatusTranslations: { [key in ProjectStatus]: string } = {
    [ProjectStatus.PLANNING]: "Contratada",
    [ProjectStatus.IN_PROGRESS]: "Ejecución",
    [ProjectStatus.COMPLETED]: "Terminada",
    [ProjectStatus.MAINTENANCE]: "Mantenimiento",
};

const userStatusTranslations: { [key in UserStatus]: string } = {
    [UserStatus.ACTIVE]: "Activo",
    [UserStatus.INACTIVE]: "Inactivo",
};

export const SafetyTable = ({ safeties, showUserTable }: Props) => {
    return (
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
                        (showUserTable ? safety.userId !== null : safety.projectId !== null) && (
                            <tr
                                key={safety.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    {showUserTable
                                        ? `${safety.user?.name || ""} ${safety.user?.lastName || ""}`.trim()
                                        : safety.project?.name}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {showUserTable
                                        ? userStatusTranslations[safety.user?.status]
                                        : projectStatusTranslations[safety.project?.status]}
                                </td>
                                <td className="px-4 py-2 text-center">{safety.company}</td>
                                <td className="px-4 py-2 text-center">
                                    <div className="flex justify-center space-x-1">
                                        {safety.safetyRecords
                                            .filter((rec) => rec.expirationDate)
                                            .sort(
                                                (a, b) =>
                                                    new Date(a.expirationDate!).getTime() -
                                                    new Date(b.expirationDate!).getTime()
                                            )
                                            .map((rec, i) => {
                                                const dotStyle = calculateDotColor(rec.expirationDate);
                                                return (
                                                    <span
                                                        key={i}
                                                        className="h-4 w-4 rounded-full"
                                                        style={dotStyle}
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
                                        title="Ver"
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
    );
};
