/*
  Warnings:

  - You are about to drop the `SafetyRecordImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SafetyRecordImage" DROP CONSTRAINT "SafetyRecordImage_safetyRecordId_fkey";

-- AlterTable
ALTER TABLE "SafetyRecord" ADD COLUMN     "documentationLink" TEXT;

-- DropTable
DROP TABLE "SafetyRecordImage";
