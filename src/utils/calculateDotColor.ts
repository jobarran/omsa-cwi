export const calculateDotColor = (expirationDate: Date | null | undefined) => {
    if (!expirationDate) {
        return { state: "apto", backgroundColor: '#388E3C' }; // Dark green (more muted)
    }

    const now = new Date();
    const expiration = new Date(expirationDate);

    const timeDiff = expiration.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (daysLeft <= 1) return { state: "no apto", backgroundColor: '#F57C00' }; // Dark orange
    if (daysLeft <= 7) return { state: "advertencia", backgroundColor: '#FBC02D' }; // Muted yellow
    return { state: "apto", backgroundColor: '#388E3C' }; // Dark green
};
