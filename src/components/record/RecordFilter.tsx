import { recordObjectTranslations, recordTypeTranslations } from "@/utils";
import { InputSearch } from "../ui/inputs/InputSearch";
import { RecordObject, RecordType } from "@prisma/client";

interface Props {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    handleSearch: (term: string) => void;
    resetSearchTerm: () => void;
    selectedObject: RecordObject | "";
    setSelectedObject: (value: RecordObject | "") => void;
    selectedType: RecordType | "";
    setSelectedType: (value: RecordType | "") => void;
}

export const RecordFilter = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    resetSearchTerm,
    selectedObject,
    setSelectedObject,
    selectedType,
    setSelectedType,
}: Props) => {
    return (
        <div className="mb-3 flex flex-col gap-2 sm:gap-4 sm:flex-row">
            {/* Input Search */}
            <InputSearch
                onSearch={handleSearch}
                resetSearchTerm={resetSearchTerm}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Record Object Dropdown */}
            <select
                value={selectedObject}
                onChange={(e) =>
                    setSelectedObject(e.target.value as RecordObject | "")
                }
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 h-8 text-base outline-none"
            >
                <option value="">Objetos</option>
                {Object.values(RecordObject).map((obj) => (
                    <option key={obj} value={obj}>
                        {recordObjectTranslations[obj]} {/* Display the translated value */}
                    </option>
                ))}
            </select>

            {/* Record Type Dropdown */}
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as RecordType | "")}
                className="flex-grow sm:w-auto w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 h-8 text-base outline-none"
            >
                <option value="">Tipos</option>
                {Object.values(RecordType).map((type) => (
                    <option key={type} value={type}>
                        {recordTypeTranslations[type]} 
                    </option>
                ))}
            </select>
        </div>
    );
};
