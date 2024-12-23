import { ProjectData } from "@/interfaces/project.interface";
import React from "react";

interface Props {
  projects: ProjectData[];
}

export const ProjectSummaryData = ({ projects }: Props) => {
  // Derive the counts for each status
  const totalCount = projects.length;
  const planningCount = projects.filter((project) => project.status === "PLANNING").length;
  const inProgressCount = projects.filter((project) => project.status === "IN_PROGRESS").length;
  const completedCount = projects.filter((project) => project.status === "COMPLETED").length;
  const maintenanceCount = projects.filter((project) => project.status === "MAINTENANCE").length;


  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-200 mb-3">
      <div className="grid grid-cols-5 gap-4">
        {/* Total */}
        <div className="p-3 bg-blue-50 rounded-md flex flex-col md:flex-row items-center justify-center sm:justify-between text-center">
          <span className="text-xs md:text-sm text-gray-600">Total</span>
          <span className="text-lg font-bold text-blue-600">{totalCount}</span>
        </div>

        {/* Contratadas */}
        <div className="p-3 bg-red-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
          <span className="hidden md:block text-sm text-gray-600">Contratadas</span>
          <span className="md:hidden text-xs text-gray-600">Contr</span>
          <span className="text-lg font-bold text-red-600">{planningCount}</span>
        </div>

        {/* En ejecución */}
        <div className="p-3 bg-yellow-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
          <span className="hidden md:block text-sm text-gray-600">Ejecución</span>
          <span className="md:hidden text-xs text-gray-600">Ejec</span>
          <span className="text-lg font-bold text-yellow-600">{inProgressCount}</span>
        </div>

        {/* Completadas */}
        <div className="p-3 bg-green-50 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
          <span className="hidden md:block text-sm text-gray-600">Terminada</span>
          <span className="md:hidden text-xs text-gray-600">Term</span>
          <span className="text-lg font-bold text-green-600">{completedCount}</span>
        </div>

        {/* Completadas */}
        <div className="p-3 bg-amber-100 rounded-md flex flex-col md:flex-row items-center justify-center md:justify-between text-center">
          <span className="hidden lg:block text-sm text-gray-600">Mantenimiento</span>
          <span className="lg:hidden text-xs text-gray-600">Mant</span>
          <span className="text-lg font-bold text-amber-500">{maintenanceCount}</span>
        </div>

      </div>
    </div>
  );
};
