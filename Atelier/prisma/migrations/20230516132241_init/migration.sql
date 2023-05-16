-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "items" JSONB,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);
