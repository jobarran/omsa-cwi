/*
  Warnings:

  - You are about to drop the column `issueDate` on the `SafetyRecord` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `SafetyRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SafetyRecord" DROP COLUMN "issueDate",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
