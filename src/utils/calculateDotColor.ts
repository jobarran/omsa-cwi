export const calculateDotColor = (expirationDate: Date | null | undefined) => {
    if (!expirationDate) {
        return { backgroundColor: '#388E3C' }; // Dark green (more muted)
    }

    const now = new Date();
    const expiration = new Date(expirationDate);

    const timeDiff = expiration.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); 

    if (daysLeft < 1) return { backgroundColor: '#D32F2F' }; // Dark red
    if (daysLeft < 7) return { backgroundColor: '#F57C00' }; // Dark orange
    if (daysLeft < 14) return { backgroundColor: '#FBC02D' }; // Muted yellow
    return { backgroundColor: '#388E3C' }; // Dark green
};
