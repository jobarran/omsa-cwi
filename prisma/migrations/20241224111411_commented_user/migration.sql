-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentedUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentedUserId_fkey" FOREIGN KEY ("commentedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
