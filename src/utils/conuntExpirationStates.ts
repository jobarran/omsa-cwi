import { SafetyTable as SafetyTableType } from "@/interfaces/safety.interface";
import { getExpirationState } from "@/utils";

// Expiration states configuration
export const expirationStates = [
    { value: 'critico', label: 'Crítico', color: '#D32F2F', bgColor: 'bg-red-50', textColor: 'text-red-600' },
    { value: 'urgente', label: 'Urgente', color: '#F57C00', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
    { value: 'advertencia', label: 'Advertencia', color: '#FBC02D', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { value: 'valido', label: 'Válido', color: '#388E3C', bgColor: 'bg-green-50', textColor: 'text-green-600' }
];

// Count the number of safeties for each expiration state
export const countExpirationStates = (safeties: SafetyTableType[], expirationState: string) => {
    return safeties.filter((safety) => {
        return safety.safetyRecords.some((record) => {
            const dotStyle = getExpirationState(record.expirationDate);
            return dotStyle.value === expirationState;
        });
    }).length;
};
