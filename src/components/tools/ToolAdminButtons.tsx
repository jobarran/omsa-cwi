import Link from "next/link";

interface Props {
    openModal: () => void
}

export const ToolAdminButtons = ({ openModal }: Props) => {
    return (
        <div className="flex flex-row justify-end items-center gap-2 w-full">
            <Link
                href="/tools/new"
                className="flex justify-center items-center px-4 h-8 rounded-lg border bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition w-full sm:w-auto">
                + Herramienta
            </Link>
            <button
                onClick={openModal}
                className="flex justify-center items-center px-4 h-8 rounded-lg border bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition w-full sm:w-auto">
                + Categoria
            </button>

        </div>
    );
};
