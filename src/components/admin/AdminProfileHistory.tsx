"use client";

import { User } from "@/interfaces";

interface Props {
    user: User
}

export const AdminProfileHistory = ({ user }: Props) => {

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Historial</h2>
            <p className="text-gray-700">Aquí puedes editar la información de la herramienta.</p>
            {user.name}
            {/* Add edit form here */}
        </div>
    );
};
