import prisma from "@/lib/prisma";

export const getBreadcrumbName = async (code: string, type: string): Promise<string> => {
    try {
        switch (type) {
            case "tools":
                const tool = await prisma.tool.findFirst({
                    where: { id: code },
                    select: { name: true, brand: true },
                });
                return tool ? `${tool.name} - ${tool.brand}` : '';

            case "workers":
                const worker = await prisma.user.findFirst({
                    where: { id: code },
                    select: { name: true, lastName: true },
                });
                return worker ? `${worker.name} ${worker.lastName}` : '';

            case "projects":
                const project = await prisma.project.findFirst({
                    where: { code: code },
                    select: { name: true, code: true },
                });
                return project? `${project.name} - ${project.code}` : '';

            default:
                console.error(`Invalid type: ${type}`);
                return '';
        }
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        return '';
    }
};
