/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_transactionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
