/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RecordObject" AS ENUM ('TOOL', 'USER', 'PROJECT', 'CATEGORY', 'MAINTENANCE', 'ASSIGNMENT', 'COMMENT', 'NOTIFICATION');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'TRANSFERRED', 'COMMENT_ADDED', 'STATE_CHANGED');

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_userId_fkey";

-- DropTable
DROP TABLE "Action";

-- DropEnum
DROP TYPE "ActionObject";

-- DropEnum
DROP TYPE "ActionType";

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "type" "RecordType" NOT NULL,
    "actionObject" "RecordObject" NOT NULL,
    "actionTargetId" TEXT NOT NULL,
    "actionTargetName" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
