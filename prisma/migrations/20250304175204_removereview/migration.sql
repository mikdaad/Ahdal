/*
  Warnings:

  - You are about to drop the column `reviews` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'Teens';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "reviews";
