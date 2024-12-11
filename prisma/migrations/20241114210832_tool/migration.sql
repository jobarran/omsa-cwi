-- CreateTable
CREATE TABLE "ToolImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "toolId" TEXT,

    CONSTRAINT "ToolImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToolImage" ADD CONSTRAINT "ToolImage_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE SET NULL ON UPDATE CASCADE;
