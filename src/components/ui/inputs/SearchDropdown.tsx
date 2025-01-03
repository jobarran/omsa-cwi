"use client"

import React, { useState, useEffect, useRef } from "react";

interface Props {
    options: (string | null)[] | null; // options can be an array of string or null values
    onWordAdd?: (newWord: string) => void; // Optional callback for adding a word
    onWordSelect?: (selectedWord: string) => void; // Optional callback for selecting a word
    label: string;
}

export const SearchDropdown = ({ options, onWordAdd, onWordSelect, label }: Props) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Create a ref for the dropdown container
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter unique options on mount, and remove null values
    useEffect(() => {
        const validOptions = (options ?? []).filter((option): option is string => option !== null);
        const uniqueOptions = Array.from(new Set(validOptions));
        setFilteredOptions(uniqueOptions);
    }, [options]);

    // Close the dropdown and reset input if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
                // If the word isn't added, reset the input value
                if (!inputValue || !filteredOptions.includes(inputValue)) {
                    setInputValue("");
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputValue, filteredOptions]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        const validOptions = (options ?? []).filter((option): option is string => option !== null);
        setFilteredOptions(
            Array.from(new Set(validOptions)).filter(option =>
                option.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleWordAddClick = () => {
        if (onWordAdd && inputValue) {
            onWordAdd(inputValue);
            setInputValue(inputValue);
            setDropdownVisible(false);
        }
    };

    const handleWordSelectClick = (word: string) => {
        setInputValue(word);
        if (onWordSelect) {
            onWordSelect(word);
        }
        setDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleBlur = () => {
        // Delay hiding to allow click selection
        setTimeout(() => setDropdownVisible(false), 200);
    };

    return (
        <div className="relative flex flex-col w-full md:w-1/3 mb-4 md:mb-0" ref={dropdownRef}>
            <label
                htmlFor="code"
                className="mb-1 text-sm font-medium text-gray-700"
            >
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                value={inputValue}
                onChange={handleInputChange}
                onClick={toggleDropdown}
                onBlur={handleBlur}
                className="w-full border rounded p-2 border-gray-300"
                placeholder="Buscar o agregar..."
            />
            {isDropdownVisible && (
                <div className="absolute top-full left-0 right-0 border mt-2 bg-white shadow-lg z-10">
                    {filteredOptions.length ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleWordSelectClick(option)}
                            >
                                {option}
                            </div>
                        ))
                    ) : (
                        <div>
                            <div className="p-2 text-gray-500">No hay coincidencias</div>
                            <div
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={handleWordAddClick}
                            >
                                Añadir &quot;{inputValue}&quot;
                            </div>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
