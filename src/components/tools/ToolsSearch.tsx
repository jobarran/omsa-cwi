import { ClearFilterButton } from "../ui/buttons/ClearFilterButton";
import { InputSearch, InputSearchDropdown } from "..";
import { FaFilterCircleXmark } from "react-icons/fa6";

interface InputSearchSectionProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
    resetSearchTerm: () => void;
    isFiltering: boolean;
    toolNames: string[]
}

export const ToolSearch = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    resetSearchTerm,
    isFiltering,
    toolNames
}: InputSearchSectionProps) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <div className="flex-grow">
                <InputSearchDropdown
                    onSearch={handleSearch}
                    resetSearchTerm={resetSearchTerm}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    options={toolNames}
                />
            </div>
            <ClearFilterButton
                label="Borrar filtros"
                action={resetSearchTerm}
                icon={FaFilterCircleXmark}
                isFiltering={isFiltering}
            />
        </div>
    );
};
