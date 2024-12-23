/*
  Warnings:

  - The values [PHOTO_UPLOADED,TOOL_CREATED] on the enum `ActionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `toolId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the `Maintenance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ToolAssignment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actionObject` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionTargetId` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionObject" AS ENUM ('TOOL', 'USER', 'PROJECT', 'CATEGORY', 'MAINTENANCE', 'ASSIGNMENT', 'COMMENT', 'NOTIFICATION');

-- AlterEnum
BEGIN;
CREATE TYPE "ActionType_new" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'TRANSFERRED', 'COMMENT_ADDED', 'STATE_CHANGED');
ALTER TABLE "Action" ALTER COLUMN "type" TYPE "ActionType_new" USING ("type"::text::"ActionType_new");
ALTER TYPE "ActionType" RENAME TO "ActionType_old";
ALTER TYPE "ActionType_new" RENAME TO "ActionType";
DROP TYPE "ActionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_toolId_fkey";

-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_toolId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_toolId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToolAssignment" DROP CONSTRAINT "ToolAssignment_toolId_fkey";

-- DropForeignKey
ALTER TABLE "ToolAssignment" DROP CONSTRAINT "ToolAssignment_userId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "toolId",
ADD COLUMN     "actionObject" "ActionObject" NOT NULL,
ADD COLUMN     "actionTargetId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Maintenance";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "ToolAssignment";
