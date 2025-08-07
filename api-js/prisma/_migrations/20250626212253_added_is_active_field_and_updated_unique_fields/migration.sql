/*
  Warnings:

  - A unique constraint covering the columns `[userId,userAgent]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sessions_userId_userAgent_ipAddress_key";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_userAgent_key" ON "sessions"("userId", "userAgent");
