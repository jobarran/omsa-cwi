/*
  Warnings:

  - You are about to drop the column `actionObject` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `actionTargetId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `actionTargetName` on the `Record` table. All the data in the column will be lost.
  - Added the required column `recordObject` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordTargetId` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordTargetName` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "actionObject",
DROP COLUMN "actionTargetId",
DROP COLUMN "actionTargetName",
ADD COLUMN     "recordObject" "RecordObject" NOT NULL,
ADD COLUMN     "recordTargetId" TEXT NOT NULL,
ADD COLUMN     "recordTargetName" TEXT NOT NULL;
