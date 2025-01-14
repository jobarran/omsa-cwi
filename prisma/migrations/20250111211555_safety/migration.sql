/*
  Warnings:

  - You are about to drop the column `name` on the `SafetyRecordFile` table. All the data in the column will be lost.
  - You are about to drop the column `required` on the `SafetyRecordFile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SafetyRecordFile" DROP COLUMN "name",
DROP COLUMN "required";
