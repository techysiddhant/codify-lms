/*
  Warnings:

  - Added the required column `terms` to the `Creator` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `Creator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Creator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `displayName` on table `Creator` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Creator" ADD COLUMN     "terms" BOOLEAN NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "displayName" SET NOT NULL;
