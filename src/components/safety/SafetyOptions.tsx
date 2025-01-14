import { InputSearch } from "../ui/inputs/InputSearch";

interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
    resetSearchTerm: () => void;
}

export const SafetyOptions = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    resetSearchTerm,
}: Props) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">

            {/* Input Search and Add Button */}
            <div className="flex flex-row sm:items-center w-full gap-2">
                <div className="flex-grow">
                    <InputSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={handleSearch}
                        resetSearchTerm={resetSearchTerm}
                    />
                </div>
            </div>
        </div>
    );
};
