import { Tool } from "@/interfaces/tool.interface";
import React from "react";

interface Props {
    tools: Tool[];
}

export const ToolSummaryData = ({ tools }: Props) => {
    // Derive the counts for each category
    const totalCount = tools.length;
    const activeCount = tools.filter((tool) => tool.state === "ACTIVE").length;
    const inRepairCount = tools.filter((tool) => tool.state === "ON_REPAIR").length;
    const inactiveCount = tools.filter((tool) => tool.state === "INACTIVE").length;

    return (
        <div className="w-full p-4 bg-white rounded-lg border border-gray-200 mb-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 rounded-md flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="text-lg font-bold text-blue-600">{totalCount}</span>
                </div>
                <div className="p-3 bg-green-50 rounded-md flex items-center justify-between">
                    <span className="text-sm text-gray-600">Activos:</span>
                    <span className="text-lg font-bold text-green-600">{activeCount}</span>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md flex items-center justify-between">
                    <span className="text-sm text-gray-600">En reparación:</span>
                    <span className="text-lg font-bold text-yellow-600">{inRepairCount}</span>
                </div>
                <div className="p-3 bg-red-50 rounded-md flex items-center justify-between">
                    <span className="text-sm text-gray-600">Inactivos:</span>
                    <span className="text-lg font-bold text-red-600">{inactiveCount}</span>
                </div>
            </div>
        </div>
    );
};
