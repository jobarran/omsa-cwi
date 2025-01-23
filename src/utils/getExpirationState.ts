export const getExpirationState = (expirationDate: Date | null | undefined): {
    value: string,
    label: string,
    color: string,
    tailwindBgColor: string,
    tailwindDarkColor: string,
    tailWindSoftColor: string
} => {

    if (!expirationDate) {
        return { value: 'valido', label: 'Válido', tailwindBgColor: 'bg-green-400', tailwindDarkColor: 'green-600', tailWindSoftColor: 'green-50', color: '#4ade80' }; // Dark green for valid state
    } 

    const now = new Date();
    const expiration = new Date(expirationDate);

    const timeDiff = expiration.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); // Days left until expiration

    if (daysLeft <= 0) {
        return { value: 'critico', label: 'Crítico', tailwindDarkColor: 'red-600', tailwindBgColor: 'bg-red-400',  tailWindSoftColor: 'red-50', color: '#f87171' }; // Dark red for critical state
    }
    if (daysLeft <= 7) {
        return { value: 'advertencia', label: 'Advertencia', tailwindDarkColor: 'yellow-600', tailwindBgColor: 'bg-yellow-400', tailWindSoftColor: 'yellow-50', color: '#facc15' }; // Muted yellow for warning state
    }

    return { value: 'valido', label: 'Válido', tailwindDarkColor: 'green-600', tailwindBgColor: 'bg-green-400', tailWindSoftColor: 'green-50', color: '#4ade80' }; // Dark green for valid state
};
