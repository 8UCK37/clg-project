/*
  Warnings:

  - You are about to drop the column `steamId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitchtoken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userInfoId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FriendRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameSelectInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OwnedGames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userInfoId_fkey";

-- DropIndex
DROP INDEX "User_userInfoId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "steamId",
DROP COLUMN "twitchtoken",
DROP COLUMN "userInfoId";

-- DropTable
DROP TABLE "FriendRequest";

-- DropTable
DROP TABLE "Friends";

-- DropTable
DROP TABLE "GameSelectInfo";

-- DropTable
DROP TABLE "OwnedGames";

-- DropTable
DROP TABLE "UserInfo";
