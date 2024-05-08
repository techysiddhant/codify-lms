/*
  Warnings:

  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_courseId_fkey";

-- DropTable
DROP TABLE "Purchase";

-- CreateTable
CREATE TABLE "aggregatePurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aggregatePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "aggregatePurchase_courseId_idx" ON "aggregatePurchase"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "aggregatePurchase_userId_courseId_key" ON "aggregatePurchase"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "aggregatePurchase" ADD CONSTRAINT "aggregatePurchase_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
