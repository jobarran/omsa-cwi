-- CreateEnum
CREATE TYPE "UserCategory" AS ENUM ('N_A', 'AYUDANTE', 'MEDIO_OFICIAL', 'OFICIAL', 'OFICIAL_ESPECIALIZADO', 'CAPATAZ');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "category" "UserCategory" NOT NULL DEFAULT 'N_A';
