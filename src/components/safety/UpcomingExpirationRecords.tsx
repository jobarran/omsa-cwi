import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { calculateDotColor } from "@/utils";
import { FaGoogleDrive, FaTimes } from "react-icons/fa";

interface Props {
    projectSafeties: ProjectSafetyTable[]
}

export const UpcomingExpirationRecords = ({ projectSafeties }: Props) => {

    const upcomingSafetyRecords = () => {
        // Collect and filter safety records
        const records = projectSafeties
            .flatMap((project) =>
                project.safety.flatMap((entry) =>
                    entry.safetyRecords?.map((record) => {
                        const safetyFile = record.safetyRecordFiles?.[0]; // Assuming the first file is the one you're interested in
                        return {
                            projectName: project.name,
                            company: entry.company,
                            userName: record.user ? record.user.lastName + " " + record.user.name : "", // Access user from the record
                            expirationDate: safetyFile?.expirationDate, // Get expiration date from the first file
                            ...record,
                        };
                    }) || []
                )
            )
            .filter((record) => record.expirationDate) // Ensure expiration date exists
            .sort((a, b) => {
                const dateA = a.expirationDate ? new Date(a.expirationDate).getTime() : Infinity;
                const dateB = b.expirationDate ? new Date(b.expirationDate).getTime() : Infinity;

                return dateA - dateB; // Sort by expiration date (earliest first)
            })
            .slice(0, 5); // Limit to the first 5 closest records

        return records;
    };

    const expirationRecords = upcomingSafetyRecords();

    return (
        <div>
            {
                expirationRecords.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Próximos vencimientos</h3>
                        <ul className="space-y-2">
                            {expirationRecords.map((record, index) => {
                                const borderColor = calculateDotColor(record.expirationDate); // Get dot color for expiration status

                                return (
                                    <li
                                        key={index}
                                        className={`flex items-center p-2 bg-white rounded border shadow-sm `}
                                        style={{
                                            borderTop: '1px solid #E0E0E0', // Gray border for top
                                            borderRight: '1px solid #E0E0E0', // Gray border for right
                                            borderBottom: '1px solid #E0E0E0', // Gray border for bottom
                                            borderLeft: `4px solid ${borderColor.backgroundColor}`, // Wider colored border for left
                                        }}
                                    >
                                        <div className="flex-1 text-center">
                                            <span className="text-xs text-gray-500 block">Obra</span>
                                            <span className="text-sm">{record.projectName}</span>
                                        </div>
                                        <div className="w-px h-full bg-gray-300 mx-2"></div>
                                        {record.userName ? (
                                            <div className="flex-1 text-center">
                                                <span className="text-xs text-gray-500 block">Empleado</span>
                                                <span className="text-sm">{record.userName}</span>
                                            </div>
                                        ) : (
                                            <div className="flex-1 text-center">
                                                <span className="text-xs text-gray-500 block">Empresa</span>
                                                <span className="text-sm">{record.company}</span>
                                            </div>
                                        )}
                                        <div className="w-px h-full bg-gray-300 mx-2"></div>
                                        <div className="flex-1 text-center">
                                            <span className="text-xs text-gray-500 block">Registro</span>
                                            <span className="text-sm">{record.name}</span>
                                        </div>
                                        <div className="w-px h-full bg-gray-300 mx-2"></div>
                                        <div className="flex-1 text-center">
                                            <span className="text-xs text-gray-500 block">Vencimiento</span>
                                            <span className="text-sm">
                                                {new Date(record.expirationDate!).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="w-px h-full bg-gray-300 mx-2"></div>
                                        {/* Display files associated with the record */}
                                        {record.safetyRecordFiles.length > 0 && (
                                            <div className="flex-1 text-center">
                                                <span className="text-xs text-gray-500 block">Documentación</span>
                                                {record.safetyRecordFiles[0].documentationLink ? (
                                                    <a
                                                        href={record.safetyRecordFiles[0].documentationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex justify-center items-center text-sky-800 hover:text-sky-900"
                                                    >
                                                        <FaGoogleDrive className="h-5 w-5" />
                                                    </a>
                                                ) : (
                                                    <div className="flex justify-center items-center">
                                                        <FaTimes className="text-gray-400 h-5 w-5" />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
