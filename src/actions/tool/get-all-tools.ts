import { Tool } from '@/interfaces/tool.interface';
import prisma from '@/lib/prisma';

export const getAllTools = async (): Promise<Tool[]> => {
    try {
        const tools = await prisma.tool.findMany({
            include: {
                project: { 
                    select: { 
                        id: true, 
                        name: true, 
                        code: true 
                    } 
                },
                user: { 
                    select: { 
                        id: true, 
                        name: true, 
                        lastName: true, 
                        email: true 
                    } 
                },
                categories: { 
                    select: { 
                        id: true, 
                        name: true 
                    } 
                },
                image: { 
                    select: { 
                        url: true 
                    } 
                },
                comments: { 
                    select: { 
                        id: true, 
                        content: true, 
                        rating: true, 
                        createdAt: true,
                        user: {
                            select: {
                                name: true,
                                lastName: true
                            }
                        }
                    } 
                },
            },
        });

        return tools.map((tool) => ({
            id: tool.id,
            code: tool.code,
            name: tool.name,
            brand: tool.brand || null,
            description: tool.description || null,
            state: tool.state,
            quantity: tool.quantity,
            createdAt: tool.createdAt,
            updatedAt: tool.updatedAt,
            boughtAt: tool.boughtAt,
            project: tool.project ? {
                id: tool.project.id,
                name: tool.project.name,
                code: tool.project.code,
            } : null,
            user: {
                id: tool.user.id,
                name: tool.user.name,
                lastName: tool.user.lastName,
                email: tool.user.email,
            },
            categories: tool.categories.map((category) => ({
                id: category.id,
                name: category.name,
            })),
            image: tool.image.map((img) => ({
                url: img.url,
            })),
            comments: tool.comments.map((comment) => ({
                id: comment.id,
                content: comment.content,
                rating: comment.rating || null,
                createdAt: comment.createdAt,
                user: {
                    name: comment.user.name,
                    lastName: comment.user.lastName,
                },
            })),
        }));

    } catch (error) {
        console.error('Error fetching tools:', error);
        return [];
    }
};
