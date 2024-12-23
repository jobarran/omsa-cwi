"use client";

import { useState } from "react";
import { AdminProfileComments, AdminProfileEdit, AdminProfileHistory, TableImage } from "..";
import { User } from "@/interfaces";
import { Project } from "@/interfaces/project.interface";

interface Props {
    user: User;
}

export const AdminProfileComponent = ({ user }: Props) => {

    const [activeTab, setActiveTab] = useState("Historial");

    const renderContent = () => {
        switch (activeTab) {
            case "Historial":
                return <AdminProfileHistory user={user} />;
            case "Comentarios":
                return <AdminProfileComments user={user} />;
            case "Editar":
                return <AdminProfileEdit user={user} />;
            default:
                return null;
        }
    };

    // Default profile avatar when no image is available
    const renderAvatar = () => (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white font-bold text-xl rounded-full">
            {user.name[0]}{user.lastName[0]}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-4 bg-white rounded-lg border">
            <div className="flex flex-col md:flex-row md:space-x-4">

                {/* Image Section */}
                <div className="w-full md:w-72 flex justify-center">
                    {user.image[0]?.url ? (
                        <div className="hidden md:block w-72 h-72 overflow-hidden rounded-lg mr-4">
                            <TableImage
                                src={user.image[0]?.url}
                                alt={user.name}
                                className="w-full h-full object-cover"
                                width={0}
                                height={0}
                                priority
                            />
                        </div>
                    ) : (
                        <div className="hidden md:block w-72 h-72 items-center justify-center bg-gray-300 rounded-lg">
                            {renderAvatar()}
                        </div>
                    )}
                </div>

                {/* User Details */}
                <div className="w-full">
                    <div className="flex mb-2">
                        {/* Image Section for small screens */}
                        {user.image[0]?.url ? (
                            <div className="w-20 h-20 md:hidden overflow-hidden rounded-lg mr-4">
                                <TableImage
                                    src={user.image[0]?.url}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    width={0}
                                    height={0}
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="w-20 h-20 md:hidden flex items-center justify-center bg-gray-300 text-white font-bold text-xl rounded-full mr-4">
                                {renderAvatar()}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-500">
                        {/* Display the user's full name */}
                        <p className="text-xl font-semibold">{user.lastName} {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Legajo:</strong> {user.legajo}</p>
                        <p><strong>Compañía:</strong> {user.company}</p>
                        <p><strong>Teléfono:</strong> {user.phone}</p>
                        <p><strong>Estado:</strong> {user.status}</p>
                        <p><strong>Rol:</strong> {user.role}</p>
                        <p><strong>Proyectos:</strong> {user.projects?.map((project: Project, index: number) => (
                            <span key={index}>{project.name}{index < user.projects.length - 1 ? ', ' : ''}</span>
                        ))}</p>
                        <p><strong>Fecha de registro:</strong> {new Date(user.createdAt).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })}</p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="mt-8">
                <div className="flex border-b">
                    {["Historial", "Comentarios", "Editar"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 -mb-px font-semibold ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
