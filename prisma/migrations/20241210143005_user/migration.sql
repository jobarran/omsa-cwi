/*
  Warnings:

  - A unique constraint covering the columns `[legajo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Company" AS ENUM ('OMSA', 'CWI');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company" "Company" NOT NULL DEFAULT 'CWI',
ADD COLUMN     "legajo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_legajo_key" ON "User"("legajo");
