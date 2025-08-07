/*
  Warnings:

  - Added the required column `name` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "os" TEXT;
