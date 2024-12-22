"use client";

import { useEffect, useState } from "react";
import { User } from "@/interfaces";
import { updateProjectImage, updateProject } from "@/actions";
import { ProjectEditModal, ProjectProfileInputs } from "..";
import { compressImage } from "@/utils";
import { ProjectData } from "@/interfaces/project.interface";
import { FaPen } from "react-icons/fa6";

interface Props {
    project: ProjectData;
    managerUsers: User[]
}

type EditableField = "name" | "status" | "address" | "code" | "users" | "image";

export const ProjectProfileEdit = ({ project, managerUsers }: Props) => {

    const [editableFields, setEditableFields] = useState<{ [key in EditableField]: boolean }>({
        name: false,
        status: false,
        address: false,
        code: false,
        users: false,
        image: false,
    });

    const projectManagers = project.users.filter((user) => user.role === "PROJECT_MANAGER");

    const [file, setFile] = useState<File | null>(null); // State for handling file upload
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(project);
    const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
    const [currentValues, setCurrentValues] = useState<{ [key in EditableField]: string }>({
        name: project.name,
        status: project.status,
        address: project.address,
        code: project.code,
        users: projectManagers.map((user) => `${user.name} ${user.lastName}`).join(", "),
        image: "",
    });

    useEffect(() => {
        setCurrentValues({
            name: project.name,
            status: project.status,
            address: project.address,
            code: project.code,
            users: projectManagers.map((user) => `${user.name} ${user.lastName}`).join(", "),
            image: "",
        });
        setSelectedProject(project)
    }, [project]);


    const handleEditClick = (field: EditableField) => {
        setEditableFields((prev) => ({ ...prev, [field]: true }));
    };

    const handleSaveClick = (field: EditableField) => {
        setEditableFields((prev) => ({ ...prev, [field]: false }));
        handleUpdateProject(project.id, field, currentValues[field]);
    };

    const handleChange = (field: EditableField, value: string) => {
        setCurrentValues((prev) => ({ ...prev, [field]: value }));
    };

    const openModal = (field: string) => {
        setFieldToEdit(field);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFieldToEdit(null);
    };

    const handleUpdateProject = (projectId: string, field: EditableField, value: string) => {
        updateProject(field, projectId, value, project);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
        }
    };

    const handleFileUpload = async (projectId: string, field: EditableField, value: string) => {

        const formData = new FormData();
        formData.append("projectId", projectId);

        if (file) {
            try {
                const compressedImage = await compressImage(file);
                formData.append("image", compressedImage);
            } catch (error) {
                alert("Failed to compress image. Please try again.");
                return;
            }
        }

        const { message, ok } = await updateProjectImage(formData)

    };

    return (
        <div className="mt-4">
            <form className="flex flex-col">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700">Codigo</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={project.code}
                                disabled={true}
                                className={`border p-2 h-11 rounded w-full pr-12 bg-gray-100 cursor-not-allowed`}
                            />
                        </div>
                    </div>

                    <ProjectProfileInputs
                        field="name"
                        label="Nombre"
                        currentValue={currentValues.name}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                    <ProjectProfileInputs
                        field="address"
                        label="Dirección"
                        currentValue={currentValues.address}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                    <ProjectProfileInputs
                        field="status"
                        label="Estado"
                        currentValue={currentValues.status}
                        handleChange={handleChange}
                        editableFields={editableFields}
                        handleSaveClick={handleSaveClick}
                        handleEditClick={handleEditClick}
                        options={["PLANNING", "IN_PROGRESS", "COMPLETED"]}
                    />

                    <div className="w-full">
                        <label className="block text-gray-700">
                            Jefe de Obra
                        </label>
                        <div className="relative w-full">

                            <input
                                type="text"
                                value={currentValues.users}
                                onChange={() => { }}
                                className={`border p-2 h-11 rounded w-full pr-12 bg-gray-100 cursor-not-allowed `}
                            />

                            <button
                                type="button"
                                onClick={() => openModal("users")}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
                            >
                                <FaPen />
                            </button>
                        </div>
                    </div>

                </div>


                {/* File Upload Section */}
                <div className="flex-1">
                    <label htmlFor="image" className="mb-1 text-sm font-medium text-gray-700 block">
                        Imagen
                    </label>
                    <div className="flex w-full items-center gap-4">
                        <input
                            type="file"
                            id="image"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                        />
                        <button
                            type="button"
                            disabled={!file}
                            onClick={() => handleFileUpload(project.id, "image", "")}
                            className={`flex items-center justify-center px-4 py-3 ${file ? "bg-sky-600 text-white" : "bg-gray-200 text-black"}  rounded-md text-sm whitespace-nowrap`}
                        >
                            Subir Imagen
                        </button>
                    </div>
                </div>



            </form>


            {isModalOpen && selectedProject && fieldToEdit && (
                <ProjectEditModal
                    project={selectedProject}
                    field={fieldToEdit}
                    closeModal={closeModal}
                    managerUsers={managerUsers}
                />
            )}
        </div>
    );
};