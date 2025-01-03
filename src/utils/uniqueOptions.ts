export const uniqueOptions = (options: (string | null)[] | null) => {
    const validOptions = (options ?? []).filter((option): option is string => option !== null);
    const uniqueOptions = Array.from(new Set(validOptions));

    return uniqueOptions
}