import Link from "next/link";

export const ToolAdminButtons = () => {
    return (
        <div className="flex flex-row justify-end items-center gap-2">
            <Link
                href="/tools/new"
                className="flex justify-center items-center px-4 h-8 rounded-lg border bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition w-full sm:w-auto">
                Agregar Nuevo
            </Link>
            <Link
                href="/categories/new"
                className="flex justify-center items-center px-4 h-8 rounded-lg border bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition w-full sm:w-auto">
                Agregar Categoria
            </Link>
        </div>
    );
};
