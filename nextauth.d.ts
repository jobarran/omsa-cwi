import NextAuth, { DefaultSession } from "next-auth";
import {UserRole} from "./src/interfaces/user.interface"

declare module 'next-auth' {
    interface Session {
        user: {
            id:string;
            name:string;
            lastName:string;
            email:string;
            role: UserRole; // Make sure role is typed as UserRole
            permissionId:string;
            createdAt:Date;
        } & DefaultSession['user']
    }
}