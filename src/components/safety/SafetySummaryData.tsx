import { SafetyTable as SafetyTableType } from "@/interfaces/safety.interface";
import { calculateDotColor } from "@/utils";
import React from "react";

interface Props {
    safeties: SafetyTableType[];
}

export const SafetySummaryData = ({ safeties }: Props) => {
    // Calculate the counts for each category based on expiration dates
    const expiredLessThan1Day = safeties.filter((safety) => {
        return safety.safetyRecords.some((record) => {
            const dotStyle = calculateDotColor(record.expirationDate);
            return dotStyle.backgroundColor === '#D32F2F'; // Dark red
        });
    }).length;

    const expiredLessThan7Days = safeties.filter((safety) => {
        return safety.safetyRecords.some((record) => {
            const dotStyle = calculateDotColor(record.expirationDate);
            return dotStyle.backgroundColor === '#F57C00'; // Dark orange
        });
    }).length;

    const expiredLessThan14Days = safeties.filter((safety) => {
        return safety.safetyRecords.some((record) => {
            const dotStyle = calculateDotColor(record.expirationDate);
            return dotStyle.backgroundColor === '#FBC02D'; // Muted yellow
        });
    }).length;

    const notExpired = safeties.filter((safety) => {
        return safety.safetyRecords.some((record) => {
            const dotStyle = calculateDotColor(record.expirationDate);
            return dotStyle.backgroundColor === '#388E3C'; // Dark green
        });
    }).length;

    return (
        <div className="w-full p-4 bg-white rounded-lg border border-gray-200 mb-3">
            <div className="grid grid-cols-4 gap-4">
                <div className="p-3 bg-red-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="text-xs md:text-sm text-gray-600">Crítico</span>
                    <span className="text-lg font-bold text-red-600">{expiredLessThan1Day}</span>
                </div>
                <div className="p-3 bg-orange-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="text-xs md:text-sm text-gray-600">Urgente</span>
                    <span className="text-lg font-bold text-orange-600">{expiredLessThan7Days}</span>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="hidden md:block text-sm text-gray-600">Advertencia</span>
                    <span className="md:hidden text-xs text-gray-600">Advert</span>
                    <span className="text-lg font-bold text-yellow-600">{expiredLessThan14Days}</span>
                </div>
                <div className="p-3 bg-green-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
                    <span className="text-xs md:text-sm text-gray-600">Válido</span>
                    <span className="text-lg font-bold text-green-600">{notExpired}</span>
                </div>
            </div>
        </div>
    );
};
