export const calculateYearsAndMonths = (date: Date): string => {
    const today = new Date();
    let years = today.getFullYear() - date.getFullYear();
    let months = today.getMonth() - date.getMonth();

    // Adjust for negative months
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return `${years}A ${months}M`;
};

