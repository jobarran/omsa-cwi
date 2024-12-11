export interface Comment {
    id: string;
    content: string;
    rating: number | null;
    createdAt: Date; // Change to Date type to match Prisma's Date type
    user: {
        name: string;
        lastName: string;
    };
}