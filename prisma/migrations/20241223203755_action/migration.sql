/*
  Warnings:

  - The values [CATEGORY,MAINTENANCE,ASSIGNMENT,COMMENT,NOTIFICATION] on the enum `RecordObject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecordObject_new" AS ENUM ('TOOL', 'USER', 'WORKER', 'PROJECT');
ALTER TABLE "Record" ALTER COLUMN "recordObject" TYPE "RecordObject_new" USING ("recordObject"::text::"RecordObject_new");
ALTER TYPE "RecordObject" RENAME TO "RecordObject_old";
ALTER TYPE "RecordObject_new" RENAME TO "RecordObject";
DROP TYPE "RecordObject_old";
COMMIT;
