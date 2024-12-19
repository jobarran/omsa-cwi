"use client";
import { User } from "@/interfaces";

interface Props {
    user: User;
}

export const WorkerProfileComments = ({ user }: Props) => {

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Comentarios</h2>
            <p className="text-gray-700">Text</p>
            {user.name}
            {/* Add edit form here */}
        </div>
    );
};
