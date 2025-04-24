/*
  Warnings:

  - The values [Fashion,Luxury] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `itemsize` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Banner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BottomBanner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TopBanner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `variables` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subcategory` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Subcategory" AS ENUM ('leathersofa', 'lshapesofa', 'roundshapesofa', 'diningchairs', 'officechairs', 'loungechairs', 'wallart', 'vases', 'lighting', 'mirrors', 'persiancarpet', 'moderncarpet', 'shagcarpet');

-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Sofa', 'Chairs', 'Homedecor', 'Carpet');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "itemsize";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gender",
DROP COLUMN "isFeatured",
DROP COLUMN "sizes",
DROP COLUMN "status",
ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "ispremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isstock" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "longdescription" TEXT,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "subcategory" "Subcategory" NOT NULL,
ADD COLUMN     "warranty" TEXT,
ADD COLUMN     "weight" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reviews" TEXT;

-- DropTable
DROP TABLE "Banner";

-- DropTable
DROP TABLE "BottomBanner";

-- DropTable
DROP TABLE "TopBanner";

-- DropTable
DROP TABLE "discount";

-- DropTable
DROP TABLE "variables";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
