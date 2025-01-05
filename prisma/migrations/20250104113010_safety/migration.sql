-- CreateTable
CREATE TABLE "Safety" (
    "id" TEXT NOT NULL,
    "company" "Company" NOT NULL DEFAULT 'CWI',
    "projectId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Safety_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyRecord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "safetyId" TEXT NOT NULL,

    CONSTRAINT "SafetyRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Safety" ADD CONSTRAINT "Safety_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Safety" ADD CONSTRAINT "Safety_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetyRecord" ADD CONSTRAINT "SafetyRecord_safetyId_fkey" FOREIGN KEY ("safetyId") REFERENCES "Safety"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
