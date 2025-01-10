"use client";

import { generateFileName } from "@/utils";
import { FaGoogleDrive, FaPaste, FaRegCopy, FaUserPlus } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";
import { Company as PrismaCompany } from "@prisma/client";
import { useEffect, useRef, useCallback } from "react";

interface Props {
    handleCopyToClipboard: () => void;
    setIsModalOpen: (arg0: boolean) => void;
    fileNameData: {
        projectId?: string | null;
        userId?: string | null;
        company: PrismaCompany;
        name: string;
        recordName?: string | null;
    };
}

export const SafetyRecordDriveModal = ({
    handleCopyToClipboard,
    fileNameData,
    setIsModalOpen,
}: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        },
        [setIsModalOpen]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg w-5/6 sm:w-3/6"
            >
                <h2 className="flex flex-row text-xl font-bold text-sky-700 mb-4 items-center ">
                    <FaGoogleDrive className="mr-2" />
                    Cómo cargar el link
                </h2>
                <div className="mt-2 text-gray-700 space-y-1">
                    <p>Para cargar el link de Drive sigue estos pasos:</p>
                    {/* Step 1 */}
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <p className="flex">1. Ingresá al</p>
                        <a
                            href="https://drive.google.com/drive/folders/1v30RyhWSe4rgIw-HtjIeUb2c2l6PDCfx?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-700 underline hover:text-sky-900"
                        >
                            Drive
                        </a>
                        <FaGoogleDrive className="text-sky-700" />
                    </div>
                    {/* Step 2 */}
                    <div className="inline text-sm text-gray-600 space-x-1">
                        <span>2. Guardar el archivo con el nombre: </span>
                        <code className="bg-gray-100 rounded-md">
                            {generateFileName(fileNameData)}
                        </code>
                        <button
                            className="inline"
                            onClick={handleCopyToClipboard}
                            title="Copiar nombre"
                        >
                            <FaRegCopy className="text-sky-700 hover:text-sky-900" />
                        </button>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-wrap items-center space-x-1 text-sm text-gray-600">
                        <p>3. Haz clic derecho, selecciona</p>
                        <FaUserPlus className="text-sky-700" />
                        <p className="text-sky-700">Compartir</p>
                        <p>y luego</p>
                        <IoMdLink className="text-sky-700" />
                        <p className="text-sky-700">Copiar enlace</p>.
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-wrap items-center space-x-1 text-sm text-gray-600">
                        <p>4.</p>
                        <p className="flex text-sky-700 items-center">Pegar</p>
                        <FaPaste className="text-sky-700" />
                        <p>el link en el campo</p>
                        <p className="text-sky-700">&quot;Documentación / Link&quot;</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 bg-sky-800 hover:bg-sky-900 text-white py-2 px-4 rounded"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};
