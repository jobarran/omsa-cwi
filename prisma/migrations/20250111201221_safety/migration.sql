/*
  Warnings:

  - Made the column `projectId` on table `Safety` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Safety" DROP CONSTRAINT "Safety_projectId_fkey";

-- AlterTable
ALTER TABLE "Safety" ALTER COLUMN "projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Safety" ADD CONSTRAINT "Safety_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
