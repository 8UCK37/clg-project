/*
  Warnings:

  - You are about to drop the `Oders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Oders";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "items" JSONB,
    "requests" TEXT,
    "deliveryDate" TEXT,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
