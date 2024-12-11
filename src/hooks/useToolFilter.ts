import { useState, useMemo } from "react";
import { Tool, ToolFilters } from "@/interfaces/tool.interface";

export const useToolFilter = (tools: Tool[]) => {
    const initialFilters: ToolFilters = {
        project: null,
        brand: null,
        state: null,
        search: null, // Add search filter
    };

    const [filters, setFilters] = useState<ToolFilters>(initialFilters);

    const handleFilterChange = (key: keyof ToolFilters, value: string | null) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const restoreFilters = () => {
        setFilters(initialFilters);
    };

    const filteredTools = useMemo(() => {
        return tools.filter((tool) => {
            const matchesProject =
                !filters.project || tool.project?.id === filters.project;
            const matchesBrand = !filters.brand || (tool.brand?.toLowerCase() ?? '') === (filters.brand?.toLowerCase() ?? '');
            const matchesState = !filters.state || tool.state === filters.state;
            const matchesSearch =
                !filters.search ||
                tool.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                tool.code.toLowerCase().includes(filters.search.toLowerCase());
            return matchesProject && matchesBrand && matchesState && matchesSearch;
        });
    }, [tools, filters]);

    return { filters, handleFilterChange, restoreFilters, filteredTools };
};
