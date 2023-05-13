/*
  Warnings:

  - You are about to drop the column `Country` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Gender` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `Language` on the `UserInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "Country",
DROP COLUMN "Gender",
DROP COLUMN "Language",
ADD COLUMN     "Landmark" TEXT,
ADD COLUMN     "Locality" TEXT,
ADD COLUMN     "Phoneno" TEXT,
ADD COLUMN     "zipcode" TEXT;
