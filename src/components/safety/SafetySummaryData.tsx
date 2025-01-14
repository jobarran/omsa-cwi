import React from "react";
import { ProjectSafetyTable } from "@/interfaces/safety.interface";
import { calculateDotColor, getSafetyPendingRecords } from "@/utils";

interface Props {
    projectSafeties: ProjectSafetyTable | ProjectSafetyTable[]; // Either single or multiple projects
}

export const SafetySummaryData = ({ projectSafeties }: Props) => {

    const safetyPendingRecords = getSafetyPendingRecords(projectSafeties)
    // Ensure we handle both a single project or an array of projects
    const safetyData = Array.isArray(projectSafeties)
        ? projectSafeties.flatMap((project) => project.safety.flatMap((safety) => safety.safetyRecords))
        : projectSafeties.safety.flatMap((safety) => safety.safetyRecords);

    // Calculate the counts for each category based on expiration dates
    const pending = safetyData.filter((record) => {
        const dotStyle = calculateDotColor(record.safetyRecordFiles[0]?.expirationDate);
        return dotStyle.state === "#D32F2F"; // Dark red
    }).length;

    const expiredLessThan1Day = safetyData.filter((record) => {
        const dotStyle = calculateDotColor(record.safetyRecordFiles[0]?.expirationDate);
        return dotStyle.state === "no apto"; // Dark orange
    }).length;

    const expiredLessThan7Days = safetyData.filter((record) => {
        const dotStyle = calculateDotColor(record.safetyRecordFiles[0]?.expirationDate);
        return dotStyle.state === "advertencia"; // Muted yellow
    }).length;

    const notExpired = safetyData.filter((record) => {
        const dotStyle = calculateDotColor(record.safetyRecordFiles[0]?.expirationDate);
        return dotStyle.state === "apto"; // Dark green
    }).length;

    return (
        <div className="w-full p-4 bg-white rounded-lg border border-gray-200 mb-3">
            <div className="grid grid-cols-4 gap-4">
                <div className="p-3 bg-red-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="hidden md:block text-sm text-gray-600">Pendientes</span>
                    <span className="md:hidden text-xs text-gray-600">Pend</span>
                    <span className="text-lg font-bold text-red-600">{safetyPendingRecords.safetyPendingRecordsLength}</span>
                </div>
                <div className="p-3 bg-orange-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="text-xs md:text-sm text-gray-600">Urgente</span>
                    <span className="text-lg font-bold text-orange-600">{expiredLessThan1Day}</span>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="hidden md:block text-sm text-gray-600">Advertencia</span>
                    <span className="md:hidden text-xs text-gray-600">Advert</span>
                    <span className="text-lg font-bold text-yellow-600">{expiredLessThan7Days}</span>
                </div>
                <div className="p-3 bg-green-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="text-xs md:text-sm text-gray-600">Válido</span>
                    <span className="text-lg font-bold text-green-600">{notExpired}</span>
                </div>
            </div>
        </div>
    );
};
