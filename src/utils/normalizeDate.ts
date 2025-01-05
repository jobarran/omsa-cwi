export const normalizeDate = (date: string): string => {
    const normalizedDate = date.replace(/\s\(.+\)$/, ''); // remove extra info like timezone
    const isoDate = new Date(normalizedDate).toISOString();

    if (isNaN(new Date(isoDate).getTime())) {
        throw new Error('Invalid date format');
    }

    return isoDate;
};