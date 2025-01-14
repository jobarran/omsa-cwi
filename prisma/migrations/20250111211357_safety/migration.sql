/*
  Warnings:

  - You are about to drop the column `documentationLink` on the `SafetyRecord` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `SafetyRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SafetyRecord" DROP COLUMN "documentationLink",
DROP COLUMN "expirationDate";

-- CreateTable
CREATE TABLE "SafetyRecordFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "documentationLink" TEXT,
    "safetyRecordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafetyRecordFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SafetyRecordFile" ADD CONSTRAINT "SafetyRecordFile_safetyRecordId_fkey" FOREIGN KEY ("safetyRecordId") REFERENCES "SafetyRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
