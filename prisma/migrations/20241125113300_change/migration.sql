/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('TOTAL', 'TOOL_ADMIN', 'PEOPLE_ADMIN', 'PROJECT_ADMIN');

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[] DEFAULT ARRAY[]::"UserPermission"[],
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "role" SET DEFAULT 'PROJECT_MANAGER';

-- DropTable
DROP TABLE "Permission";

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
