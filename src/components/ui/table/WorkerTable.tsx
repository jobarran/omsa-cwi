import { User } from "@/interfaces";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

interface Props {
    workers: User[];
}

export const WorkerTable = ({ workers }: Props) => {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg border">
            <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-sky-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">#</th>
                        <th scope="col" className="px-6 py-3 text-center">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-center">Proyecto</th>
                        <th scope="col" className="px-6 py-3 text-center">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.length > 0 ? (
                        workers.map((worker, index) => (
                            <tr key={worker.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-center">{index + 1}</td>
                                <td className="px-6 py-4 text-center">{worker.lastName}, {worker.name}</td>
                                <td className="px-4 py-2 text-center">
                                    <div className="flex items-center justify-center">
                                        {worker.projects && worker.projects.length > 0 ? (
                                            worker.projects.map((project: { name: string; code: string }, index: number) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-sky-100 text-sky-800 px-1 py-1 text-xs rounded-lg m-1"
                                                >
                                                    {project.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400">Sin obras</span>
                                        )}
                                        <FaArrowRightArrowLeft
                                            className="inline-block ml-2 text-sky-600 cursor-pointer"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">{worker.status || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-700">
                                Sin resultados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
