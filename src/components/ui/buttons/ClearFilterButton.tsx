import React from "react";

interface Props {
    label: string;
    icon?: React.ElementType; // Define this as a component type
    action: () => void;
    isFiltering: boolean
}

export const ClearFilterButton = ({ label, icon, action, isFiltering }: Props) => {

    const handleClearSearch = () => {
        action(); // Notify parent to reset
    };

    const buttonClass = isFiltering
        ? "px-2 h-8 items-center rounded-lg border border-gray-300 bg-sky-800 text-white text-sm hover:text-white hover:bg-sky-900 transition" // Blue button
        : "px-2 h-8 items-center rounded-lg border border-gray-300 text-slate-800 text-sm hover:text-white hover:bg-sky-800 transition"; // Default style

    return (
        <>
            {/* Large screens - show only label */}
            <button
                onClick={handleClearSearch}
                className={`hidden sm:flex ${buttonClass}`}>
                {label}
            </button>

            {/* Small screens */}
            <div
                onClick={handleClearSearch}
                className={`sm:hidden flex ${buttonClass}`}
            >
                {/* Show icon only if provided, else show label */}
                {icon ? React.createElement(icon) : label}
            </div>
        </>
    );
};
