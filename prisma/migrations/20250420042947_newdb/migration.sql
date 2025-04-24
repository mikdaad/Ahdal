/*
  Warnings:

  - The values [Sofa,Chairs,Homedecor,Carpet] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `subcategory` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category1` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category2` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category3` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category4` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "doorone" AS ENUM ('singledoor', 'doubledoor', 'fourfolding', 'motherandson', 'none');

-- CreateEnum
CREATE TYPE "doortwo" AS ENUM ('normalhandle', 'fridgehandle', 'barhandle', 'none');

-- CreateEnum
CREATE TYPE "doorthree" AS ENUM ('singlelock', 'multilock', 'smartlock', 'none');

-- CreateEnum
CREATE TYPE "windows" AS ENUM ('none', 'GI', 'SS304');

-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Doors', 'Windows');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "subcategory",
DROP COLUMN "weight",
ADD COLUMN     "category1" "doorone" NOT NULL,
ADD COLUMN     "category2" "doortwo" NOT NULL,
ADD COLUMN     "category3" "doorthree" NOT NULL,
ADD COLUMN     "category4" "windows" NOT NULL;

-- DropEnum
DROP TYPE "Subcategory";
