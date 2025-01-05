/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Safety` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Safety` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "SafetyRecordImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "safetyRecordId" TEXT,

    CONSTRAINT "SafetyRecordImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Safety_projectId_key" ON "Safety"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Safety_userId_key" ON "Safety"("userId");

-- AddForeignKey
ALTER TABLE "SafetyRecordImage" ADD CONSTRAINT "SafetyRecordImage_safetyRecordId_fkey" FOREIGN KEY ("safetyRecordId") REFERENCES "SafetyRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
