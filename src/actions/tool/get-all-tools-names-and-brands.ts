import prisma from '@/lib/prisma';

export const getAllToolsNamesAndBrands = async (): Promise<{ name: string; brand: string | null }[]> => {
    try {
        const toolsNameAndBrand = await prisma.tool.findMany({
            select: {
                name: true,
                brand: true,
            },
        });

        return toolsNameAndBrand

    } catch (error) {
        console.error('Error fetching tools:', error);
        return [];
    }
};
