"use client";

import { User } from "@/interfaces";
import { Tool } from "@/interfaces/tool.interface";

interface Props {
    user: User
}

export const AdminProfileEdit = ({ user }: Props) => {

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Editar</h2>
            <p className="text-gray-700">Aquí puedes editar la información de la herramienta.</p>
            {user.name}
            {/* Add edit form here */}
        </div>
    );
};
