import { Tool } from "@/interfaces/tool.interface";

export const getToolBrands = (tools: Tool[]): string[] => {
    // Use a Set to store unique brand names in lowercase
    const brandsSet = new Set<string>();

    // Iterate over tools and add brand to the set if it's defined
    tools.forEach(tool => {
        if (tool.brand) {
            // Convert brand to lowercase before adding to the set for uniqueness
            brandsSet.add(tool.brand.toLowerCase());
        }
    });

    // Convert the Set to an array and capitalize the first letter of each brand
    return Array.from(brandsSet).map(brand => {
        // Capitalize the first letter and return the brand
        return brand.charAt(0).toUpperCase() + brand.slice(1);
    });
};
