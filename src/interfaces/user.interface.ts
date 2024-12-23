// In user.interface.ts
import {
  UserRole as PrismaUserRole,
  UserStatus as PrismaUserStatus,
  UserPermission as PrismaUserPermission,
  Company as PrismaUserCompany,
  WorkerSkill as PrismaWorkerSkill,
  UserCategory as PrismaUserCategory
} from '@prisma/client'; // Import Prisma's enums

// Use Prisma's enums in your interface

export interface User {
  id: string;
  legajo: string;
  company: PrismaUserCompany;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  role: PrismaUserRole;  // Use Prisma's enum for role
  createdAt: Date;
  status: PrismaUserStatus; // Use Prisma's enum for status
  category: PrismaUserCategory;

  // Relations
  permissions?: PrismaUserPermission[]; // Use Prisma's enum for permissions
  records?: any;
  comments?: any;
  projects?: any;
  image: UserImage[];
  workerSkill: WorkerSkill[]
}

export interface WorkerSkill {
  id: string,
  name: string
}

export interface UserImage {
  url: string;
}

// Prisma enums are imported and used directly, no need for custom definitions here
// Remove the following manual enum definitions:
//
// export enum UserRole {
//   ADMIN = 'ADMIN',
//   PROJECT_MANAGER = 'PROJECT_MANAGER',
//   WORKER = 'WORKER',
// }
//
// export enum UserPermission {
//   TOTAL = 'TOTAL',
//   TOOL_ADMIN = 'TOOL_ADMIN',
//   PEOPLE_ADMIN = 'PEOPLE_ADMIN',
//   PROJECT_ADMIN = 'PEOPLE_ADMIN'
// }
//
// export enum UserStatus {
//   ACTIVE = 'ACTIVE',
//   INACTIVE = 'INACTIVE',
// }

export interface SessionUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: PrismaUserRole;
  createdAt: Date;
  legajo: string;
}

export interface UserRoleData {
  userId?: string;
  userRole: PrismaUserRole;
}

export interface UserSmallData {
  id: string;
  name: string;
  lastName: string
}
