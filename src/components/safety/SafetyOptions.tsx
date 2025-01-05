import { SafetyTable } from "@/interfaces/safety.interface";
import { InputSearch } from "../ui/inputs/InputSearch";
import Link from "next/link";

interface Props {
    safeties: SafetyTable[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
    resetSearchTerm: () => void;
    showUserTable: boolean;
    setShowUserTable: (show: boolean) => void;
}

export const SafetyOptions = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    resetSearchTerm,
    showUserTable,
    setShowUserTable,
}: Props) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            {/* Buttons for User Table and Project Table */}
            <div className="flex flex-row flex-wrap sm:flex-nowrap w-full gap-2">
                <button
                    onClick={() => setShowUserTable(false)}
                    className={`px-4 h-8 rounded-lg border text-sm font-medium sm:w-auto flex-grow sm:flex-grow-0 ${
                        !showUserTable ? "bg-sky-800 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                    Obras
                </button>
                <button
                    onClick={() => setShowUserTable(true)}
                    className={`px-4 h-8 rounded-lg border text-sm font-medium sm:w-auto flex-grow sm:flex-grow-0 ${
                        showUserTable ? "bg-sky-800 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                    Operarios
                </button>
            </div>

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
                <Link
                    href="/safety/new"
                    className="flex flex-row justify-center items-center px-3 h-8 rounded-lg border text-sm font-medium bg-sky-800 text-white hover:bg-sky-900 transition sm:w-auto sm:px-4"
                >
                    <span className="hidden sm:block text-nowrap">+ Seguridad</span>
                    <span className="block sm:hidden">+</span>
                </Link>
            </div>
        </div>
    );
};
