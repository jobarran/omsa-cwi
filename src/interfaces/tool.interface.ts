import { ToolState } from "@prisma/client";

export interface Tool {
    id: string;
    code: string;
    name: string;
    brand?: string | null;
    description?: string | null;
    state: ToolState; // Use the Prisma-generated ToolState
    quantity: number;
    createdAt: Date; // Change to Date
    updatedAt: Date; // Change to Date

    // Relations
    project?: ToolProject | null;
    user: ToolUser;
    comments: ToolComment[];
    categories: ToolCategory[];
    image: ToolImage[];
}

export interface ToolProject {
    id: string;
    name: string;
    code: string;
}

export interface ToolUser {
    id: string;
    email: string;
    name: string;
    lastName: string
}

export interface ToolCategory {
    id: string;
    name: string;
}

export interface ToolImage {
    url: string;
}

export interface ToolComment {
    id: string;
    content: string;
    rating: number | null;
    createdAt: Date; // Change to Date type to match Prisma's Date type
    user: {
        name: string;
        lastName: string;
    };
}

export interface ToolFilters {
    project: string | null;
    brand: string | null;
    state: string | null;
    search: string | null;
}