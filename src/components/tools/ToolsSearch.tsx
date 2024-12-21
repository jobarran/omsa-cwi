import { ClearFilterButton } from "../ui/buttons/ClearFilterButton";
import { InputSearch } from "..";
import { FaFilterCircleXmark } from "react-icons/fa6";

interface InputSearchSectionProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
    resetSearchTerm: () => void;
    isFiltering: boolean;
}

export const ToolSearch = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    resetSearchTerm,
    isFiltering
}: InputSearchSectionProps) => {
    return (
        <div className="flex flex-row items-center gap-2 pb-2">
            <div className="flex-grow">
                <InputSearch
                    onSearch={handleSearch}
                    resetSearchTerm={resetSearchTerm}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
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
