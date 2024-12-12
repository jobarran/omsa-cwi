import { useState, useMemo } from "react";
import { User } from "@/interfaces";
import { ProjectData } from "@/interfaces/project.interface";

interface WorkerFilters {
    projectId: string | null; // Assuming project stores an ID
    status: string | null;
    search: string | null;
    category: string | null;
}

export const useWorkerFilter = (workers: User[]) => {
    const initialFilters: WorkerFilters = {
        projectId: null,
        status: null,
        search: null,
        category: null,
    };


    const [filters, setFilters] = useState<WorkerFilters>(initialFilters);

    const handleFilterChange = (key: keyof WorkerFilters, value: string | null) => {
        setFilters((prev) => ({ ...prev, [key]: value }));

    };

    const restoreFilters = () => {
        setFilters(initialFilters);
    };

    const filteredWorkers = useMemo(() => {
        return workers.filter((worker) => {
            const matchesProject =
                !filters.projectId ||
                worker.projects.some((project: ProjectData) => project.code === filters.projectId);
            const matchesStatus = !filters.status || worker.status === filters.status;
            const matchesSearch =
                !filters.search ||
                worker.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                worker.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
                worker.legajo.toLowerCase().includes(filters.search.toLowerCase()) ||
                worker.company.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCategory =
                !filters.category ||
                worker.category === filters.category;

            return matchesProject && matchesStatus && matchesSearch && matchesCategory;
        });
    }, [workers, filters]);

    return { filters, handleFilterChange, restoreFilters, filteredWorkers };
};
