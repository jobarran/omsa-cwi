/*
  Warnings:

  - You are about to drop the column `required` on the `SafetyRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Safety" ADD COLUMN     "requireRecords" TEXT[];

-- AlterTable
ALTER TABLE "SafetyRecord" DROP COLUMN "required";
