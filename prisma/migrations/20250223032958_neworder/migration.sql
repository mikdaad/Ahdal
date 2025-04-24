/*
  Warnings:

  - Added the required column `itemquantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "itemcolor" TEXT,
ADD COLUMN     "itemid" TEXT,
ADD COLUMN     "itemname" TEXT,
ADD COLUMN     "itemquantity" INTEGER NOT NULL,
ADD COLUMN     "itemsize" TEXT;
