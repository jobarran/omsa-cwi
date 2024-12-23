"use client";

import { useState, useTransition } from "react";
import { updatePassword } from "@/actions"; // Import the updatePassword action

interface Props {
    userId: string;
    closeModal: () => void;
}

export const PasswordModal = ({ userId, closeModal }: Props) => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const saveChanges = async () => {
        try {
            startTransition(async () => {
                // Call the server action to update the password
                const result = await updatePassword(userId, newPassword);

                if (!result.ok) {
                    setErrorMessage(result.message);
                } else {
                    setErrorMessage(null);
                    closeModal(); // Close the modal on success
                }
            });
        } catch (error) {
            setErrorMessage("Failed to update password. Please try again later.");
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-5/6 sm:w-2/5"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl mb-4">Cambiar contraseña</h2>

                <p className="text-sm text-gray-500 mb-4">
                    Solo el usuario o un usuario Administrador puede actualizar la contraseña.
                </p>

                {errorMessage && (
                    <div className="text-red-500 mb-4 text-sm">{errorMessage}</div>
                )}

                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        Nueva contraseña
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md">
                        Cancelar
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={isPending}
                        className="ml-4 px-4 py-2 bg-sky-500 text-white rounded-md disabled:bg-sky-300"
                    >
                        {isPending ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
};
