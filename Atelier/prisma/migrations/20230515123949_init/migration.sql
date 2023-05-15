-- CreateTable
CREATE TABLE "Cakes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "description" TEXT,
    "price" TEXT,
    "category" TEXT,
    "theme" TEXT,
    "tags" TEXT,
    "photoUrl" TEXT,

    CONSTRAINT "Cakes_pkey" PRIMARY KEY ("id")
);
