import { UserRole as PrismaUserRole } from "@prisma/client";
import { Tool } from "./tool.interface";
import { Safety, SafetySmall } from "./safety.interface";

export interface Project {
  id: string;
  name: string;
  address: string;
  image?: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  tools: Tool[];
  status: ProjectStatus;
}


export interface ProjectData {
  id: string;
  name: string;
  address: string;
  image: ProjectImage[];
  code: string;
  status: ProjectStatus;
  users: projectUser[];  // Add users field to store an array of User objects
}

export interface ProjectImage {
  url: string;
}

export enum ProjectStatus {
  PLANNING = "PLANNING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  MAINTENANCE = "MAINTENANCE"
}

export interface projectUser {
  id: string,
  name: string,
  lastName: string
  role: PrismaUserRole
}

export interface projectidName {
  id: string;
  name: string;
  safety?: SafetySmall[] | null;
}