"use client";

import { useEffect, useState } from "react";
import { createNewComment } from "@/actions";
import { AdminProfileComments, AdminProfileEdit, AdminProfileHistory, RenderStars, TableImage } from "..";
import { User } from "@/interfaces";

interface Props {
    user: User
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

    return (
        <div className="container mx-auto px-4 py-4 md:py-8 bg-white rounded-lg border">
            <div className="flex flex-col md:flex-row">

                {/* Image Section */}
                <div className="w-full md:w-2/5 flex justify-center">
                    {user.image[0]?.url && (
                        <div className="hidden md:block w-72 h-72 overflow-hidden rounded-lg">
                            <TableImage
                                src={user.image[0]?.url}
                                alt={user.name}
                                className="w-full h-full object-cover"
                                width={0}
                                height={0}
                                priority // Add this property
                            />
                        </div>

                    )}
                </div>

                {/* User Details */}
                <div className="w-full md:w-3/5">
                    <div className="flex mb-2">
                        {/* Image Section Sm*/}
                        {user.image[0]?.url && (
                            <div className="w-20 h-20 md:hidden overflow-hidden rounded-lg mr-4">
                                <TableImage
                                    src={user.image[0]?.url}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    width={0}
                                    height={0}
                                    priority // Add this property
                                />
                            </div>

                        )}

                    </div>

                    <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-500">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Rol:</strong> {user.role}</p>
                        <p>
                            <strong>Fecha de registro:</strong> {new Date(user.createdAt).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })}
                        </p>

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
