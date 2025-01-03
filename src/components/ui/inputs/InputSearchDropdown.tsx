"use client";

import { uniqueOptions } from "@/utils";
import React, { useState, useEffect, useRef } from "react";

interface Props {
    onSearch: (searchTerm: string) => void;
    resetSearchTerm: () => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    options: (string | null)[] | null; // Options for the dropdown
}

export const InputSearchDropdown = ({
    onSearch,
    resetSearchTerm,
    searchTerm,
    setSearchTerm,
    options,
}: Props) => {
    const [filteredOptions, setFilteredOptions] = useState<string[]>(uniqueOptions(options));
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setSearchTerm(value); // Update the search term in the parent component
        onSearch(value); // Notify parent about the new search term

        // Filter options based on the search term
        const filtered = uniqueOptions(options).filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
        );

        // Update filtered options
        setFilteredOptions(filtered);

        // Show the dropdown only if there are filtered options
        setDropdownVisible(value.length > 0 && filtered.length > 0);
    };

    const handleClearSearch = () => {
        setSearchTerm(""); // Clear the search term
        resetSearchTerm(); // Notify parent to reset
        setDropdownVisible(false); // Hide the dropdown
    };

    const handleOptionSelect = (option: string) => {
        setSearchTerm(option); // Set the selected option as the search term
        onSearch(option); // Notify parent about the new search term
        setDropdownVisible(false); // Hide the dropdown
    };

    const handleBlur = () => {
        // Delay hiding to allow click selection
        setTimeout(() => {
            if (!dropdownRef.current?.contains(document.activeElement)) {
                setDropdownVisible(false);
            }
        }, 200);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Buscar..."
                className="w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 outline-none"
                onBlur={handleBlur}
                style={{ fontSize: '16px' }} // Ensure the font size is at least 16px

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
            {isDropdownVisible && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 right-0 border bg-white rounded-md shadow-lg z-10">
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
