export const stringToDate =  (dateString: string | null | undefined): Date => {
    if (!dateString) return new Date(); // Return current date if input is null, undefined, or empty

    const parts = dateString.split('-');
    if (parts.length !== 3) return new Date(); // Return current date if the format is not valid

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
    const day = parseInt(parts[2], 10);

    // Ensure valid date
    const parsedDate = new Date(year, month, day);

    // If parsed date is invalid (e.g., incorrect date), return current date
    if (isNaN(parsedDate.getTime())) return new Date();

    return parsedDate;
};