"use client";

interface Props {
    onSearch: (searchTerm: string) => void;
    resetSearchTerm: () => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export const InputSearch = ({ onSearch, resetSearchTerm, searchTerm, setSearchTerm }: Props) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSearchTerm(value); // Update the search term in the parent component
        onSearch(value); // Notify parent about the new search term
    };

    const handleClearSearch = () => {
        setSearchTerm(""); // Clear the search term
        resetSearchTerm(); // Notify parent to reset
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Buscar..."
                className="w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 h-8 text-base outline-none"
            />
            {searchTerm && (
                <button
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Clear search"
                >
                    ✕
                </button>
            )}
        </div>
    );
};
