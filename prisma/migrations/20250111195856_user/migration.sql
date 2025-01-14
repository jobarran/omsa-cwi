/*
  Warnings:

  - You are about to drop the column `userId` on the `Safety` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Safety" DROP CONSTRAINT "Safety_userId_fkey";

-- AlterTable
ALTER TABLE "Safety" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "SafetyRecord" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "SafetyRecord" ADD CONSTRAINT "SafetyRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
