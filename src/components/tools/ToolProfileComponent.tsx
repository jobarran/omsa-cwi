"use client";

import { useEffect, useState } from "react";
import { Tool, ToolCategory } from "@/interfaces/tool.interface";
import { RenderStars, TableImage, ToolsProfileComments, ToolsProfileEdit, ToolsProfileHistory } from "..";
import { createNewComment } from "@/actions";
import { toolRagting } from "@/utils";
import { ProjectData } from "@/interfaces/project.interface";

interface Props {
    tool: Tool;
    categories: ToolCategory[] | null;
    projects: ProjectData[]
}

export const ToolsProfileComponent = ({ tool, categories, projects }: Props) => {

    const [activeTab, setActiveTab] = useState("Historial");
    const [activeTool, setActiveTool] = useState<Tool>(tool);
    const [rating, setRating] = useState<number | null>(null); // State to hold the average rating

    useEffect(() => {
        const avgRating = toolRagting(tool.comments); // Assuming tool has a comments array
        setRating(avgRating);
    }, [tool]);

    const handleAddComment = async (comment: string, rating: number | null) => {
        try {
            await createNewComment({
                content: comment,
                rating,
                toolId: activeTool.id,
            });
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Historial":
                return <ToolsProfileHistory tool={tool} />;
            case "Comentarios":
                return <ToolsProfileComments tool={tool} onAddComment={handleAddComment} />;
            case "Editar":
                return <ToolsProfileEdit tool={tool} categories={categories} projects={projects} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-4 bg-white rounded-lg border">
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-2/5 flex justify-center">
                    {tool.image[0]?.url && (
                        <div className="hidden md:block w-72 h-72 overflow-hidden rounded-lg mr-4">
                            <TableImage
                                src={tool.image[0]?.url}
                                alt={tool.name}
                                className="w-full h-full object-cover"
                                width={0}
                                height={0}
                                priority // Add this property
                            />
                        </div>

                    )}
                </div>

                {/* Tool Details */}
                <div className="w-full md:w-3/5">
                    <div className="flex mb-2">
                        {/* Image Section Sm*/}
                        {tool.image[0]?.url && (
                            <div className="w-20 h-20 md:hidden overflow-hidden rounded-lg mr-4">
                                <TableImage
                                    src={tool.image[0]?.url}
                                    alt={tool.name}
                                    className="w-full h-full object-cover"
                                    width={0}
                                    height={0}
                                    priority // Add this property
                                />
                            </div>

                        )}
                        <div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-sky-800">{tool.name}</h1>
                                <h2 className="text-lg text-sky-800">{tool.brand}</h2>
                            </div>
                            <RenderStars rating={rating} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-500">
                        <p><strong>Código:</strong> {tool.code}</p>
                        <p><strong>Estado:</strong> {tool.state}</p>
                        <p><strong>Cantidad:</strong> {tool.quantity}</p>
                        <p>
                            <strong>Fecha de Compra:</strong>{" "}
                            {tool.boughtAt && new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(tool.boughtAt))}
                        </p>
                        <p>
                            <strong>Fecha de registro:</strong>{" "}
                            {new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(tool.createdAt))}
                        </p>
                        <p>
                            <strong>Fecha de actualizado:</strong>{" "}
                            {new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(tool.updatedAt))}
                        </p>


                        <p>
                            <strong>Obra actual:</strong> {tool.project?.name} ({tool.project?.code})
                        </p>
                        <p>
                            <strong>Creado por:</strong> {tool.user?.name} {tool.user?.lastName}
                        </p>
                        <p><strong>Descripción:</strong></p>
                        <p> {tool.description} </p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="mt-8">
                <div className="flex border-b">
                    {[
                        { label: "Historial", id: "Historial" },
                        { label: "Comentarios", id: "Comentarios" },
                        { label: "Editar", id: "Editar" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 -mb-px font-semibold ${activeTab === tab.id
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
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
