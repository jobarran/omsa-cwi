export const dateToString = (date: Date | null | undefined): string => {
    if (!date) return ''; // Return empty string if date is null or undefined

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};