import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { ProjectStatus } from "@prisma/client";
import Link from "next/link";
import { FaArrowRotateRight } from "react-icons/fa6";
import { SafetyBadge } from "..";
import { getBadgeStatus } from "@/utils";

interface Props {
    projectSafeties: ProjectSafetyTable[];
}

const projectStatusTranslations: { [key in ProjectStatus]: string } = {
    [ProjectStatus.PLANNING]: "Contratada",
    [ProjectStatus.IN_PROGRESS]: "Ejecución",
    [ProjectStatus.COMPLETED]: "Terminada",
    [ProjectStatus.MAINTENANCE]: "Mantenimiento",
};

export const SafetyTable = ({ projectSafeties }: Props) => {

    return (
        <div>
            <div className="relative overflow-x-auto sm:rounded-lg border mb-6">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs">
                        <tr className="text-white uppercase bg-sky-800">
                            <th scope="col" className="px-4 py-3 text-center">Obra</th>
                            <th scope="col" className="px-4 py-3 text-center">Código</th>
                            <th scope="col" className="px-4 py-3 text-center">Estado</th>
                            <th scope="col" className="px-4 py-3 text-center" colSpan={2}>CWI</th>
                            <th scope="col" className="px-4 py-3 text-center" colSpan={2}>OMSA</th>
                            <th scope="col" className="py-3 text-center">Actualizar</th>
                        </tr>
                        <tr className="bg-gray-100 text-gray-600">
                            <th scope="col" className="px-2 py-1 text-center font-normal text-transparent">obra</th>
                            <th scope="col" className="px-2 py-1 text-center font-normal text-transparent">codigo</th>
                            <th scope="col" className="px-2 py-1 text-center font-normal text-transparent">estado</th>
                            <th scope="col" className="px-2 py-1 text-center font-normal w-1/12">Empresa</th>
                            <th scope="col" className="px-2 py-1 text-center font-normal w-1/12">Empleados</th>
                            <th scope="col" className="px-2 py-1 text-center font-normal w-1/12">Empresa</th>
                            <th scope="col" className="px-2 py-1 text-center font-normal w-1/12">Empleados</th>
                            <th scope="col" className="px-2 py-1 text-center font-normal text-transparent">actualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectSafeties.map((project) => (
                            <tr key={project.id} className="bg-white border-b hover:bg-gray-50 space-y-2">
                                <td className="px-4 py-2 text-center whitespace-nowrap">{project.name}</td>
                                <td className="px-4 py-2 text-center whitespace-nowrap">{project.code}</td>
                                <td className="px-4 py-2 text-center">{projectStatusTranslations[project.status]}</td>

                                {/* CWI - Empresa */}
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    <SafetyBadge
                                        status={getBadgeStatus({ projectSafety: project, company: "CWI", type: "empresa" })} />
                                </td>

                                {/* CWI - Empleados */}
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    <SafetyBadge
                                        status={getBadgeStatus({ projectSafety: project, company: "CWI", type: "empleados" })} />
                                </td>

                                {/* OMSA - Empresa */}
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    <SafetyBadge
                                        status={getBadgeStatus({ projectSafety: project, company: "OMSA", type: "empresa" })} />
                                </td>

                                {/* OMSA - Empleados */}
                                <td className="px-4 py-2 text-center whitespace-nowrap">
                                    <SafetyBadge
                                        status={getBadgeStatus({ projectSafety: project, company: "OMSA", type: "empleados" })} />
                                </td>

                                <td className="px-4 py-2 text-center flex items-center justify-center">
                                    <Link
                                        href={`/safety/${project.code}`}
                                        className="font-medium text-sky-800 hover:text-sky-600"
                                        title="Ver"
                                    >
                                        <FaArrowRotateRight className="text-xl" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
