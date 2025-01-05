import { SafetyRecordInput } from "@/interfaces/safety.interface";
import { SafetyRecords } from "@/types";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa"; // Icons for check and X

interface Props {
    records: SafetyRecordInput[];
    handleRemoveRecord: (name: string) => void; // Function to remove a record
}

// Helper function to translate record name
const translateRecordName = (name: string): string => {
    const record = SafetyRecords.find((r) => r.shortName === name || r.name === name);
    return record ? record.name : name;
};

export const SafetyRecordList = ({ records, handleRemoveRecord }: Props) => {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg border">
            <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-sky-800">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-center">Nombre</th>
                        <th scope="col" className="px-4 py-3 text-center">Vencimiento</th>
                        <th scope="col" className="px-4 py-3 text-center">Requerido</th>
                        <th scope="col" className="px-4 py-3 text-center">Documentation</th>
                        <th scope="col" className="px-4 py-3 text-center">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-4 py-2 text-center">{translateRecordName(record.name)}</td>
                            <td className="px-4 py-2 text-center">{record.expirationDate}</td>
                            <td className="px-4 py-2 text-center">
                                <div className="flex justify-center items-center">
                                    {record.required ? <FaCheck className="text-green-600 h-5 w-5" /> : <FaTimes className="text-red-600 h-5 w-5" />}
                                </div>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <div className="flex justify-center items-center">
                                    {record.documentationLink ? <FaCheck className="text-green-600 h-5 w-5" /> : <FaTimes className="text-red-600 h-5 w-5" />}
                                </div>
                            </td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    onClick={() => handleRemoveRecord(record.name)}
                                    className="text-red-600 hover:text-red-700"
                                    aria-label="Remove Record"
                                >
                                    <FaTrash className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
