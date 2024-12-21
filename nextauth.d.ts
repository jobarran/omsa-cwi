import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "./src/interfaces/user.interface"
import { UserPermission } from "@prisma/client";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            lastName: string;
            email: string;
            role: UserRole;
            permissions: UserPermission[]; // Change this to an array
            createdAt: Date;
        } & DefaultSession['user']
    }
}