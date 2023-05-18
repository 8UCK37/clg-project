/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileBanner` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentReaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postsId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommentReaction" DROP CONSTRAINT "CommentReaction_authorid_fkey";

-- DropForeignKey
ALTER TABLE "CommentReaction" DROP CONSTRAINT "CommentReaction_commentid_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "profileBanner";

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentReaction";

-- DropTable
DROP TABLE "Posts";

-- DropTable
DROP TABLE "Tags";
