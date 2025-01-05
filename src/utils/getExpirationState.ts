export const getExpirationState = (expirationDate: Date | null | undefined): { value: string, label: string, color: string } => {

    if (!expirationDate) {
        return { value: 'valido', label: 'Válido', color: '#388E3C' }; // Dark green for valid state
    }

    const now = new Date();
    const expiration = new Date(expirationDate);

    const timeDiff = expiration.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); // Days left until expiration

    if (daysLeft < 1) {
        return { value: 'critico', label: 'Crítico', color: '#D32F2F' }; // Dark red for critical state
    }
    if (daysLeft < 7) {
        return { value: 'urgente', label: 'Urgente', color: '#F57C00' }; // Dark orange for urgent state
    }
    if (daysLeft < 14) {
        return { value: 'advertencia', label: 'Advertencia', color: '#FBC02D' }; // Muted yellow for warning state
    }

    return { value: 'valido', label: 'Válido', color: '#388E3C' }; // Dark green for valid state
};
